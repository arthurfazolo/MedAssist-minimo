import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Search, Plus, Edit, Trash2, CheckCircle2, AlertCircle, X, 
  Info, ArrowUpDown, ChevronDown, ChevronUp, Database, Heart,
  AlertTriangle, ExternalLink, Shield, Activity, BookOpen,
  Stethoscope, FileText, Filter, Layers, ShieldAlert, Sparkles
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { useAuth } from '../App';
import { MedicalDisease } from '../types';
import { 
  getAllDiseases, 
  addCustomDisease, 
  deleteDiseaseById, 
  initializeKnowledgeBase,
  searchMedicalDiseases
} from '../services/knowledgeBaseService';
import { 
  ensureFullDiseaseData, 
  getDiseaseCategoryName,
  getDiseaseDefinition,
  getDiseaseEpidemiology,
  getDiseaseEtiology,
  getDiseasePathophysiology,
  getDiseaseTreatment,
  getDiseaseComplications,
  getDiseasePrognosis
} from '../services/diseaseClinicalHelpers';
import { motion, AnimatePresence } from 'motion/react';
import ClinicalDisclaimer from './ClinicalDisclaimer';
import { useFavorites } from '../hooks/useFavorites';
import { AlertModal, ConfirmModal } from '../components/ui/Modal';
import { useConfirmModal, useAlertModal } from '../hooks/useModal';
import { ReviewIntervalSelector } from '../components/ReviewIntervalSelector';
import { AIAutofillWidget } from '../components/AIAutofillWidget';

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

const MEDICAL_CATEGORIES = [
  'Todas',
  'Cardiologia',
  'Pneumologia',
  'Neurologia',
  'Infectologia',
  'Pediatria',
  'Ginecologia e Obstetrícia',
  'Psiquiatria',
  'Dermatologia',
  'Gastroenterologia',
  'Nefrologia e Urologia',
  'Endocrinologia',
  'Reumatologia',
  'Clínica Médica'
];

const KnowledgeBase: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const { isFavorite, toggleFavorite } = useFavorites('diseases');

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
  const [diseases, setDiseases] = useState<MedicalDisease[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  const [redFlagsOnlyFilter, setRedFlagsOnlyFilter] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isFavSectionOpen, setIsFavSectionOpen] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDisease, setEditingDisease] = useState<MedicalDisease | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'info' | 'red_flags' | 'basics' | 'diagnosis' | 'treatment' | 'complications'>('info');

  // Modal Form Fields
  const [formId, setFormId] = useState('');
  const [formNome, setFormNome] = useState('');
  const [formCategoria, setFormCategoria] = useState('Clínica Médica');
  const [formRedFlagsInput, setFormRedFlagsInput] = useState('');
  const [formDefinition, setFormDefinition] = useState('');
  const [formEpidemiology, setFormEpidemiology] = useState('');
  const [formEtiology, setFormEtiology] = useState('');
  const [formPathophysiology, setFormPathophysiology] = useState('');
  const [formSintomasInput, setFormSintomasInput] = useState('');
  const [formFatoresRiscoInput, setFormFatoresRiscoInput] = useState('');
  const [formCriteriosInput, setFormCriteriosInput] = useState('');
  const [formAchadosExamesInput, setFormAchadosExamesInput] = useState('');
  const [formDiferenciaisInput, setFormDiferenciaisInput] = useState('');
  const [formTreatment, setFormTreatment] = useState('');
  const [formComplications, setFormComplications] = useState('');
  const [formPrognosis, setFormPrognosis] = useState('');
  const [formReferencesInput, setFormReferencesInput] = useState('');
  const [customReviewIntervalMonths, setCustomReviewIntervalMonths] = useState<number | undefined>(undefined);

  // --- LOAD DATA ---
  const loadData = async () => {
    try {
      setLoading(true);
      await initializeKnowledgeBase();
      const all = await getAllDiseases();
      // Ensure all clinical dimensions are present and categorized
      const enriched = all.map(ensureFullDiseaseData);
      setDiseases(enriched);
    } catch (err) {
      console.error('Erro ao carregar base de doenças:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const handleUpdate = () => loadData();
    window.addEventListener('medassist:diseases-updated', handleUpdate);
    return () => window.removeEventListener('medassist:diseases-updated', handleUpdate);
  }, []);

  // Parse ID or edit from search parameters (e.g. ?id=some-id or #?id=some-id)
  useEffect(() => {
    if (diseases.length > 0) {
      const parts = window.location.hash.split('?');
      const params = new URLSearchParams(parts[1] || window.location.search);
      const id = params.get('id');
      const editId = params.get('edit');

      if (id) {
        setExpandedId(id.toUpperCase().trim());
        setTimeout(() => {
          const el = document.getElementById(`disease-card-${id.toUpperCase().trim()}`);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 400);
      } else if (editId) {
        const found = diseases.find(d => d.id.toUpperCase() === editId.toUpperCase());
        if (found) {
          handleOpenEditModal(found);
        }
      }
    }
  }, [diseases]);

  // Handle outside click for search suggestions
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

  // --- SEARCH & FILTER LOGIC ---
  const filteredDiseases = useMemo(() => {
    let result = diseases;

    // Search filter
    if (searchTerm.trim().length > 0) {
      const searchOutput = searchMedicalDiseases(result, searchTerm.trim());
      result = searchOutput.results;
    }

    // Category filter
    if (categoryFilter !== 'Todas') {
      result = result.filter(d => getDiseaseCategoryName(d) === categoryFilter);
    }

    // Red flags filter
    if (redFlagsOnlyFilter) {
      result = result.filter(d => d.red_flags && d.red_flags.length > 0);
    }

    return result.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' }));
  }, [diseases, searchTerm, categoryFilter, redFlagsOnlyFilter]);

  // Suggestions for live search dropdown
  const suggestions = useMemo(() => {
    if (searchTerm.trim().length < 2) return [];
    const searchOutput = searchMedicalDiseases(diseases, searchTerm.trim());
    return searchOutput.results.slice(0, 8);
  }, [diseases, searchTerm]);

  // Favorites list
  const favoriteDiseases = useMemo(() => {
    return diseases
      .filter(d => isFavorite(d.id))
      .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' }));
  }, [diseases, isFavorite]);

  // Clear filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('Todas');
    setRedFlagsOnlyFilter(false);
  };

  // --- MODAL ACTIONS ---
  const handleOpenAddModal = () => {
    setEditingDisease(null);
    setActiveModalTab('info');
    setFormId('');
    setFormNome('');
    setFormCategoria('Clínica Médica');
    setFormRedFlagsInput('');
    setFormDefinition('');
    setFormEpidemiology('');
    setFormEtiology('');
    setFormPathophysiology('');
    setFormSintomasInput('');
    setFormFatoresRiscoInput('');
    setFormCriteriosInput('');
    setFormAchadosExamesInput('');
    setFormDiferenciaisInput('');
    setFormTreatment('');
    setFormComplications('');
    setFormPrognosis('');
    setFormReferencesInput('');
    setCustomReviewIntervalMonths(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (dis: MedicalDisease, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const full = ensureFullDiseaseData(dis);
    setEditingDisease(full);
    setActiveModalTab('info');
    setFormId(full.id);
    setFormNome(full.nome);
    setFormCategoria(full.categoria || getDiseaseCategoryName(full));
    setFormRedFlagsInput((full.red_flags || []).join('\n'));
    setFormDefinition(full.definition || getDiseaseDefinition(full));
    setFormEpidemiology(full.epidemiology || getDiseaseEpidemiology(full));
    setFormEtiology(full.etiology || getDiseaseEtiology(full));
    setFormPathophysiology(full.pathophysiology || getDiseasePathophysiology(full));
    setFormSintomasInput((full.sintomas || []).join('\n'));
    setFormFatoresRiscoInput((full.fatores_risco || []).join('\n'));
    setFormCriteriosInput((full.criterios_diagnosticos || []).join('\n'));
    setFormAchadosExamesInput((full.achados_exames || []).join('\n'));
    setFormDiferenciaisInput((full.diferenciais || []).join('\n'));
    setFormTreatment(full.treatment || getDiseaseTreatment(full));
    setFormComplications(full.complications || getDiseaseComplications(full));
    setFormPrognosis(full.prognosis || getDiseasePrognosis(full));
    setFormReferencesInput((full.references || []).join('\n'));
    setCustomReviewIntervalMonths(full.customReviewIntervalMonths);
    setIsModalOpen(true);
  };

  const handleDeleteDisease = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const confirmed = await requestConfirm({
      title: 'Excluir Doença',
      message: 'Deseja realmente remover esta patologia da base de dados? Esta ação não pode ser desfeita.',
      variant: 'danger'
    });
    if (confirmed) {
      try {
        await deleteDiseaseById(id);
        setDiseases(prev => prev.filter(d => d.id !== id));
        if (expandedId === id) setExpandedId(null);
        showAlert({
          title: 'Doença Removida',
          message: 'A patologia foi excluída com sucesso.',
          type: 'success'
        });
      } catch (err) {
        console.error('Erro ao excluir doença:', err);
        showAlert({
          title: 'Erro na Exclusão',
          message: 'Não foi possível excluir a doença. Tente novamente.',
          type: 'error'
        });
      }
    }
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formNome.trim()) {
      showAlert({
        title: 'Dados Obrigatórios',
        message: 'O nome da patologia é obrigatório!',
        type: 'warning'
      });
      return;
    }

    const cleanId = formId.trim() 
      ? formId.toUpperCase().trim() 
      : (editingDisease ? editingDisease.id : `DIS_${Date.now()}`);

    const parseLines = (text: string) => 
      text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

    const updatedDisease: MedicalDisease = {
      id: cleanId,
      nome: formNome.trim(),
      categoria: formCategoria.trim() || 'Clínica Médica',
      red_flags: parseLines(formRedFlagsInput),
      definition: formDefinition.trim(),
      epidemiology: formEpidemiology.trim(),
      etiology: formEtiology.trim(),
      pathophysiology: formPathophysiology.trim(),
      sintomas: parseLines(formSintomasInput),
      fatores_risco: parseLines(formFatoresRiscoInput),
      criterios_diagnosticos: parseLines(formCriteriosInput),
      achados_exames: parseLines(formAchadosExamesInput),
      diferenciais: parseLines(formDiferenciaisInput),
      treatment: formTreatment.trim(),
      complications: formComplications.trim(),
      prognosis: formPrognosis.trim(),
      references: parseLines(formReferencesInput),
      customReviewIntervalMonths: customReviewIntervalMonths,
      updatedAt: new Date().toISOString()
    };

    try {
      await addCustomDisease(updatedDisease);
      const enriched = ensureFullDiseaseData(updatedDisease);
      
      setDiseases(prev => {
        const exists = prev.some(d => d.id === enriched.id);
        if (exists) {
          return prev.map(d => d.id === enriched.id ? enriched : d);
        } else {
          return [enriched, ...prev];
        }
      });

      setIsModalOpen(false);
      showAlert({
        title: 'Sucesso',
        message: editingDisease ? 'Patologia atualizada com sucesso!' : 'Nova patologia cadastrada com sucesso!',
        type: 'success'
      });
    } catch (err) {
      console.error('Erro ao salvar doença:', err);
      showAlert({
        title: 'Erro ao Salvar',
        message: 'Ocorreu um erro ao gravar a patologia na base de dados.',
        type: 'error'
      });
    }
  };

  // --- RENDER CARD (MATCHING MEDICATIONS LAYOUT) ---
  const renderDiseaseCard = (dis: MedicalDisease) => {
    const isExpanded = expandedId === dis.id;
    const hasRedFlags = dis.red_flags && dis.red_flags.length > 0;
    const categoryName = getDiseaseCategoryName(dis);

    return (
      <div
        key={dis.id}
        id={`disease-card-${dis.id}`}
        onClick={() => setExpandedId(isExpanded ? null : dis.id)}
        className={`bg-white rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden dark:bg-slate-800 ${
          isExpanded 
            ? 'border-medical-500 ring-2 ring-medical-100 shadow-md dark:border-medical-500 dark:ring-medical-900/40' 
            : 'border-slate-100 hover:border-medical-200 dark:hover:border-slate-600 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] dark:border-slate-700'
        }`}
      >
        <div className={`h-1 bg-gradient-to-r ${hasRedFlags ? 'from-red-500 via-amber-500 to-medical-600' : 'from-medical-600 to-accent-500'}`} />
        
        {/* HEAD DO CARD */}
        <div className="p-5 bg-white dark:bg-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 rounded-t-2xl">
          <div className="flex-grow">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              {/* Badge Categoria / Especialidade */}
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-slate-700 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                <HighlightedText text={categoryName} highlight={searchTerm} />
              </span>

              {/* Badge CID / ID */}
              {dis.id && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200">
                  CID: {dis.id}
                </span>
              )}

              {/* Badge Sinais de Alerta */}
              {hasRedFlags && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800">
                  <AlertTriangle className="h-3 w-3 text-red-600 dark:text-red-400" />
                  {dis.red_flags.length} Sinais de Alerta
                </span>
              )}
            </div>

            <h2 className="font-display text-lg font-semibold text-medical-600 tracking-tight flex items-center gap-2 dark:text-medical-400">
              <HighlightedText text={dis.nome} highlight={searchTerm} />
            </h2>
            
            {/* Sintomas preview ou definição */}
            {dis.sintomas && dis.sintomas.length > 0 && (
              <p className="text-sm text-slate-500 mt-1 dark:text-slate-400 line-clamp-1">
                <span className="font-semibold text-slate-400 dark:text-slate-500">Manifestações:</span>{' '}
                <HighlightedText text={dis.sintomas.slice(0, 4).join(' • ')} highlight={searchTerm} />
              </p>
            )}
          </div>

          {/* CONTROLES DO CARD */}
          <div className="flex items-center space-x-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(dis.id);
              }}
              className="p-1 px-2 bg-white hover:bg-slate-50 rounded-lg text-slate-600 hover:text-red-500 border border-slate-200 text-xs font-medium flex items-center gap-1 transition-colors dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
              title={isFavorite(dis.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            >
              <Heart className={`h-3.5 w-3.5 ${isFavorite(dis.id) ? "text-red-500 fill-red-500" : ""}`} />
              Favorito
            </button>
            
            {isAdmin && (
              <div className="flex items-center gap-1.5 mr-2">
                <button
                  onClick={(e) => handleOpenEditModal(dis, e)}
                  title="Editar patologia"
                  className="p-1 px-2.5 bg-white hover:bg-slate-50 rounded-lg text-slate-600 hover:text-medical-600 border border-slate-200 text-xs font-medium flex items-center gap-1 transition-colors dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                >
                  <Edit className="h-3.5 w-3.5" />
                  Editar
                </button>
                <button
                  onClick={(e) => handleDeleteDisease(dis.id, e)}
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

        {/* CORPO EXPANDÍVEL - 5 SEÇÕES CLÍNICAS COMPLETAS */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <div className="border-t border-slate-100 bg-slate-50/50 p-5 space-y-6 text-sm dark:bg-slate-900 dark:border-slate-700">
                
                {/* SEÇÃO 1: SINAIS DE ALERTA (RED FLAGS) */}
                {hasRedFlags && (
                  <div className="bg-red-50/90 border border-red-200 rounded-xl p-4.5 shadow-sm dark:bg-red-950/30 dark:border-red-900/60">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 bg-red-100 rounded-lg text-red-700 dark:bg-red-900/60 dark:text-red-300">
                        <ShieldAlert className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-red-900 text-sm tracking-wide uppercase dark:text-red-200">
                          Sinais de Alerta (Red Flags)
                        </h3>
                        <p className="text-xs text-red-700 dark:text-red-300">
                          Sinais de emergência e gravidade clínica que exigem conduta imediata ou hospitalização
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {dis.red_flags.map((rf, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-start gap-2 bg-white/80 p-2.5 rounded-lg border border-red-100 text-xs font-medium text-red-900 dark:bg-slate-800/80 dark:border-red-900/40 dark:text-red-200"
                        >
                          <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5 dark:text-red-400" />
                          <span>{rf}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SEÇÃO 2: INFORMAÇÕES BÁSICAS */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2.5 dark:text-slate-100 dark:border-slate-700">
                    <Info className="h-4 w-4 text-medical-600" />
                    Informações Básicas
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Definição */}
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide dark:text-slate-400">
                        Definição
                      </p>
                      <p className="text-slate-800 font-normal mt-1 leading-relaxed dark:text-slate-200 text-xs sm:text-sm">
                        {getDiseaseDefinition(dis)}
                      </p>
                    </div>

                    {/* Epidemiologia */}
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide dark:text-slate-400">
                        Epidemiologia
                      </p>
                      <p className="text-slate-800 font-normal mt-1 leading-relaxed dark:text-slate-200 text-xs sm:text-sm">
                        {getDiseaseEpidemiology(dis)}
                      </p>
                    </div>

                    {/* Etiologia */}
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide dark:text-slate-400">
                        Etiologia
                      </p>
                      <p className="text-slate-800 font-normal mt-1 leading-relaxed dark:text-slate-200 text-xs sm:text-sm">
                        {getDiseaseEtiology(dis)}
                      </p>
                    </div>

                    {/* Fisiopatologia */}
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide dark:text-slate-400">
                        Fisiopatologia
                      </p>
                      <p className="text-slate-800 font-normal mt-1 leading-relaxed dark:text-slate-200 text-xs sm:text-sm">
                        {getDiseasePathophysiology(dis)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* SEÇÃO 3: DIAGNÓSTICO E INVESTIGAÇÃO */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2.5 dark:text-slate-100 dark:border-slate-700">
                    <Stethoscope className="h-4 w-4 text-medical-600" />
                    Diagnóstico e Investigação
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Quadro Clínico & Sinais/Sintomas */}
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 dark:text-slate-400">
                        Quadro Clínico e Manifestações
                      </p>
                      <ul className="space-y-1.5">
                        {(dis.sintomas || []).map((sint, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-slate-800 text-xs sm:text-sm dark:text-slate-200">
                            <span className="h-1.5 w-1.5 bg-medical-500 rounded-full mt-1.5 shrink-0" />
                            <span>{sint}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Fatores de Risco */}
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 dark:text-slate-400">
                        Fatores de Risco
                      </p>
                      <ul className="space-y-1.5">
                        {(dis.fatores_risco || []).map((fr, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-slate-800 text-xs sm:text-sm dark:text-slate-200">
                            <span className="h-1.5 w-1.5 bg-amber-500 rounded-full mt-1.5 shrink-0" />
                            <span>{fr}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Critérios Diagnósticos */}
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 dark:text-slate-400">
                        Critérios Diagnósticos
                      </p>
                      <ul className="space-y-1.5">
                        {(dis.criterios_diagnosticos || []).map((crit, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-slate-800 text-xs sm:text-sm dark:text-slate-200">
                            <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                            <span>{crit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Principais Achados nos Exames Complementares */}
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 dark:text-slate-400">
                        Principais Achados nos Exames Complementares
                      </p>
                      <ul className="space-y-1.5">
                        {(dis.achados_exames || []).map((exm, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-slate-800 text-xs sm:text-sm dark:text-slate-200">
                            <span className="h-1.5 w-1.5 bg-purple-500 rounded-full mt-1.5 shrink-0" />
                            <span>{exm}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Diagnósticos Diferenciais */}
                    <div className="md:col-span-2">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 dark:text-slate-400">
                        Diagnósticos Diferenciais
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {(dis.diferenciais || []).map((diff, idx) => (
                          <span 
                            key={idx}
                            className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300"
                          >
                            {diff}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* SEÇÃO 4: TRATAMENTO E CONDUTAS */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2.5 dark:text-slate-100 dark:border-slate-700">
                    <Activity className="h-4 w-4 text-emerald-600" />
                    Tratamento e Condutas
                  </h3>
                  
                  <div className="bg-slate-50/80 rounded-lg p-4 border border-slate-200/80 dark:bg-slate-900/60 dark:border-slate-700">
                    <p className="text-slate-800 whitespace-pre-line leading-relaxed text-xs sm:text-sm dark:text-slate-200 font-sans">
                      {getDiseaseTreatment(dis)}
                    </p>
                  </div>
                </div>

                {/* SEÇÃO 5: COMPLICAÇÕES E PROGNÓSTICO */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2.5 dark:text-slate-100 dark:border-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-medical-600" />
                    Complicações e Prognóstico
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Complicações */}
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1 dark:text-slate-400">
                        Complicações Clínicas
                      </p>
                      <p className="text-slate-800 font-normal leading-relaxed dark:text-slate-200 text-xs sm:text-sm">
                        {getDiseaseComplications(dis)}
                      </p>
                    </div>

                    {/* Prognóstico */}
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1 dark:text-slate-400">
                        Prognóstico e Seguimento
                      </p>
                      <p className="text-slate-800 font-normal leading-relaxed dark:text-slate-200 text-xs sm:text-sm">
                        {getDiseasePrognosis(dis)}
                      </p>
                    </div>

                    {/* Referências / Diretrizes se houver */}
                    {dis.references && dis.references.length > 0 && (
                      <div className="md:col-span-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1 dark:text-slate-500">
                          Diretrizes e Referências
                        </p>
                        <ul className="space-y-1">
                          {dis.references.map((ref, idx) => (
                            <li key={idx} className="text-xs text-slate-500 italic dark:text-slate-400">
                              • {ref}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* DISCLAIMER CLÍNICO */}
        <ClinicalDisclaimer />

        {/* HEADER PRINCIPAL */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-medical-50 text-medical-600 rounded-xl dark:bg-medical-950/40 dark:text-medical-400">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                  Base de Doenças
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Biblioteca médica de patologias com sinais de alerta, propedêutica, diagnóstico e condutas
                </p>
              </div>
            </div>
          </div>

          {/* BOTÃO ADMIN: + NOVA DOENÇA */}
          {isAdmin && (
            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-medical-600 hover:bg-medical-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm dark:bg-medical-600 dark:hover:bg-medical-500 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Nova Doença</span>
            </button>
          )}
        </div>

        {/* BARRA DE PESQUISA E FILTROS */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 dark:bg-slate-800 dark:border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Input de Busca com Sugestões */}
            <div className="md:col-span-6 relative" ref={searchContainerRef}>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
                <input
                  type="text"
                  placeholder="Buscar por nome, CID-10, sintoma ou achado..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 transition-all dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Dropdown de Sugestões Preditivas */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-30 left-0 right-0 mt-1 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden dark:bg-slate-800 dark:border-slate-700">
                  <div className="p-1.5">
                    {suggestions.map((sug) => (
                      <button
                        key={sug.id}
                        type="button"
                        onClick={() => {
                          setSearchTerm(sug.nome);
                          setShowSuggestions(false);
                          setExpandedId(sug.id);
                          setTimeout(() => {
                            const el = document.getElementById(`disease-card-${sug.id}`);
                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }, 200);
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between text-xs transition-colors"
                      >
                        <span className="font-medium text-slate-900 dark:text-white">{sug.nome}</span>
                        <span className="text-slate-400 text-[11px]">CID: {sug.id}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Filtro por Especialidade / Categoria */}
            <div className="md:col-span-4">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 transition-all dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200"
              >
                {MEDICAL_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'Todas' ? 'Todas as Especialidades' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Toggle Sinais de Alerta */}
            <div className="md:col-span-2 flex items-center">
              <button
                type="button"
                onClick={() => setRedFlagsOnlyFilter(!redFlagsOnlyFilter)}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                  redFlagsOnlyFilter
                    ? 'bg-red-50 text-red-700 border-red-300 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700'
                }`}
              >
                <AlertTriangle className={`h-3.5 w-3.5 ${redFlagsOnlyFilter ? 'text-red-600 dark:text-red-400' : 'text-slate-400'}`} />
                <span>Red Flags</span>
              </button>
            </div>

          </div>

          {/* Bar de Status dos Filtros e Contador */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {filteredDiseases.length}
              </span>
              <span>{filteredDiseases.length === 1 ? 'patologia cadastrada' : 'patologias cadastradas'}</span>
              {(searchTerm || categoryFilter !== 'Todas' || redFlagsOnlyFilter) && (
                <span className="bg-medical-50 text-medical-700 px-2 py-0.5 rounded text-[11px] font-medium dark:bg-medical-950/40 dark:text-medical-400">
                  Filtros ativos
                </span>
              )}
            </div>

            {(searchTerm || categoryFilter !== 'Todas' || redFlagsOnlyFilter) && (
              <button
                onClick={handleClearFilters}
                className="text-xs text-medical-600 hover:text-medical-700 font-medium flex items-center gap-1 dark:text-medical-400"
              >
                <X className="h-3.5 w-3.5" />
                Limpar filtros
              </button>
            )}
          </div>
        </div>

        {/* SEÇÃO DE FAVORITOS (ACCORDION) */}
        {favoriteDiseases.length > 0 && !searchTerm && categoryFilter === 'Todas' && !redFlagsOnlyFilter && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden dark:bg-slate-800 dark:border-slate-700">
            <button
              onClick={() => setIsFavSectionOpen(!isFavSectionOpen)}
              className="w-full p-4 px-6 flex items-center justify-between bg-slate-50/70 hover:bg-slate-50 transition-colors dark:bg-slate-800/80 dark:hover:bg-slate-700/60"
            >
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                <span className="font-bold text-slate-800 text-sm dark:text-slate-200">
                  Doenças Favoritas ({favoriteDiseases.length})
                </span>
              </div>
              <div>
                {isFavSectionOpen ? (
                  <ChevronUp className="h-4 w-4 text-slate-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                )}
              </div>
            </button>

            {isFavSectionOpen && (
              <div className="p-5 space-y-4 border-t border-slate-100 dark:border-slate-700">
                {favoriteDiseases.map(renderDiseaseCard)}
              </div>
            )}
          </div>
        )}

        {/* LISTAGEM DE DOENÇAS */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm dark:bg-slate-800 dark:border-slate-700">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-medical-500 border-t-transparent mb-3" />
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Carregando base de doenças clínicas...
            </p>
          </div>
        ) : filteredDiseases.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm dark:bg-slate-800 dark:border-slate-700">
            <AlertCircle className="h-10 w-10 text-slate-300 mx-auto mb-3 dark:text-slate-600" />
            <h3 className="font-semibold text-slate-800 text-base dark:text-slate-200">
              Nenhuma doença encontrada
            </h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto dark:text-slate-400">
              Não encontramos nenhuma patologia com os filtros atuais. Tente buscar por sinônimos, sintomas ou limpe os filtros.
            </p>
            <button
              onClick={handleClearFilters}
              className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors dark:bg-slate-700 dark:text-slate-300"
            >
              Limpar todos os filtros
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDiseases.map(renderDiseaseCard)}
          </div>
        )}

      </div>

      {/* MODAL ADICIONAR / EDITAR DOENÇA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] shadow-2xl border border-slate-100 flex flex-col overflow-hidden dark:bg-slate-800 dark:border-slate-700">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white dark:bg-slate-800 dark:border-slate-700">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-medical-50 text-medical-600 rounded-xl dark:bg-medical-950/40 dark:text-medical-400">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                    {editingDisease ? 'Editar Patologia' : 'Cadastrar Nova Patologia'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Preencha as informações clínicas estruturadas da doença
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors dark:hover:bg-slate-700 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50 px-4 overflow-x-auto gap-1 text-xs font-semibold text-slate-600 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400">
              <button
                type="button"
                onClick={() => setActiveModalTab('info')}
                className={`py-3 px-3.5 border-b-2 whitespace-nowrap transition-colors ${
                  activeModalTab === 'info'
                    ? 'border-medical-600 text-medical-600 dark:text-medical-400 dark:border-medical-400'
                    : 'border-transparent hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                1. Identificação
              </button>
              <button
                type="button"
                onClick={() => setActiveModalTab('red_flags')}
                className={`py-3 px-3.5 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1 ${
                  activeModalTab === 'red_flags'
                    ? 'border-red-600 text-red-600 dark:text-red-400 dark:border-red-400'
                    : 'border-transparent hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <AlertTriangle className="h-3 w-3 text-red-500" />
                2. Red Flags
              </button>
              <button
                type="button"
                onClick={() => setActiveModalTab('basics')}
                className={`py-3 px-3.5 border-b-2 whitespace-nowrap transition-colors ${
                  activeModalTab === 'basics'
                    ? 'border-medical-600 text-medical-600 dark:text-medical-400 dark:border-medical-400'
                    : 'border-transparent hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                3. Informações Básicas
              </button>
              <button
                type="button"
                onClick={() => setActiveModalTab('diagnosis')}
                className={`py-3 px-3.5 border-b-2 whitespace-nowrap transition-colors ${
                  activeModalTab === 'diagnosis'
                    ? 'border-medical-600 text-medical-600 dark:text-medical-400 dark:border-medical-400'
                    : 'border-transparent hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                4. Diagnóstico & Exames
              </button>
              <button
                type="button"
                onClick={() => setActiveModalTab('treatment')}
                className={`py-3 px-3.5 border-b-2 whitespace-nowrap transition-colors ${
                  activeModalTab === 'treatment'
                    ? 'border-medical-600 text-medical-600 dark:text-medical-400 dark:border-medical-400'
                    : 'border-transparent hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                5. Tratamento
              </button>
              <button
                type="button"
                onClick={() => setActiveModalTab('complications')}
                className={`py-3 px-3.5 border-b-2 whitespace-nowrap transition-colors ${
                  activeModalTab === 'complications'
                    ? 'border-medical-600 text-medical-600 dark:text-medical-400 dark:border-medical-400'
                    : 'border-transparent hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                6. Complicações & Prognóstico
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSaveForm} className="flex-1 overflow-y-auto p-6 space-y-5">
              
              {/* TAB 1: IDENTIFICAÇÃO */}
              {activeModalTab === 'info' && (
                <div className="space-y-4">
                  {/* Banner/Card de IA para Admin */}
                  {isAdmin && (
                    <div className="p-4 bg-indigo-50/80 border border-indigo-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 dark:bg-indigo-950/30 dark:border-indigo-900/50">
                      <div className="flex items-start gap-2.5">
                        <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg shrink-0 mt-0.5 dark:bg-indigo-900/60 dark:text-indigo-300">
                          <Sparkles className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-indigo-900 dark:text-indigo-200">
                            {editingDisease ? 'Atualização Inteligente com IA' : 'Autopreenchimento de Doença com IA'}
                          </p>
                          <p className="text-xs text-indigo-700/80 dark:text-indigo-300/80 mt-0.5 leading-relaxed">
                            Digite o nome da patologia abaixo e clique em autopreencher para buscar dados clínicos estruturados, CID-10, sinais de alerta, exames e condutas terapêuticas.
                          </p>
                        </div>
                      </div>
                      <div className="sm:shrink-0 self-end sm:self-center">
                        <AIAutofillWidget
                          type="disease"
                          itemName={formNome}
                          currentData={{
                            id: formId,
                            nome: formNome,
                            categoria: formCategoria,
                            red_flags: formRedFlagsInput.split('\n').map(s => s.trim()).filter(Boolean),
                            definition: formDefinition,
                            epidemiology: formEpidemiology,
                            etiology: formEtiology,
                            pathophysiology: formPathophysiology,
                            sintomas: formSintomasInput.split('\n').map(s => s.trim()).filter(Boolean),
                            fatores_risco: formFatoresRiscoInput.split('\n').map(s => s.trim()).filter(Boolean),
                            criterios_diagnosticos: formCriteriosInput.split('\n').map(s => s.trim()).filter(Boolean),
                            achados_exames: formAchadosExamesInput.split('\n').map(s => s.trim()).filter(Boolean),
                            diferenciais: formDiferenciaisInput.split('\n').map(s => s.trim()).filter(Boolean),
                            treatment: formTreatment,
                            complications: formComplications,
                            prognosis: formPrognosis,
                            references: formReferencesInput.split('\n').map(s => s.trim()).filter(Boolean)
                          }}
                          onApply={(approvedData) => {
                            if (approvedData.nome) setFormNome(approvedData.nome);
                            if (approvedData.id && (!formId || !editingDisease)) setFormId(approvedData.id);
                            if (approvedData.categoria) setFormCategoria(approvedData.categoria);
                            if (approvedData.red_flags) {
                              setFormRedFlagsInput(Array.isArray(approvedData.red_flags) ? approvedData.red_flags.join('\n') : String(approvedData.red_flags));
                            }
                            if (approvedData.definition) setFormDefinition(approvedData.definition);
                            if (approvedData.epidemiology) setFormEpidemiology(approvedData.epidemiology);
                            if (approvedData.etiology) setFormEtiology(approvedData.etiology);
                            if (approvedData.pathophysiology) setFormPathophysiology(approvedData.pathophysiology);
                            if (approvedData.sintomas) {
                              setFormSintomasInput(Array.isArray(approvedData.sintomas) ? approvedData.sintomas.join('\n') : String(approvedData.sintomas));
                            }
                            if (approvedData.fatores_risco) {
                              setFormFatoresRiscoInput(Array.isArray(approvedData.fatores_risco) ? approvedData.fatores_risco.join('\n') : String(approvedData.fatores_risco));
                            }
                            if (approvedData.criterios_diagnosticos) {
                              setFormCriteriosInput(Array.isArray(approvedData.criterios_diagnosticos) ? approvedData.criterios_diagnosticos.join('\n') : String(approvedData.criterios_diagnosticos));
                            }
                            if (approvedData.achados_exames) {
                              setFormAchadosExamesInput(Array.isArray(approvedData.achados_exames) ? approvedData.achados_exames.join('\n') : String(approvedData.achados_exames));
                            }
                            if (approvedData.diferenciais) {
                              setFormDiferenciaisInput(Array.isArray(approvedData.diferenciais) ? approvedData.diferenciais.join('\n') : String(approvedData.diferenciais));
                            }
                            if (approvedData.treatment) setFormTreatment(approvedData.treatment);
                            if (approvedData.complications) setFormComplications(approvedData.complications);
                            if (approvedData.prognosis) setFormPrognosis(approvedData.prognosis);
                            if (approvedData.references) {
                              setFormReferencesInput(Array.isArray(approvedData.references) ? approvedData.references.join('\n') : String(approvedData.references));
                            }
                          }}
                          isEditMode={!!editingDisease}
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-semibold text-slate-700 uppercase dark:text-slate-300">
                          Nome da Patologia *
                        </label>
                      </div>
                      <input
                        type="text"
                        required
                        value={formNome}
                        onChange={(e) => setFormNome(e.target.value)}
                        placeholder="Ex: Infarto Agudo do Miocárdio com Supra de ST"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 outline-none dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1 dark:text-slate-300">
                        Código / CID-10
                      </label>
                      <input
                        type="text"
                        value={formId}
                        onChange={(e) => setFormId(e.target.value)}
                        placeholder="Ex: I21.0"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 outline-none dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1 dark:text-slate-300">
                      Especialidade / Categoria Clínica
                    </label>
                    <select
                      value={formCategoria}
                      onChange={(e) => setFormCategoria(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 outline-none dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                    >
                      {MEDICAL_CATEGORIES.filter(c => c !== 'Todas').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* TAB 2: SINAIS DE ALERTA (RED FLAGS) */}
              {activeModalTab === 'red_flags' && (
                <div className="space-y-4">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl dark:bg-red-950/30 dark:border-red-900">
                    <p className="text-xs text-red-800 font-medium dark:text-red-300">
                      Insira cada sinal de alerta em uma linha separada. Estes sinais serão exibidos em destaque no topo do card.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-red-900 uppercase mb-1 dark:text-red-300">
                      Sinais de Alerta (1 por linha)
                    </label>
                    <textarea
                      rows={6}
                      value={formRedFlagsInput}
                      onChange={(e) => setFormRedFlagsInput(e.target.value)}
                      placeholder={`Dor torácica opressiva refratária com irradiação
Instabilidade hemodinâmica ou choque
Dispneia em repouso com estertores crepitantes
Síncope associada`}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 outline-none dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: INFORMAÇÕES BÁSICAS */}
              {activeModalTab === 'basics' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1 dark:text-slate-300">
                      Definição
                    </label>
                    <textarea
                      rows={3}
                      value={formDefinition}
                      onChange={(e) => setFormDefinition(e.target.value)}
                      placeholder="Conceito e caracterização clínica da doença..."
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 outline-none dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1 dark:text-slate-300">
                      Epidemiologia
                    </label>
                    <textarea
                      rows={2}
                      value={formEpidemiology}
                      onChange={(e) => setFormEpidemiology(e.target.value)}
                      placeholder="Prevalência, incidência, faixas etárias de risco..."
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 outline-none dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1 dark:text-slate-300">
                      Etiologia
                    </label>
                    <textarea
                      rows={2}
                      value={formEtiology}
                      onChange={(e) => setFormEtiology(e.target.value)}
                      placeholder="Agentes infecciosos, causas genéticas ou fatores desencadeantes..."
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 outline-none dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1 dark:text-slate-300">
                      Fisiopatologia
                    </label>
                    <textarea
                      rows={3}
                      value={formPathophysiology}
                      onChange={(e) => setFormPathophysiology(e.target.value)}
                      placeholder="Mecanismos moleculares e fisiopatológicos de lesão celular e tecidual..."
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 outline-none dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: DIAGNÓSTICO & EXAMES */}
              {activeModalTab === 'diagnosis' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1 dark:text-slate-300">
                      Quadro Clínico & Sinais/Sintomas (1 por linha)
                    </label>
                    <textarea
                      rows={3}
                      value={formSintomasInput}
                      onChange={(e) => setFormSintomasInput(e.target.value)}
                      placeholder="Dor precordial em aperto&#10;Sudorese fria&#10;Náuseas"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 outline-none dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1 dark:text-slate-300">
                      Fatores de Risco (1 por linha)
                    </label>
                    <textarea
                      rows={2}
                      value={formFatoresRiscoInput}
                      onChange={(e) => setFormFatoresRiscoInput(e.target.value)}
                      placeholder="Tabagismo&#10;Diabetes Mellitus&#10;Hipertensão arterial"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 outline-none dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1 dark:text-slate-300">
                      Critérios Diagnósticos (1 por linha)
                    </label>
                    <textarea
                      rows={3}
                      value={formCriteriosInput}
                      onChange={(e) => setFormCriteriosInput(e.target.value)}
                      placeholder="Elevação de troponina acima do percentil 99&#10;Alteração eletrocardiográfica isquêmica aguda"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 outline-none dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1 dark:text-slate-300">
                      Principais Achados nos Exames Complementares (1 por linha)
                    </label>
                    <textarea
                      rows={3}
                      value={formAchadosExamesInput}
                      onChange={(e) => setFormAchadosExamesInput(e.target.value)}
                      placeholder="ECG: Supradesnivelamento do segmento ST em derivações contíguas&#10;Laboratório: Troponina I/T ultrassensível elevada"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 outline-none dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1 dark:text-slate-300">
                      Diagnósticos Diferenciais (1 por linha)
                    </label>
                    <textarea
                      rows={2}
                      value={formDiferenciaisInput}
                      onChange={(e) => setFormDiferenciaisInput(e.target.value)}
                      placeholder="Dissecção aguda de aorta&#10;Tromboembolismo pulmonar&#10;Pericardite aguda"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 outline-none dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                    />
                  </div>
                </div>
              )}

              {/* TAB 5: TRATAMENTO */}
              {activeModalTab === 'treatment' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1 dark:text-slate-300">
                      Tratamento e Condutas
                    </label>
                    <textarea
                      rows={10}
                      value={formTreatment}
                      onChange={(e) => setFormTreatment(e.target.value)}
                      placeholder={`1. Medidas Imediatas de Emergência:
- Acesso venoso, oxigênio se SatO2 < 90%, monitorização contínua.

2. Terapia Medicamentosa:
- AAS 200-300mg ataque mastigado + Ticagrelor 180mg ou Clopidogrel 300-600mg.
- Anticoagulação com Enoxaparina 1mg/kg SC 12/12h.

3. Reperfusão Miocárdica:
- Angioplastia primária em até 90 minutos ou fibrinólise.`}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 outline-none font-sans leading-relaxed dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                    />
                  </div>
                </div>
              )}

              {/* TAB 6: COMPLICAÇÕES & PROGNÓSTICO */}
              {activeModalTab === 'complications' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1 dark:text-slate-300">
                      Complicações Clínicas
                    </label>
                    <textarea
                      rows={3}
                      value={formComplications}
                      onChange={(e) => setFormComplications(e.target.value)}
                      placeholder="Choque cardiogênico, arritmias ventriculares malignas, insuficiência cardíaca..."
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 outline-none dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1 dark:text-slate-300">
                      Prognóstico e Seguimento
                    </label>
                    <textarea
                      rows={3}
                      value={formPrognosis}
                      onChange={(e) => setFormPrognosis(e.target.value)}
                      placeholder="Depende da precocidade da reperfusão e fração de ejeção residual..."
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 outline-none dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1 dark:text-slate-300">
                      Diretrizes e Referências (1 por linha)
                    </label>
                    <textarea
                      rows={2}
                      value={formReferencesInput}
                      onChange={(e) => setFormReferencesInput(e.target.value)}
                      placeholder="Diretrizes da Sociedade Brasileira de Cardiologia (SBC)&#10;American Heart Association (AHA/ACC)"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-medical-500/20 focus:border-medical-500 outline-none dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                    />
                  </div>

                  {/* Intervalo de Revisão */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-700">
                    <ReviewIntervalSelector
                      value={customReviewIntervalMonths}
                      onChange={setCustomReviewIntervalMonths}
                      defaultMonths={12}
                    />
                  </div>
                </div>
              )}

              {/* Modal Footer Controls */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between rounded-xl dark:bg-slate-900 dark:border-slate-700 mt-6">
                <div className="text-xs text-slate-400">
                  {editingDisease ? `Editando: ${editingDisease.id}` : 'Nova patologia'}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold border border-slate-200 transition-colors dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-medical-600 hover:bg-medical-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm cursor-pointer"
                  >
                    {editingDisease ? 'Salvar Alterações' : 'Cadastrar Patologia'}
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAIS GLOBAIS DE ALERTA E CONFIRMAÇÃO */}
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

export default KnowledgeBase;
