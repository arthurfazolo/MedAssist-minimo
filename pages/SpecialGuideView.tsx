import React, { useState } from 'react';
import { 
  ArrowLeft, Search, Plus, Trash2, Edit3, Check, RotateCcw, 
  AlertTriangle, Activity, CheckSquare, Square, Calendar, Sparkles, 
  Save, X, Info, Shield, Loader2, Copy, ChevronUp, ChevronDown, BookOpen, FileText,
  Calculator
} from 'lucide-react';
import { useAuth } from '../App';
import { useConfirmModal, useAlertModal } from '../hooks/useModal';
import { AlertModal, ConfirmModal } from '../components/ui/Modal';
import { useSpecialGuideEngine } from '../hooks/useSpecialGuideEngine';
import { SpecialGuideDefinition, SpecialGuideConsult, SpecialGuideAlerta, SpecialGuideTriagem } from '../types/specialGuide';
import { generateCustomSpecialSectionFromIA } from '../services/geminiService';
import { UniversalBlock } from '../types';
import { getCalculators, getCalculatorById } from '../services/calculatorService';
import { EmbeddedCalculator } from '../components/EmbeddedCalculator';

interface SpecialGuideViewProps {
  definition: SpecialGuideDefinition;
  onBack: () => void;
}

export const SpecialGuideView: React.FC<SpecialGuideViewProps> = ({ definition, onBack }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

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

  // We enrich definition with a default aiGenerate if it's missing
  const enrichedDefinition: SpecialGuideDefinition = {
    ...definition,
    aiGenerate: definition.aiGenerate || (async (rotulo: string) => {
      const proposal = await generateCustomSpecialSectionFromIA(definition.titulo, rotulo);
      // Map development or custom data to alerts or keep default ones
      const mappedAlerts: SpecialGuideAlerta[] = [
        { 
          texto: `Presença de sintomas de descompensação ou sinais de gravidade específicos de ${definition.titulo}`, 
          gravidade: 'red', 
          conduta: 'Encaminhamento imediato para avaliação em regime de urgência/emergência.' 
        },
        { 
          texto: 'Não adesão reiterada ao plano terapêutico ou falta de suporte familiar', 
          gravidade: 'yellow', 
          conduta: 'Reavaliar plano terapêutico, acionar equipe multidisciplinar e realizar busca ativa.' 
        }
      ];

      return {
        subtitulo: proposal.subtitulo || '',
        anamnese: proposal.anamnese || [],
        triagens: (proposal.triagens || []).map((t: string) => ({ texto: t, categoria: 'Geral' })),
        vacinas: proposal.vacinas || [],
        alertas: mappedAlerts,
        orientacoes: proposal.orientacoes || [],
        proxima: proposal.proxima || ''
      };
    })
  };

  const {
    consults,
    setConsults,
    selectedId,
    setSelectedId,
    activeConsult,
    isEditing,
    setIsEditing,
    runningAI,
    isAIReviewOpen,
    setIsAIReviewOpen,
    aiProposalData,
    setAiProposalData,
    aiSelectedFields,
    setAiSelectedFields,
    loadingMessage,
    checklistState,
    notesState,
    setNotesState,
    calculatorStates,
    setCalculatorStates,
    timelineSearch,
    setTimelineSearch,
    editingItemPath,
    setEditingItemPath,
    toggleCheck,
    isChecked,
    handleClearChecklist,
    startEditingItem,
    handleSaveEditedItem,
    handleDeleteListItem,
    handleAddNewItem,
    handleUpdateConsultMeta,
    handleSaveGuide,
    handleAutopreencherIA,
    handleApplyAIProposal,
    generateReport,
  } = useSpecialGuideEngine(enrichedDefinition);

  // States for block management
  const [newBlockItemInput, setNewBlockItemInput] = useState<Record<string, string>>({});
  const [newAlertForm, setNewAlertForm] = useState<Record<string, { texto: string; gravidade: 'yellow' | 'red'; conduta: string }>>({});
  const [editingItemState, setEditingItemState] = useState<{
    blockId: string;
    index: number;
    value: string;
    extra?: any;
  } | null>(null);

  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    if (!activeConsult?.blocos) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= activeConsult.blocos.length) return;
    const newBlocos = [...activeConsult.blocos];
    const temp = newBlocos[index];
    newBlocos[index] = newBlocos[targetIndex];
    newBlocos[targetIndex] = temp;
    
    setConsults(prev => prev.map(c => c.id === selectedId ? { ...c, blocos: newBlocos } : c));
  };

  const handleDuplicateBlock = (index: number) => {
    if (!activeConsult?.blocos) return;
    const blockToClone = activeConsult.blocos[index];
    const cloned: UniversalBlock = {
      ...blockToClone,
      id: `cloned_block_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 5)}`,
      titulo: `${blockToClone.titulo || ''} (Cópia)`
    };
    const newBlocos = [...activeConsult.blocos];
    newBlocos.splice(index + 1, 0, cloned);
    setConsults(prev => prev.map(c => c.id === selectedId ? { ...c, blocos: newBlocos } : c));
  };

  const handleDeleteBlock = async (index: number) => {
    if (!activeConsult?.blocos) return;
    const block = activeConsult.blocos[index];
    const confirmed = await requestConfirm({
      title: 'Excluir Seção',
      message: `Tem certeza que deseja excluir permanentemente a seção "${block.titulo || 'Sem título'}" e todas as suas diretrizes internas?`,
      variant: 'danger'
    });
    if (confirmed) {
      const newBlocos = activeConsult.blocos.filter((_, i) => i !== index);
      setConsults(prev => prev.map(c => c.id === selectedId ? { ...c, blocos: newBlocos } : c));
    }
  };

  const handleAddBlock = (tipo: 'checklist' | 'destaque' | 'texto' | 'calculadora') => {
    if (!activeConsult) return;
    const newBlock: any = {
      id: `block_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 5)}`,
      tipo,
      titulo: tipo === 'checklist' ? 'Nova Lista de Verificação' : tipo === 'destaque' ? 'Novos Sinais de Alerta' : tipo === 'texto' ? 'Novo Texto Livre' : 'Calculadora Clínica',
      itens: tipo === 'checklist' ? [] : undefined,
      alertas: tipo === 'destaque' ? [] : undefined,
      conteudo: tipo === 'texto' ? '' : undefined,
      calculadoraId: tipo === 'calculadora' ? '' : undefined
    };
    const newBlocos = [...(activeConsult.blocos || []), newBlock];
    setConsults(prev => prev.map(c => c.id === selectedId ? { ...c, blocos: newBlocos } : c));
  };

  // States for new items in lists
  const [newAnamneseText, setNewAnamneseText] = useState('');
  const [newTriagemText, setNewTriagemText] = useState('');
  const [newTriagemCat, setNewTriagemCat] = useState('Geral');
  const [newVacinaText, setNewVacinaText] = useState('');
  const [newOrientacaoText, setNewOrientacaoText] = useState('');
  const [newAlertaText, setNewAlertaText] = useState('');
  const [newAlertaGravidade, setNewAlertaGravidade] = useState<'yellow' | 'red'>('yellow');
  const [newAlertaConduta, setNewAlertaConduta] = useState('');

  // States for adding a brand new Consultation (cronograma list)
  const [isAddingConsult, setIsAddingConsult] = useState(false);
  const [newConsultForm, setNewConsultForm] = useState({
    id: '',
    rotulo: '',
    subtitulo: '',
    proxima: ''
  });

  const handleCreateConsult = () => {
    if (!newConsultForm.rotulo.trim()) {
      showAlert({
        title: 'Campo Obrigatório',
        message: 'Por favor, informe o rótulo da consulta (ex: "Consulta de 1 Mês").',
        type: 'warning'
      });
      return;
    }

    const newId = newConsultForm.id.trim() || 'c_' + Date.now().toString(36);
    
    // Check if ID is unique
    if (consults.some(c => c.id === newId)) {
      showAlert({
        title: 'ID Duplicado',
        message: 'Já existe uma consulta registrada com este ID. Deixe em branco para gerar automaticamente.',
        type: 'warning'
      });
      return;
    }

    const newConsult: SpecialGuideConsult = {
      id: newId,
      rotulo: newConsultForm.rotulo.trim(),
      subtitulo: newConsultForm.subtitulo.trim() || undefined,
      anamnese: [],
      triagens: [],
      vacinas: [],
      alertas: [],
      orientacoes: [],
      proxima: newConsultForm.proxima.trim() || 'Sob critério clínico.'
    };

    setConsults(prev => [...prev, newConsult]);
    setSelectedId(newId);
    setIsAddingConsult(false);
    setNewConsultForm({ id: '', rotulo: '', subtitulo: '', proxima: '' });
    
    showAlert({
      title: 'Consulta Adicionada',
      message: `A nova consulta "${newConsult.rotulo}" foi adicionada com sucesso no fim do cronograma!`,
      type: 'success'
    });
  };

  const handleDuplicateConsult = () => {
    if (!activeConsult) return;
    const cloned = JSON.parse(JSON.stringify(activeConsult)) as SpecialGuideConsult;
    cloned.id = 'c_' + Date.now().toString(36);
    cloned.rotulo = `${cloned.rotulo} (Cópia)`;
    
    const index = consults.findIndex(c => c.id === selectedId);
    const updated = [...consults];
    updated.splice(index + 1, 0, cloned);
    
    setConsults(updated);
    setSelectedId(cloned.id);
    showAlert({
      title: 'Consulta Duplicada',
      message: 'Consulta duplicada e inserida com sucesso no cronograma!',
      type: 'success'
    });
  };

  const handleDeleteConsult = async () => {
    if (!activeConsult) return;

    const confirmed = await requestConfirm({
      title: 'Remover Consulta',
      message: `Tem certeza absoluta que deseja remover a consulta "${activeConsult.rotulo}"? Esta ação removerá todas as diretrizes desta etapa e é irreversível.`,
      variant: 'danger'
    });

    if (confirmed) {
      const remaining = consults.filter(c => c.id !== selectedId);
      setConsults(remaining);
      if (remaining.length > 0) {
        setSelectedId(remaining[0].id);
      } else {
        setSelectedId('');
      }
      showAlert({
        title: 'Consulta Removida',
        message: 'A consulta foi removida do cronograma com sucesso.',
        type: 'success'
      });
    }
  };

  const handleMoveConsult = (direction: 'up' | 'down') => {
    const index = consults.findIndex(c => c.id === selectedId);
    if (index === -1) return;
    const nextIndex = direction === 'up' ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= consults.length) return;
    
    const updated = [...consults];
    const temp = updated[index];
    updated[index] = updated[nextIndex];
    updated[nextIndex] = temp;
    
    setConsults(updated);
  };

  const handleCopyToClipboard = () => {
    const text = generateReport();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => {
          showAlert({
            title: 'Prontuário Copiado',
            message: 'O relatório e sumário clínico estruturado do atendimento foi copiado para a área de transferência!',
            type: 'success'
          });
        })
        .catch(() => {
          showAlert({
            title: 'Aviso',
            message: 'Não foi possível acessar a área de transferência do navegador.',
            type: 'info'
          });
        });
    }
  };

  const handleSaveFirestore = async () => {
    try {
      await handleSaveGuide();
      showAlert({
        title: 'Sincronização Concluída',
        message: 'As alterações foram sincronizadas e salvas corretamente no banco de dados Firestore!',
        type: 'success'
      });
      setIsEditing(false);
    } catch (e) {
      showAlert({
        title: 'Falha na Gravação',
        message: 'Erro de permissão ou conexão ao salvar no Firestore. Verifique as credenciais.',
        type: 'error'
      });
    }
  };

  const handleResetChecklistConfirm = async () => {
    const confirmed = await requestConfirm({
      title: 'Zerar Controles',
      message: 'Deseja realmente limpar todos os campos preenchidos e anotações desta consulta corrente?',
      variant: 'warning'
    });
    if (confirmed) {
      handleClearChecklist();
    }
  };

  // Filter consults on timelineSearch
  const filteredConsults = consults.filter(c => {
    if (!timelineSearch.trim()) return true;
    const query = timelineSearch.toLowerCase();
    return (
      c.rotulo.toLowerCase().includes(query) ||
      (c.subtitulo && c.subtitulo.toLowerCase().includes(query)) ||
      c.anamnese.some(x => x.toLowerCase().includes(query)) ||
      c.triagens.some(x => x.texto.toLowerCase().includes(query)) ||
      c.vacinas.some(x => x.toLowerCase().includes(query)) ||
      c.orientacoes.some(x => x.toLowerCase().includes(query))
    );
  });

  // Theme color styling
  const themeColor = definition.corTema || 'medical';
  const themeClasses = {
    bgBanner: themeColor === 'rose' ? 'from-rose-600 via-pink-600 to-rose-700' :
              themeColor === 'violet' ? 'from-violet-600 via-purple-600 to-violet-700' :
              themeColor === 'indigo' ? 'from-indigo-600 via-blue-600 to-indigo-700' :
              themeColor === 'emerald' ? 'from-emerald-600 via-teal-600 to-emerald-700' :
              'from-medical-600 via-medical-500 to-accent-600',
    textAccent: themeColor === 'rose' ? 'text-rose-600 dark:text-rose-400' :
                themeColor === 'violet' ? 'text-violet-600 dark:text-violet-400' :
                themeColor === 'indigo' ? 'text-indigo-600 dark:text-indigo-400' :
                themeColor === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' :
                'text-medical-600 dark:text-medical-400',
    btnPrimary: themeColor === 'rose' ? 'bg-rose-600 hover:bg-rose-700 text-white' :
                themeColor === 'violet' ? 'bg-violet-600 hover:bg-violet-700 text-white' :
                themeColor === 'indigo' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' :
                themeColor === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-700 text-white' :
                'bg-medical-600 hover:bg-medical-700 text-white',
    badgeAccent: themeColor === 'rose' ? 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-200' :
                 themeColor === 'violet' ? 'bg-violet-50 text-violet-800 border-violet-200 dark:bg-violet-950/40 dark:text-violet-200' :
                 themeColor === 'indigo' ? 'bg-indigo-50 text-indigo-800 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-200' :
                 themeColor === 'emerald' ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200' :
                 'bg-medical-50 text-medical-800 border-medical-200 dark:bg-medical-950/40 dark:text-medical-200',
    checkAccent: themeColor === 'rose' ? 'text-rose-600' :
                 themeColor === 'violet' ? 'text-violet-600' :
                 themeColor === 'indigo' ? 'text-indigo-600' :
                 themeColor === 'emerald' ? 'text-emerald-600' :
                 'text-medical-600',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-sans antialiased text-left">
      
      {/* 1. TOP HEADER BANNER */}
      <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-r ${themeClasses.bgBanner} text-white shadow-lg mb-8 relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6`}>
        <div className="space-y-2 z-10">
          <button 
            onClick={onBack} 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white font-bold text-xs bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-xl transition backdrop-blur-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para o Painel
          </button>
          <div className="flex items-center gap-3 mt-1">
            <BookOpen className="h-8 w-8 text-white opacity-90" />
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {definition.titulo}
            </h1>
          </div>
          <p className="text-white/85 text-xs sm:text-sm font-medium max-w-2xl">
            Acompanhamento clínico programado estruturado e ferramentas de triagem baseadas em evidências.
          </p>
        </div>

        {/* Admin Tools in Header */}
        <div className="flex flex-wrap gap-2 shrink-0 z-10">
          {isAdmin && (
            <>
              {isEditing ? (
                <>
                  <button 
                    onClick={handleSaveFirestore} 
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold text-xs rounded-xl shadow transition"
                  >
                    <Save className="h-4 w-4" />
                    Salvar no Firestore
                  </button>
                  <button 
                    onClick={() => setIsEditing(false)} 
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white/15 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition"
                  >
                    <X className="h-4 w-4" />
                    Cancelar Edição
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white text-slate-800 hover:bg-slate-50 font-bold text-xs rounded-xl shadow transition"
                >
                  <Edit3 className="h-4 w-4" />
                  Modo Editor (Admin)
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* 2. LAYOUT MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* SIDEBAR LIST OF CONSULTATIONS (col-span-3) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-4 shadow-sm space-y-4">
            
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">
                Cronograma ({definition.itemLabel}s)
              </h2>
              {isEditing && (
                <button
                  onClick={() => setIsAddingConsult(true)}
                  className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl transition dark:bg-indigo-950/40 dark:text-indigo-300"
                  title="Criar nova etapa no cronograma"
                >
                  <Plus className="h-4.5 w-4.5" />
                </button>
              )}
            </div>

            {/* Timeline search filter */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Filtrar diretrizes..."
                value={timelineSearch}
                onChange={e => setTimelineSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50/50 dark:bg-slate-900/50 dark:border-slate-700 text-slate-800 dark:text-slate-200"
              />
            </div>

            {/* List of Consultations */}
            <div className="space-y-1.5 max-h-[50vh] overflow-y-auto pr-1">
              {filteredConsults.map((c) => {
                const isSelected = c.id === selectedId;
                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      if (!isAddingConsult) setSelectedId(c.id);
                    }}
                    className={`p-3 rounded-2xl cursor-pointer transition text-left flex items-start gap-2 border ${
                      isSelected 
                        ? `${themeClasses.badgeAccent} font-black`
                        : 'bg-white hover:bg-slate-50/70 border-slate-100 dark:bg-slate-800 dark:border-slate-750 dark:hover:bg-slate-750'
                    }`}
                  >
                    <Calendar className={`h-4.5 w-4.5 mt-0.5 shrink-0 ${isSelected ? themeClasses.textAccent : 'text-slate-400'}`} />
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold leading-tight ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                        {c.rotulo}
                      </p>
                      {c.subtitulo && (
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate mt-0.5 font-medium">
                          {c.subtitulo}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}

              {filteredConsults.length === 0 && (
                <p className="text-[11px] text-slate-400 italic text-center py-4">Nenhuma etapa encontrada.</p>
              )}
            </div>

            {/* Admin sorting controls of active consult */}
            {isEditing && activeConsult && (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-1">
                <span className="text-[10px] uppercase tracking-wider font-black text-slate-400">Posição:</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleMoveConsult('up')}
                    className="p-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg dark:bg-slate-700 dark:text-slate-300"
                    title="Mover para cima"
                  >
                    <ChevronUp className="h-4.5 w-4.5" />
                  </button>
                  <button
                    onClick={() => handleMoveConsult('down')}
                    className="p-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg dark:bg-slate-700 dark:text-slate-300"
                    title="Mover para baixo"
                  >
                    <ChevronDown className="h-4.5 w-4.5" />
                  </button>
                  <button
                    onClick={handleDuplicateConsult}
                    className="p-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg dark:bg-slate-700 dark:text-slate-300"
                    title="Duplicar etapa"
                  >
                    <Copy className="h-4.5 w-4.5" />
                  </button>
                  <button
                    onClick={handleDeleteConsult}
                    className="p-1 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg dark:bg-rose-950/40 dark:text-rose-300"
                    title="Remover etapa"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* WORKSPACE CONTENT: BLOCKS SYSTEM (col-span-9) */}
        <div className="lg:col-span-9 space-y-6">
          
          {!activeConsult && (
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-8 shadow-sm text-center space-y-4">
              <Calendar className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                Nenhuma consulta cadastrada no cronograma
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Todas as consultas deste cronograma de acompanhamento foram removidas. Administradores podem adicionar novas etapas a qualquer momento.
              </p>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => setIsAddingConsult(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow transition cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  Adicionar Primeira Consulta
                </button>
              )}
            </div>
          )}

          {/* Active Consultation Header */}
          {activeConsult && (
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm space-y-2">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg border ${themeClasses.badgeAccent}`}>
                  {definition.itemLabel}: {activeConsult.rotulo}
                </span>
                
                {/* AI PRE-FILL TRIGGER BUTTON */}
                {isAdmin && isEditing && (
                  <button
                    type="button"
                    disabled={runningAI}
                    onClick={handleAutopreencherIA}
                    className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:opacity-85 text-xs font-black bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1.5 rounded-xl transition shrink-0"
                  >
                    {runningAI ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
                        Mapeando...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 text-indigo-500 animate-pulse" />
                        Autopreencher Template com IA
                      </>
                    )}
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-[10px] uppercase font-black text-slate-400">Rótulo / Título:</label>
                    <input
                      type="text"
                      value={activeConsult.rotulo}
                      onChange={e => setConsults(prev => prev.map(c => c.id === selectedId ? { ...c, rotulo: e.target.value } : c))}
                      className="w-full mt-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50/50 dark:bg-slate-900 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-black text-slate-400">Subtítulo do Domínio:</label>
                    <input
                      type="text"
                      value={activeConsult.subtitulo || ''}
                      onChange={e => setConsults(prev => prev.map(c => c.id === selectedId ? { ...c, subtitulo: e.target.value } : c))}
                      className="w-full mt-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50/50 dark:bg-slate-900 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                    {activeConsult.rotulo}
                  </h2>
                  {activeConsult.subtitulo && (
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
                      {activeConsult.subtitulo}
                    </p>
                  )}
                </>
              )}
            </div>
          )}

          {/* Render ExtraWidgets slot if present */}
          {definition.ExtraWidgets && activeConsult && (
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm">
              <definition.ExtraWidgets 
                consult={activeConsult} 
                selectedId={selectedId} 
                updateMeta={handleUpdateConsultMeta} 
                isAdmin={isAdmin}
                isEditing={isEditing}
              />
            </div>
          )}

          {/* DYNAMIC BLOCKS LIST */}
          {activeConsult && (
            <div className="space-y-6">
              {(activeConsult.blocos || []).map((block, blockIdx) => {
                return (
                  <div key={block.id} className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm space-y-4">
                    {/* Block Header */}
                    <div className="pb-3 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center gap-4">
                      <div className="flex-1 text-left">
                        {isEditing ? (
                          <input
                            type="text"
                            value={block.titulo || ''}
                            onChange={e => {
                              const newBlocos = [...(activeConsult.blocos || [])];
                              newBlocos[blockIdx].titulo = e.target.value;
                              setConsults(prev => prev.map(c => c.id === selectedId ? { ...c, blocos: newBlocos } : c));
                            }}
                            className="bg-transparent border-b border-indigo-300 dark:border-indigo-700 font-extrabold text-base text-slate-850 dark:text-slate-100 outline-none focus:border-indigo-500 pb-0.5 w-full text-left"
                            placeholder="Título da Seção..."
                          />
                        ) : (
                          <h3 className="font-extrabold text-base text-slate-800 dark:text-slate-200 flex items-center gap-2">
                            {block.tipo === 'checklist' ? (
                              <CheckSquare className="h-5 w-5 text-indigo-500" />
                            ) : block.tipo === 'destaque' ? (
                              <AlertTriangle className="h-5 w-5 text-rose-500 animate-pulse" />
                            ) : block.tipo === 'calculadora' ? (
                              <Calculator className="h-5 w-5 text-rose-500" />
                            ) : (
                              <FileText className="h-5 w-5 text-sky-500" />
                            )}
                            {block.titulo || 'Seção Sem Título'}
                          </h3>
                        )}
                      </div>

                      {/* Block sorting and deletion controls */}
                      {isEditing && (
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => handleMoveBlock(blockIdx, 'up')}
                            disabled={blockIdx === 0}
                            className="p-1 text-slate-400 hover:text-indigo-600 disabled:opacity-30 rounded transition"
                            title="Mover seção para cima"
                          >
                            <ChevronUp className="h-4.5 w-4.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveBlock(blockIdx, 'down')}
                            disabled={blockIdx === activeConsult.blocos!.length - 1}
                            className="p-1 text-slate-400 hover:text-indigo-600 disabled:opacity-30 rounded transition"
                            title="Mover seção para baixo"
                          >
                            <ChevronDown className="h-4.5 w-4.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDuplicateBlock(blockIdx)}
                            className="p-1 text-slate-400 hover:text-indigo-600 rounded transition"
                            title="Duplicar seção"
                          >
                            <Copy className="h-4.5 w-4.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteBlock(blockIdx)}
                            className="p-1 text-rose-400 hover:text-rose-600 rounded transition"
                            title="Excluir seção"
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Block Content: Checklist */}
                    {block.tipo === 'checklist' && (
                      <div className="space-y-4">
                        {isEditing && (
                          <div className="flex gap-2 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <input
                              type="text"
                              placeholder="Adicionar novo item..."
                              value={newBlockItemInput[block.id] || ''}
                              onChange={e => setNewBlockItemInput(prev => ({ ...prev, [block.id]: e.target.value }))}
                              className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-850 dark:text-slate-200 focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const text = newBlockItemInput[block.id]?.trim();
                                if (text) {
                                  const newBlocos = [...(activeConsult.blocos || [])];
                                  newBlocos[blockIdx].itens = [...(block.itens || []), text];
                                  setConsults(prev => prev.map(c => c.id === selectedId ? { ...c, blocos: newBlocos } : c));
                                  setNewBlockItemInput(prev => ({ ...prev, [block.id]: '' }));
                                }
                              }}
                              className={`p-2 rounded-xl font-bold text-xs ${themeClasses.btnPrimary}`}
                            >
                              <Plus className="h-4.5 w-4.5" />
                            </button>
                          </div>
                        )}

                        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                          {(block.itens || []).map((item, itemIdx) => {
                            const checked = !!checklistState[`${selectedId}_${block.id}_${itemIdx}`];
                            const isItemEditing = editingItemState?.blockId === block.id && editingItemState.index === itemIdx;

                            return (
                              <div 
                                key={itemIdx} 
                                className={`p-3 rounded-2xl border transition flex items-start justify-between gap-3 group/item ${
                                  checked 
                                    ? 'bg-slate-50/50 border-slate-200 dark:bg-slate-900/50 dark:border-slate-750 opacity-80' 
                                    : 'bg-white border-slate-100 dark:bg-slate-805 dark:border-slate-750'
                                }`}
                              >
                                {isItemEditing ? (
                                  <div className="flex items-center gap-2 flex-1">
                                    <input
                                      type="text"
                                      value={editingItemState.value}
                                      onChange={e => setEditingItemState({ ...editingItemState, value: e.target.value })}
                                      className="flex-1 px-2.5 py-1 text-xs border rounded-lg bg-white dark:bg-slate-900 text-slate-855 dark:text-slate-200 border-slate-250 dark:border-slate-700 outline-none"
                                    />
                                    <button 
                                      type="button"
                                      onClick={() => {
                                        const newBlocos = [...(activeConsult.blocos || [])];
                                        const updated = [...(block.itens || [])];
                                        updated[itemIdx] = editingItemState.value;
                                        newBlocos[blockIdx].itens = updated;
                                        setConsults(prev => prev.map(c => c.id === selectedId ? { ...c, blocos: newBlocos } : c));
                                        setEditingItemState(null);
                                      }}
                                      className="p-1.5 bg-green-500 text-white rounded-lg"
                                    >
                                      <Check className="h-3.5 w-3.5" />
                                    </button>
                                    <button 
                                      type="button"
                                      onClick={() => setEditingItemState(null)}
                                      className="p-1.5 bg-red-500 text-white rounded-lg"
                                    >
                                      <X className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex items-start gap-3 flex-1 cursor-pointer" onClick={() => toggleCheck(block.id, itemIdx.toString())}>
                                    <button type="button" className="mt-0.5 shrink-0">
                                      {checked 
                                        ? <CheckSquare className={`h-4.5 w-4.5 ${themeClasses.checkAccent}`} /> 
                                        : <Square className="h-4.5 w-4.5 text-slate-400 dark:text-slate-600" />
                                      }
                                    </button>
                                    <p className={`text-xs font-semibold text-left ${checked ? 'text-slate-500 dark:text-slate-550 line-through' : 'text-slate-700 dark:text-slate-300'}`}>
                                      {item}
                                    </p>
                                  </div>
                                )}

                                {isEditing && !isItemEditing && (
                                  <div className="flex gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => setEditingItemState({ blockId: block.id, index: itemIdx, value: item })}
                                      className="p-1 text-slate-400 hover:text-indigo-600 rounded"
                                    >
                                      <Edit3 className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const newBlocos = [...(activeConsult.blocos || [])];
                                        newBlocos[blockIdx].itens = (block.itens || []).filter((_, i) => i !== itemIdx);
                                        setConsults(prev => prev.map(c => c.id === selectedId ? { ...c, blocos: newBlocos } : c));
                                      }}
                                      className="p-1 text-rose-500 hover:text-rose-600 rounded"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          })}

                          {(block.itens || []).length === 0 && (
                            <p className="text-[11px] text-slate-400 dark:text-slate-550 italic py-4 text-center">Nenhum item cadastrado nesta seção.</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Block Content: Destaque (Alertas) */}
                    {block.tipo === 'destaque' && (
                      <div className="space-y-4">
                        {isEditing && (
                          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2.5">
                            <input
                              type="text"
                              placeholder="Descrição do sinal de alerta..."
                              value={newAlertForm[block.id]?.texto || ''}
                              onChange={e => setNewAlertForm(prev => ({
                                ...prev,
                                [block.id]: {
                                  texto: e.target.value,
                                  gravidade: prev[block.id]?.gravidade || 'yellow',
                                  conduta: prev[block.id]?.conduta || ''
                                }
                              }))}
                              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-850 dark:text-slate-200 focus:outline-none"
                            />
                            <div className="flex gap-2">
                              <select
                                value={newAlertForm[block.id]?.gravidade || 'yellow'}
                                onChange={e => setNewAlertForm(prev => ({
                                  ...prev,
                                  [block.id]: {
                                    texto: prev[block.id]?.texto || '',
                                    gravidade: e.target.value as any,
                                    conduta: prev[block.id]?.conduta || ''
                                  }
                                }))}
                                className="flex-1 p-1.5 text-xs border rounded-xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-700 text-slate-750 dark:text-slate-355"
                              >
                                <option value="yellow">Amarelo (Atenção)</option>
                                <option value="red">Vermelho (Crítico)</option>
                              </select>
                            </div>
                            <input
                              type="text"
                              placeholder="Conduta recomendada de retaguarda..."
                              value={newAlertForm[block.id]?.conduta || ''}
                              onChange={e => setNewAlertForm(prev => ({
                                ...prev,
                                [block.id]: {
                                  texto: prev[block.id]?.texto || '',
                                  gravidade: prev[block.id]?.gravidade || 'yellow',
                                  conduta: e.target.value
                                }
                              }))}
                              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-850 dark:text-slate-200 focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const form = newAlertForm[block.id];
                                if (form && form.texto.trim()) {
                                  const newBlocos = [...(activeConsult.blocos || [])];
                                  const updatedAlertas = [...(block.alertas || [])];
                                  updatedAlertas.push({
                                    texto: form.texto.trim(),
                                    gravidade: form.gravidade,
                                    conduta: form.conduta.trim()
                                  });
                                  newBlocos[blockIdx].alertas = updatedAlertas;
                                  setConsults(prev => prev.map(c => c.id === selectedId ? { ...c, blocos: newBlocos } : c));
                                  setNewAlertForm(prev => ({ ...prev, [block.id]: { texto: '', gravidade: 'yellow', conduta: '' } }));
                                }
                              }}
                              className={`w-full py-1.5 rounded-xl font-bold text-xs ${themeClasses.btnPrimary}`}
                            >
                              Adicionar Alerta
                            </button>
                          </div>
                        )}

                        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                          {(block.alertas || []).map((alertItem: any, alertIdx) => {
                            const checked = !!checklistState[`${selectedId}_${block.id}_${alertIdx}`];
                            const isAlertEditing = editingItemState?.blockId === block.id && editingItemState.index === alertIdx;

                            return (
                              <div 
                                key={alertIdx} 
                                className={`p-3 rounded-2xl border transition space-y-2 group/alert ${
                                  checked 
                                    ? 'bg-slate-50 border-slate-200 dark:bg-slate-900/60 dark:border-slate-750' 
                                    : 'bg-white border-slate-100 dark:bg-slate-805 dark:border-slate-750'
                                }`}
                              >
                                {isAlertEditing ? (
                                  <div className="space-y-2">
                                    <input
                                      type="text"
                                      value={editingItemState.value}
                                      onChange={e => setEditingItemState({ ...editingItemState, value: e.target.value })}
                                      className="w-full px-2.5 py-1 text-xs border rounded-lg bg-white dark:bg-slate-900 text-slate-855 dark:text-slate-200 border-slate-250 dark:border-slate-700 outline-none"
                                    />
                                    <div className="flex gap-2">
                                      <select
                                        value={editingItemState.extra?.gravidade || 'yellow'}
                                        onChange={e => setEditingItemState({
                                          ...editingItemState,
                                          extra: { ...editingItemState.extra, gravidade: e.target.value }
                                        })}
                                        className="p-1 text-xs border rounded-lg bg-white dark:bg-slate-900 text-slate-855 dark:text-slate-200 border-slate-250 dark:border-slate-700 flex-1"
                                      >
                                        <option value="yellow">Amarelo</option>
                                        <option value="red">Vermelho</option>
                                      </select>
                                    </div>
                                    <input
                                      type="text"
                                      placeholder="Conduta..."
                                      value={editingItemState.extra?.conduta || ''}
                                      onChange={e => setEditingItemState({
                                        ...editingItemState,
                                        extra: { ...editingItemState.extra, conduta: e.target.value }
                                      })}
                                      className="w-full px-2.5 py-1 text-xs border rounded-lg bg-white dark:bg-slate-900 text-slate-855 dark:text-slate-200 border-slate-250 dark:border-slate-700 outline-none"
                                    />
                                    <div className="flex gap-1 justify-end">
                                      <button 
                                        type="button"
                                        onClick={() => {
                                          const newBlocos = [...(activeConsult.blocos || [])];
                                          const updatedAlerts = [...(block.alertas || [])];
                                          updatedAlerts[alertIdx] = {
                                            texto: editingItemState.value,
                                            gravidade: editingItemState.extra?.gravidade || 'yellow',
                                            conduta: editingItemState.extra?.conduta || ''
                                          };
                                          newBlocos[blockIdx].alertas = updatedAlerts;
                                          setConsults(prev => prev.map(c => c.id === selectedId ? { ...c, blocos: newBlocos } : c));
                                          setEditingItemState(null);
                                        }}
                                        className="p-1.5 bg-green-500 text-white rounded-lg"
                                      >
                                        <Check className="h-3.5 w-3.5" />
                                      </button>
                                      <button 
                                        type="button"
                                        onClick={() => setEditingItemState(null)}
                                        className="p-1.5 bg-red-500 text-white rounded-lg"
                                      >
                                        <X className="h-3.5 w-3.5" />
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-start gap-2.5 cursor-pointer flex-1" onClick={() => toggleCheck(block.id, alertIdx.toString())}>
                                      <button type="button" className="mt-0.5 shrink-0">
                                        {checked 
                                          ? <CheckSquare className={`h-4.5 w-4.5 ${alertItem.gravidade === 'red' ? 'text-red-600' : 'text-amber-500'}`} /> 
                                          : <Square className="h-4.5 w-4.5 text-slate-400 dark:text-slate-600" />
                                        }
                                      </button>
                                      <div className="flex-1 text-left font-semibold">
                                        <span className={`inline-flex px-1.5 py-0.5 rounded text-[7.5px] font-black uppercase tracking-wider ${
                                          alertItem.gravidade === 'red'
                                            ? 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-950/40 dark:text-red-200'
                                            : 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-200'
                                        }`}>
                                          {alertItem.gravidade === 'red' ? 'Grave' : 'Atenção'}
                                        </span>
                                        <p className={`text-[11.5px] font-bold leading-tight mt-1 ${checked ? 'text-slate-850 dark:text-slate-200' : 'text-slate-700 dark:text-slate-355'}`}>
                                          {alertItem.texto}
                                        </p>
                                      </div>
                                    </div>

                                    {isEditing && (
                                      <div className="flex gap-1 opacity-0 group-hover/alert:opacity-100 transition-opacity shrink-0">
                                        <button
                                          type="button"
                                          onClick={() => setEditingItemState({
                                            blockId: block.id,
                                            index: alertIdx,
                                            value: alertItem.texto,
                                            extra: { gravidade: alertItem.gravidade, conduta: alertItem.conduta }
                                          })}
                                          className="p-0.5 text-slate-400 hover:text-indigo-600"
                                        >
                                          <Edit3 className="h-3 w-3" />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const newBlocos = [...(activeConsult.blocos || [])];
                                            newBlocos[blockIdx].alertas = (block.alertas || []).filter((_, i) => i !== alertIdx);
                                            setConsults(prev => prev.map(c => c.id === selectedId ? { ...c, blocos: newBlocos } : c));
                                          }}
                                          className="p-0.5 text-rose-500 hover:text-rose-600"
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                )}

                                {checked && alertItem.conduta && (
                                  <div className={`p-2.5 rounded-xl border text-[10px] leading-relaxed font-semibold text-left ${
                                    alertItem.gravidade === 'red'
                                      ? 'bg-red-500/5 border-red-500/20 text-red-800 dark:text-red-300'
                                      : 'bg-amber-500/5 border-amber-500/20 text-amber-800 dark:text-amber-300'
                                  }`}>
                                    <span className="font-extrabold uppercase block mb-0.5">Conduta de Retaguarda:</span>
                                    {alertItem.conduta}
                                  </div>
                                )}
                              </div>
                            );
                          })}

                          {(block.alertas || []).length === 0 && (
                            <p className="text-[11px] text-slate-400 italic text-center py-2">Nenhum sinal de alerta cadastrado.</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Block Content: Texto livre */}
                    {block.tipo === 'texto' && (
                      <div className="space-y-3">
                        {isEditing ? (
                          <textarea
                            rows={4}
                            value={block.conteudo || ''}
                            onChange={e => {
                              const newBlocos = [...(activeConsult.blocos || [])];
                              newBlocos[blockIdx].conteudo = e.target.value;
                              setConsults(prev => prev.map(c => c.id === selectedId ? { ...c, blocos: newBlocos } : c));
                            }}
                            className="w-full text-xs p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900 focus:outline-none text-slate-800 dark:text-slate-200"
                            placeholder="Digite o conteúdo da seção..."
                          />
                        ) : (
                          <p className="text-xs text-slate-650 leading-relaxed font-medium whitespace-pre-wrap text-left dark:text-slate-350">
                            {block.conteudo || 'Nenhum conteúdo nesta seção.'}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Block Content: Calculadora */}
                    {block.tipo === 'calculadora' && (
                      <div className="space-y-4">
                        {isEditing ? (
                          <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-150 dark:border-slate-700/50 space-y-3 text-left">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                              <div>
                                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 block">Calculadora Selecionada</span>
                                <span className="text-sm font-bold text-slate-705 dark:text-slate-200">
                                  {block.calculadoraId 
                                    ? (getCalculatorById(block.calculadoraId)?.name || `ID: ${block.calculadoraId}`) 
                                    : 'Nenhuma calculadora selecionada'}
                                </span>
                              </div>
                              
                              <div className="w-full sm:w-auto">
                                <select
                                  value={block.calculadoraId || ''}
                                  onChange={e => {
                                    const newBlocos = [...(activeConsult.blocos || [])];
                                    newBlocos[blockIdx].calculadoraId = e.target.value;
                                    const calc = getCalculatorById(e.target.value);
                                    if (calc && (!newBlocos[blockIdx].titulo || newBlocos[blockIdx].titulo.startsWith('Calculadora') || newBlocos[blockIdx].titulo.startsWith('Nova Seção') || newBlocos[blockIdx].titulo.startsWith('Nova Lista'))) {
                                      newBlocos[blockIdx].titulo = calc.name;
                                    }
                                    setConsults(prev => prev.map(c => c.id === selectedId ? { ...c, blocos: newBlocos } : c));
                                  }}
                                  className="w-full sm:w-64 px-3 py-2 text-xs rounded-xl border border-slate-250 bg-white dark:bg-slate-955 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-100"
                                >
                                  <option value="">-- Selecione uma Calculadora --</option>
                                  {getCalculators().map(c => (
                                    <option key={c.id} value={c.id}>
                                      {c.name} ({c.category})
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        ) : (
                          block.calculadoraId ? (
                            <div className="w-full text-left">
                              <EmbeddedCalculator
                                node={{
                                  id: block.id,
                                  tipo: 'calculadora',
                                  texto: block.titulo || 'Calculadora',
                                  calculadoraId: block.calculadoraId
                                }}
                                savedState={calculatorStates[`${selectedId}_${block.id}`]}
                                onSaveResult={(nodeId, inputs, result) => {
                                  setCalculatorStates((prev: any) => ({
                                    ...prev,
                                    [`${selectedId}_${block.id}`]: { inputs, result }
                                  }));
                                }}
                                onNavigate={() => {}}
                              />
                            </div>
                          ) : (
                            <p className="text-xs text-slate-500 italic py-2 text-center">Nenhuma calculadora configurada nesta seção.</p>
                          )
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Add New Section triggers */}
              {isEditing && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 p-5 border border-dashed border-slate-200 dark:border-slate-750 rounded-3xl bg-slate-50/30 dark:bg-slate-900/10">
                  <span className="text-xs font-extrabold text-slate-450 uppercase tracking-wider">Adicionar Nova Seção:</span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleAddBlock('checklist')}
                      className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-650 text-xs font-bold rounded-xl transition dark:bg-indigo-950/40 dark:text-indigo-300 flex items-center gap-1.5"
                    >
                      <CheckSquare className="h-3.5 w-3.5" />
                      Checklist Simples
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddBlock('destaque')}
                      className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-655 text-xs font-bold rounded-xl transition dark:bg-amber-950/40 dark:text-amber-300 flex items-center gap-1.5"
                    >
                      <AlertTriangle className="h-3.5 w-3.5" />
                      Alertas Clínicos
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddBlock('texto')}
                      className="px-3.5 py-2 bg-sky-50 hover:bg-sky-100 text-sky-650 text-xs font-bold rounded-xl transition dark:bg-sky-950/40 dark:text-sky-300 flex items-center gap-1.5"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      Texto Livre
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddBlock('calculadora')}
                      className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-655 text-xs font-bold rounded-xl transition dark:bg-rose-950/40 dark:text-rose-300 flex items-center gap-1.5"
                    >
                      <Calculator className="h-3.5 w-3.5" />
                      Calculadora
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CLINIC NOTES & REPORT COPIER CARD */}
          {activeConsult && (
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-6 shadow-sm space-y-4">
              <div className="space-y-2">
                <h3 className="font-extrabold text-sm text-slate-855 dark:text-slate-200">Anotações do Prontuário</h3>
                <textarea
                  placeholder="Particularidades adicionais, conduta medicamentosa definida..."
                  rows={4}
                  className="w-full text-xs p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 resize-none"
                  value={notesState[selectedId] || ''}
                  onChange={e => setNotesState({ ...notesState, [selectedId]: e.target.value })}
                />
              </div>

              {/* Copier & Reset Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleCopyToClipboard}
                  className={`inline-flex items-center justify-center gap-1.5 py-3 rounded-xl font-bold text-xs shadow-sm transition ${themeClasses.btnPrimary}`}
                >
                  <Copy className="h-4 w-4" />
                  Copiar Prontuário (Texto)
                </button>
                
                <button
                  type="button"
                  onClick={handleResetChecklistConfirm}
                  className="inline-flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-650 dark:bg-slate-700 dark:hover:bg-slate-650 dark:text-slate-300 transition"
                >
                  <RotateCcw className="h-4 w-4" />
                  Zerar Controles
                </button>
              </div>

              {/* Recommendation Notice */}
              {isEditing ? (
                <div className="space-y-1 pt-1">
                  <label className="text-[10px] uppercase font-black text-slate-400">Aprazamento Recomendado:</label>
                  <input
                    type="text"
                    value={activeConsult.proxima || ''}
                    onChange={e => setConsults(prev => prev.map(c => c.id === selectedId ? { ...c, proxima: e.target.value } : c))}
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50/50 dark:bg-slate-900 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none"
                    placeholder="Ex: Em 2 meses, Sob demanda..."
                  />
                </div>
              ) : (
                activeConsult.proxima && (
                  <div className="text-[10px] bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-700 p-3 rounded-2xl text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                    <span className="font-extrabold text-slate-700 dark:text-slate-350 block uppercase text-[8px] tracking-wider mb-0.5">Aprazamento Recomendado:</span>
                    Próxima reavaliação sugerida em: <strong className="text-slate-800 dark:text-slate-200">{activeConsult.proxima}</strong>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN REMOVED IN DYNAMIC BLOCKS UPGRADE */}
        {false && (
        <div className="lg:col-span-3 space-y-6">
          
          {/* SINAIS DE ALERTA CARD (WITH CRITICAL ACTION ADVICE ON SELECTION) */}
          {activeConsult && (
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-5 shadow-sm space-y-4">
              <div className="pb-2 border-b border-slate-100 dark:border-slate-700">
                <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <AlertTriangle className="h-4.5 w-4.5 text-rose-500 animate-pulse" />
                  Sinais de Alerta Críticos
                </h3>
              </div>

              {/* Add Alerta Trigger (Admin Only) */}
              {isEditing && (
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2.5">
                  <input
                    type="text"
                    placeholder="Descrição do sinal de alerta..."
                    value={newAlertaText}
                    onChange={e => setNewAlertaText(e.target.value)}
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-850 dark:text-slate-200 focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <select
                      value={newAlertaGravidade}
                      onChange={e => setNewAlertaGravidade(e.target.value as any)}
                      className="flex-1 p-1.5 text-xs border rounded-xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-700 text-slate-750 dark:text-slate-350"
                    >
                      <option value="yellow">Amarelo (Moderado)</option>
                      <option value="red">Vermelho (Urgente)</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    placeholder="Conduta recomendada..."
                    value={newAlertaConduta}
                    onChange={e => setNewAlertaConduta(e.target.value)}
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-850 dark:text-slate-200 focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      if (newAlertaText.trim()) {
                        handleAddNewItem('alertas', {
                          texto: newAlertaText.trim(),
                          gravidade: newAlertaGravidade,
                          conduta: newAlertaConduta.trim()
                        });
                        setNewAlertaText('');
                        setNewAlertaConduta('');
                      }
                    }}
                    className={`w-full py-1.5 rounded-xl font-bold text-xs ${themeClasses.btnPrimary}`}
                  >
                    Adicionar Alerta
                  </button>
                </div>
              )}

              {/* Alerts List */}
              <div className="space-y-3">
                {(activeConsult.alertas || []).map((alerta, idx) => {
                  const checked = isChecked('alertas', idx.toString());
                  const isItemEditing = editingItemPath?.section === 'alertas' && editingItemPath.index === idx;

                  return (
                    <div 
                      key={idx} 
                      className={`p-3 rounded-2xl border transition space-y-2 group/alert ${
                        checked 
                          ? alerta.gravidade === 'red'
                            ? 'bg-red-500/10 border-red-500/35 dark:bg-red-950/20 dark:border-red-900/35'
                            : 'bg-amber-500/10 border-amber-500/35 dark:bg-amber-950/20 dark:border-amber-900/35'
                          : 'bg-white border-slate-100 dark:bg-slate-805 dark:border-slate-750'
                      }`}
                    >
                      {isItemEditing ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editingItemPath.value}
                            onChange={e => setEditingItemPath({ ...editingItemPath, value: e.target.value })}
                            className="w-full px-2.5 py-1 text-xs border rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-250 dark:border-slate-700"
                          />
                          <div className="flex gap-2">
                            <select
                              value={editingItemPath.gravidade || 'yellow'}
                              onChange={e => setEditingItemPath({ ...editingItemPath, gravidade: e.target.value as any })}
                              className="p-1 text-xs border rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-250 dark:border-slate-700 flex-1"
                            >
                              <option value="yellow">Amarelo</option>
                              <option value="red">Vermelho</option>
                            </select>
                          </div>
                          <input
                            type="text"
                            placeholder="Conduta..."
                            value={editingItemPath.conduta || ''}
                            onChange={e => setEditingItemPath({ ...editingItemPath, conduta: e.target.value })}
                            className="w-full px-2.5 py-1 text-xs border rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-250 dark:border-slate-700"
                          />
                          <div className="flex gap-1 justify-end">
                            <button 
                              onClick={() => handleSaveEditedItem(editingItemPath.value, { gravidade: editingItemPath.gravidade, conduta: editingItemPath.conduta })}
                              className="p-1 bg-green-500 text-white rounded"
                            >
                              <Check className="h-3 w-3" />
                            </button>
                            <button 
                              onClick={() => setEditingItemPath(null)}
                              className="p-1 bg-red-500 text-white rounded"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between gap-1">
                          <div className="flex items-start gap-2.5 cursor-pointer flex-1" onClick={() => toggleCheck('alertas', idx.toString())}>
                            <button type="button" className="mt-0.5 shrink-0">
                              {checked 
                                ? <CheckSquare className={`h-4.5 w-4.5 ${alerta.gravidade === 'red' ? 'text-red-600' : 'text-amber-500'}`} /> 
                                : <Square className="h-4.5 w-4.5 text-slate-400 dark:text-slate-600" />
                              }
                            </button>
                            <div className="flex-1">
                              <span className={`inline-flex px-1.5 py-0.5 rounded text-[7.5px] font-black uppercase tracking-wider ${
                                alerta.gravidade === 'red'
                                  ? 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-950/40 dark:text-red-200'
                                  : 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-200'
                              }`}>
                                {alerta.gravidade === 'red' ? 'Grave' : 'Atenção'}
                              </span>
                              <p className={`text-[11.5px] font-bold leading-tight mt-1 ${checked ? 'text-slate-850 dark:text-slate-200' : 'text-slate-700 dark:text-slate-350'}`}>
                                {alerta.texto}
                              </p>
                            </div>
                          </div>

                          {/* Admin editing */}
                          {isEditing && !isItemEditing && (
                            <div className="flex gap-1 opacity-0 group-hover/alert:opacity-100 transition-opacity shrink-0">
                              <button
                                onClick={() => startEditingItem('alertas', idx, alerta.texto, { gravidade: alerta.gravidade, conduta: alerta.conduta })}
                                className="p-0.5 text-slate-400 hover:text-indigo-600"
                              >
                                <Edit3 className="h-3 w-3" />
                              </button>
                              <button
                                onClick={() => handleDeleteListItem('alertas', idx)}
                                className="p-0.5 text-rose-500 hover:text-rose-600"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Display Clinician Action Callout on Alert active selection */}
                      {checked && alerta.conduta && (
                        <div className={`p-2.5 rounded-xl border text-[10px] leading-relaxed font-semibold ${
                          alerta.gravidade === 'red'
                            ? 'bg-red-500/5 border-red-500/20 text-red-800 dark:text-red-300'
                            : 'bg-amber-500/5 border-amber-500/20 text-amber-800 dark:text-amber-300'
                        }`}>
                          <span className="font-extrabold uppercase block mb-0.5">Conduta de Retaguarda:</span>
                          {alerta.conduta}
                        </div>
                      )}
                    </div>
                  );
                })}

                {(activeConsult.alertas || []).length === 0 && (
                  <p className="text-[11px] text-slate-400 italic text-center py-2">Nenhum sinal de alerta cadastrado.</p>
                )}
              </div>
            </div>
          )}

          {/* ORIENTAÇÕES CARD */}
          {activeConsult && (
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-5 shadow-sm space-y-4">
              <div className="pb-2 border-b border-slate-100 dark:border-slate-700">
                <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <Info className="h-4.5 w-4.5 text-sky-500" />
                  Orientações Clínicas
                </h3>
              </div>

              {/* Add Orientação Trigger (Admin Only) */}
              {isEditing && (
                <div className="flex gap-2 bg-slate-50 dark:bg-slate-900 p-2 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <input
                    type="text"
                    placeholder="Adicionar orientação..."
                    value={newOrientacaoText}
                    onChange={e => setNewOrientacaoText(e.target.value)}
                    className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-2 py-1 text-[11px] text-slate-850 dark:text-slate-200 focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      if (newOrientacaoText.trim()) {
                        handleAddNewItem('orientacoes', newOrientacaoText.trim());
                        setNewOrientacaoText('');
                      }
                    }}
                    className={`p-1.5 rounded-xl font-bold text-xs ${themeClasses.btnPrimary}`}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* Orientações Checklist */}
              <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                {(activeConsult.orientacoes || []).map((item, idx) => {
                  const checked = isChecked('orientacoes', idx.toString());
                  const isItemEditing = editingItemPath?.section === 'orientacoes' && editingItemPath.index === idx;

                  return (
                    <div 
                      key={idx} 
                      className={`p-2.5 rounded-2xl border transition flex items-start justify-between gap-2.5 group ${
                        checked 
                          ? 'bg-slate-50/50 border-slate-150 dark:bg-slate-900/50 dark:border-slate-750 opacity-80' 
                          : 'bg-white border-slate-100 dark:bg-slate-805 dark:border-slate-750'
                      }`}
                    >
                      {isItemEditing ? (
                        <div className="flex items-center gap-1.5 flex-1">
                          <input
                            type="text"
                            value={editingItemPath.value}
                            onChange={e => setEditingItemPath({ ...editingItemPath, value: e.target.value })}
                            className="flex-1 px-2 py-0.5 text-[11px] border rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-250 dark:border-slate-700"
                          />
                          <button 
                            onClick={() => handleSaveEditedItem(editingItemPath.value)}
                            className="p-1 bg-green-500 text-white rounded"
                          >
                            <Check className="h-3 w-3" />
                          </button>
                          <button 
                            onClick={() => setEditingItemPath(null)}
                            className="p-1 bg-red-500 text-white rounded"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-start gap-2.5 cursor-pointer flex-1" onClick={() => toggleCheck('orientacoes', idx.toString())}>
                          <button type="button" className="mt-0.5 shrink-0">
                            {checked 
                              ? <CheckSquare className={`h-4 w-4 ${themeClasses.checkAccent}`} /> 
                              : <Square className="h-4 w-4 text-slate-400 dark:text-slate-600" />
                            }
                          </button>
                          <p className={`text-[11px] font-bold leading-relaxed ${checked ? 'text-slate-500 dark:text-slate-500 line-through' : 'text-slate-700 dark:text-slate-350'}`}>
                            {item}
                          </p>
                        </div>
                      )}

                      {/* Admin edit controls */}
                      {isEditing && !isItemEditing && (
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                          <button
                            onClick={() => startEditingItem('orientacoes', idx, item)}
                            className="p-0.5 text-slate-400 hover:text-indigo-600"
                          >
                            <Edit3 className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteListItem('orientacoes', idx)}
                            className="p-0.5 text-rose-500 hover:text-rose-600"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}

                {(activeConsult.orientacoes || []).length === 0 && (
                  <p className="text-[11px] text-slate-400 italic text-center py-2">Nenhuma orientação recomendada.</p>
                )}
              </div>
            </div>
          )}

          {/* CLINIC NOTES & REPORT COPIER CARD */}
          {activeConsult && (
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-5 shadow-sm space-y-4">
              <div className="space-y-1.5">
                <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">Anotações do Prontuário</h3>
                <textarea
                  placeholder="Particularidades adicionais, conduta medicamentosa definida..."
                  rows={4}
                  className="w-full text-xs p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 resize-none"
                  value={notesState[selectedId] || ''}
                  onChange={e => setNotesState({ ...notesState, [selectedId]: e.target.value })}
                />
              </div>

              {/* Copier & Reset Actions */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={handleCopyToClipboard}
                  className={`w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold text-xs shadow-sm transition ${themeClasses.btnPrimary}`}
                >
                  <Copy className="h-4 w-4" />
                  Copiar Prontuário (Texto)
                </button>
                
                <button
                  type="button"
                  onClick={handleResetChecklistConfirm}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-700 dark:hover:bg-slate-650 dark:text-slate-300 transition"
                >
                  <RotateCcw className="h-4 w-4" />
                  Zerar Controles
                </button>
              </div>

              {/* Recommendation Notice */}
              {isEditing ? (
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-slate-400">Aprazamento Recomendado:</label>
                  <input
                    type="text"
                    value={activeConsult.proxima || ''}
                    onChange={e => setConsults(prev => prev.map(c => c.id === selectedId ? { ...c, proxima: e.target.value } : c))}
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50/50 dark:bg-slate-900 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none"
                    placeholder="Ex: Em 2 meses, Sob demanda..."
                  />
                </div>
              ) : (
                activeConsult.proxima && (
                  <div className="text-[10px] bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-700 p-2.5 rounded-xl text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                    <span className="font-extrabold text-slate-700 dark:text-slate-350 block uppercase text-[8px] tracking-wider mb-0.5">Aprazamento Recomendado:</span>
                    Próxima reavaliação sugerida em: <strong className="text-slate-800 dark:text-slate-200">{activeConsult.proxima}</strong>
                  </div>
                )
              )}
            </div>
          )}

        </div>
        )}

      </div>

      {/* 3. DIALOG MODAL: ADD BRAND NEW CONSULT FORM */}
      {isAddingConsult && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl p-6 text-left space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Criar Nova Consulta</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Adicione uma nova etapa cronológica ao roteiro. Você poderá preencher as diretrizes correspondentes em seguida.</p>
            
            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase font-black text-slate-400">Rótulo (Obrigatório)*</label>
                <input
                  type="text"
                  placeholder="Ex: Consulta de 2 Meses, Diretriz 3"
                  value={newConsultForm.rotulo}
                  onChange={e => setNewConsultForm({ ...newConsultForm, rotulo: e.target.value })}
                  className="w-full mt-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50/50 dark:bg-slate-900 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-black text-slate-400">Subtítulo (Opcional)</label>
                <input
                  type="text"
                  placeholder="Ex: Foco no aleitamento e imunização..."
                  value={newConsultForm.subtitulo}
                  onChange={e => setNewConsultForm({ ...newConsultForm, subtitulo: e.target.value })}
                  className="w-full mt-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50/50 dark:bg-slate-900 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-black text-slate-400">Próxima Consulta (Opcional)</label>
                <input
                  type="text"
                  placeholder="Ex: Em 2 meses, Sob demanda..."
                  value={newConsultForm.proxima}
                  onChange={e => setNewConsultForm({ ...newConsultForm, proxima: e.target.value })}
                  className="w-full mt-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50/50 dark:bg-slate-900 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-black text-slate-400">ID da Consulta (Opcional, deixe em branco para auto-gerar)</label>
                <input
                  type="text"
                  placeholder="Ex: c_2m"
                  value={newConsultForm.id}
                  onChange={e => setNewConsultForm({ ...newConsultForm, id: e.target.value })}
                  className="w-full mt-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50/50 dark:bg-slate-900 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => setIsAddingConsult(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl dark:bg-slate-800 dark:text-slate-300 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateConsult}
                className={`px-4 py-2 rounded-xl font-bold text-xs ${themeClasses.btnPrimary}`}
              >
                Adicionar Consulta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. DIALOG MODAL: AI PROPOSAL REVIEW COMPARATOR (BEFORE/AFTER) */}
      {isAdmin && isEditing && isAIReviewOpen && aiProposalData && activeConsult && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-5xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header banner */}
            <div className="p-6 bg-gradient-to-r from-indigo-600 via-indigo-500 to-accent-600 text-white flex items-center justify-between shrink-0">
              <div>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-white/20 tracking-wider">
                  Sugestões Estruturadas do Gemini IA
                </span>
                <h3 className="text-lg font-extrabold tracking-tight mt-1">Revisão e Comparação de Dados: {activeConsult.rotulo}</h3>
              </div>
              <button 
                type="button"
                onClick={() => setIsAIReviewOpen(false)}
                className="p-1 px-2.5 rounded-lg bg-white/10 hover:bg-white/20 font-bold transition flex items-center justify-center text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Selector helper toolbar */}
            <div className="p-4 bg-slate-50 border-b border-slate-100 dark:bg-slate-950 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                Selecione quais seções deseja sincronizar, e ajuste os textos propostos se necessário.
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAiSelectedFields({
                    subtitulo: true, anamnese: true, triagens: true, vacinas: true, alertas: true, orientacoes: true, proxima: true
                  })}
                  className="px-2.5 py-1 text-[11px] bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-350 hover:bg-slate-250 rounded transition"
                >
                  Selecionar Tudo
                </button>
                <button
                  type="button"
                  onClick={() => setAiSelectedFields({
                    subtitulo: false, anamnese: false, triagens: false, vacinas: false, alertas: false, orientacoes: false, proxima: false
                  })}
                  className="px-2.5 py-1 text-[11px] bg-slate-150 dark:bg-slate-805 font-bold text-slate-700 dark:text-slate-350 hover:bg-slate-250 rounded transition"
                >
                  Desmarcar Tudo
                </button>
              </div>
            </div>

            {/* Compare Content (Diff lists) */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-left font-sans">
              
              {/* Field: Subtítulo */}
              <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/40">
                <div className="flex items-center gap-3.5 mb-3">
                  <input
                    type="checkbox"
                    checked={aiSelectedFields.subtitulo}
                    onChange={(e) => setAiSelectedFields({ ...aiSelectedFields, subtitulo: e.target.checked })}
                    className="h-4 w-4 text-indigo-600 border-slate-300 focus:ring-indigo-500 rounded cursor-pointer"
                    id="chk-subtitulo"
                  />
                  <label htmlFor="chk-subtitulo" className="text-xs font-extrabold uppercase tracking-widest text-slate-800 dark:text-slate-300 cursor-pointer select-none">
                    Objetivo / Subtítulo da Consulta
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl dark:bg-slate-900 dark:border-slate-800">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Antes:</span>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 leading-snug">{activeConsult.subtitulo || "Sem subtítulo ativo."}</p>
                  </div>
                  <div className="p-3 bg-indigo-50/40 border border-indigo-100/80 rounded-xl dark:bg-indigo-950/20 dark:border-indigo-900/35">
                    <span className="text-[9px] uppercase font-bold text-indigo-500 block mb-1">PropostaIA (Editar):</span>
                    <textarea
                      value={aiProposalData.subtitulo || ''}
                      onChange={(e) => setAiProposalData({ ...aiProposalData, subtitulo: e.target.value })}
                      className="w-full text-xs p-2 bg-white border border-indigo-150 rounded-lg outline-none text-slate-800 dark:bg-slate-950/40 dark:text-slate-200"
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {/* Field: Anamnese */}
              <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/40">
                <div className="flex items-center gap-3.5 mb-3">
                  <input
                    type="checkbox"
                    checked={aiSelectedFields.anamnese}
                    onChange={(e) => setAiSelectedFields({ ...aiSelectedFields, anamnese: e.target.checked })}
                    className="h-4 w-4 text-indigo-600 border-slate-300 focus:ring-indigo-500 rounded cursor-pointer"
                    id="chk-anamnese"
                  />
                  <label htmlFor="chk-anamnese" className="text-xs font-extrabold uppercase tracking-widest text-slate-800 dark:text-slate-300 cursor-pointer select-none">
                    Tópicos de Anamnese
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl dark:bg-slate-900 dark:border-slate-800 space-y-1.5">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Antes:</span>
                    {activeConsult.anamnese.map((item, idx) => (
                      <p key={idx} className="text-xs text-slate-600 dark:text-slate-400 font-medium">• {item}</p>
                    ))}
                    {activeConsult.anamnese.length === 0 && <p className="text-xs text-slate-400 italic">Lista vazia.</p>}
                  </div>
                  <div className="p-3 bg-indigo-50/40 border border-indigo-100/80 rounded-xl dark:bg-indigo-950/20 space-y-2">
                    <span className="text-[9px] uppercase font-bold text-indigo-500 block mb-1">PropostaIA (Editar):</span>
                    {aiProposalData.anamnese?.map((item: string, idx: number) => (
                      <div key={idx} className="flex gap-2">
                        <textarea
                          value={item}
                          onChange={(e) => {
                            const updated = [...aiProposalData.anamnese];
                            updated[idx] = e.target.value;
                            setAiProposalData({ ...aiProposalData, anamnese: updated });
                          }}
                          className="flex-1 text-xs p-2 bg-white border border-slate-200 rounded-lg outline-none text-slate-800 dark:bg-slate-950/40 dark:text-slate-200"
                          rows={1}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...aiProposalData.anamnese];
                            updated.splice(idx, 1);
                            setAiProposalData({ ...aiProposalData, anamnese: updated });
                          }}
                          className="p-1 px-2 text-rose-600 bg-white border border-slate-250 rounded-lg flex items-center justify-center font-bold"
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Field: Triagens */}
              <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/40">
                <div className="flex items-center gap-3.5 mb-3">
                  <input
                    type="checkbox"
                    checked={aiSelectedFields.triagens}
                    onChange={(e) => setAiSelectedFields({ ...aiSelectedFields, triagens: e.target.checked })}
                    className="h-4 w-4 text-indigo-600 border-slate-300 focus:ring-indigo-500 rounded cursor-pointer"
                    id="chk-triagens"
                  />
                  <label htmlFor="chk-triagens" className="text-xs font-extrabold uppercase tracking-widest text-slate-800 dark:text-slate-300 cursor-pointer select-none">
                    Roteiro de Triagens e Exames
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl dark:bg-slate-900 dark:border-slate-800 space-y-1.5">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Antes:</span>
                    {activeConsult.triagens.map((item, idx) => (
                      <p key={idx} className="text-xs text-slate-600 dark:text-slate-400 font-medium">• ({item.categoria}) {item.texto}</p>
                    ))}
                    {activeConsult.triagens.length === 0 && <p className="text-xs text-slate-400 italic">Lista vazia.</p>}
                  </div>
                  <div className="p-3 bg-indigo-50/40 border border-indigo-100/80 rounded-xl dark:bg-indigo-950/20 space-y-2">
                    <span className="text-[9px] uppercase font-bold text-indigo-500 block mb-1">PropostaIA (Editar):</span>
                    {aiProposalData.triagens?.map((item: SpecialGuideTriagem, idx: number) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <textarea
                          value={item.texto}
                          onChange={(e) => {
                            const updated = [...aiProposalData.triagens];
                            updated[idx] = { ...item, texto: e.target.value };
                            setAiProposalData({ ...aiProposalData, triagens: updated });
                          }}
                          className="flex-1 text-xs p-2 bg-white border border-slate-200 rounded-lg outline-none text-slate-800 dark:bg-slate-950/40 dark:text-slate-200"
                          rows={1}
                        />
                        <select
                          value={item.categoria}
                          onChange={(e) => {
                            const updated = [...aiProposalData.triagens];
                            updated[idx] = { ...item, categoria: e.target.value };
                            setAiProposalData({ ...aiProposalData, triagens: updated });
                          }}
                          className="p-1.5 text-xs border rounded-lg bg-white dark:bg-slate-900 text-slate-800"
                        >
                          <option value="Geral">Geral</option>
                          <option value="Laboratorial">Lab</option>
                          <option value="Rastreamento">Rastreio</option>
                          <option value="Imagem">Imagem</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...aiProposalData.triagens];
                            updated.splice(idx, 1);
                            setAiProposalData({ ...aiProposalData, triagens: updated });
                          }}
                          className="p-1 px-2 text-rose-600 bg-white border border-slate-250 rounded-lg flex items-center justify-center font-bold"
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Field: Alertas */}
              <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/40">
                <div className="flex items-center gap-3.5 mb-3">
                  <input
                    type="checkbox"
                    checked={aiSelectedFields.alertas}
                    onChange={(e) => setAiSelectedFields({ ...aiSelectedFields, alertas: e.target.checked })}
                    className="h-4 w-4 text-indigo-600 border-slate-300 focus:ring-indigo-500 rounded cursor-pointer"
                    id="chk-alertas"
                  />
                  <label htmlFor="chk-alertas" className="text-xs font-extrabold uppercase tracking-widest text-slate-800 dark:text-slate-300 cursor-pointer select-none">
                    Roteiro de Sinais de Alerta
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl dark:bg-slate-900 dark:border-slate-800 space-y-1.5">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Antes:</span>
                    {activeConsult.alertas.map((item, idx) => (
                      <p key={idx} className="text-xs text-slate-600 dark:text-slate-400 font-medium">• ({item.gravidade}) {item.texto}</p>
                    ))}
                    {activeConsult.alertas.length === 0 && <p className="text-xs text-slate-400 italic">Lista vazia.</p>}
                  </div>
                  <div className="p-3 bg-indigo-50/40 border border-indigo-100/80 rounded-xl dark:bg-indigo-950/20 space-y-2">
                    <span className="text-[9px] uppercase font-bold text-indigo-500 block mb-1">PropostaIA (Editar):</span>
                    {aiProposalData.alertas?.map((item: SpecialGuideAlerta, idx: number) => (
                      <div key={idx} className="space-y-1 p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-850">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={item.texto}
                            onChange={(e) => {
                              const updated = [...aiProposalData.alertas];
                              updated[idx] = { ...item, texto: e.target.value };
                              setAiProposalData({ ...aiProposalData, alertas: updated });
                            }}
                            className="flex-1 text-xs p-1.5 bg-slate-50 border border-slate-200 rounded outline-none text-slate-800 dark:bg-slate-950/40 dark:text-slate-200"
                          />
                          <select
                            value={item.gravidade}
                            onChange={(e) => {
                              const updated = [...aiProposalData.alertas];
                              updated[idx] = { ...item, gravidade: e.target.value as any };
                              setAiProposalData({ ...aiProposalData, alertas: updated });
                            }}
                            className="p-1 text-xs border rounded"
                          >
                            <option value="yellow">Amarelo</option>
                            <option value="red">Vermelho</option>
                          </select>
                        </div>
                        <input
                          type="text"
                          placeholder="Conduta..."
                          value={item.conduta || ''}
                          onChange={(e) => {
                            const updated = [...aiProposalData.alertas];
                            updated[idx] = { ...item, conduta: e.target.value };
                            setAiProposalData({ ...aiProposalData, alertas: updated });
                          }}
                          className="w-full text-xs p-1 bg-slate-50 border border-slate-200 rounded outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Field: Proxima */}
              <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/40">
                <div className="flex items-center gap-3.5 mb-3">
                  <input
                    type="checkbox"
                    checked={aiSelectedFields.proxima}
                    onChange={(e) => setAiSelectedFields({ ...aiSelectedFields, proxima: e.target.checked })}
                    className="h-4 w-4 text-indigo-600 border-slate-300 focus:ring-indigo-500 rounded cursor-pointer"
                    id="chk-proxima"
                  />
                  <label htmlFor="chk-proxima" className="text-xs font-extrabold uppercase tracking-widest text-slate-800 dark:text-slate-300 cursor-pointer select-none">
                    Aprazamento Recomendado (Intervalo)
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl dark:bg-slate-900 dark:border-slate-800">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Antes:</span>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 leading-snug">{activeConsult.proxima || "Sob critério médico."}</p>
                  </div>
                  <div className="p-3 bg-indigo-50/40 border border-indigo-100/80 rounded-xl dark:bg-indigo-950/20 dark:border-indigo-900/35">
                    <span className="text-[9px] uppercase font-bold text-indigo-500 block mb-1">PropostaIA (Editar):</span>
                    <input
                      type="text"
                      value={aiProposalData.proxima || ''}
                      onChange={(e) => setAiProposalData({ ...aiProposalData, proxima: e.target.value })}
                      className="w-full text-xs p-2 bg-white border border-indigo-150 rounded-lg outline-none text-slate-800 dark:bg-slate-950/40 dark:text-slate-200"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom operations */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 dark:bg-slate-950 dark:border-slate-800 flex justify-end gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setIsAIReviewOpen(false)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-250 text-slate-700 font-bold text-xs rounded-xl dark:bg-slate-800 dark:text-slate-300 transition"
              >
                Rejeitar Proposta
              </button>
              <button
                type="button"
                onClick={() => {
                  handleApplyAIProposal();
                  showAlert({
                    title: 'Sugestão Aplicada',
                    message: 'As diretrizes da etapa foram otimizadas e atualizadas de acordo com as propostas do Gemini!',
                    type: 'success'
                  });
                }}
                className={`px-4 py-2 rounded-xl font-bold text-xs ${themeClasses.btnPrimary}`}
              >
                Mesclar e Aplicar Proposta
              </button>
            </div>

          </div>
        </div>
      )}

      {/* standard alerts and confirm modal hooks widgets */}
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
