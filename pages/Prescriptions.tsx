import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Copy, Plus, X, Check, Edit2, Zap, Stethoscope, FileText, Lock } from 'lucide-react';
import { INITIAL_PRESCRIPTIONS } from '../data/initialData';
import { PrescriptionModel } from '../types';
import { useAuth } from '../App';
import { AIAutofillWidget } from '../components/AIAutofillWidget';
import ClinicalDisclaimer from './ClinicalDisclaimer';
import { AlertModal, ConfirmModal } from '../components/ui/Modal';
import { useConfirmModal, useAlertModal } from '../hooks/useModal';
import { getPrescriptions, savePrescriptions as savePrescriptionsStore } from '../services/prescriptionsService';
import { ReviewIntervalSelector } from '../components/ReviewIntervalSelector';

const Prescriptions: React.FC = () => {
  const { hasRole, user } = useAuth();
  const location = useLocation();
  
  // Permissions
  const canAccessPS = hasRole(['admin', 'subscriber']);
  const canEdit = hasRole(['admin']);

  // Read search parameter from location or hash
  useEffect(() => {
    const parts = window.location.hash.split('?');
    const params = new URLSearchParams(parts[1] || location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchTerm(searchParam);
      setSelectedCategory('Todos');
      if (canAccessPS) {
        setActiveTab('All');
      } else {
        setActiveTab('Amb');
      }
    }
  }, [location, canAccessPS]);

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

  // Primary state
  const [prescriptions, setPrescriptions] = useState<PrescriptionModel[]>(() => getPrescriptions());

  // --- LOAD DATA ---
  useEffect(() => {
    setPrescriptions(getPrescriptions());
  }, []);

  useEffect(() => {
    const handleUpdate = () => {
      setPrescriptions(getPrescriptions());
    };
    window.addEventListener('medassist:prescriptions-updated', handleUpdate);
    return () => window.removeEventListener('medassist:prescriptions-updated', handleUpdate);
  }, []);

  useEffect(() => {
    const params1 = new URLSearchParams(window.location.search);
    const hashParts = window.location.hash.split('?');
    const params2 = new URLSearchParams(hashParts[1] || '');
    const editId = params1.get('edit') || params2.get('edit');
    if (editId && prescriptions.length > 0) {
      const found = prescriptions.find(p => p.id === editId);
      if (found) {
        handleOpenModal(found);
      }
    }
  }, [prescriptions]);

  const [searchTerm, setSearchTerm] = useState('');
  // Default tab based on permission. Basic users can only see Ambulatory.
  const [activeTab, setActiveTab] = useState<'All' | 'PS' | 'Amb'>(canAccessPS ? 'All' : 'Amb');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<PrescriptionModel>>({
    title: '', category: '', content: '', notes: ''
  });

  // --- PERSIST DATA ---
  const savePrescriptions = (updated: PrescriptionModel[]) => {
    setPrescriptions(updated);
    savePrescriptionsStore(updated);
  };

  // Force tab to Amb if user permissions change and they are on restricted tab
  useEffect(() => {
    if (!canAccessPS && (activeTab === 'PS' || activeTab === 'All')) {
        setActiveTab('Amb');
    }
  }, [canAccessPS, activeTab]);

  const categories = useMemo(() => {
    const cats = new Set(prescriptions.map(p => p.category));
    return ['Todos', ...Array.from(cats)];
  }, [prescriptions]);

  const filteredPrescriptions = useMemo(() => {
    return prescriptions.filter(p => {
      // 1. Search Filter
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      // 2. Dropdown Category Filter
      const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;

      // 3. Tab Filter
      let matchesTab = true;
      if (activeTab === 'PS') {
        matchesTab = p.category === 'Pronto Socorro' || p.category === 'Pronto Atendimento';
      } else if (activeTab === 'Amb') {
        // Show everything NOT PS
        matchesTab = p.category !== 'Pronto Socorro' && p.category !== 'Pronto Atendimento';
      }
      
      // 4. Role enforcement (redundancy check)
      // Even if "All" is selected, basic users should only see Ambulatory logic implicitly
      if (!canAccessPS) {
         if (p.category === 'Pronto Socorro' || p.category === 'Pronto Atendimento') {
             return false;
         }
      }

      return matchesSearch && matchesCategory && matchesTab;
    }).sort((a, b) => a.title.localeCompare(b.title, 'pt-BR', { sensitivity: 'base' }));
  }, [prescriptions, searchTerm, selectedCategory, activeTab, canAccessPS]);

  const copyToClipboard = (text: string, id: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => {
          setCopiedId(id);
          setTimeout(() => setCopiedId(null), 2000);
        })
        .catch(() => {});
    }
  };

  const handleOpenModal = (prescription?: PrescriptionModel) => {
    if (!canEdit) return; // double check
    if (prescription) {
      setEditingId(prescription.id);
      setFormData(prescription);
    } else {
      setEditingId(null);
      setFormData({ 
        title: '', 
        category: activeTab === 'PS' ? 'Pronto Socorro' : 'Ambulatório', 
        content: '', 
        notes: '',
        customReviewIntervalMonths: undefined
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    let updatedList: PrescriptionModel[] = [];

    if (editingId) {
      updatedList = prescriptions.map(p => p.id === editingId ? { ...p, ...formData } as PrescriptionModel : p);
    } else {
      const newPrescription: PrescriptionModel = {
        id: Date.now().toString(),
        title: formData.title || '',
        category: formData.category || 'Geral',
        content: formData.content || '',
        notes: formData.notes || '',
        customReviewIntervalMonths: formData.customReviewIntervalMonths
      };
      updatedList = [...prescriptions, newPrescription];
    }
    
    savePrescriptions(updatedList);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    const confirmed = await requestConfirm({
      title: 'Excluir Modelo',
      message: 'Tem certeza que deseja excluir este modelo?',
      variant: 'danger'
    });
    if (confirmed) {
        const updatedList = prescriptions.filter(p => p.id !== id);
        savePrescriptions(updatedList);
        setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-6 px-4 sm:px-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-medical-600 dark:text-medical-400">Modelos de Prescrição</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {canAccessPS ? 'Acesso completo a ambulatório e emergência.' : 'Acesso a prescrições ambulatoriais.'}
          </p>
        </div>
        
        {canEdit && (
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-medical-600 hover:bg-medical-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-medical-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Novo Modelo
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-700">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {canAccessPS && (
            <button
                onClick={() => setActiveTab('All')}
                className={`${
                activeTab === 'All'
                    ? 'border-medical-500 text-medical-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-600'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
            >
                <FileText className="h-4 w-4" />
                Todos
            </button>
          )}
          
          <button
            onClick={() => setActiveTab('Amb')}
            className={`${
              activeTab === 'Amb'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
          >
            <Stethoscope className="h-4 w-4" />
            Ambulatório
          </button>

          {canAccessPS ? (
            <button
                onClick={() => setActiveTab('PS')}
                className={`${
                activeTab === 'PS'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-600'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
            >
                <Zap className="h-4 w-4" />
                Pronto Socorro
            </button>
          ) : (
            <div className="group relative flex items-center py-4 px-1 text-slate-300 cursor-not-allowed border-b-2 border-transparent dark:text-slate-600">
                <Zap className="h-4 w-4 mr-2" />
                <span>Pronto Socorro</span>
                <Lock className="h-3 w-3 ml-1 text-slate-300 dark:text-slate-600" />
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Apenas Assinantes
                </span>
            </div>
          )}
        </nav>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-300
                       rounded-md leading-5 bg-white text-slate-900
                       placeholder-slate-400 focus:outline-none
                       focus:ring-1 focus:ring-medical-600
                       focus:border-medical-600 sm:text-sm
                       dark:bg-slate-700 dark:border-slate-600
                       dark:text-slate-200 dark:placeholder-slate-400 dark:focus:ring-medical-500 dark:focus:border-medical-500"
            placeholder="Buscar por medicação ou doença..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="block w-full sm:w-48 pl-3 pr-10 py-2 text-base border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-medical-600 focus:border-medical-600 sm:text-sm rounded-md
                     dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 dark:focus:ring-medical-500 dark:focus:border-medical-500"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredPrescriptions.map((p) => (
          <div
            key={p.id}
            className={
              p.category === 'Pronto Socorro' || p.category === 'Pronto Atendimento'
                ? "bg-white rounded-2xl border border-red-100 hover:border-red-200 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex flex-col transition-all duration-200 overflow-hidden dark:bg-slate-800 dark:border-red-900/40"
                : "bg-white rounded-2xl border border-slate-100 hover:border-medical-200 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex flex-col transition-all duration-200 overflow-hidden dark:bg-slate-800 dark:border-slate-700"
            }
          >
            <div className={`h-1 bg-gradient-to-r ${(p.category === 'Pronto Socorro' || p.category === 'Pronto Atendimento') ? 'from-red-500 to-rose-400' : 'from-medical-600 to-accent-500'}`} />
            <div className="p-5 flex-grow">
              <div className="flex justify-between items-start mb-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    p.category === 'Pronto Socorro' || p.category === 'Pronto Atendimento'
                    ? 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}>
                  {p.category}
                </span>
                {canEdit && (
                  <button onClick={() => handleOpenModal(p)} className="text-slate-400 hover:text-medical-600 p-1 dark:text-slate-500 dark:hover:text-medical-400">
                    <Edit2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              <h3 className={`font-display text-lg font-semibold mb-3 transition-colors ${(p.category === 'Pronto Socorro' || p.category === 'Pronto Atendimento') ? 'text-red-500 dark:text-red-400' : 'text-medical-600 dark:text-medical-400'}`}>{p.title}</h3>
              <div className="bg-slate-50 p-3 rounded-lg font-mono text-sm text-slate-700 whitespace-pre-wrap mb-4 border border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700">
                {p.content}
              </div>
              {p.notes && (
                <div className="text-xs text-slate-500 italic border-t border-slate-100 pt-2 mt-2 dark:text-slate-400 dark:border-slate-700">
                  <span className="font-semibold">Nota:</span> {p.notes}
                </div>
              )}
            </div>
            <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 rounded-b-2xl dark:bg-slate-900 dark:border-slate-700">
              <button
                onClick={() => copyToClipboard(p.content, p.id)}
                className={`w-full flex justify-center items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md transition-colors ${
                    copiedId === p.id 
                    ? "border-green-600 text-green-700 bg-green-50 dark:border-green-600 dark:text-green-300 dark:bg-green-900/20" 
                    : "border-slate-200 text-slate-700 bg-white hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600"
                }`}
              >
                {copiedId === p.id ? (
                    <>
                        <Check className="mr-2 h-4 w-4" />
                        Copiado!
                    </>
                ) : (
                    <>
                        <Copy className="mr-2 h-4 w-4 text-slate-500" />
                        Copiar Texto
                    </>
                )}
              </button>
            </div>
          </div>
        ))}
        {filteredPrescriptions.length === 0 && (
          <div className="col-span-full text-center py-12 text-slate-500">
            Nenhum modelo encontrado nesta categoria.
          </div>
        )}
      </div>

      {/* Modal for Add/Edit - Only for Admins */}
      {isModalOpen && canEdit && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity" onClick={() => setIsModalOpen(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-2xl border border-slate-200 text-left overflow-hidden shadow-lg transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg leading-6 font-medium text-slate-900" id="modal-title">
                    {editingId ? 'Editar Modelo' : 'Novo Modelo de Prescrição'}
                  </h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-500">
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <form onSubmit={handleSave} className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-slate-700">Título</label>
                      <AIAutofillWidget
                        type="prescription"
                        itemName={formData.title || ''}
                        currentData={formData}
                        onApply={(approvedData) => {
                          setFormData(approvedData);
                        }}
                        isEditMode={editingId !== null}
                      />
                    </div>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      className="mt-1 block w-full border border-slate-300 rounded-md bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-medical-600 focus:border-medical-600 sm:text-sm shadow-sm"
                      placeholder="Ex: Amigdalite Bacteriana"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Categoria</label>
                    <input
                      type="text"
                      list="category-options"
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className="mt-1 block w-full border border-slate-300 rounded-md bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-medical-600 focus:border-medical-600 sm:text-sm shadow-sm"
                      placeholder="Ex: Cardiologia"
                    />
                    <datalist id="category-options">
                      {categories.filter(c => c !== 'Todos').map(c => <option key={c} value={c} />)}
                      <option value="Pronto Socorro" />
                    </datalist>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Conteúdo da Prescrição</label>
                    <textarea
                      required
                      rows={6}
                      value={formData.content}
                      onChange={e => setFormData({...formData, content: e.target.value})}
                      className="mt-1 block w-full border border-slate-300 rounded-md bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-medical-600 focus:border-medical-600 sm:text-sm shadow-sm font-mono"
                      placeholder="1. Nome do remédio..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Observações (Opcional)</label>
                    <input
                      type="text"
                      value={formData.notes}
                      onChange={e => setFormData({...formData, notes: e.target.value})}
                      className="mt-1 block w-full border border-slate-300 rounded-md bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-medical-600 focus:border-medical-600 sm:text-sm shadow-sm"
                      placeholder="Contraindicações, alertas..."
                    />
                  </div>
                  
                  {/* REVIEW PERIODICITY */}
                  <ReviewIntervalSelector
                    value={formData.customReviewIntervalMonths}
                    onChange={(val) => setFormData(prev => ({ ...prev, customReviewIntervalMonths: val }))}
                    categoryName="Prescrições"
                    defaultMonths={12}
                  />

                  <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-2">
                    {new URLSearchParams(window.location.search || window.location.hash.split('?')[1]).has('edit') && (
                      <button
                        type="button"
                        onClick={() => window.location.hash = '/admin'}
                        className="inline-flex justify-center w-full rounded-md border border-slate-250 bg-indigo-50 text-indigo-700 hover:bg-slate-50 px-4 py-2 font-medium focus:outline-none text-sm transition cursor-pointer"
                      >
                        Voltar para Validação
                      </button>
                    )}
                    {editingId && (
                        <button
                        type="button"
                        onClick={() => handleDelete(editingId)}
                        className="inline-flex justify-center w-full rounded-md border border-red-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                      >
                        Excluir
                      </button>
                    )}
                    <button
                      type="submit"
                      className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-medical-600 text-base font-medium text-white hover:bg-medical-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-medical-500 sm:text-sm"
                    >
                      Salvar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <ClinicalDisclaimer type="prescriptions" />

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

export default Prescriptions;