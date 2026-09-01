import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Search, Plus, Trash2, Edit3, Check, RotateCcw, 
  Printer, Download, AlertTriangle, Activity, CheckSquare, 
  Square, Calendar, Save, X, Info, Heart, Shield, Copy, ClipboardCheck, Sparkles, Loader2,
  ArrowUp, ArrowDown, ChevronUp, ChevronDown, RefreshCw, Wand2, ArrowRight
} from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { db, cleanUndefined } from '../services/firebase';
import { getCalculators } from '../services/calculatorService';
import { EmbeddedCalculator } from './EmbeddedCalculator';
import { motion, AnimatePresence } from 'motion/react';

interface BaseClinicalSectionProps {
  title: string;
  subtitle: string;
  badge: string;
  
  // Custom guides / state management
  consults: any[];
  setConsults: React.Dispatch<React.SetStateAction<any[]>>;
  selectedId: string;
  setSelectedId: (id: string) => void;
  onBack: () => void;
  isAdmin: boolean;

  // Persistence config
  firestoreDocId: string; // e.g. "prenatal", "hipertensao", "geriatria", or dynamic Protocolo id
  localStorageKey: string; // e.g. "medassist_prenatal_consults"

  // Patient checklist sync (for ticked items)
  checklistState?: Record<string, boolean>;
  setChecklistState?: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;

  // Custom slots for additional cards or tools
  renderSidebarBottom?: (activeConsult: any) => React.ReactNode;
  renderMainTop?: (activeConsult: any) => React.ReactNode;
  renderMainBottom?: (activeConsult: any) => React.ReactNode;
  renderRightSidebar?: (activeConsult: any) => React.ReactNode;

  // AI Autocomplete Service Integration
  generateFromAI?: (consultId: string, currentConsult: any) => Promise<any>;

  // Special parameters
  isPreNatal?: boolean;
  examStatus?: Record<string, {
    solicitados: Record<string, boolean>;
    revisados: Record<string, boolean>;
    alterados: Record<string, boolean>;
    alteradosNotes: Record<string, string>;
  }>;
  setExamStatus?: React.Dispatch<React.SetStateAction<Record<string, {
    solicitados: Record<string, boolean>;
    revisados: Record<string, boolean>;
    alterados: Record<string, boolean>;
    alteradosNotes: Record<string, string>;
  }>>>;
  vaccineStatus?: Record<string, Record<string, 'aplicada' | 'pendente' | 'contraindicada'>>;
  setVaccineStatus?: React.Dispatch<React.SetStateAction<Record<string, Record<string, 'aplicada' | 'pendente' | 'contraindicada'>>>>;
}

export const BaseClinicalSection: React.FC<BaseClinicalSectionProps> = ({
  title,
  subtitle,
  badge,
  consults,
  setConsults,
  selectedId,
  setSelectedId,
  onBack,
  isAdmin,
  firestoreDocId,
  localStorageKey,
  checklistState = {},
  setChecklistState,
  renderSidebarBottom,
  renderMainTop,
  renderMainBottom,
  renderRightSidebar,
  generateFromAI,
  isPreNatal = false,
  examStatus = {},
  setExamStatus,
  vaccineStatus = {},
  setVaccineStatus
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [runningAI, setRunningAI] = useState(false);
  
  // AI Review proposals states
  const [isAIReviewOpen, setIsAIReviewOpen] = useState(false);
  const [aiProposalData, setAiProposalData] = useState<any>(null);
  const [aiSelectedFields, setAiSelectedFields] = useState<Record<string, boolean>>({
    subtitulo: true,
    anamnese: true,
    exames: true,
    vacinas: true,
    alertas: true,
    orientacoes: true,
    proxima: true,
  });

  // Local transients for admin inputs
  const [timelineSearch, setTimelineSearch] = useState('');
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicLayout, setNewTopicLayout] = useState<'checklist' | 'alerts' | 'vaccines' | 'exams'>('checklist');
  const [isAddingConsult, setIsAddingConsult] = useState(false);
  const [newConsultForm, setNewConsultForm] = useState({
    idade: '',
    ig: '',
    semanaMax: '',
    proxima: ''
  });

  // Edit item path to track which item text are we currently modifying inline
  const [editingItemPath, setEditingItemPath] = useState<{
    section: string;
    index: number;
    value: string;
    grav?: 'yellow' | 'red';
    conduta?: string;
  } | null>(null);

  // Quick states to append items at the bottom of each list
  const [newItemInputText, setNewItemInputText] = useState<Record<string, string>>({});

  const safeConsults = Array.isArray(consults) ? consults.filter(Boolean) : [];
  const activeConsult = safeConsults.find(c => c.id === selectedId) || safeConsults[0];

  // If no consultations, simple fallback
  if (!activeConsult) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500 mb-3" />
        <p className="text-sm font-semibold">Carregando consultas e cronograma...</p>
      </div>
    );
  }

  // Helper getters/setters mapping
  const getIdade = (c: any) => c?.idade || c?.ig || c?.dominio || '';
  const getSubtitulo = (c: any) => c?.subtitulo || '';

  // Synchronize selectedId if the list updates to a custom collection and selection gets lost
  useEffect(() => {
    if (safeConsults.length > 0) {
      const exists = safeConsults.some(c => c.id === selectedId);
      if (!exists) {
        setSelectedId(safeConsults[0].id);
      }
    }
  }, [consults, selectedId, setSelectedId]);

  // Get dynamic checklists configured inside this consultation item
  const getTopicsForConsult = (c: any) => {
    if (!c) return [];
    const defaultOrder = ['anamnese', isPreNatal ? 'exames' : 'triagens', 'vacinas', 'alertas', 'orientacoes'];
    const order = [...(c.topicsOrder || defaultOrder)];
    if (c.desenvolvimento && !order.includes('desenvolvimento')) {
      order.push('desenvolvimento');
    }
    const titles = c.topicTitles || {};
    
    return order.map((id: string) => {
      let title = '';
      let type: 'alerts' | 'checklist' | 'custom_checklist' = 'checklist';
      let items: any[] = [];
      
      if (id === 'anamnese') {
        title = titles[id] || (isPreNatal ? 'Anamnese e Roteiro Clínico Prescritivo' : 'Anamnese e Queixas Clássicas');
        type = 'checklist';
        items = c.anamnese || [];
      } else if (id === 'exames' || id === 'triagens') {
        title = titles[id] || (id === 'exames' ? 'Exames e Roteiro de Rastreamento' : 'Triagens e Exames Preventivos');
        type = 'checklist';
        items = c.exames || c.triagens || [];
      } else if (id === 'vacinas') {
        title = titles[id] || 'Vacinação e Imunizações';
        type = 'checklist';
        items = c.vacinas || [];
      } else if (id === 'alertas') {
        title = titles[id] || 'Sinais de Alerta e Condutas Críticas';
        type = 'alerts';
        items = c.alertas || [];
      } else if (id === 'orientacoes') {
        title = titles[id] || 'Orientações e Aconselhamento Clínico';
        type = 'checklist';
        items = c.orientacoes || [];
      } else if (id === 'desenvolvimento') {
        title = titles[id] || 'Marcos do Desenvolvimento / Avaliações';
        type = 'checklist';
        items = c.desenvolvimento || [];
      } else {
        const custom = (c.customChecklists || []).find((x: any) => x.id === id);
        title = custom?.title || titles[id] || 'Tópico Adicional';
        type = 'custom_checklist';
        items = custom?.items || [];
      }
      
      return { 
        id, 
        title, 
        type, 
        items,
        layout: id.startsWith('ct_') ? ((c.customChecklists || []).find((x: any) => x.id === id)?.layout || 'checklist') : id
      };
    });
  };

  // Checkbox functions
  const toggleCheck = (topicId: string, index: number) => {
    if (!setChecklistState) return;
    const key = `${selectedId}_${topicId}_${index}`;
    setChecklistState(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isChecked = (topicId: string, index: number) => {
    const key = `${selectedId}_${topicId}_${index}`;
    return !!checklistState[key];
  };

  // --- MUTATIVE ACTIONS UNDER EDIT MODE (ADMINS ONLY) ---
  const saveToDB = (updatedConsults: any[]) => {
    localStorage.setItem(localStorageKey, JSON.stringify(updatedConsults));
    setConsults(updatedConsults);

    const syncToCloud = async () => {
      try {
        const docRef = doc(db, 'special_guides', firestoreDocId);
        await setDoc(docRef, cleanUndefined({ consults: updatedConsults }));
        
        // Notify of changes
        window.dispatchEvent(new CustomEvent('medassist:protocols-updated'));
      } catch (e) {
        console.error('Erro ao sincronizar com Firestore:', e);
      }
    };
    syncToCloud();
  };

  const updateActiveConsultFields = (fields: Partial<any>) => {
    const updated = consults.map(c => c.id === selectedId ? { ...c, ...fields } : c);
    saveToDB(updated);
  };

  const handleMoveConsult = (direction: 'up' | 'down') => {
    const idx = consults.findIndex(c => c.id === selectedId);
    if (idx === -1) return;
    if (direction === 'up' && idx === 0) return;
    if (direction === 'down' && idx === consults.length - 1) return;

    const copy = [...consults];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    const temp = copy[idx];
    copy[idx] = copy[targetIdx];
    copy[targetIdx] = temp;
    saveToDB(copy);
  };

  const handleDuplicateConsult = () => {
    const idx = consults.findIndex(c => c.id === selectedId);
    if (idx === -1) return;
    const cloned = JSON.parse(JSON.stringify(activeConsult));
    cloned.id = 'consult_' + Date.now().toString(36);
    
    if (cloned.ig) cloned.ig = `${cloned.ig} (Cópia)`;
    else if (cloned.idade) cloned.idade = `${cloned.idade} (Cópia)`;
    else if (cloned.dominio) cloned.dominio = `${cloned.dominio} (Cópia)`;

    const copy = [...consults];
    copy.splice(idx + 1, 0, cloned);
    saveToDB(copy);
    setSelectedId(cloned.id);
  };

  const handleDeleteConsult = () => {
    if (consults.length <= 1 && !isAdmin) {
      alert('Apenas administradores podem excluir a única consulta restante do cronograma.');
      return;
    }
    if (!window.confirm('Excluir esta consulta permanentemente?')) return;
    const idx = consults.findIndex(c => c.id === selectedId);
    const copy = consults.filter(c => c.id !== selectedId);
    saveToDB(copy);
    const nextActive = copy[idx] || copy[idx - 1] || copy[0];
    if (nextActive) {
      setSelectedId(nextActive.id);
    } else {
      setSelectedId('');
    }
  };

  // Sidebar creation
  const handleAddNewConsult = (e: React.FormEvent) => {
    e.preventDefault();
    const titleVal = newConsultForm.idade.trim() || newConsultForm.ig.trim();
    if (!titleVal) return;

    const newStep: any = {
      id: 'consult_' + Date.now().toString(36),
      anamnese: ['Nova pergunta clínica relevante'],
      vacinas: [],
      alertas: [],
      orientacoes: ['Recomendação essencial de autocuidado'],
      proxima: newConsultForm.proxima || 'Em 30 dias.'
    };

    const deservesDominio = consults.some(c => c?.dominio !== undefined);
    if (isPreNatal) {
      newStep.ig = titleVal;
      newStep.semanaMax = Number(newConsultForm.semanaMax) || 40;
      newStep.exames = ['Exame de rastreio básico'];
    } else if (deservesDominio) {
      newStep.dominio = titleVal;
      newStep.subtitulo = 'Acompanhamento de Controle';
      newStep.triagens = [
        { texto: 'Avaliação preventiva de controle', categoria: 'Geral' }
      ];
    } else {
      newStep.idade = titleVal;
      newStep.subtitulo = 'Acompanhamento Clínico';
      newStep.triagens = ['Exame clínico periódico'];
    }

    const copy = [...consults, newStep];
    saveToDB(copy);
    setSelectedId(newStep.id);
    setNewConsultForm({ idade: '', ig: '', semanaMax: '', proxima: '' });
    setIsAddingConsult(false);
  };

  const handleCreateCustomTopic = (title: string, layout: 'checklist' | 'alerts' | 'vaccines' | 'exams') => {
    if (!title.trim()) return;
    const tTitle = title.trim();
    const topicId = 'ct_' + Date.now().toString(36);
    
    const defaultOrder = ['anamnese', isPreNatal ? 'exames' : 'triagens', 'vacinas', 'alertas', 'orientacoes'];
    const order = activeConsult.topicsOrder || defaultOrder;
    const customList = activeConsult.customChecklists || [];

    updateActiveConsultFields({
      topicsOrder: [...order, topicId],
      customChecklists: [...customList, { id: topicId, title: tTitle, items: [], layout }]
    });
  };

  const handleRenameTopic = (topicId: string, newTitle: string) => {
    if (!newTitle.trim()) return;
    const titles = { ...(activeConsult.topicTitles || {}) };
    titles[topicId] = newTitle.trim();
    updateActiveConsultFields({ topicTitles: titles });
  };

  const handleDeleteTopic = (topicId: string) => {
    const defaultOrder = ['anamnese', isPreNatal ? 'exames' : 'triagens', 'vacinas', 'alertas', 'orientacoes'];
    const order = activeConsult.topicsOrder || defaultOrder;
    const updatedOrder = order.filter((x: string) => x !== topicId);
    
    const customs = activeConsult.customChecklists || [];
    const updatedCustoms = customs.filter((x: any) => x.id !== topicId);

    updateActiveConsultFields({
      topicsOrder: updatedOrder,
      customChecklists: updatedCustoms
    });
  };

  const handleMoveTopic = (topicId: string, direction: 'up' | 'down') => {
    const defaultOrder = ['anamnese', isPreNatal ? 'exames' : 'triagens', 'vacinas', 'alertas', 'orientacoes'];
    const order = [...(activeConsult.topicsOrder || defaultOrder)];
    const idx = order.indexOf(topicId);
    if (idx === -1) return;
    if (direction === 'up' && idx === 0) return;
    if (direction === 'down' && idx === order.length - 1) return;

    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    const temp = order[idx];
    order[idx] = order[targetIdx];
    order[targetIdx] = temp;
    updateActiveConsultFields({ topicsOrder: order });
  };

  const handleAddItem = (topicId: string, valueStr: string) => {
    const textVal = valueStr.trim();
    if (!textVal) return;

    const isCustom = topicId.startsWith('ct_');
    if (isCustom) {
      const customList = activeConsult.customChecklists || [];
      const updatedCustoms = customList.map((x: any) => {
        if (x.id !== topicId) return x;
        const items = [...(x.items || [])];
        const newItem = x.layout === 'alerts' 
          ? { texto: textVal, gravidade: 'yellow' } 
          : textVal;
        return { ...x, items: [...items, newItem] };
      });
      updateActiveConsultFields({ customChecklists: updatedCustoms });
    } else {
      const items = [...(activeConsult[topicId] || [])];
      const newItem = topicId === 'alertas' 
        ? { texto: textVal, gravidade: 'yellow' }
        : textVal;
      updateActiveConsultFields({ [topicId]: [...items, newItem] });
    }
  };

  const handleDeleteItem = (topicId: string, index: number) => {
    const isCustom = topicId.startsWith('ct_');
    if (isCustom) {
      const customs = activeConsult.customChecklists || [];
      const updated = customs.map((x: any) => {
        if (x.id !== topicId) return x;
        return { ...x, items: (x.items || []).filter((_: any, i: number) => i !== index) };
      });
      updateActiveConsultFields({ customChecklists: updated });
    } else {
      const list = [...(activeConsult[topicId] || [])];
      updateActiveConsultFields({ [topicId]: list.filter((_, i) => i !== index) });
    }
  };

  const handleSaveItemEdit = (topicId: string, index: number, valueStr: string, updatedAlertFields?: Partial<any>) => {
    const isCustom = topicId.startsWith('ct_');
    
    if (isCustom) {
      const customs = activeConsult.customChecklists || [];
      const updated = customs.map((x: any) => {
        if (x.id !== topicId) return x;
        const list = [...(x.items || [])];
        if (x.layout === 'alerts') {
          list[index] = { ...list[index], texto: valueStr, ...updatedAlertFields };
        } else {
          list[index] = valueStr;
        }
        return { ...x, items: list };
      });
      updateActiveConsultFields({ customChecklists: updated });
    } else {
      const list = [...(activeConsult[topicId] || [])];
      if (topicId === 'alertas') {
        list[index] = { ...list[index], texto: valueStr, ...updatedAlertFields };
      } else {
        list[index] = valueStr;
      }
      updateActiveConsultFields({ [topicId]: list });
    }
    setEditingItemPath(null);
  };

  const handleMoveItemInTopic = (topicId: string, index: number, direction: 'up' | 'down') => {
    const isCustom = topicId.startsWith('ct_');
    const getItemsList = () => {
      if (isCustom) {
        return [...((activeConsult.customChecklists || []).find((x: any) => x.id === topicId)?.items || [])];
      }
      return [...(activeConsult[topicId] || [])];
    };

    const items = getItemsList();
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === items.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const temp = items[index];
    items[index] = items[targetIndex];
    items[targetIndex] = temp;

    if (isCustom) {
      const customs = activeConsult.customChecklists || [];
      const updated = customs.map((x: any) => {
        if (x.id !== topicId) return x;
        return { ...x, items };
      });
      updateActiveConsultFields({ customChecklists: updated });
    } else {
      updateActiveConsultFields({ [topicId]: items });
    }
  };

  const handleAddCalculator = (calcId: string) => {
    if (!calcId) return;
    const current = activeConsult.embeddedCalculators || [];
    if (current.includes(calcId)) return;
    updateActiveConsultFields({ embeddedCalculators: [...current, calcId] });
  };

  const handleRemoveCalculator = (calcId: string) => {
    const current = activeConsult.embeddedCalculators || [];
    updateActiveConsultFields({ embeddedCalculators: current.filter((c: string) => c !== calcId) });
  };

  // AI completion action
  const handleAutopreencherIA = async () => {
    if (!generateFromAI) return;
    setRunningAI(true);
    try {
      const result = await generateFromAI(selectedId, activeConsult);
      if (result) {
        setAiProposalData(result);
        setIsAIReviewOpen(true);
      }
    } catch (e) {
      console.error('Erro na IA Autocomplete:', e);
      alert('Houve um erro ao processar preenchimento automático de IA. Verifique conexão e tente novamente.');
    } finally {
      setRunningAI(false);
    }
  };

  const applyAIProposal = () => {
    if (!aiProposalData) return;
    const updatedConsult = { ...activeConsult };
    
    if (aiSelectedFields.subtitulo && aiProposalData.subtitulo) {
      updatedConsult.subtitulo = aiProposalData.subtitulo;
    }
    
    // Checklist topics mapping
    const copyList = (field: string) => {
      if (aiSelectedFields[field] && Array.isArray(aiProposalData[field])) {
        updatedConsult[field] = aiProposalData[field];
      }
    };

    copyList('anamnese');
    
    if (isPreNatal) {
      copyList('exames');
    } else {
      if (aiSelectedFields.exames && Array.isArray(aiProposalData.triagens)) {
        updatedConsult.triagens = aiProposalData.triagens;
      }
    }

    copyList('vacinas');
    copyList('alertas');
    copyList('orientacoes');

    if (aiSelectedFields.proxima && aiProposalData.proxima) {
      updatedConsult.proxima = aiProposalData.proxima;
    }

    updateActiveConsultFields(updatedConsult);
    setIsAIReviewOpen(false);
    setAiProposalData(null);
  };

  // Filter sidebar consultations using safeConsults and null-guards
  const filteredConsults = safeConsults.filter(c => {
    const titleVal = getIdade(c) || '';
    const subtitleVal = getSubtitulo(c) || '';
    const matchesSearch = timelineSearch === '' || 
      titleVal.toLowerCase().includes(timelineSearch.toLowerCase()) ||
      subtitleVal.toLowerCase().includes(timelineSearch.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* 1º — TOP BANNER & MAIN CONTROLS */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 dark:bg-slate-800 dark:border-slate-705 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left">
        <div className="flex items-center gap-3.5">
          <button
            onClick={onBack}
            className="p-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 border border-slate-205 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs cursor-pointer flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] uppercase font-extrabold text-rose-600 bg-rose-50 border border-rose-100/40 py-0.5 px-2.5 rounded-full dark:bg-rose-950/20 dark:border-rose-900 leading-tight">
                {badge}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                {consults.length} etapas registradas
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1 dark:text-slate-100 tracking-tight leading-tight">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isAdmin && (
            <>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(!isEditing);
                  if (isEditing) setEditingItemPath(null);
                }}
                className={`px-3 py-1.5 border rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isEditing 
                    ? 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-105 dark:bg-rose-950/20 dark:border-rose-900/30' 
                    : 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-105 dark:bg-indigo-950/20 dark:border-indigo-900/30'
                }`}
              >
                <Edit3 className="h-3.5 w-3.5" />
                {isEditing ? 'Sair da Edição' : 'Modo Edição'}
              </button>

              {isEditing && (
                <>
                  {generateFromAI && (
                    <button
                      type="button"
                      disabled={runningAI}
                      onClick={handleAutopreencherIA}
                      className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm cursor-pointer"
                    >
                      {runningAI ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          Preenchendo...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-3.5 w-3.5" />
                          Autocompletar com IA
                        </>
                      )}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => saveToDB(consults)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Save className="h-3.5 w-3.5" />
                    Salvar Guia
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* 2º — TIMELINE & ATIVE CHECKLIST GRID GROUP */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* TIMELINE COLUMN - LEFT (Span 3) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm dark:bg-slate-800 dark:border-slate-700 flex flex-col sticky top-[90px] text-left">
          <h2 className="font-extrabold text-slate-800 dark:text-slate-200 mb-2.5 text-xs flex items-center justify-between uppercase tracking-wider">
            <span>Grade de Diretrizes</span>
            <span className="text-xs text-indigo-500 dark:text-indigo-400 font-mono">({consults.length})</span>
          </h2>

          <div className="relative mb-3 shrink-0">
            <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
              <Search className="h-3.5 w-3.5" />
            </span>
            <input
              type="text"
              placeholder="Buscar etapa..."
              value={timelineSearch}
              onChange={e => setTimelineSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none text-xs bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-100 dark:border-slate-750"
            />
          </div>

          {/* LIST OF CHRONOLOGICAL TABS */}
          <div className="space-y-1.5">
            {filteredConsults.map((item, idx) => {
              const isActive = item.id === selectedId;
              const titleText = getIdade(item);
              const subtitleText = getSubtitulo(item);

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedId(item.id);
                    setEditingItemPath(null);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-slate-50 border-indigo-500 text-indigo-600 font-extrabold shadow-sm dark:bg-slate-900 dark:text-indigo-300' 
                      : 'bg-white hover:bg-slate-50 border-slate-100 text-slate-700 dark:bg-slate-800 dark:border-slate-750 dark:text-slate-300 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className={`w-1.5 h-3.5 rounded-sm shrink-0 ${isActive ? 'bg-indigo-600' : 'bg-slate-300'}`} />
                    <div className="truncate">
                      <p className="text-xs font-bold leading-tight truncate">{titleText}</p>
                      {subtitleText && (
                        <p className="text-[10px] text-slate-400 truncate mt-0.5 font-medium">{subtitleText}</p>
                      )}
                    </div>
                  </div>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />}
                </button>
              );
            })}

            {filteredConsults.length === 0 && (
              <div className="text-center py-6 text-xs text-slate-400 leading-normal">
                Nenhum resultado correspondente.
              </div>
            )}
          </div>

          {/* ADMIN SIDEBAR ACTIONS */}
          {isAdmin && (
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-750 shrink-0">
              {isAddingConsult ? (
                <form onSubmit={handleAddNewConsult} className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-750 space-y-2">
                  <p className="text-[10px] uppercase font-bold text-indigo-501 dark:text-indigo-400">Nova Etapa Preventiva</p>
                  <input
                    required
                    type="text"
                    placeholder="Ex: 28 semanas ou Visita 2"
                    className="w-full px-2 py-1 text-xs border rounded bg-white text-slate-805 dark:bg-slate-800 dark:border-slate-700 border-slate-200 dark:text-white"
                    value={isPreNatal ? newConsultForm.ig : newConsultForm.idade}
                    onChange={e => {
                      if (isPreNatal) setNewConsultForm({ ...newConsultForm, ig: e.target.value });
                      else setNewConsultForm({ ...newConsultForm, idade: e.target.value });
                    }}
                  />
                  {isPreNatal && (
                    <div>
                      <label className="text-[8px] text-slate-400 font-bold block uppercase">Semana Máxima:</label>
                      <input
                        type="number"
                        className="w-full px-2 py-1 text-xs border rounded bg-white text-slate-805 dark:bg-slate-800 dark:border-slate-700 border-slate-200 dark:text-white"
                        value={newConsultForm.semanaMax}
                        onChange={e => setNewConsultForm({ ...newConsultForm, semanaMax: e.target.value })}
                      />
                    </div>
                  )}
                  <div>
                    <label className="text-[8px] text-slate-400 font-bold block uppercase">Próximo Retorno recomendada:</label>
                    <input
                      type="text"
                      placeholder="Ex: Em 4 semanas"
                      className="w-full px-2 py-1 text-xs border rounded bg-white text-slate-850 dark:bg-slate-800 dark:border-slate-700 border-slate-200 dark:text-white"
                      value={newConsultForm.proxima}
                      onChange={e => setNewConsultForm({ ...newConsultForm, proxima: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-1 justify-end pt-1">
                    <button 
                      type="button" 
                      onClick={() => setIsAddingConsult(false)} 
                      className="p-1 px-2 text-[9px] bg-slate-200 dark:bg-slate-700 rounded text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
                    >
                      Sair
                    </button>
                    <button 
                      type="submit" 
                      className="p-1 px-2.5 text-[9px] bg-indigo-600 text-white rounded font-bold cursor-pointer hover:bg-opacity-90"
                    >
                      Salvar
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setIsAddingConsult(true)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-750 text-slate-700 dark:text-slate-305 hover:bg-slate-100 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5 text-indigo-500" /> Adicionar Diretriz/Etapa
                </button>
              )}
            </div>
          )}

          {renderSidebarBottom && (
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-755 shrink-0">
              {renderSidebarBottom(activeConsult)}
            </div>
          )}
        </div>

        {/* MIDDLE CHECKLISTS & TOPICS GRID COLUMN (Span 6 or 9 depending on right components) */}
        <div className={`col-span-1 lg:col-span-9 space-y-6 text-left`}>
          
          {/* ACTIVE CONSULTATION IDENTIFIER BANNER */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 dark:bg-slate-900 dark:border-slate-750 text-left flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Parâmetros Ativos da Linha</p>
              <h2 className="text-lg md:text-xl font-extrabold text-slate-800 dark:text-slate-100 mt-0.5">
                {getIdade(activeConsult)}
              </h2>
              {getSubtitulo(activeConsult) && (
                <p className="text-xs text-slate-400 mt-1">{getSubtitulo(activeConsult)}</p>
              )}
            </div>

            {activeConsult.proxima && (
              <div className="bg-indigo-50 border border-indigo-100/50 py-1.5 px-3.5 rounded-xl text-[11px] font-bold text-indigo-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
                <span>Próxima prevista: </span>
                <span className="text-slate-800 dark:text-white font-black">{activeConsult.proxima}</span>
              </div>
            )}
          </div>

          {/* ADMIN ADMINISTRATIVE WORKBENCH / TOOLBAR PANEL */}
          {isEditing && isAdmin && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 dark:bg-slate-900/50 dark:border-slate-700 text-left animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <span className="p-1.5 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 rounded-lg">
                  <Shield className="h-4 w-4" />
                </span>
                <h3 className="font-extrabold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider">
                  Administração Avançada e Estrutura do Roteiro Clínico
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Action 1: Reorder, duplicate, delete consult */}
                <div className="bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 rounded-xl p-3.5 space-y-3 shadow-inner">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-sans">Nível da Diretriz / Calendário</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleMoveConsult('up')}
                        disabled={consults.findIndex(c => c.id === selectedId) === 0}
                        className="flex-1 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 dark:text-slate-300 disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <ArrowUp className="h-3.5 w-3.5" /> Subir
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveConsult('down')}
                        disabled={consults.findIndex(c => c.id === selectedId) === consults.length - 1}
                        className="flex-1 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-705 dark:bg-slate-900 border border-slate-205 dark:border-slate-700 dark:text-slate-300 disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <ArrowDown className="h-3.5 w-3.5" /> Descer
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={handleDuplicateConsult}
                      className="w-full py-1.5 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 text-xs font-bold rounded-lg hover:bg-indigo-100 flex items-center justify-center gap-1.5 cursor-pointer border border-indigo-100/30"
                    >
                      <Copy className="h-3.5 w-3.5" /> Duplicar Etapa
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteConsult}
                      className="w-full py-1.5 bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400 text-xs font-bold rounded-lg hover:bg-rose-100 flex items-center justify-center gap-1.5 cursor-pointer border border-rose-100/30"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Excluir Etapa Atual
                    </button>
                  </div>
                </div>

                {/* Action 2: Add custom checklist topic */}
                <div className="bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 rounded-xl p-3.5 space-y-3 shadow-inner">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-sans">Tópico Adicional (Nova Seção)</p>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Ex: Avaliação Geral, Conduta..."
                      value={newTopicTitle}
                      onChange={e => setNewTopicTitle(e.target.value)}
                      className="w-full text-xs p-1.5 bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-705 text-slate-800 dark:text-white rounded-lg outline-none focus:border-indigo-500 font-semibold"
                      onKeyDown={e => {
                        if (e.key === 'Enter' && newTopicTitle.trim()) {
                          handleCreateCustomTopic(newTopicTitle.trim(), newTopicLayout);
                          setNewTopicTitle('');
                        }
                      }}
                    />
                    <div className="space-y-1">
                      <label className="text-[9px] font-medium text-slate-400 block pb-0.5">Disposição / Layout</label>
                      <select
                        value={newTopicLayout}
                        onChange={e => setNewTopicLayout(e.target.value as any)}
                        className="w-full text-[11px] p-1.5 bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-705 text-slate-800 dark:text-slate-200 rounded-lg outline-none focus:border-indigo-500 font-bold"
                      >
                        <option value="checklist">📋 Lista de Itens (Ticked Checklist)</option>
                        <option value="alerts font-mono">⚠️ Alertas Vermelhos / Amarelos</option>
                        <option value="vaccines">💉 Quadro status de vacina (Doses)</option>
                        <option value="exams">📊 Tabela Clínica e Solicitações (Matrix)</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (newTopicTitle.trim()) {
                          handleCreateCustomTopic(newTopicTitle.trim(), newTopicLayout);
                          setNewTopicTitle('');
                        }
                      }}
                      className="w-full py-1.5 bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" /> Adicionar Seção
                    </button>
                  </div>
                </div>

                {/* Action 3: Incorporate clinical calculator */}
                <div className="bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-705 rounded-xl p-3.5 space-y-3 shadow-inner">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-sans">Acoplar Calculadoras de Apoio</p>
                  <div className="space-y-2">
                    <select
                      id="admin-calc-selector"
                      className="w-full text-xs p-1.5 bg-slate-50 border border-slate-200 dark:bg-slate-900 border-slate-200 dark:border-slate-750 rounded-lg outline-none focus:border-indigo-500 text-slate-800 dark:text-white font-bold"
                    >
                      <option value="">-- Escolha uma calculadora --</option>
                      {getCalculators().map(c => (
                        <option key={c.id} value={c.id}>{c.name} ({c.category})</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => {
                        const sel = document.getElementById('admin-calc-selector') as HTMLSelectElement;
                        if (sel && sel.value) {
                          handleAddCalculator(sel.value);
                          sel.value = '';
                        }
                      }}
                      className="w-full py-1.5 bg-indigo-655 text-white text-xs font-bold rounded-lg hover:bg-opacity-95 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" /> Incorporar Ferramenta
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DYNAMIC UPPER WIDGETS SLOT */}
          {renderMainTop && (
            <div className="w-full">
              {renderMainTop(activeConsult)}
            </div>
          )}

          {/* RENDER TOPIC PANELS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {getTopicsForConsult(activeConsult).map((topic: any, tIdx: number) => {
              const isExames = topic.id === 'exames' || topic.layout === 'exams' || topic.id === 'triagens';
              const isAlertas = topic.id === 'alertas' || topic.layout === 'alerts';
              const isVacinas = topic.id === 'vacinas' || topic.layout === 'vaccines';
              const isCustom = topic.id.startsWith('ct_');
              const isFullWidthOutput = isExames && isPreNatal; // Full-width the PreNatal exams table matrix

              return (
                <div
                  key={topic.id}
                  className={`bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4 dark:bg-slate-800 dark:border-slate-700 text-left ${
                    isFullWidthOutput ? 'md:col-span-2' : 'md:col-span-1'
                  }`}
                >
                  {/* Topic Header */}
                  <div className="flex items-center justify-between border-b border-slate-105 dark:border-slate-700 pb-2 mb-2 group/header">
                    <div className="flex-1 mr-2">
                      {isEditing ? (
                        <input
                          type="text"
                          defaultValue={topic.title}
                          onBlur={e => handleRenameTopic(topic.id, e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && e.currentTarget.blur()}
                          className="font-extrabold text-slate-800 dark:text-slate-200 text-sm border-b border-dashed border-slate-400 focus:border-indigo-500 focus:outline-none w-full bg-slate-55 dark:bg-slate-900 px-2 py-0.5 rounded"
                        />
                      ) : (
                        <h3 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm flex items-center gap-1.5 uppercase tracking-wider text-xs">
                          {isExames && <Activity className="h-4.5 w-4.5 text-indigo-500" />}
                          {isAlertas && <AlertTriangle className="h-4.5 w-4.5 text-amber-500" />}
                          {isVacinas && <Sparkles className="h-4.5 w-4.5 text-indigo-500 animate-pulse" />}
                          {!isExames && !isAlertas && !isVacinas && <ClipboardCheck className="h-4.5 w-4.5 text-slate-505 dark:text-slate-400" />}
                          <span>{topic.title}</span>
                        </h3>
                      )}
                    </div>

                    {/* Section level admin controls */}
                    {isEditing && (
                      <div className="flex items-center gap-0.5 shrink-0 opacity-60 hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => handleMoveTopic(topic.id, 'up')}
                          disabled={tIdx === 0}
                          className="p-1 text-slate-400 hover:text-indigo-500 disabled:opacity-20 pointer-events-auto cursor-pointer"
                          title="Mover Seção para Cima"
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveTopic(topic.id, 'down')}
                          disabled={tIdx === getTopicsForConsult(activeConsult).length - 1}
                          className="p-1 text-slate-400 hover:text-indigo-500 disabled:opacity-20 pointer-events-auto cursor-pointer"
                          title="Mover Seção para Baixo"
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </button>
                        {isCustom && (
                          <button
                            type="button"
                            onClick={() => handleDeleteTopic(topic.id)}
                            className="p-1 text-slate-400 hover:text-rose-500 pointer-events-auto cursor-pointer"
                            title="Excluir Seção"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Render content based on layout */}
                  <div className="space-y-3 pr-1">
                    
                    {/* CASE 1: EXAMS/TRIA_SYSTEM DETAILED TABLE MATRIX FOR PRE_NATAL */}
                    {isExames && isPreNatal && examStatus && setExamStatus ? (
                      <div className="overflow-x-auto select-none">
                        <table className="w-full text-left text-xs text-slate-705 border-collapse dark:text-slate-205 min-w-[500px]">
                          <thead>
                            <tr className="border-b border-slate-105 dark:border-slate-700 text-slate-400 font-extrabold uppercase text-[9px] tracking-wide">
                              <th className="py-2">Exame de Rastreio</th>
                              <th className="py-2 text-center px-1">Solicitado</th>
                              <th className="py-2 text-center px-1">Resultado Revisado</th>
                              <th className="py-2 text-center px-1">Alterado</th>
                              <th className="py-2 w-1/3">Notas de Alteração</th>
                              {isEditing && <th className="py-2 text-right w-24">Ações</th>}
                            </tr>
                          </thead>
                          <tbody>
                            {topic.items.map((ex: any, idx: number) => {
                              const tSt = examStatus[selectedId] || { solicitados: {}, revisados: {}, alterados: {}, alteradosNotes: {} };
                              const itemKey = topic.id === 'exames' ? ex : `${topic.id}::${ex}`;
                              const sol = !!tSt.solicitados[itemKey];
                              const rev = !!tSt.revisados[itemKey];
                              const alt = !!tSt.alterados[itemKey];
                              const note = tSt.alteradosNotes[itemKey] || '';
                              const isItemEditing = editingItemPath?.section === topic.id && editingItemPath.index === idx;

                              const updateStatus = (field: 'solicitados' | 'revisados' | 'alterados', val: boolean) => {
                                setExamStatus(prev => {
                                  const cur = prev[selectedId] || { solicitados: {}, revisados: {}, alterados: {}, alteradosNotes: {} };
                                  return {
                                    ...prev,
                                    [selectedId]: {
                                      ...cur,
                                      [field]: { ...cur[field], [itemKey]: val }
                                    }
                                  };
                                });
                              };

                              const updateNote = (val: string) => {
                                setExamStatus(prev => {
                                  const cur = prev[selectedId] || { solicitados: {}, revisados: {}, alterados: {}, alteradosNotes: {} };
                                  return {
                                    ...prev,
                                    [selectedId]: {
                                      ...cur,
                                      alteradosNotes: { ...cur.alteradosNotes, [itemKey]: val }
                                    }
                                  };
                                });
                              };

                              return (
                                <tr key={idx} className="border-b border-slate-100 dark:border-slate-750/50 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                                  <td className="py-2.5 font-bold text-slate-800 dark:text-slate-200">
                                    {isItemEditing ? (
                                      <div className="flex items-center gap-1 w-full min-w-[125px]">
                                        <input
                                          type="text"
                                          className="px-1.5 py-0.5 text-xs border rounded bg-white text-slate-800 border-slate-200 flex-1 outline-none font-bold"
                                          value={editingItemPath.value}
                                          onChange={e => setEditingItemPath({ ...editingItemPath, value: e.target.value })}
                                          onKeyDown={e => e.key === 'Enter' && handleSaveItemEdit(topic.id, idx, editingItemPath.value)}
                                        />
                                        <button onClick={() => handleSaveItemEdit(topic.id, idx, editingItemPath.value)} className="p-1 bg-green-500 text-white rounded cursor-pointer"><Check className="h-3 w-3" /></button>
                                        <button onClick={() => setEditingItemPath(null)} className="p-1 bg-red-550 text-white rounded cursor-pointer"><X className="h-3 w-3" /></button>
                                      </div>
                                    ) : (
                                      <span>{ex}</span>
                                    )}
                                  </td>
                                  <td className="text-center">
                                    <button
                                      type="button"
                                      disabled={isEditing}
                                      onClick={() => updateStatus('solicitados', !sol)}
                                      className="mx-auto block text-slate-400 hover:text-slate-650"
                                    >
                                      {sol ? <CheckSquare className="h-4.5 w-4.5 text-indigo-500" /> : <Square className="h-4.5 w-4.5 text-slate-300" />}
                                    </button>
                                  </td>
                                  <td className="text-center">
                                    <button
                                      type="button"
                                      disabled={isEditing}
                                      onClick={() => {
                                        updateStatus('revisados', !rev);
                                        if (!rev) updateStatus('solicitados', true);
                                      }}
                                      className="mx-auto block text-slate-400 hover:text-slate-650"
                                    >
                                      {rev ? <CheckSquare className="h-4.5 w-4.5 text-emerald-500" /> : <Square className="h-4.5 w-4.5 text-slate-300" />}
                                    </button>
                                  </td>
                                  <td className="text-center">
                                    <button
                                      type="button"
                                      disabled={isEditing}
                                      onClick={() => {
                                        updateStatus('alterados', !alt);
                                        if (!alt) {
                                          updateStatus('solicitados', true);
                                          updateStatus('revisados', true);
                                        }
                                      }}
                                      className="mx-auto block text-slate-450 hover:text-slate-650"
                                    >
                                      {alt ? <AlertTriangle className="h-4.5 w-4.5 text-rose-500 animate-pulse" /> : <Square className="h-4.5 w-4.5 text-slate-300" />}
                                    </button>
                                  </td>
                                  <td className="py-1">
                                    <input
                                      type="text"
                                      disabled={isEditing}
                                      placeholder={alt ? "Registrar valor alterado..." : "Nenhuma alteração..."}
                                      value={note}
                                      onChange={e => updateNote(e.target.value)}
                                      className={`w-full py-1 px-2 text-xs border rounded-lg bg-transparent border-transparent  ${alt ? 'border-amber-200 outline-none text-amber-700 bg-amber-50 dark:bg-amber-950/20 font-bold' : 'text-slate-500 dark:text-slate-400'}`}
                                    />
                                  </td>
                                  
                                  {isEditing && (
                                    <td className="text-right py-1.5 space-x-1 whitespace-nowrap">
                                      <button onClick={() => setEditingItemPath({ section: topic.id, index: idx, value: ex })} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-500 cursor-pointer text-[10px]" title="Editar"><Edit3 className="h-3 w-3 inline" /></button>
                                      <button onClick={() => handleMoveItemInTopic(topic.id, idx, 'up')} disabled={idx === 0} className="p-1 disabled:opacity-20 rounded text-slate-400 cursor-pointer"><ArrowUp className="h-3 w-3 inline" /></button>
                                      <button onClick={() => handleMoveItemInTopic(topic.id, idx, 'down')} disabled={idx === topic.items.length - 1} className="p-1 disabled:opacity-20 rounded text-slate-400 cursor-pointer"><ArrowDown className="h-3 w-3 inline" /></button>
                                      <button onClick={() => handleDeleteItem(topic.id, idx)} className="p-1 hover:bg-rose-50 rounded text-rose-550 cursor-pointer" title="Remover"><Trash2 className="h-3 w-3 inline" /></button>
                                    </td>
                                  )}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      
                      /* CASE 2: NORMAL LIST (CHECKLIST / ALERTS / VACCINES CHECKER) */
                      <div className="space-y-2">
                        {topic.items.map((item: any, idx: number) => {
                          const isObj = item && typeof item === 'object';
                          const text = isObj ? item.texto : item;
                          
                          // Alert specifications
                          const grav = isObj ? item.gravidade : 'yellow';
                          const conduta = isObj ? item.conduta : '';

                          const checked = isChecked(topic.id, idx);
                          const isItemEditing = editingItemPath?.section === topic.id && editingItemPath.index === idx;

                          return (
                            <div
                              key={idx}
                              onClick={() => { if (!isEditing && !isAlertas) toggleCheck(topic.id, idx); }}
                              className={`p-3 rounded-xl border flex flex-col gap-1.5 transition-all text-xs font-sans ${
                                !isEditing && !isAlertas ? 'cursor-pointer hover:border-slate-350 dark:hover:border-slate-600' : ''
                              } ${
                                checked && !isEditing && !isAlertas
                                  ? 'bg-slate-55 border-indigo-200 text-indigo-950 dark:bg-indigo-950/20 dark:border-indigo-900/30 dark:text-indigo-300 font-bold shadow-sm'
                                  : 'bg-white border-slate-100 text-slate-700 dark:bg-slate-800 dark:border-slate-750 dark:text-slate-300'
                              }`}
                            >
                              {isItemEditing ? (
                                <div className="space-y-2 w-full text-left" onClick={e => e.stopPropagation()}>
                                  <input
                                    type="text"
                                    className="w-full px-2 py-1 text-xs border rounded bg-white text-slate-800 border-slate-200 font-semibold outline-none"
                                    value={editingItemPath.value}
                                    onChange={e => setEditingItemPath({ ...editingItemPath, value: e.target.value })}
                                    onKeyDown={e => e.key === 'Enter' && handleSaveItemEdit(topic.id, idx, editingItemPath.value, { gravidade: editingItemPath.grav, conduta: editingItemPath.conduta })}
                                  />
                                  {isAlertas && (
                                    <div className="flex gap-2 items-center">
                                      <select
                                        value={editingItemPath.grav}
                                        onChange={e => setEditingItemPath({ ...editingItemPath, grav: e.target.value as any })}
                                        className="text-xs p-1 bg-white border border-slate-200 rounded text-slate-800 font-medium"
                                      >
                                        <option value="yellow">⚠️ Alerta Amarelo (Risco Moderado)</option>
                                        <option value="red">🚨 Alerta Vermelho (Grave/Emergência)</option>
                                      </select>
                                      <input
                                        type="text"
                                        placeholder="Conduta/Encaminhamento..."
                                        className="flex-1 px-2 py-1 text-xs border rounded bg-white text-slate-805 border-slate-200 font-medium"
                                        value={editingItemPath.conduta || ''}
                                        onChange={e => setEditingItemPath({ ...editingItemPath, conduta: e.target.value })}
                                      />
                                    </div>
                                  )}
                                  <div className="flex gap-1 justify-end">
                                    <button onClick={() => setEditingItemPath(null)} className="p-1 px-2.5 bg-slate-100 rounded text-slate-700 font-bold">Cancelar</button>
                                    <button onClick={() => handleSaveItemEdit(topic.id, idx, editingItemPath.value, { gravidade: editingItemPath.grav, conduta: editingItemPath.conduta })} className="p-1 px-2.5 bg-indigo-650 text-white rounded font-bold">Salvar</button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-start gap-2.5 flex-1 min-w-0">
                                    {!isEditing && !isAlertas && (
                                      <span className="shrink-0 pt-0.5">
                                        {checked ? (
                                          <CheckSquare className="h-4.5 w-4.5 text-indigo-500" />
                                        ) : (
                                          <Square className="h-4.5 w-4.5 text-slate-300" />
                                        )}
                                      </span>
                                    )}

                                    <div className="flex-1">
                                      {isAlertas ? (
                                        <div className="space-y-1.5">
                                          <div className="flex items-start gap-1.5">
                                            <span className={`px-2 py-0.5 rounded-full text-[8.5px] font-black uppercase shrink-0 leading-tight ${
                                              grav === 'red' ? 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400 border border-red-200/50' : 'bg-yellow-50 text-yellow-750 dark:bg-yellow-950/40 dark:text-yellow-405 border border-yellow-205/50'
                                            }`}>
                                              {grav === 'red' ? 'Emergência (Vermelho)' : 'Risco (Amarelo)'}
                                            </span>
                                            <p className="font-extrabold text-slate-800 dark:text-slate-205">{text}</p>
                                          </div>
                                          {conduta && (
                                            <p className="text-[10px] text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/30 px-2 py-1 rounded-md font-bold">
                                              💊 Conduta recomendada: {conduta}
                                            </p>
                                          )}
                                        </div>
                                      ) : (
                                        <div className="space-y-1">
                                          {isObj && item.categoria && (
                                            <span className="inline-block text-[8.5px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300 border border-indigo-100/30">
                                              {item.categoria}
                                            </span>
                                          )}
                                          <p className="font-semibold text-slate-700 dark:text-slate-300 leading-normal">{text}</p>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Administrative Individual item actions under Edit mode */}
                                  {isEditing && (
                                    <div className="flex items-center gap-0.5 opacity-60 hover:opacity-100 transition-opacity">
                                      <button
                                        type="button"
                                        onClick={() => setEditingItemPath({ section: topic.id, index: idx, value: text, grav, conduta })}
                                        className="p-1 text-slate-400 hover:text-indigo-650"
                                      >
                                        <Edit3 className="h-3 w-3" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleMoveItemInTopic(topic.id, idx, 'up')}
                                        disabled={idx === 0}
                                        className="p-1 disabled:opacity-20 text-slate-400"
                                      >
                                        <ArrowUp className="h-3 w-3" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleMoveItemInTopic(topic.id, idx, 'down')}
                                        disabled={idx === topic.items.length - 1}
                                        className="p-1 disabled:opacity-20 text-slate-400"
                                      >
                                        <ArrowDown className="h-3 w-3" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteItem(topic.id, idx)}
                                        className="p-1 text-slate-400 hover:text-red-500"
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {topic.items.length === 0 && (
                      <div className="text-center py-5 text-slate-400 border border-dashed border-slate-150 dark:border-slate-700 rounded-xl text-[11.5px] font-medium leading-tight">
                        Seção vazia. {isEditing ? "Adicione um item abaixo." : "Nenhum parâmetro cadastrado nesta etapa."}
                      </div>
                    )}

                    {/* APPEND NEW ITEM FORM AREA */}
                    {isEditing && (
                      <div className="pt-2 border-t border-slate-105 dark:border-slate-750 flex items-center gap-2">
                        <input
                          type="text"
                          placeholder={`Adicionar novo item em ${topic.title}...`}
                          value={newItemInputText[topic.id] || ''}
                          onChange={e => setNewItemInputText({ ...newItemInputText, [topic.id]: e.target.value })}
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              handleAddItem(topic.id, newItemInputText[topic.id] || '');
                              setNewItemInputText({ ...newItemInputText, [topic.id]: '' });
                            }
                          }}
                          className="flex-1 px-2.5 py-1.5 border border-slate-205 dark:bg-slate-900 dark:border-slate-700 dark:text-white rounded-lg text-xs outline-none focus:border-indigo-500 font-semibold shadow-inner"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            handleAddItem(topic.id, newItemInputText[topic.id] || '');
                            setNewItemInputText({ ...newItemInputText, [topic.id]: '' });
                          }}
                          className="p-1.5 bg-indigo-600 hover:bg-indigo-705 text-white rounded-lg cursor-pointer flex items-center justify-center shadow-md shadow-indigo-100 dark:shadow-none"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* DYNAMIC LOWER SLOT */}
          {renderMainBottom && (
            <div className="w-full">
              {renderMainBottom(activeConsult)}
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR WITH EXTRA MODULES SLOT (Span 3) */}
        {renderRightSidebar && (
          <div className="lg:col-span-12 xl:col-span-3 space-y-4">
            {renderRightSidebar(activeConsult)}
          </div>
        )}
      </div>

      {/* 3º — DYNAMIC AI CRONOGRAMA PROPOSAL MODAL OVERLAY */}
      <AnimatePresence>
        {isAIReviewOpen && aiProposalData && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 shadow-2xl max-w-2xl w-full overflow-hidden text-left"
            >
              <div className="bg-gradient-to-r from-indigo-650 to-violet-650 p-5 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-200 fill-purple-101" />
                  <div>
                    <h3 className="font-extrabold text-base leading-tight">Preenchimento Clínico Otimizado com IA</h3>
                    <p className="text-[10px] text-indigo-100 leading-normal font-medium mt-0.5">Revise e escolha quais recomendações do censo médico você quer incorporar ao roteiro.</p>
                  </div>
                </div>
                <button onClick={() => setIsAIReviewOpen(false)} className="p-1.5 hover:bg-white/10 rounded-full text-white/80 cursor-pointer">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto font-sans text-xs">
                {/* Selector indicators */}
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Mapeamento de Tópicos Propostos</p>

                <div className="grid grid-cols-2 gap-2.5">
                  {Object.keys(aiSelectedFields).map((field) => {
                    const hasProp = !!aiProposalData[field];
                    if (!hasProp) return null;

                    return (
                      <button
                        key={field}
                        type="button"
                        onClick={() => setAiSelectedFields({ ...aiSelectedFields, [field]: !aiSelectedFields[field] })}
                        className={`p-2.5 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                          aiSelectedFields[field]
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-900 font-extrabold dark:bg-indigo-950/20 dark:border-indigo-900 dark:text-indigo-300'
                            : 'bg-white border-slate-100 text-slate-400 dark:bg-slate-800 dark:border-slate-750'
                        }`}
                      >
                        <span className="capitalize">{field === 'subtitulo' ? 'Subtítulo' : field}</span>
                        {aiSelectedFields[field] ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                      </button>
                    );
                  })}
                </div>

                {/* Subtitle preview if modified */}
                {aiSelectedFields.subtitulo && aiProposalData.subtitulo && (
                  <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-750 p-3.5 rounded-xl space-y-1">
                    <p className="text-[9px] uppercase font-bold text-indigo-500">Subtítulo Mapeado</p>
                    <p className="font-extrabold text-slate-800 dark:text-white">{aiProposalData.subtitulo}</p>
                  </div>
                )}

                {/* Detailed checklist lists preview */}
                {Object.keys(aiSelectedFields).filter(f => f !== 'subtitulo' && f !== 'proxima').map((field) => {
                  const items = aiProposalData[field] || [];
                  if (!aiSelectedFields[field] || items.length === 0) return null;

                  return (
                    <div key={field} className="bg-slate-50 dark:bg-slate-900 border border-slate-100 p-3.5 rounded-xl space-y-2 dark:border-slate-750 text-left">
                      <p className="text-[9px] uppercase font-black text-indigo-505 dark:text-indigo-400 capitalize">{field}</p>
                      <ul className="space-y-1.5 pl-2 border-l border-indigo-200">
                        {items.map((it: any, i: number) => {
                          const textStr = typeof it === 'object' ? it.texto : it;
                          return <li key={i} className="font-semibold text-slate-700 dark:text-slate-350 list-disc list-inside">{textStr}</li>;
                        })}
                      </ul>
                    </div>
                  );
                })}

                {aiSelectedFields.proxima && aiProposalData.proxima && (
                  <div className="bg-slate-50 dark:bg-slate-900 p-3.5 border border-slate-100/60 rounded-xl dark:border-slate-750">
                    <p className="text-[9px] uppercase font-bold text-indigo-501">Previsão Próxima Consulta Recomendada</p>
                    <p className="font-extrabold text-slate-800 dark:text-white">{aiProposalData.proxima}</p>
                  </div>
                )}
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-4 border-t border-slate-100/50 dark:border-slate-750 flex justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsAIReviewOpen(false)}
                  className="px-4 py-2 text-xs bg-slate-205 hover:bg-slate-200 text-slate-650 hover:text-slate-700 dark:bg-slate-800 dark:text-slate-300 rounded-xl font-bold cursor-pointer"
                >
                  Descartar Proposta
                </button>
                <button
                  type="button"
                  onClick={applyAIProposal}
                  className="px-5 py-2 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-extrabold shadow-md shadow-indigo-100 dark:shadow-none cursor-pointer"
                >
                  Aplicar Diretrizes Recomendadas
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
