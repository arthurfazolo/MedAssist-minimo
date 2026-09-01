import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronRight, RotateCcw, AlertCircle, Plus, X, Trash2, Edit3, Heart, Sparkles, RefreshCw, Calculator, HelpCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { getCalculators, saveCustomCalculator, deleteCalculator, resetCalculatorToDefault } from '../services/calculatorService';
import { CalculatorDefinition, CalculatorResult, CalculatorInput } from '../types';
import { useAuth } from '../App';
import { AIAutofillWidget } from '../components/AIAutofillWidget';
import { preferencesService } from '../services/preferencesService';
import ClinicalDisclaimer from './ClinicalDisclaimer';
import { useFavorites } from '../hooks/useFavorites';
import { AlertModal, ConfirmModal } from '../components/ui/Modal';
import { useConfirmModal, useAlertModal } from '../hooks/useModal';
import { ReviewIntervalSelector } from '../components/ReviewIntervalSelector';

const CATEGORIES_LIST = [
  'Todos',
  'Cardiologia',
  'Pneumologia / Emergência Respiratória',
  'Neurologia',
  'Nefrologia / Eletrólitos',
  'Infectologia / Sepse',
  'Pediatria',
  'Obstetrícia',
  'Clínica Geral / UTI',
  'Ortopedia / Reumatologia',
  'Laboratorial / Gasometria'
];

const Calculators: React.FC = () => {
  const { user, hasRole } = useAuth();
  const location = useLocation();
  const [calculators, setCalculators] = useState<CalculatorDefinition[]>([]);
  const [selectedCalcId, setSelectedCalcId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValues, setInputValues] = useState<Record<string, any>>({});
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [customReviewIntervalMonths, setCustomReviewIntervalMonths] = useState<number | undefined>(undefined);

  const { isFavorite, toggleFavorite } = useFavorites('calculators');

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

  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  // Parse ID from search parameters (e.g. ?id=some-id)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    if (id && calculators.length > 0) {
      handleSelectCalc(id);
    }
  }, [location, calculators]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCalcId, setEditingCalcId] = useState<string | null>(null);

  const handleOpenCreateModal = () => {
    setEditingCalcId(null);
    setNewCalcData({
      name: '',
      description: '',
      category: 'Clínica Geral / UTI',
      formula: ''
    });
    setNewCalcInputs([]);
    setNewInputLine({ id: '', label: '', type: 'number', unit: '', step: 1 });
    setCustomReviewIntervalMonths(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (calc: CalculatorDefinition) => {
    setEditingCalcId(calc.id);
    setNewCalcData({
      name: calc.name,
      description: calc.description || '',
      category: calc.category || 'Clínica Geral / UTI',
      formula: (calc as any).formula || ''
    });
    setNewCalcInputs(calc.inputs ? JSON.parse(JSON.stringify(calc.inputs)) : []);
    setNewInputLine({ id: '', label: '', type: 'number', unit: '', step: 1 });
    setCustomReviewIntervalMonths(calc.customReviewIntervalMonths);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const params1 = new URLSearchParams(window.location.search);
    const hashParts = window.location.hash.split('?');
    const params2 = new URLSearchParams(hashParts[1] || '');
    const editId = params1.get('edit') || params2.get('edit');
    if (editId && calculators.length > 0) {
      const found = calculators.find(c => c.id === editId);
      if (found) {
        handleOpenEditModal(found);
      }
    }
  }, [calculators]);

  const [newCalcData, setNewCalcData] = useState({
    name: '',
    description: '',
    category: 'Clínica Geral / UTI',
    formula: ''
  });
  const [newCalcInputs, setNewCalcInputs] = useState<CalculatorInput[]>([]);
  const [newInputLine, setNewInputLine] = useState<CalculatorInput>({
    id: '',
    label: '',
    type: 'number',
    unit: '',
    step: 1
  });
  const [newOptionLabel, setNewOptionLabel] = useState('');
  const [newOptionValue, setNewOptionValue] = useState('');

  useEffect(() => {
    setCalculators(getCalculators());
  }, []);

  useEffect(() => {
    const handleUpdate = () => setCalculators(getCalculators());
    window.addEventListener('medassist:calculators-updated', handleUpdate);
    return () => window.removeEventListener('medassist:calculators-updated', handleUpdate);
  }, []);

  const selectedCalc = useMemo(() => 
    calculators.find(c => c.id === selectedCalcId), 
    [selectedCalcId, calculators]
  );

  const filteredCalculators = useMemo(() => 
    calculators.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            c.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            c.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'Todos' || c.category === activeCategory;
      return matchesSearch && matchesCategory;
    }),
    [searchTerm, activeCategory, calculators]
  );

  const handleInputChange = (id: string, value: any) => {
    setInputValues(prev => {
      const updated = {
        ...prev,
        [id]: value
      };
      if (selectedCalc) {
        const res = selectedCalc.calculate(updated);
        setResult(res);
      }
      return updated;
    });
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCalc) {
      const res = selectedCalc.calculate(inputValues);
      setResult(res);
    }
  };

  const resetForm = () => {
    if (selectedCalc) {
      const defaults: Record<string, any> = {};
      selectedCalc.inputs.forEach(input => {
        if (input.defaultValue !== undefined) {
          defaults[input.id] = input.defaultValue;
        } else if (input.type === 'boolean') {
          defaults[input.id] = false;
        } else if (input.type === 'select') {
          defaults[input.id] = input.options && input.options.length > 0 ? input.options[0].value : '';
        } else {
          defaults[input.id] = '';
        }
      });
      setInputValues(defaults);
      const res = selectedCalc.calculate(defaults);
      setResult(res);
    } else {
      setInputValues({});
      setResult(null);
    }
  };

  const handleSelectCalc = (id: string) => {
    const calc = calculators.find(c => c.id === id);
    setSelectedCalcId(id);
    if (calc) {
      const defaults: Record<string, any> = {};
      calc.inputs.forEach(input => {
        if (input.defaultValue !== undefined) {
          defaults[input.id] = input.defaultValue;
        } else if (input.type === 'boolean') {
          defaults[input.id] = false;
        } else if (input.type === 'select') {
          defaults[input.id] = input.options && input.options.length > 0 ? input.options[0].value : '';
        } else {
          defaults[input.id] = '';
        }
      });
      setInputValues(defaults);
      const res = calc.calculate(defaults);
      setResult(res);
    } else {
      setInputValues({});
      setResult(null);
    }
  };

  // --- Input Builder Logic ---
  const addInputToNewCalc = () => {
    if (newInputLine.id && newInputLine.label) {
      const cleanId = newInputLine.id.replace(/[^a-zA-Z0-9_]/g, '');
      const inputToAdd: CalculatorInput = {
        ...newInputLine,
        id: cleanId
      };
      setNewCalcInputs(prev => [...prev, inputToAdd]);
      setNewInputLine({ id: '', label: '', type: 'number', unit: '', step: 1 });
      setNewOptionLabel('');
      setNewOptionValue('');
    }
  };

  const removeInputFromNewCalc = (idx: number) => {
    setNewCalcInputs(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSaveCalculator = () => {
    // Security check: Only admins can save
    if (!hasRole(['admin'])) return;

    if (!newCalcData.name.trim()) {
      showAlert({
        title: "Campo Obrigatório",
        message: "Por favor, preencha o Nome da Calculadora.",
        type: "warning"
      });
      return;
    }

    if (newCalcInputs.length === 0) {
      showAlert({
        title: "Variáveis de Entrada",
        message: "Adicione pelo menos uma variável de entrada para a calculadora.",
        type: "warning"
      });
      return;
    }

    const calcDefinition = {
      id: editingCalcId || 'custom-' + Date.now(),
      name: newCalcData.name.trim(),
      description: newCalcData.description.trim(),
      category: newCalcData.category.trim() || 'Geral',
      inputs: newCalcInputs,
      formula: newCalcData.formula?.trim() || undefined,
      customReviewIntervalMonths: customReviewIntervalMonths
    };

    saveCustomCalculator(calcDefinition);
    setCalculators(getCalculators());
    setIsModalOpen(false);

    if (selectedCalcId === calcDefinition.id) {
      handleSelectCalc(calcDefinition.id);
    }

    showAlert({
      title: editingCalcId ? "Calculadora Atualizada" : "Calculadora Criada",
      message: `A calculadora "${calcDefinition.name}" foi salva com sucesso e sincronizada com a base.`,
      type: "success"
    });

    // Reset form
    setNewCalcData({ name: '', description: '', category: 'Clínica Geral / UTI', formula: '' });
    setNewCalcInputs([]);
    setCustomReviewIntervalMonths(undefined);
    setEditingCalcId(null);
  };

  const handleDeleteCalculator = async (calcId: string, calcName: string) => {
    if (!hasRole(['admin'])) return;
    const confirmed = await requestConfirm({
      title: "Excluir Calculadora",
      message: `Tem certeza que deseja excluir a calculadora "${calcName}"? Ela não aparecerá mais na listagem de calculadoras clínicas.`,
      variant: "danger"
    });
    if (confirmed) {
      await deleteCalculator(calcId);
      if (selectedCalcId === calcId) {
        setSelectedCalcId(null);
      }
      setIsModalOpen(false);
      setEditingCalcId(null);
      setCalculators(getCalculators());
      showAlert({
        title: "Calculadora Excluída",
        message: `A calculadora "${calcName}" foi removida.`,
        type: "success"
      });
    }
  };

  const handleResetCalculator = async (calcId: string, calcName: string) => {
    if (!hasRole(['admin'])) return;
    const confirmed = await requestConfirm({
      title: "Restaurar Versão Padrão",
      message: `Deseja descartar as alterações personalizadas e restaurar a calculadora "${calcName}" para o padrão original do sistema?`,
      variant: "warning"
    });
    if (confirmed) {
      await resetCalculatorToDefault(calcId);
      if (selectedCalcId === calcId) {
        handleSelectCalc(calcId);
      }
      setIsModalOpen(false);
      setEditingCalcId(null);
      setCalculators(getCalculators());
      showAlert({
        title: "Restaurado",
        message: `A calculadora "${calcName}" foi restaurada para a versão original.`,
        type: "success"
      });
    }
  };

  const renderModal = () => {
    if (!isModalOpen || !hasRole(['admin'])) return null;
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsModalOpen(false)}></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full dark:bg-slate-800 dark:border dark:border-slate-700">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-slate-800">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-medical-50 text-medical-600 rounded-lg dark:bg-medical-950/40 dark:text-medical-400">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg leading-6 font-bold text-gray-900 dark:text-slate-100">
                      {editingCalcId ? 'Editar Calculadora Clínica' : 'Criar Nova Calculadora Clínica'}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {editingCalcId ? `Edição de parâmetros e variáveis (${editingCalcId})` : 'Defina os dados, variáveis e expressões de cálculo'}
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500 dark:hover:text-slate-300">
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                  {/* AI Autofill Banner for Admin */}
                  <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-between gap-3 dark:bg-indigo-950/30 dark:border-indigo-900/50">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                      <span className="text-xs font-medium text-indigo-900 dark:text-indigo-200">
                        {editingCalcId ? 'Atualizar dados e variáveis com IA:' : 'Preencher automaticamente com IA:'}
                      </span>
                    </div>
                    <AIAutofillWidget
                      type="calculator"
                      itemName={newCalcData.name}
                      currentData={{
                        name: newCalcData.name,
                        description: newCalcData.description,
                        category: newCalcData.category,
                        formula: newCalcData.formula,
                        inputs: newCalcInputs
                      }}
                      onApply={(approvedData) => {
                        setNewCalcData({
                          name: approvedData.name || newCalcData.name,
                          description: approvedData.description || newCalcData.description,
                          category: approvedData.category || newCalcData.category || 'Clínica Geral / UTI',
                          formula: approvedData.formula || newCalcData.formula || ''
                        });
                        if (approvedData.inputs && Array.isArray(approvedData.inputs)) {
                          setNewCalcInputs(approvedData.inputs);
                        }
                      }}
                      isEditMode={!!editingCalcId}
                    />
                  </div>

                  {/* Basic Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 dark:text-slate-300">
                            Nome da Calculadora *
                          </label>
                          <input 
                            type="text" 
                            required
                            placeholder="Ex: Escore CHA2DS2-VASc"
                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-gray-900 focus:ring-medical-500 focus:border-medical-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                            value={newCalcData.name} 
                            onChange={e => setNewCalcData({...newCalcData, name: e.target.value})} 
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 dark:text-slate-300">
                            Categoria / Especialidade *
                          </label>
                          <select 
                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-gray-900 focus:ring-medical-500 focus:border-medical-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                            value={newCalcData.category} 
                            onChange={e => setNewCalcData({...newCalcData, category: e.target.value})}
                          >
                            {CATEGORIES_LIST.filter(c => c !== 'Todos').map(c => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                      </div>
                      <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 dark:text-slate-300">
                            Descrição Clínica
                          </label>
                          <textarea 
                            rows={2}
                            placeholder="Breve descrição clínica, indicação de uso e relevância diagnóstica..."
                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-gray-900 focus:ring-medical-500 focus:border-medical-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                            value={newCalcData.description} 
                            onChange={e => setNewCalcData({...newCalcData, description: e.target.value})} 
                          />
                      </div>
                  </div>

                  {/* Inputs Builder */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 dark:bg-slate-900/50 dark:border-slate-700">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider dark:text-slate-200">
                          Variáveis de Entrada ({newCalcInputs.length})
                        </h4>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          Identificadores usados na fórmula
                        </span>
                      </div>

                      {/* Add variable bar */}
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 mb-3 items-end bg-white p-3 rounded-lg border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                          <div className="sm:col-span-3">
                              <label className="block text-xs text-gray-500 dark:text-slate-400">ID da Variável *</label>
                              <input 
                                type="text" 
                                placeholder="ex: peso" 
                                className="block w-full border border-gray-300 rounded-md py-1.5 px-2 text-xs font-mono bg-white text-gray-900 focus:ring-medical-500 focus:border-medical-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                                value={newInputLine.id} 
                                onChange={e => setNewInputLine({...newInputLine, id: e.target.value})} 
                              />
                          </div>
                          <div className="sm:col-span-4">
                              <label className="block text-xs text-gray-500 dark:text-slate-400">Rótulo / Pergunta *</label>
                              <input 
                                type="text" 
                                placeholder="ex: Peso em kg" 
                                className="block w-full border border-gray-300 rounded-md py-1.5 px-2 text-xs bg-white text-gray-900 focus:ring-medical-500 focus:border-medical-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                                value={newInputLine.label} 
                                onChange={e => setNewInputLine({...newInputLine, label: e.target.value})} 
                              />
                          </div>
                          <div className="sm:col-span-2">
                              <label className="block text-xs text-gray-500 dark:text-slate-400">Tipo</label>
                              <select 
                                className="block w-full border border-gray-300 rounded-md py-1.5 px-2 text-xs bg-white text-gray-900 focus:ring-medical-500 focus:border-medical-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                                value={newInputLine.type} 
                                onChange={e => setNewInputLine({...newInputLine, type: e.target.value as any})}
                              >
                                  <option value="number">Número</option>
                                  <option value="boolean">Sim / Não</option>
                                  <option value="select">Seleção</option>
                              </select>
                          </div>
                          <div className="sm:col-span-2">
                              <label className="block text-xs text-gray-500 dark:text-slate-400">Unidade</label>
                              <input 
                                type="text" 
                                placeholder="ex: kg, mg/dL" 
                                className="block w-full border border-gray-300 rounded-md py-1.5 px-2 text-xs bg-white text-gray-900 focus:ring-medical-500 focus:border-medical-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                                value={newInputLine.unit || ''} 
                                onChange={e => setNewInputLine({...newInputLine, unit: e.target.value})} 
                              />
                          </div>
                          <div className="sm:col-span-1 flex justify-end">
                              <button 
                                type="button"
                                onClick={addInputToNewCalc} 
                                className="w-full bg-medical-600 text-white py-1.5 px-2 rounded-md hover:bg-medical-700 flex items-center justify-center cursor-pointer transition-colors"
                                title="Adicionar variável"
                              >
                                  <Plus className="h-4 w-4" />
                              </button>
                          </div>
                      </div>

                      {/* List of current variables */}
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                          {newCalcInputs.map((input, idx) => (
                              <div key={idx} className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-slate-200 text-xs dark:bg-slate-800 dark:border-slate-700">
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono px-1.5 py-0.5 bg-slate-100 text-slate-800 rounded font-semibold dark:bg-slate-700 dark:text-slate-200">
                                      {input.id}
                                    </span>
                                    <span className="font-medium text-slate-800 dark:text-slate-200">
                                      {input.label}
                                    </span>
                                    <span className="text-[11px] text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded dark:bg-slate-900 dark:text-slate-400">
                                      {input.type === 'boolean' ? 'Checkbox (0/1)' : input.type === 'select' ? 'Seleção' : 'Número' + (input.unit ? ` (${input.unit})` : '')}
                                    </span>
                                  </div>
                                  <button 
                                    type="button"
                                    onClick={() => removeInputFromNewCalc(idx)} 
                                    className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer"
                                    title="Remover variável"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                              </div>
                          ))}
                          {newCalcInputs.length === 0 && (
                            <p className="text-xs text-slate-400 italic text-center py-3">
                              Nenhuma variável adicionada. Adicione as variáveis que o usuário irá preencher.
                            </p>
                          )}
                      </div>
                  </div>

                  {/* Formula */}
                  <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider dark:text-slate-300">
                          Fórmula Matemática (math.js)
                        </label>
                        <span className="text-xs text-slate-400">
                          Opcional para rotinas nativas
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mb-1.5 dark:text-slate-400">
                        Utilize os IDs das variáveis declaradas acima. Booleanos avaliam como 1 (Sim) ou 0 (Não).<br />
                        Exemplos: <code>peso / ((altura / 100) ^ 2)</code> ou <code>idade &gt;= 65 ? (icc + has + 1) : (icc + has)</code>
                      </p>
                      <textarea 
                        rows={2}
                        placeholder="Ex: peso / ((altura / 100) ^ 2)"
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-gray-900 focus:ring-medical-500 focus:border-medical-500 sm:text-sm font-mono dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                        value={newCalcData.formula} 
                        onChange={e => setNewCalcData({...newCalcData, formula: e.target.value})} 
                      />
                  </div>

                  {/* Review Interval Selector */}
                  <div className="pt-2">
                      <ReviewIntervalSelector
                          value={customReviewIntervalMonths}
                          onChange={setCustomReviewIntervalMonths}
                          defaultMonths={12}
                      />
                  </div>
              </div>

              <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-2 justify-between items-center border-t border-slate-100 pt-4 dark:border-slate-700">
                  <div className="w-full sm:w-auto flex gap-2">
                    {editingCalcId && (
                      <button
                        type="button"
                        onClick={() => {
                          if (editingCalcId.startsWith('custom-')) {
                            handleDeleteCalculator(editingCalcId, newCalcData.name || editingCalcId);
                          } else {
                            handleResetCalculator(editingCalcId, newCalcData.name || editingCalcId);
                          }
                        }}
                        className="inline-flex justify-center items-center px-3 py-2 border border-red-200 rounded-md shadow-sm text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 focus:outline-none transition-colors cursor-pointer dark:bg-red-950/30 dark:border-red-900/50 dark:text-red-400"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        {editingCalcId.startsWith('custom-') ? 'Excluir' : 'Restaurar Padrão'}
                      </button>
                    )}
                  </div>

                  <div className="w-full sm:w-auto flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="inline-flex justify-center rounded-md border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 px-4 py-2 text-xs font-semibold focus:outline-none transition-colors cursor-pointer dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-600"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveCalculator}
                      className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-medical-600 text-xs font-semibold text-white hover:bg-medical-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-medical-500 cursor-pointer transition-colors"
                    >
                      {editingCalcId ? 'Salvar Alterações' : 'Criar Calculadora'}
                    </button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // List View
  if (!selectedCalc) {
    return (
      <div className="space-y-6 px-4 sm:px-0">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-bold text-medical-600 dark:text-medical-400">Calculadoras Disponíveis</h2>
          <div className="flex gap-2 w-full sm:w-auto">
            {/* Button visible only for Admins */}
            {hasRole(['admin']) && (
              <button
                onClick={handleOpenCreateModal}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-medical-600 hover:bg-medical-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-medical-500 cursor-pointer transition-colors"
              >
                <Plus className="-ml-1 mr-2 h-5 w-5" />
                Criar Calculadora
              </button>
            )}
            <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 dark:text-slate-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-medical-600 focus:border-medical-600 sm:text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 dark:placeholder-slate-400 dark:focus:ring-medical-500 dark:focus:border-medical-500"
                placeholder="Buscar calculadora..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Filtro por Categorias/Especialidades */}
        <div className="overflow-x-auto pb-2 scrollbar-none flex gap-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES_LIST.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-medical-600 border-medical-600 text-white dark:bg-medical-500 dark:border-medical-500 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCalculators.map((calc) => (
            <div
              key={calc.id}
              onClick={() => handleSelectCalc(calc.id)}
              className="bg-white rounded-2xl border border-slate-100
                         shadow-[0_2px_8px_rgba(0,0,0,0.06)]
                         hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]
                         hover:border-medical-200
                         transition-all duration-200 cursor-pointer
                         overflow-hidden group flex flex-col text-left dark:bg-slate-800 dark:border-slate-700"
            >
              <div className="h-1 bg-gradient-to-r from-medical-600 to-accent-500" />
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 mb-2 dark:bg-slate-700 dark:text-slate-300">
                      {calc.category}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-medical-600 transition-colors dark:text-medical-400">
                      {calc.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{calc.description}</p>
                  </div>
                  <div className="flex flex-col items-center justify-between h-full min-h-[5rem] shrink-0">
                    <div className="flex items-center gap-1">
                      {hasRole(['admin']) && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEditModal(calc);
                          }}
                          className="p-1.5 text-slate-400 hover:text-medical-600 hover:bg-slate-100 rounded-md transition-colors dark:hover:bg-slate-700 dark:hover:text-medical-400"
                          title="Editar calculadora"
                        >
                          <Edit3 className="h-4.5 w-4.5" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(calc.id);
                        }}
                        className="p-1.5 text-gray-300 hover:text-red-500 rounded-md transition-colors"
                        title={isFavorite(calc.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                      >
                        <Heart className={`h-4.5 w-4.5 ${isFavorite(calc.id) ? "text-red-500 fill-red-500" : ""}`} />
                      </button>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredCalculators.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500 dark:text-slate-400">
              Nenhuma calculadora encontrada para "{searchTerm}"
            </div>
          )}
        </div>

        {renderModal()}

        {/* Modal for Confirmation & Alerts */}
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
  }

  // Detail/Calculation View
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-0">
      <button 
        onClick={() => setSelectedCalcId(null)}
        className="mb-4 text-sm text-medical-600 hover:text-medical-800 dark:text-medical-400 dark:hover:text-medical-300 flex items-center cursor-pointer transition-colors"
      >
        ← Voltar para lista
      </button>

      <div className="bg-white shadow-lg rounded-2xl border border-slate-100 overflow-hidden dark:bg-slate-800 dark:border-slate-700">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 dark:bg-slate-900 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                {selectedCalc.category}
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{selectedCalc.name}</h2>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{selectedCalc.description}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {hasRole(['admin']) && (
              <button
                type="button"
                onClick={() => handleOpenEditModal(selectedCalc)}
                className="inline-flex items-center px-3 py-1.5 border border-slate-300 rounded-md shadow-sm text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 hover:text-medical-600 focus:outline-none dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                title="Editar esta calculadora"
              >
                <Edit3 className="h-3.5 w-3.5 mr-1.5 text-medical-600 dark:text-medical-400" />
                Editar
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                toggleFavorite(selectedCalc.id);
              }}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
              title={isFavorite(selectedCalc.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            >
              <Heart className={`h-5 w-5 ${isFavorite(selectedCalc.id) ? "text-red-500 fill-red-500" : ""}`} />
            </button>
            <button 
              onClick={resetForm} 
              className="p-2 text-gray-400 hover:text-medical-600 transition-colors cursor-pointer"
              title="Limpar formulário"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleCalculate} className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              {selectedCalc.inputs.map((input) => (
                <div key={input.id} className={input.type === 'boolean' ? "sm:col-span-2 flex items-center" : ""}>
                  {input.type === 'boolean' ? (
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id={input.id}
                          type="checkbox"
                          checked={!!inputValues[input.id]}
                          onChange={(e) => handleInputChange(input.id, e.target.checked)}
                          className="focus:ring-medical-500 h-4 w-4 text-medical-600 border-gray-300 rounded dark:bg-slate-700 dark:border-slate-600"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor={input.id} className="font-semibold text-slate-700 dark:text-slate-300">{input.label}</label>
                      </div>
                    </div>
                  ) : (
                    <>
                      <label htmlFor={input.id} className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {input.label}
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        {input.type === 'select' ? (
                          <select
                            id={input.id}
                            value={inputValues[input.id] || ''}
                            onChange={(e) => handleInputChange(input.id, e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 text-base border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-medical-500 focus:border-medical-500 sm:text-sm rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                          >
                            <option value="" disabled>Selecione...</option>
                            {input.options?.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="number"
                            id={input.id}
                            step={input.step || "any"}
                            value={inputValues[input.id] ?? ''}
                            onChange={(e) => handleInputChange(input.id, e.target.value)}
                            className="block w-full pl-3 pr-12 py-2 border border-slate-300 rounded-md bg-white text-slate-900 focus:ring-medical-500 focus:border-medical-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                            placeholder="0"
                          />
                        )}
                        {input.unit && input.type !== 'select' && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-slate-500 sm:text-sm font-medium dark:text-slate-400">{input.unit}</span>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-medical-600 hover:bg-medical-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-medical-500 cursor-pointer transition-colors"
              >
                Calcular
              </button>
            </div>
          </form>

          {result && (
            <div className={`mt-8 rounded-xl p-5 border ${
              result.severity === 'critical' || result.severity === 'high' ? 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900/50' :
              result.severity === 'medium' ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-900/50' :
              'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900/50'
            }`}>
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className={`h-5 w-5 ${
                     result.severity === 'critical' || result.severity === 'high' ? 'text-red-600 dark:text-red-400' :
                     result.severity === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                     'text-green-600 dark:text-green-400'
                  }`} />
                </div>
                <div className="ml-3 w-full">
                  <h3 className={`text-lg font-semibold ${
                     result.severity === 'critical' || result.severity === 'high' ? 'text-red-800 dark:text-red-200' :
                     result.severity === 'medium' ? 'text-yellow-800 dark:text-yellow-200' :
                     'text-green-800 dark:text-green-200'
                  }`}>
                    Resultado: {result.value} {result.unit}
                  </h3>
                  <div className={`mt-2 text-sm ${
                      result.severity === 'critical' || result.severity === 'high' ? 'text-red-800 dark:text-red-300' :
                      result.severity === 'medium' ? 'text-yellow-800 dark:text-yellow-300' :
                      'text-green-800 dark:text-green-300'
                  }`}>
                    <p className="font-semibold">{result.interpretation}</p>
                    <p className="mt-1">{result.recommendation}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ClinicalDisclaimer type="calculators" />

      {renderModal()}

      {/* Modal for Confirmation & Alerts */}
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

export default Calculators;