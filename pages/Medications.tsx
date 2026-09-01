import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Plus, Edit, Trash2, CheckCircle2, AlertCircle, X, 
  DollarSign, Info, Pill, ArrowUpDown, ChevronDown, ChevronUp, Database, Heart,
  AlertTriangle, ExternalLink, Zap, Shield, Activity
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { useAuth } from '../App';
import { Medication } from '../types';
import { getMedications, saveMedications as saveMedicationsStore } from '../services/medicationsService';
import { motion, AnimatePresence } from 'motion/react';
import { preferencesService } from '../services/preferencesService';
import ClinicalDisclaimer from './ClinicalDisclaimer';
import { useFavorites } from '../hooks/useFavorites';
import { AIAutofillWidget } from '../components/AIAutofillWidget';
import { AlertModal, ConfirmModal } from '../components/ui/Modal';
import { useConfirmModal, useAlertModal } from '../hooks/useModal';
import { ReviewIntervalSelector } from '../components/ReviewIntervalSelector';

const HighlightedText = ({ text, highlight }: { text: string; highlight: string }) => {
  if (!highlight.trim()) return <span>{text}</span>;
  const regex = new RegExp(`(${highlight.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part)
          ? <mark key={i} className="bg-yellow-200 text-yellow-900 rounded px-0.5">{part}</mark>
          : <span key={i}>{part}</span>
      )}
    </span>
  );
};

const Medications: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const navigate = useNavigate();

  const { isFavorite, toggleFavorite } = useFavorites('medications');

  const {
    isOpen: isConfirmOpen,
    title: confirmTitle,
    message: confirmMessage,
    variant: confirmVariant,
    requestConfirm,
    handleConfirm,
    handleCancel,
  } = useConfirmModal();

  const {
    isOpen: isAlertOpen,
    title: alertTitle,
    message: alertMessage,
    type: alertType,
    showAlert,
    handleClose: handleAlertClose,
  } = useAlertModal();

  // --- STATE ---
  const [medications, setMedications] = useState<Medication[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [susFilter, setSusFilter] = useState<'all' | 'sus' | 'particular'>('all');
  const [costFilter, setCostFilter] = useState<'all' | '$' | '$$' | '$$$'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isFavSectionOpen, setIsFavSectionOpen] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = React.useRef<HTMLDivElement>(null);

  // Parse ID from search parameters (e.g. ?id=some-id)
  useEffect(() => {
    if (medications.length > 0) {
      const parts = window.location.hash.split('?');
      const params = new URLSearchParams(parts[1] || window.location.search);
      const id = params.get('id');
      if (id) {
        setExpandedId(id);
        setTimeout(() => {
          const el = document.getElementById(`medcard-${id}`);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 400);
      }
    }
  }, [medications]);

  useEffect(() => {
    const params1 = new URLSearchParams(window.location.search);
    const hashParts = window.location.hash.split('?');
    const params2 = new URLSearchParams(hashParts[1] || '');
    const editId = params1.get('edit') || params2.get('edit');
    if (editId && medications.length > 0) {
      const found = medications.find(m => m.id === editId);
      if (found) {
        handleOpenEditModal(found);
      }
    }
  }, [medications]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMedication, setEditingMedication] = useState<Medication | null>(null);
  const [customReviewIntervalMonths, setCustomReviewIntervalMonths] = useState<number | undefined>(undefined);
  
  // Form fields
  const [genericName, setGenericName] = useState('');
  const [pharmacologicalClass, setPharmacologicalClass] = useState('');
  const [presentationsInput, setPresentationsInput] = useState('');
  const [commercialNamesInput, setCommercialNamesInput] = useState('');
  const [susAvailability, setSusAvailability] = useState(true);
  const [costIndicator, setCostIndicator] = useState<'$' | '$$' | '$$$'>('$');
  
  // Usual doses fields
  const [doseStandard, setDoseStandard] = useState('');
  const [doseMax, setDoseMax] = useState('');
  const [doseFrequency, setDoseFrequency] = useState('');
  const [doseRoute, setDoseRoute] = useState('');

  // New fields
  const [prescriptionType, setPrescriptionType] = useState<Medication['prescriptionType']>('Comum');
  const [pregnancyCategory, setPregnancyCategory] = useState<'A' | 'B' | 'C' | 'D' | 'X' | 'Não classificado'>('Não classificado');
  const [lactationNotes, setLactationNotes] = useState('');
  const [contraindicationsInput, setContraindicationsInput] = useState('');
  const [drugInteractionsInput, setDrugInteractionsInput] = useState('');
  const [packageInsertUrl, setPackageInsertUrl] = useState('');
  const [mainIndications, setMainIndications] = useState<{ condition: string; prescriptionTitle: string }[]>([]);

  // --- LOAD DATA ---
  useEffect(() => {
    setMedications(getMedications());
  }, []);

  useEffect(() => {
    const handleUpdate = () => setMedications(getMedications());
    window.addEventListener('medassist:medications-updated', handleUpdate);
    return () => window.removeEventListener('medassist:medications-updated', handleUpdate);
  }, []);

  // --- PERSIST DATA ---
  const saveMedications = (updated: Medication[]) => {
    setMedications(updated);
    saveMedicationsStore(updated);
  };

  // --- FILTERS ---
  const filteredMedications = medications.filter(med => {
    // Search filter
    const query = searchTerm.toLowerCase();
    const matchesSearch = 
      med.genericName.toLowerCase().includes(query) ||
      med.pharmacologicalClass.toLowerCase().includes(query) ||
      med.commercialNames.some(name => name.toLowerCase().includes(query));

    // SUS filter
    const matchesSus = 
      susFilter === 'all' || 
      (susFilter === 'sus' && med.susAvailability) || 
      (susFilter === 'particular' && !med.susAvailability);

    // Cost filter
    const matchesCost = 
      costFilter === 'all' || 
      med.costIndicator === costFilter;

    return matchesSearch && matchesSus && matchesCost;
  }).sort((a, b) => a.genericName.localeCompare(b.genericName, 'pt-BR', { sensitivity: 'base' }));

  const suggestions = useMemo(() => {
    if (searchTerm.length < 2) return [];
    const query = searchTerm.toLowerCase();
    const results: { label: string; type: 'generico' | 'comercial' | 'classe'; medId: string }[] = [];

    medications.forEach(med => {
      if (med.genericName.toLowerCase().includes(query))
        results.push({ label: med.genericName, type: 'generico', medId: med.id });
      med.commercialNames.forEach(name => {
        if (name.toLowerCase().includes(query))
          results.push({ label: name, type: 'comercial', medId: med.id });
      });
      if (med.pharmacologicalClass.toLowerCase().includes(query))
        results.push({ label: med.pharmacologicalClass, type: 'classe', medId: med.id });
    });

    // Remover duplicatas por label e limitar a 8 sugestões
    return Array.from(new Map(results.map(r => [r.label, r])).values()).slice(0, 8);
  }, [searchTerm, medications]);

  const favoriteMedications = useMemo(() => {
    return medications
      .filter(med => isFavorite(med.id))
      .sort((a, b) => a.genericName.localeCompare(b.genericName, 'pt-BR', { sensitivity: 'base' }));
  }, [medications, isFavorite]);

  // --- MODAL SUBMIT ---
  const handleOpenAddModal = () => {
    setEditingMedication(null);
    setGenericName('');
    setPharmacologicalClass('');
    setPresentationsInput('');
    setCommercialNamesInput('');
    setSusAvailability(true);
    setCostIndicator('$');
    setDoseStandard('');
    setDoseMax('');
    setDoseFrequency('');
    setDoseRoute('');
    setPrescriptionType('Comum');
    setPregnancyCategory('Não classificado');
    setLactationNotes('');
    setContraindicationsInput('');
    setDrugInteractionsInput('');
    setPackageInsertUrl('');
    setMainIndications([]);
    setCustomReviewIntervalMonths(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (med: Medication, e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // don't toggle expansion
    setEditingMedication(med);
    setGenericName(med.genericName);
    setPharmacologicalClass(med.pharmacologicalClass);
    setPresentationsInput(med.presentations.join('\n'));
    setCommercialNamesInput(med.commercialNames.join(', '));
    setSusAvailability(med.susAvailability);
    setCostIndicator(med.costIndicator);
    setDoseStandard(med.usualDoses.standard);
    setDoseMax(med.usualDoses.max);
    setDoseFrequency(med.usualDoses.frequency);
    setDoseRoute(med.usualDoses.route);
    setPrescriptionType(med.prescriptionType || 'Comum');
    setPregnancyCategory(med.pregnancySafety?.category || 'Não classificado');
    setLactationNotes(med.pregnancySafety?.lactationNotes || '');
    setContraindicationsInput(med.contraindications ? med.contraindications.join('\n') : '');
    setDrugInteractionsInput(med.drugInteractions ? med.drugInteractions.join('\n') : '');
    setPackageInsertUrl(med.packageInsertUrl || '');
    setMainIndications(
      med.mainIndications 
        ? med.mainIndications.map(ind => ({ condition: ind.condition, prescriptionTitle: ind.prescriptionTitle || '' })) 
        : []
    );
    setCustomReviewIntervalMonths(med.customReviewIntervalMonths);
    setIsModalOpen(true);
  };

  const handleDeleteMedication = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // don't toggle expansion
    const confirmed = await requestConfirm({
      title: 'Excluir Medicação',
      message: 'Deseja realmente remover esta medicação? Esta ação não pode ser desfeita.',
      variant: 'danger'
    });
    if (confirmed) {
      const updated = medications.filter(m => m.id !== id);
      saveMedications(updated);
      if (expandedId === id) setExpandedId(null);
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (!genericName.trim() || !pharmacologicalClass.trim()) {
      showAlert({
        title: 'Dados Obrigatórios',
        message: 'Nome Genérico e Classe Farmacológica são obrigatórios!',
        type: 'warning'
      });
      return;
    }

    const parsedPresentations = presentationsInput
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const parsedCommercial = commercialNamesInput
      .split(',')
      .map(c => c.trim())
      .filter(c => c.length > 0);

    const newOrUpdatedMed: Medication = {
      id: editingMedication ? editingMedication.id : `med-${Date.now()}`,
      genericName: genericName.trim(),
      pharmacologicalClass: pharmacologicalClass.trim(),
      presentations: parsedPresentations,
      usualDoses: {
        standard: doseStandard.trim() || 'A critério médico',
        max: doseMax.trim() || 'Não especificada',
        frequency: doseFrequency.trim() || 'Variável',
        route: doseRoute.trim() || 'Via Oral'
      },
      commercialNames: parsedCommercial,
      susAvailability,
      costIndicator,
      prescriptionType,
      pregnancySafety: {
        category: pregnancyCategory,
        lactationNotes: lactationNotes.trim() || undefined
      },
      contraindications: contraindicationsInput.split('\n').map(x => x.trim()).filter(Boolean),
      drugInteractions: drugInteractionsInput.split('\n').map(x => x.trim()).filter(Boolean),
      packageInsertUrl: packageInsertUrl.trim() || undefined,
      mainIndications: mainIndications.length > 0 ? mainIndications.map(x => ({
        condition: x.condition.trim(),
        prescriptionTitle: x.prescriptionTitle.trim() || undefined
      })).filter(x => x.condition) : undefined,
      customReviewIntervalMonths: customReviewIntervalMonths
    };

    let updatedList: Medication[];
    if (editingMedication) {
      updatedList = medications.map(m => m.id === editingMedication.id ? newOrUpdatedMed : m);
    } else {
      updatedList = [newOrUpdatedMed, ...medications];
    }

    saveMedications(updatedList);
    setIsModalOpen(false);
  };

  // --- RESET FILTERS ---
  const handleClearFilters = () => {
    setSearchTerm('');
    setSusFilter('all');
    setCostFilter('all');
  };

  const renderMedicationCard = (med: Medication) => {
    const isExpanded = expandedId === med.id;
    return (
      <div
        key={med.id}
        id={`medcard-${med.id}`}
        onClick={() => setExpandedId(isExpanded ? null : med.id)}
        className={`bg-white rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden dark:bg-slate-800 ${
          isExpanded 
            ? 'border-medical-500 ring-2 ring-medical-100 shadow-md dark:border-medical-500 dark:ring-medical-900/40' 
            : 'border-slate-100 hover:border-medical-200 dark:hover:border-slate-600 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] dark:border-slate-700'
        }`}
      >
        <div className="h-1 bg-gradient-to-r from-medical-600 to-accent-500" />
        {/* HEAD DO CARD */}
        <div className="p-5 bg-white dark:bg-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 rounded-t-2xl">
          <div className="flex-grow">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              {/* Badge Classe */}
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-slate-700 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                <HighlightedText text={med.pharmacologicalClass} highlight={searchTerm} />
              </span>
              
              {/* Badge SUS */}
              {med.susAvailability ? (
                <Badge variant="success">
                  Disponível no SUS
                </Badge>
              ) : (
                <Badge variant="neutral">
                  Particular
                </Badge>
              )}

              {/* Badge Custo */}
              <span className="inline-flex items-center text-xs font-bold text-slate-700 px-1 py-0.5 dark:text-slate-350" title={`Custo: ${med.costIndicator}`}>
                <span className="text-amber-500">
                  {med.costIndicator}
                </span>
                <span className="text-slate-200 dark:text-slate-600">
                  {'$'.repeat(3 - med.costIndicator.length)}
                </span>
              </span>
            </div>

            <h2 className="font-display text-lg font-semibold text-medical-600 tracking-tight flex items-center gap-2 dark:text-medical-400">
              <HighlightedText text={med.genericName} highlight={searchTerm} />
            </h2>
            
            {med.commercialNames.length > 0 && (
              <p className="text-sm text-slate-500 mt-1 dark:text-slate-400">
                <span className="font-semibold text-slate-400 dark:text-slate-500">Marcas:</span>{' '}
                <HighlightedText text={med.commercialNames.join(', ')} highlight={searchTerm} />
              </p>
            )}
          </div>

          {/* CONTROLES DO CARD */}
          <div className="flex items-center space-x-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(med.id);
              }}
              className="p-1 px-2 bg-white hover:bg-slate-50 rounded-lg text-slate-600 hover:text-red-500 border border-slate-200 text-xs font-medium flex items-center gap-1 transition-colors dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
              title={isFavorite(med.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            >
              <Heart className={`h-3.5 w-3.5 ${isFavorite(med.id) ? "text-red-500 fill-red-500" : ""}`} />
              Favorito
            </button>
            {isAdmin && (
              <div className="flex items-center gap-1.5 mr-2">
                <button
                  onClick={(e) => handleOpenEditModal(med, e)}
                  title="Editar medicamento"
                  className="p-1 px-2.5 bg-white hover:bg-slate-50 rounded-lg text-slate-600 hover:text-medical-600 border border-slate-200 text-xs font-medium flex items-center gap-1 transition-colors dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                >
                  <Edit className="h-3.5 w-3.5" />
                  Editar
                </button>
                <button
                  onClick={(e) => handleDeleteMedication(med.id, e)}
                  title="Excluir"
                  className="p-1 px-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-650 hover:text-red-700 border border-red-100 text-xs font-medium flex items-center transition-colors dark:bg-red-955/20 dark:border-red-900"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
            
            <div>
              {isExpanded ? (
                <ChevronUp className="h-6 w-6 text-slate-400 dark:text-slate-500" />
              ) : (
                <ChevronDown className="h-6 w-6 text-slate-400 dark:text-slate-500" />
              )}
            </div>
          </div>
        </div>

        {/* CORPO EXPANDÍVEL */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <div className="border-t border-slate-100 bg-white p-5 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm dark:bg-slate-900 dark:border-slate-700">
                
                {/* Detalhes de Doses */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-600">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2 dark:text-slate-100 dark:border-slate-700">
                    <Info className="h-4 w-4 text-medical-600" />
                    Doses Habituais
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase dark:text-slate-400">Dose Padrão / Habitual</p>
                      <p className="text-slate-800 font-medium mt-0.5 dark:text-slate-200">{med.usualDoses.standard}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-550 uppercase dark:text-slate-400">Dose Máxima</p>
                      <p className="text-slate-800 font-medium mt-0.5 dark:text-slate-200">{med.usualDoses.max}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase dark:text-slate-400">Frequência</p>
                        <p className="text-slate-800 font-medium mt-0.5 dark:text-slate-200">{med.usualDoses.frequency}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase dark:text-slate-400">Via de Admin.</p>
                        <p className="text-slate-800 font-medium mt-0.5 dark:text-slate-200">{med.usualDoses.route}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detalhes de Apresentações e Marcas */}
                <div className="space-y-4">
                  {/* Apresentações */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-600">
                    <h3 className="font-bold text-slate-900 mb-2.5 flex items-center gap-2 border-b border-slate-200 pb-2 dark:text-slate-100 dark:border-slate-700">
                      <Database className="h-4 w-4 text-emerald-600" />
                      Apresentações Disponíveis
                    </h3>
                    <ul className="space-y-1.5">
                      {med.presentations.map((p, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-slate-805 dark:text-slate-300">
                          <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Receituário e Segurança Gestacional */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-600">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2 dark:text-slate-100 dark:border-slate-700">
                    <Shield className="h-4 w-4 text-medical-600" />
                    Receituário e Segurança
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-slate-501 uppercase dark:text-slate-400 font-sans">Classificação de Receituário</p>
                      {(() => {
                        const type = med.prescriptionType || 'Comum';
                        let badgeClass = 'bg-white text-slate-800 border-slate-200 dark:bg-slate-700 dark:text-slate-200';
                        if (type === 'Especial') badgeClass = 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800';
                        if (type === 'Antimicrobiano') badgeClass = 'bg-orange-100 text-orange-850 border-orange-200 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-900';
                        if (type === 'Alto Custo') badgeClass = 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-800';
                        if (type === 'Receituário A') badgeClass = 'bg-red-100 text-red-800 border-red-200 dark:bg-red-955/40 dark:text-red-400 dark:border-red-900';
                        if (type === 'Receituário B1') badgeClass = 'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-955/40 dark:text-sky-400 dark:border-sky-900';
                        if (type === 'Receituário B2') badgeClass = 'bg-indigo-100 text-indigo-805 border-indigo-200 dark:bg-indigo-955/40 dark:text-indigo-400 dark:border-indigo-900';
                        return (
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border mt-1 ${badgeClass}`}>
                            {type}
                          </span>
                        );
                      })()}
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase mb-1 dark:text-slate-400">Uso na Gestação (FDA)</p>
                      {(() => {
                        const cat = med.pregnancySafety?.category || 'Não classificado';
                        let badgeClass = 'bg-white text-slate-700 border-slate-205 dark:bg-slate-700 dark:text-slate-350';
                        if (cat === 'A') badgeClass = 'bg-emerald-100 text-emerald-800 border-emerald-250 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-950';
                        if (cat === 'B') badgeClass = 'bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-950/40 dark:text-teal-400 dark:border-teal-950';
                        if (cat === 'C') badgeClass = 'bg-amber-100 text-amber-800 border-amber-250 dark:bg-amber-955/40 dark:text-amber-400 dark:border-amber-950';
                        if (cat === 'D') badgeClass = 'bg-orange-100 text-orange-850 border-orange-200 dark:bg-orange-955/40 dark:text-orange-400 dark:border-orange-950';
                        if (cat === 'X') badgeClass = 'bg-red-100 text-red border-red-200 dark:bg-red-955/40 dark:text-red-400 dark:border-red-950';
                        return (
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold border ${badgeClass}`}>
                              {cat}
                            </span>
                            <span className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                              {cat === 'A' ? 'Sem risco demonstrado em estudos controlados' :
                               cat === 'B' ? 'Estudos em animais mostram segurança ou sem risco demonstrado' :
                               cat === 'C' ? 'Risco não pode ser excluído. Avaliar custo-benefício' :
                               cat === 'D' ? 'Evidência positiva de risco fetal humano' :
                               cat === 'X' ? 'Contraindicado na gestação' :
                               'Sem classificação formal de risco pela FDA'}
                            </span>
                          </div>
                        );
                      })()}
                    </div>

                    {med.pregnancySafety?.lactationNotes && (
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase dark:text-slate-400 font-sans">Uso na Lactação</p>
                        <p className="text-slate-700 italic text-xs mt-1 dark:text-slate-300 leading-relaxed">{med.pregnancySafety.lactationNotes}</p>
                      </div>
                    )}

                    {med.packageInsertUrl && (
                      <div className="pt-2">
                        <a
                          href={med.packageInsertUrl}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold px-3 py-2 rounded-lg transition-colors border border-slate-200 dark:border-slate-600 cursor-pointer"
                        >
                          <span>📄 Acessar Bula Oficial</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Principais Indicações e Links para Modelos */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-600 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2 dark:text-slate-100 dark:border-slate-700 font-sans">
                      <Activity className="h-4 w-4 text-indigo-600" />
                      Principais Indicações
                    </h3>
                    {med.mainIndications && med.mainIndications.length > 0 ? (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {med.mainIndications.map((ind, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (ind.prescriptionTitle) {
                                navigate(`/prescriptions?search=${encodeURIComponent(ind.prescriptionTitle)}`);
                              } else {
                                navigate(`/prescriptions?search=${encodeURIComponent(ind.condition)}`);
                              }
                            }}
                            className="inline-flex items-center gap-1 bg-medical-50 hover:bg-medical-100 dark:bg-medical-950/20 dark:hover:bg-medical-900/40 text-medical-700 dark:text-medical-400 border border-medical-200 dark:border-medical-800 text-xs font-bold px-2.5 py-1.5 rounded-lg transition-all text-left cursor-pointer"
                            title={ind.prescriptionTitle ? `Ver modelo de prescrição: "${ind.prescriptionTitle}"` : `Buscar por ${ind.condition}`}
                          >
                            <span>{ind.condition}</span>
                            {ind.prescriptionTitle && (
                              <span className="opacity-80 text-[10px] ml-1 bg-medical-200/40 dark:bg-medical-900/60 px-1 py-0.2 rounded font-normal">
                                Modelo ↗
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 italic dark:text-slate-450 mt-2">Nenhuma indicação cadastrada.</p>
                    )}
                  </div>
                </div>

                {/* Contraindicações */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-600 col-span-1">
                  <h3 className="font-bold text-red-650 mb-3 flex items-center gap-2 border-b border-red-50 pb-2 dark:text-red-400 dark:border-red-950/30">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    Contraindicações
                  </h3>
                  {med.contraindications && med.contraindications.length > 0 ? (
                    <ul className="space-y-2">
                      {med.contraindications.map((contra, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-350 leading-relaxed animate-fade-in">
                          <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                          <span>{contra}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-500 italic dark:text-slate-400">Nenhuma contraindicação cadastrada.</p>
                  )}
                </div>

                {/* Interações Farmacológicas */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-600 col-span-1">
                  <h3 className="font-bold text-amber-600 mb-3 flex items-center gap-2 border-b border-amber-50 pb-2 dark:text-amber-400 dark:border-amber-950/30">
                    <Zap className="h-4 w-4 text-amber-500" />
                    Interações Farmacológicas
                  </h3>
                  {med.drugInteractions && med.drugInteractions.length > 0 ? (
                    <ul className="space-y-2">
                      {med.drugInteractions.map((inter, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-350 leading-relaxed animate-fade-in">
                          <Zap className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span>{inter}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-550 italic dark:text-slate-400">Nenhuma interação farmacológica registrada.</p>
                  )}
                </div>

                {/* Info Banner */}
                <div className="bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-550 flex items-start gap-2 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 col-span-1 md:col-span-2">
                  <AlertCircle className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  <div>
                    As informações exibidas são uma referência prática baseada em dados gerais e não dispensam a individualização terapêutica de acordo com o quadro clínico e exames de cada paciente.
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="px-4 py-8 sm:px-0">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Pill className="h-8 w-8 text-medical-600" />
            <h1 className="text-2xl font-bold text-medical-600 dark:text-medical-400">
              Guia de Medicações
            </h1>
          </div>
          <p className="mt-2 text-sm text-slate-500 max-w-2xl">
            Guia prático de referência rápida de fármacos para consulta do dia a dia clínico. Verifique dosagens, apresentações, coberturas do SUS e estimativas de custo.
          </p>
        </div>

        {isAdmin && (
          <button
            id="btn-add-medication"
            onClick={handleOpenAddModal}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-medical-600 hover:bg-medical-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-medical-500"
          >
            <Plus className="h-5 w-5" />
            Adicionar Medicamento
          </button>
        )}
      </div>

      {/* FILTROS E BUSCA */}
      <div id="filter-bar" className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-stretch dark:bg-slate-800 dark:border-slate-700">
        
        {/* Campo de pesquisa */}
        <div className="relative flex-grow" ref={searchContainerRef}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="h-5 w-5" />
          </div>
          <input
            id="input-search"
            type="text"
            placeholder="Buscar por nome genérico, comercial ou classe..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-medical-600 focus:border-medical-600 sm:text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 dark:placeholder-slate-400 dark:focus:ring-medical-500 dark:focus:border-medical-500"
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto dark:bg-slate-800 dark:border-slate-700">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSearchTerm(suggestion.label);
                    setShowSuggestions(false);
                  }}
                  className="px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer flex justify-between items-center text-xs text-slate-700 dark:text-slate-200 border-b border-slate-100 dark:border-slate-700/50 last:border-0"
                >
                  <HighlightedText text={suggestion.label} highlight={searchTerm} />
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                    suggestion.type === 'generico' ? 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900' :
                    suggestion.type === 'comercial' ? 'bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-800' :
                    'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600'
                  }`}>
                    {suggestion.type === 'generico' ? 'Genérico' :
                     suggestion.type === 'comercial' ? 'Comercial' : 'Classe'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Filtro SUS */}
        <div className="w-full md:w-56">
          <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5 pl-1 dark:text-slate-400">
            Plano de Saúde / SUS
          </label>
          <select
            id="select-sus-filter"
            value={susFilter}
            onChange={(e) => setSusFilter(e.target.value as any)}
            className="block w-full px-3 py-2 border border-slate-300 rounded-md bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-medical-600 focus:border-medical-600 sm:text-sm
                       dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 dark:focus:ring-medical-500 dark:focus:border-medical-500"
          >
            <option value="all">Todas as disponibilidades</option>
            <option value="sus">Disponível no SUS</option>
            <option value="particular">Somente Particular</option>
          </select>
        </div>

        {/* Filtro de Custo */}
        <div className="w-full md:w-56">
          <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5 pl-1 dark:text-slate-400">
            Faixa de Custo
          </label>
          <select
            id="select-cost-filter"
            value={costFilter}
            onChange={(e) => setCostFilter(e.target.value as any)}
            className="block w-full px-3 py-2 border border-slate-300 rounded-md bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-medical-600 focus:border-medical-600 sm:text-sm
                       dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 dark:focus:ring-medical-500 dark:focus:border-medical-500"
          >
            <option value="all">Todos os custos</option>
            <option value="$">Baixo Custo ($)</option>
            <option value="$$">Custo Intermediário ($$)</option>
            <option value="$$$">Alto Custo ($$$)</option>
          </select>
        </div>
      </div>

      {/* BADGES DE FILTROS ATIVOS */}
      {(searchTerm !== '' || susFilter !== 'all' || costFilter !== 'all') && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm font-medium text-slate-500">Filtros ativos:</span>
          
          {searchTerm && (
            <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full">
              Busca: "{searchTerm}"
              <button onClick={() => setSearchTerm('')} className="p-0.5 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-600"><X className="h-3 w-3" /></button>
            </span>
          )}

          {susFilter !== 'all' && (
            <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full">
              SUS: {susFilter === 'sus' ? 'Disponível' : 'Particular'}
              <button onClick={() => setSusFilter('all')} className="p-0.5 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-600"><X className="h-3 w-3" /></button>
            </span>
          )}

          {costFilter !== 'all' && (
            <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full">
              Custo: {costFilter}
              <button onClick={() => setCostFilter('all')} className="p-0.5 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-600"><X className="h-3 w-3" /></button>
            </span>
          )}

          <button
            onClick={handleClearFilters}
            className="text-xs text-medical-600 hover:text-medical-800 font-semibold underline-offset-2 hover:underline ml-2"
          >
            Limpar todos os filtros
          </button>
        </div>
      )}

      {/* SEÇÃO MEUS FAVORITOS */}
      {favoriteMedications.length > 0 && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 sm:p-5 mb-6 shadow-sm dark:bg-slate-800 dark:border-slate-700 animate-fade-in">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500 fill-red-500" />
              <h2 className="font-sans text-base font-bold text-slate-800 dark:text-slate-200">
                Meus Favoritos
              </h2>
              <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-0.5 rounded-full dark:bg-red-950/40 dark:text-red-400">
                {favoriteMedications.length}
              </span>
            </div>
            <button
              onClick={() => setIsFavSectionOpen(!isFavSectionOpen)}
              className="text-xs font-semibold text-red-655 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1 transition-colors cursor-pointer"
            >
              {isFavSectionOpen ? (
                <>
                  <span>Recolher</span>
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  <span>Expandir</span>
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
          </div>

          <AnimatePresence initial={false}>
            {isFavSectionOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 gap-4 mt-4">
                  {favoriteMedications.map(renderMedicationCard)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {favoriteMedications.length > 0 && (
        <div className="relative flex py-4 items-center mb-6 animate-fade-in">
          <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
          <span className="flex-shrink mx-4 text-slate-400 text-xs font-bold uppercase tracking-wider">
            Todos os Medicamentos
          </span>
          <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
        </div>
      )}

      {/* RESULTADOS */}
      {filteredMedications.length === 0 ? (
        <div className="text-center py-12 px-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <Info className="h-12 w-12 text-slate-400 mx-auto mb-3" />
          <p className="text-lg font-semibold text-slate-900">Nenhum medicamento correspondente</p>
          <p className="text-slate-500 max-w-sm mx-auto mt-1">
            Tente mudar os filtros de busca, selecionar outras faixas de custo ou exibir todas as disponibilidades do SUS.
          </p>
          {(searchTerm !== '' || susFilter !== 'all' || costFilter !== 'all') && (
            <button
              onClick={handleClearFilters}
              className="mt-4 inline-flex items-center justify-center font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg px-4 py-2 transition-colors text-sm"
            >
              Resetar Filtros
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4" id="medications-list">
          {filteredMedications.map((med) => {
            return renderMedicationCard(med);
            if (false) {
            const isExpanded = expandedId === med.id;
            
            return (
              <div
                key={med.id}
                id={`medcard-${med.id}`}
                onClick={() => setExpandedId(isExpanded ? null : med.id)}
                className={`bg-white rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden dark:bg-slate-800 ${
                  isExpanded 
                    ? 'border-medical-500 ring-2 ring-medical-100 shadow-md dark:border-medical-500 dark:ring-medical-900/40' 
                    : 'border-slate-100 hover:border-medical-200 dark:hover:border-slate-600 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] dark:border-slate-700'
                }`}
              >
                <div className="h-1 bg-gradient-to-r from-medical-600 to-accent-500" />
                {/* HEAD DO CARD */}
                <div className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      {/* Badge Classe */}
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {med.pharmacologicalClass}
                      </span>
                      
                      {/* Badge SUS */}
                      {med.susAvailability ? (
                        <Badge variant="success">
                          Disponível no SUS
                        </Badge>
                      ) : (
                        <Badge variant="neutral">
                          Particular
                        </Badge>
                      )}

                      {/* Badge Custo */}
                      <span className="inline-flex items-center text-xs font-bold text-slate-700 px-1 py-0.5 dark:text-slate-350" title={`Custo: ${med.costIndicator}`}>
                        <span className="text-amber-500">
                          {med.costIndicator}
                        </span>
                        <span className="text-slate-200 dark:text-slate-600">
                          {'$'.repeat(3 - med.costIndicator.length)}
                        </span>
                      </span>
                    </div>

                    <h2 className="font-display text-lg font-semibold text-medical-600 tracking-tight flex items-center gap-2 dark:text-medical-400">
                      {med.genericName}
                    </h2>
                    
                    {med.commercialNames.length > 0 && (
                      <p className="text-sm text-slate-500 mt-1 dark:text-slate-400">
                        <span className="font-semibold text-slate-400 dark:text-slate-500">Marcas:</span>{' '}
                        {med.commercialNames.join(', ')}
                      </p>
                    )}
                  </div>

                  {/* CONTROLES DO CARD */}
                  <div className="flex items-center space-x-2 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(med.id);
                      }}
                      className="p-1 px-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-red-500 border border-slate-200 text-xs font-medium flex items-center gap-1 transition-colors dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                      title={isFavorite(med.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                    >
                      <Heart className={`h-3.5 w-3.5 ${isFavorite(med.id) ? "text-red-500 fill-red-500" : ""}`} />
                      Favorito
                    </button>
                    {isAdmin && (
                      <div className="flex items-center gap-1.5 mr-2">
                        <button
                          onClick={(e) => handleOpenEditModal(med, e)}
                          title="Editar medicamento"
                          className="p-1 px-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-medical-600 border border-slate-200 text-xs font-medium flex items-center gap-1 transition-colors dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                        >
                          <Edit className="h-3.5 w-3.5" />
                          Editar
                        </button>
                        <button
                          onClick={(e) => handleDeleteMedication(med.id, e)}
                          title="Excluir"
                          className="p-1 px-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-600 hover:text-red-700 border border-red-100 text-xs font-medium flex items-center transition-colors dark:bg-red-950/20 dark:border-red-900"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                    
                    <div>
                      {isExpanded ? (
                        <ChevronUp className="h-6 w-6 text-slate-400 dark:text-slate-500" />
                      ) : (
                        <ChevronDown className="h-6 w-6 text-slate-400 dark:text-slate-500" />
                      )}
                    </div>
                  </div>
                </div>

                {/* CORPO EXPANDÍVEL */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <div className="border-t border-slate-100 bg-white p-5 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm dark:bg-slate-900 dark:border-slate-700">
                        
                        {/* Detalhes de Doses */}
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-600">
                          <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2 dark:text-slate-100 dark:border-slate-700">
                            <Info className="h-4 w-4 text-medical-600" />
                            Doses Habituais
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs font-semibold text-slate-500 uppercase dark:text-slate-400">Dose Padrão / Habitual</p>
                              <p className="text-slate-800 font-medium mt-0.5 dark:text-slate-200">{med.usualDoses.standard}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-slate-500 uppercase dark:text-slate-400">Dose Máxima</p>
                              <p className="text-slate-800 font-medium mt-0.5 dark:text-slate-200">{med.usualDoses.max}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase dark:text-slate-400">Frequência</p>
                                <p className="text-slate-800 font-medium mt-0.5 dark:text-slate-200">{med.usualDoses.frequency}</p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase dark:text-slate-400">Via de Admin.</p>
                                <p className="text-slate-800 font-medium mt-0.5 dark:text-slate-200">{med.usualDoses.route}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Detalhes de Apresentações e Marcas */}
                        <div className="space-y-4">
                          {/* Apresentações */}
                          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-600">
                            <h3 className="font-bold text-slate-900 mb-2.5 flex items-center gap-2 border-b border-slate-100 pb-2 dark:text-slate-100 dark:border-slate-700">
                              <Database className="h-4 w-4 text-emerald-600" />
                              Apresentações Disponíveis
                            </h3>
                            <ul className="space-y-1.5">
                              {med.presentations.map((p, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-slate-800 dark:text-slate-300">
                                  <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full" />
                                  {p}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Receituário e Segurança Gestacional */}
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-600">
                          <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2 dark:text-slate-100 dark:border-slate-700">
                            <Shield className="h-4 w-4 text-medical-600" />
                            Receituário e Segurança
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <p className="text-xs font-semibold text-slate-500 uppercase dark:text-slate-400 font-sans">Classificação de Receituário</p>
                              {(() => {
                                const type = med.prescriptionType || 'Comum';
                                let badgeClass = 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-700 dark:text-slate-200';
                                if (type === 'Especial') badgeClass = 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800';
                                if (type === 'Antimicrobiano') badgeClass = 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-900';
                                if (type === 'Alto Custo') badgeClass = 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-800';
                                if (type === 'Receituário A') badgeClass = 'bg-red-100 text-red-800 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900';
                                if (type === 'Receituário B1') badgeClass = 'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-900';
                                if (type === 'Receituário B2') badgeClass = 'bg-indigo-100 text-indigo-805 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-900';
                                return (
                                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border mt-1 ${badgeClass}`}>
                                    {type}
                                  </span>
                                );
                              })()}
                            </div>

                            <div>
                              <p className="text-xs font-semibold text-slate-500 uppercase mb-1 dark:text-slate-400">Uso na Gestação (FDA)</p>
                              {(() => {
                                const cat = med.pregnancySafety?.category || 'Não classificado';
                                let badgeClass = 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-700 dark:text-slate-350';
                                if (cat === 'A') badgeClass = 'bg-emerald-100 text-emerald-800 border-emerald-250 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900';
                                if (cat === 'B') badgeClass = 'bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-950/40 dark:text-teal-400 dark:border-teal-900';
                                if (cat === 'C') badgeClass = 'bg-amber-100 text-amber-800 border-amber-250 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900';
                                if (cat === 'D') badgeClass = 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-900';
                                if (cat === 'X') badgeClass = 'bg-red-100 text-red-0 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900';
                                return (
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold border ${badgeClass}`}>
                                      {cat}
                                    </span>
                                    <span className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                                      {cat === 'A' ? 'Sem risco demonstrado em estudos controlados' :
                                       cat === 'B' ? 'Estudos em animais mostram segurança ou sem risco demonstrado' :
                                       cat === 'C' ? 'Risco não pode ser excluído. Avaliar custo-benefício' :
                                       cat === 'D' ? 'Evidência positiva de risco fetal humano' :
                                       cat === 'X' ? 'Contraindicado na gestação' :
                                       'Sem classificação formal de risco pela FDA'}
                                    </span>
                                  </div>
                                );
                              })()}
                            </div>

                            {med.pregnancySafety?.lactationNotes && (
                              <div>
                                <p className="text-xs font-semibold text-slate-505 uppercase dark:text-slate-400">Uso na Lactação</p>
                                <p className="text-slate-700 italic text-xs mt-1 dark:text-slate-300 leading-relaxed">{med.pregnancySafety.lactationNotes}</p>
                              </div>
                            )}

                            {med.packageInsertUrl && (
                              <div className="pt-2">
                                <a
                                  href={med.packageInsertUrl}
                                  target="_blank"
                                  referrerPolicy="no-referrer"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold px-3 py-2 rounded-lg transition-colors border border-slate-200 dark:border-slate-600 cursor-pointer"
                                >
                                  <span>📄 Acessar Bula Oficial</span>
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Principais Indicações e Links para Modelos */}
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-600 flex flex-col justify-between">
                          <div>
                            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2 dark:text-slate-100 dark:border-slate-700 font-sans">
                              <Activity className="h-4 w-4 text-indigo-650" />
                              Principais Indicações
                            </h3>
                            {med.mainIndications && med.mainIndications.length > 0 ? (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {med.mainIndications.map((ind, idx) => (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (ind.prescriptionTitle) {
                                        navigate(`/prescriptions?search=${encodeURIComponent(ind.prescriptionTitle)}`);
                                      } else {
                                        navigate(`/prescriptions?search=${encodeURIComponent(ind.condition)}`);
                                      }
                                    }}
                                    className="inline-flex items-center gap-1 bg-medical-50 hover:bg-medical-100 dark:bg-medical-950/20 dark:hover:bg-medical-900/40 text-medical-700 dark:text-medical-400 border border-medical-200 dark:border-medical-800 text-xs font-bold px-2.5 py-1.5 rounded-lg transition-all text-left cursor-pointer"
                                    title={ind.prescriptionTitle ? `Ver modelo de prescrição: "${ind.prescriptionTitle}"` : `Buscar por ${ind.condition}`}
                                  >
                                    <span>{ind.condition}</span>
                                    {ind.prescriptionTitle && (
                                      <span className="opacity-80 text-[10px] ml-1 bg-medical-200/40 dark:bg-medical-900/60 px-1 py-0.2 rounded font-normal">
                                        Modelo ↗
                                      </span>
                                    )}
                                  </button>
                                ))}
                              </div>
                            ) : (
                              <p className="text-xs text-slate-500 italic dark:text-slate-450 mt-2">Nenhuma indicação cadastrada.</p>
                            )}
                          </div>
                        </div>

                        {/* Contraindicações */}
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-600 col-span-1">
                          <h3 className="font-bold text-red-650 mb-3 flex items-center gap-2 border-b border-red-50 pb-2 dark:text-red-400 dark:border-red-950/30">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                            Contraindicações
                          </h3>
                          {med.contraindications && med.contraindications.length > 0 ? (
                            <ul className="space-y-2">
                              {med.contraindications.map((contra, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-350 leading-relaxed animate-fade-in">
                                  <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                                  <span>{contra}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-xs text-slate-500 italic dark:text-slate-400">Nenhuma contraindicação cadastrada.</p>
                          )}
                        </div>

                        {/* Interações Farmacológicas */}
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-600 col-span-1">
                          <h3 className="font-bold text-amber-600 mb-3 flex items-center gap-2 border-b border-amber-50 pb-2 dark:text-amber-400 dark:border-amber-950/30">
                            <Zap className="h-4 w-4 text-amber-500" />
                            Interações Farmacológicas
                          </h3>
                          {med.drugInteractions && med.drugInteractions.length > 0 ? (
                            <ul className="space-y-2">
                              {med.drugInteractions.map((inter, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-350 leading-relaxed animate-fade-in">
                                  <Zap className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                  <span>{inter}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-xs text-slate-550 italic dark:text-slate-400">Nenhuma interação farmacológica registrada.</p>
                          )}
                        </div>

                        {/* Info Banner */}
                        <div className="bg-slate-100 border border-slate-200 rounded-xl p-3 text-xs text-slate-550 flex items-start gap-2 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 col-span-1 md:col-span-2">
                          <AlertCircle className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
                          <div>
                            As informações exibidas são uma referência prática baseada em dados gerais e não dispensam a individualização terapêutica de acordo com o quadro clínico e exames de cada paciente.
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
            }
          })}
        </div>
      )}

      {/* MODAL PARA ADICIONAR OU EDITAR MEDICAÇÃO */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-medical-50">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {editingMedication ? 'Editar Medicamento' : 'Novo Fármaco no Guia'}
                  </h2>
                  <p className="text-sm text-slate-500 mt-0.5">
                    Preencha as informações básicas para referência rápida.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 px-2.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-400 hover:text-slate-600 font-bold transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body / Form */}
              <form onSubmit={handleSaveForm} className="overflow-y-auto flex-grow p-6 space-y-5">
                
                {/* Nome genérico e classe */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-semibold text-slate-700 label">
                        Nome Genérico *
                      </label>
                      <AIAutofillWidget
                        type="medication"
                        itemName={genericName}
                        currentData={{
                          genericName,
                          pharmacologicalClass,
                          presentations: presentationsInput.split('\n').map(x => x.trim()).filter(Boolean),
                          usualDoses: {
                            standard: doseStandard,
                            max: doseMax,
                            frequency: doseFrequency,
                            route: doseRoute
                          },
                          commercialNames: commercialNamesInput.split(',').map(x => x.trim()).filter(Boolean),
                          susAvailability,
                          costIndicator,
                          prescriptionType,
                          pregnancySafety: {
                            category: pregnancyCategory,
                            lactationNotes
                          },
                          contraindications: contraindicationsInput.split('\n').map(x => x.trim()).filter(Boolean),
                          drugInteractions: drugInteractionsInput.split('\n').map(x => x.trim()).filter(Boolean),
                          mainIndications
                        }}
                        onApply={(approvedData) => {
                          if (approvedData.genericName) setGenericName(approvedData.genericName);
                          if (approvedData.pharmacologicalClass) setPharmacologicalClass(approvedData.pharmacologicalClass);
                          if (approvedData.presentations) setPresentationsInput(approvedData.presentations.join('\n'));
                          if (approvedData.usualDoses) {
                            if (approvedData.usualDoses.standard) setDoseStandard(approvedData.usualDoses.standard);
                            if (approvedData.usualDoses.max) setDoseMax(approvedData.usualDoses.max);
                            if (approvedData.usualDoses.frequency) setDoseFrequency(approvedData.usualDoses.frequency);
                            if (approvedData.usualDoses.route) setDoseRoute(approvedData.usualDoses.route);
                          }
                          if (approvedData.commercialNames) setCommercialNamesInput(approvedData.commercialNames.join(', '));
                          if (approvedData.susAvailability !== undefined) setSusAvailability(approvedData.susAvailability);
                          if (approvedData.costIndicator) setCostIndicator(approvedData.costIndicator);
                          if (approvedData.prescriptionType) setPrescriptionType(approvedData.prescriptionType);
                          if (approvedData.pregnancySafety) {
                            if (approvedData.pregnancySafety.category) setPregnancyCategory(approvedData.pregnancySafety.category);
                            if (approvedData.pregnancySafety.lactationNotes) setLactationNotes(approvedData.pregnancySafety.lactationNotes);
                          }
                          if (approvedData.contraindications) setContraindicationsInput(approvedData.contraindications.join('\n'));
                          if (approvedData.drugInteractions) setDrugInteractionsInput(approvedData.drugInteractions.join('\n'));
                          if (approvedData.mainIndications) setMainIndications(approvedData.mainIndications);
                        }}
                        isEditMode={!!editingMedication}
                      />
                    </div>
                    <input
                      id="form-genericName"
                      type="text"
                      required
                      placeholder="Ex: Losartana Potássica"
                      value={genericName}
                      onChange={(e) => setGenericName(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-medical-600 focus:border-medical-600 bg-white text-slate-900 placeholder-slate-400 text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 label mb-1">
                      Classe Farmacológica *
                    </label>
                    <input
                      id="form-class"
                      type="text"
                      required
                      placeholder="Ex: IECA / Betabloqueador"
                      value={pharmacologicalClass}
                      onChange={(e) => setPharmacologicalClass(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-medical-600 focus:border-medical-600 bg-white text-slate-900 placeholder-slate-400 text-sm transition-all"
                    />
                  </div>
                </div>

                {/* Marcas comerciais e apresentações */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 label mb-1 flex items-center justify-between">
                      <span>Nomes Comerciais no Brasil</span>
                      <span className="text-xs font-normal text-slate-400">(separe por vírgula)</span>
                    </label>
                    <input
                      id="form-commercial"
                      type="text"
                      placeholder="Ex: Aradois, Torlós, Cozaar"
                      value={commercialNamesInput}
                      onChange={(e) => setCommercialNamesInput(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-medical-600 focus:border-medical-600 bg-white text-slate-900 placeholder-slate-400 text-sm transition-all"
                    />
                  </div>

                  {/* SUS e Custo */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 label mb-1">
                        Disponível no SUS?
                      </label>
                      <select
                        id="form-sus"
                        value={susAvailability ? 'sim' : 'nao'}
                        onChange={(e) => setSusAvailability(e.target.value === 'sim')}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-medical-600 focus:border-medical-600 bg-white text-slate-900 text-sm transition-all"
                      >
                        <option value="sim">Sim (Grátis / Comum)</option>
                        <option value="nao">Não (Somente Particular)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 label mb-1">
                        Faixa de Custo
                      </label>
                      <select
                        id="form-cost"
                        value={costIndicator}
                        onChange={(e) => setCostIndicator(e.target.value as any)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-medical-600 focus:border-medical-600 bg-white text-slate-900 text-sm transition-all"
                      >
                        <option value="$">$ (Baixo)</option>
                        <option value="$$">$$ (Intermediário)</option>
                        <option value="$$$">$$$ (Alto Custo)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Apresentações disponíveis */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 label mb-1 flex items-center justify-between">
                    <span>Apresentações Disponíveis *</span>
                    <span className="text-xs font-normal text-slate-400">(uma por linha)</span>
                  </label>
                  <textarea
                    id="form-presentations"
                    required
                    rows={3}
                    placeholder="Ex:&#10;Comprimido 50mg&#10;Solução oral 5mg/mL"
                    value={presentationsInput}
                    onChange={(e) => setPresentationsInput(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-medical-600 focus:border-medical-600 bg-white text-slate-900 text-sm font-mono transition-all"
                  />
                </div>

                {/* Doses habituais */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1">
                    <Info className="h-4 w-4 text-medical-600" />
                    Seção de Dosagens Habituais
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                        Dose Padrão / Habitual
                      </label>
                      <input
                        id="form-dose-standard"
                        type="text"
                        placeholder="Ex: 50mg uma vez ao dia"
                        value={doseStandard}
                        onChange={(e) => setDoseStandard(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-medical-600 focus:border-medical-600 bg-white text-slate-900 text-xs transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                        Dose Máxima Recomendada
                      </label>
                      <input
                        id="form-dose-max"
                        type="text"
                        placeholder="Ex: 100mg por dia"
                        value={doseMax}
                        onChange={(e) => setDoseMax(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-medical-600 focus:border-medical-600 bg-white text-slate-900 text-xs transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                        Frequência de Uso
                      </label>
                      <input
                        id="form-dose-freq"
                        type="text"
                        placeholder="Ex: De 12 em 12 horas ou de 24 em 24h"
                        value={doseFrequency}
                        onChange={(e) => setDoseFrequency(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-medical-600 focus:border-medical-600 bg-white text-slate-900 text-xs transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                        Via de Administração
                      </label>
                      <input
                        id="form-dose-route"
                        type="text"
                        placeholder="Ex: Via Oral (VO) ou Via Intravenosa (EV)"
                        value={doseRoute}
                        onChange={(e) => setDoseRoute(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-medical-600 focus:border-medical-600 bg-white text-slate-900 text-xs transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* 1. SEÇÃO: RECEITUÁRIO E SEGURANÇA */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5 border-b border-slate-200 pb-2">
                    <Shield className="h-4 w-4 text-medical-600" />
                    Receituário e Segurança
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                        Tipo de Receituário
                      </label>
                      <select
                        id="form-prescription-type"
                        value={prescriptionType}
                        onChange={(e) => setPrescriptionType(e.target.value as any)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-medical-600 focus:border-medical-600 bg-white text-slate-900 text-xs transition-all"
                      >
                        <option value="Comum">Comum (Branca Simples)</option>
                        <option value="Especial">Especial (Controle Especial C1)</option>
                        <option value="Antimicrobiano">Antimicrobiano (Retenção)</option>
                        <option value="Alto Custo">Alto Custo / LME</option>
                        <option value="Receituário A">Receituário A (Amarelo / Entorpecentes)</option>
                        <option value="Receituário B1">Receituário B1 (Azul / Psicotrópicos)</option>
                        <option value="Receituário B2">Receituário B2 (Azul f. / Psicotrópicos anorexígenos)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                        Categoria de Risco na Gestação (FDA)
                      </label>
                      <select
                        id="form-pregnancy-category"
                        value={pregnancyCategory}
                        onChange={(e) => setPregnancyCategory(e.target.value as any)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-medical-600 focus:border-medical-600 bg-white text-slate-900 text-xs transition-all"
                      >
                        <option value="A">Categoria A (Sem riscos demonstrados)</option>
                        <option value="B">Categoria B (Seguro em animais de modo geral)</option>
                        <option value="C">Categoria C (Avaliar custo-benefício)</option>
                        <option value="D">Categoria D (Risco fetal evidenciado)</option>
                        <option value="X">Categoria X (Contraindicado)</option>
                        <option value="Não classificado">Não classificado (Dados indisponíveis)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                      Notas de Lactação e Amamentação
                    </label>
                    <textarea
                      id="form-lactation-notes"
                      rows={2}
                      placeholder="Ex: Compatível com a amamentação. Monitorar efeitos adversos no lactente como sedação."
                      value={lactationNotes}
                      onChange={(e) => setLactationNotes(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-medical-600 focus:border-medical-600 bg-white text-slate-900 text-xs transition-all"
                    />
                  </div>
                </div>

                {/* 2. SEÇÃO: CONTRAINDICAÇÕES */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <label className="block text-sm font-bold text-slate-800 mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><AlertCircle className="h-4 w-4 text-red-500" /> Contraindicações</span>
                    <span className="text-[10px] font-normal text-slate-400 font-mono">(uma por linha)</span>
                  </label>
                  <textarea
                    id="form-contraindications"
                    rows={2}
                    placeholder="Ex:&#10;Hipersensibilidade ao princípio ativo&#10;Histórico de angioedema"
                    value={contraindicationsInput}
                    onChange={(e) => setContraindicationsInput(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-medical-600 focus:border-medical-600 bg-white text-slate-900 text-xs transition-all"
                  />
                </div>

                {/* 3. SEÇÃO: INTERAÇÕES FARMACOLÓGICAS */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <label className="block text-sm font-bold text-slate-800 mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-amber-500" /> Interações Farmacológicas</span>
                    <span className="text-[10px] font-normal text-slate-400 font-mono">(uma por linha)</span>
                  </label>
                  <textarea
                    id="form-drug-interactions"
                    rows={2}
                    placeholder="Ex:&#10;Aumenta risco de hipercalemia com espironolactona&#10;Diminuição de efeito com AINEs"
                    value={drugInteractionsInput}
                    onChange={(e) => setDrugInteractionsInput(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-medical-600 focus:border-medical-600 bg-white text-slate-900 text-xs transition-all"
                  />
                </div>

                {/* 4. SEÇÃO: BULA */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <label className="block text-sm font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                    📄 Link da Bula Oficial
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="form-package-insert"
                      type="url"
                      placeholder="Ex: https://consultaremedios.com.br/losartana"
                      value={packageInsertUrl}
                      onChange={(e) => setPackageInsertUrl(e.target.value)}
                      className="flex-grow px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-medical-600 focus:border-medical-600 bg-white text-slate-900 text-xs transition-all"
                    />
                    {packageInsertUrl && (
                      <a
                        href={packageInsertUrl}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        rel="noopener noreferrer"
                        className="px-3 py-2 bg-slate-200 hover:bg-slate-350 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all"
                      >
                        <span>Abrir</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* 5. SEÇÃO: PRINCIPAIS INDICAÇÕES */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-300 pb-2">
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                      <Activity className="h-4 w-4 text-indigo-600" />
                      Principais Indicações e Links
                    </h3>
                    <button
                      type="button"
                      onClick={() => setMainIndications([...mainIndications, { condition: '', prescriptionTitle: '' }])}
                      className="text-xs font-bold text-medical-600 hover:text-medical-700 hover:underline flex items-center gap-1 px-2.5 py-1 bg-medical-50 hover:bg-medical-100 rounded-lg border border-medical-200 transition-colors cursor-pointer"
                    >
                      <Plus className="h-3 w-3" />
                      Adicionar Indicação
                    </button>
                  </div>

                  {mainIndications.length === 0 ? (
                    <p className="text-xs text-slate-400 italic text-center py-2">Nenhuma indicação listada. Use o botão acima para adicionar.</p>
                  ) : (
                    <div className="space-y-3">
                      {mainIndications.map((ind, idx) => (
                        <div key={idx} className="flex gap-2 items-center bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs">
                          <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-0.5">Indicação / Patologia</label>
                              <input
                                type="text"
                                placeholder="Ex: Hipertensão Arterial Sistêmica"
                                value={ind.condition}
                                onChange={(e) => {
                                  const updated = [...mainIndications];
                                  updated[idx].condition = e.target.value;
                                  setMainIndications(updated);
                                }}
                                className="w-full px-2 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-medical-600 focus:border-medical-600 bg-white text-slate-900 text-xs transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-0.5">Título exato em Prescrições (opcional)</label>
                              <input
                                type="text"
                                placeholder="Ex: HAS - Esquema Básico"
                                value={ind.prescriptionTitle}
                                onChange={(e) => {
                                  const updated = [...mainIndications];
                                  updated[idx].prescriptionTitle = e.target.value;
                                  setMainIndications(updated);
                                }}
                                className="w-full px-2 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-medical-600 focus:border-medical-600 bg-white text-slate-900 text-xs transition-all"
                              />
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = mainIndications.filter((_, i) => i !== idx);
                              setMainIndications(updated);
                            }}
                            className="p-1 px-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded border border-red-150 transition-all self-end mb-0.5"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* REVIEW PERIODICITY */}
                <ReviewIntervalSelector
                  value={customReviewIntervalMonths}
                  onChange={setCustomReviewIntervalMonths}
                  categoryName="Medicamentos"
                  defaultMonths={36}
                />
                
                {/* Botões do Modal */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-end space-x-3">
                  {new URLSearchParams(window.location.search || window.location.hash.split('?')[1]).has('edit') && (
                    <button
                      type="button"
                      onClick={() => window.location.hash = '/admin'}
                      className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium rounded-lg text-sm transition-colors cursor-pointer"
                    >
                      Voltar para Validação
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-800 font-medium rounded-lg text-sm transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-medical-600 hover:bg-medical-700 text-white font-medium rounded-lg text-sm flex items-center gap-1 shadow-sm transition-colors"
                  >
                    Salvar Fármaco
                  </button>
                </div>

              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <ClinicalDisclaimer type="medications" />

      <ConfirmModal
        isOpen={isConfirmOpen}
        title={confirmTitle}
        message={confirmMessage}
        variant={confirmVariant}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

      <AlertModal
        isOpen={isAlertOpen}
        title={alertTitle}
        message={alertMessage}
        type={alertType}
        onClose={handleAlertClose}
      />
    </div>
  );
};

export default Medications;
