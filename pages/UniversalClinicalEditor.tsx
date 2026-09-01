import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ArrowRight, Check, Trash2, Plus, ArrowUp, ArrowDown, 
  AlertTriangle, CheckSquare, Square, Layers, BookOpen, HelpCircle, 
  ListPlus, Edit3, Save, PlaySquare, Map, RefreshCw, Info, AlertCircle, CheckCircle2,
  Sparkles, Loader2, ChevronRight, Calendar
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Protocolo, ProtocoloNo, ProtocoloOpcao, ProtocoloChecklistItem, SpecialConsultItem } from '../types';
import { getCalculators, getCalculatorById } from '../services/calculatorService';
import { AIAutofillWidget } from '../components/AIAutofillWidget';
import { motion, AnimatePresence } from 'motion/react';
import { AlertModal, ConfirmModal } from '../components/ui/Modal';
import { useConfirmModal, useAlertModal } from '../hooks/useModal';
import { ReviewIntervalSelector } from '../components/ReviewIntervalSelector';
import { ProtocolFlowchart } from '../components/ProtocolFlowchart';
import { generateCustomSpecialSectionFromIA } from '../services/geminiService';
import { UniversalBlockEditor } from '../components/UniversalBlockEditor';
import { migrateConsultsArrayToBlocks, migrateConsultItemToBlocks } from '../services/blockMigration';
import { getProtocols } from '../services/protocolsService';

interface UniversalClinicalEditorProps {
  protocol: Protocolo | null;
  existingCategories: string[];
  onSave: (editedProtocol: Protocolo) => void;
  onCancel: () => void;
}

export const UniversalClinicalEditor: React.FC<UniversalClinicalEditorProps> = ({
  protocol,
  existingCategories,
  onSave,
  onCancel
}) => {
  const availableProtocols = getProtocols();
  const calculators = getCalculators();
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

  // --- STEPS ENGINE ---
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // --- STEP 1: INFO GENERAL ---
  const [titulo, setTitulo] = useState(protocol?.titulo || '');
  const [categoria, setCategoria] = useState(protocol?.categoria || '');
  const [customCategoria, setCustomCategoria] = useState('');
  const [descricao, setDescricao] = useState(protocol?.descricao || '');
  const [status, setStatus] = useState<'completo' | 'construcao'>(protocol?.status || 'construcao');
  const [customReviewIntervalMonths, setCustomReviewIntervalMonths] = useState<number | undefined>(
    protocol?.customReviewIntervalMonths
  );
  const [isSpecial, setIsSpecial] = useState<boolean>(protocol?.isSpecial || false);
  const [specialType, setSpecialType] = useState<'flow' | 'cronograma'>(protocol?.specialType || 'flow');
  const [consultas, setConsultas] = useState<SpecialConsultItem[]>(() => {
    if (protocol?.consultas && Array.isArray(protocol.consultas) && protocol.consultas.length > 0) {
      return migrateConsultsArrayToBlocks(JSON.parse(JSON.stringify(protocol.consultas)));
    }
    return [
      {
        id: 'consulta-inicial',
        idade: 'Primeira Consulta',
        subtitulo: 'Investigação inicial, acolhimento e rastreamento básico',
        blocos: [
          {
            id: 'init-text-1',
            tipo: 'texto',
            titulo: 'Orientações Gerais da Consulta',
            conteudo: 'Investigação inicial, acolhimento e rastreamento básico de sinais clínicos.'
          },
          {
            id: 'init-check-1',
            tipo: 'checklist',
            titulo: 'Anamnese & Histórico Clínico',
            itens: [
              'Quais os principais sintomas relatados pelo paciente?',
              'Há fatores desencadeantes ou agravantes identificados?',
              'Qual o histórico familiar e pessoal para esta condição?'
            ]
          },
          {
            id: 'init-check-2',
            tipo: 'checklist',
            titulo: 'Exame Físico e Triagem Inicial',
            itens: [
              'Avaliação detalhada dos sinais vitais e parâmetros básicos'
            ]
          },
          {
            id: 'init-check-3',
            tipo: 'checklist',
            titulo: 'Recomendações e Condutas Clínicas',
            itens: [
              'Recomendações vacinais profiláticas pertinentes',
              'Exames de triagem e painel inicial sugeridos',
              'Explicar tratamento proposto, riscos de piora e sinais de alerta'
            ]
          },
          {
            id: 'init-text-2',
            tipo: 'texto',
            titulo: 'Retorno e Seguimento',
            conteudo: 'Procurar acompanhamento em 30 dias ou conforme evolução clínica.'
          }
        ]
      }
    ];
  });
  const [activeConsultId, setActiveConsultId] = useState<string | null>(null);

  useEffect(() => {
    if (consultas.length > 0 && !activeConsultId) {
      setActiveConsultId(consultas[0].id);
    }
  }, [consultas, activeConsultId]);

  const activeConsult = consultas.find(c => c.id === activeConsultId) || null;

  // --- CRONOGRAMA STATE ACTIONS & TRANSIENT INPUTS ---
  const [newAnamneseInput, setNewAnamneseInput] = useState('');
  const [newDevText, setNewDevText] = useState('');
  const [newDevCat, setNewDevCat] = useState<'Grossa' | 'Fina' | 'Linguagem' | 'Social' | 'Geral'>('Geral');
  const [newVacinaInput, setNewVacinaInput] = useState('');
  const [newTriagemInput, setNewTriagemInput] = useState('');
  const [newOrientacaoInput, setNewOrientacaoInput] = useState('');

  useEffect(() => {
    setNewAnamneseInput('');
    setNewDevText('');
    setNewDevCat('Geral');
    setNewVacinaInput('');
    setNewTriagemInput('');
    setNewOrientacaoInput('');
  }, [activeConsultId]);

  const handleAddConsultation = () => {
    const newId = `consult-${Date.now()}`;
    const newConsult: SpecialConsultItem = {
      id: newId,
      idade: `Nova Consulta ${consultas.length + 1}`,
      subtitulo: 'Acolhimento e objetivos clínicos gerais',
      blocos: [
        {
          id: `new-text-${Date.now()}`,
          tipo: 'texto',
          titulo: 'Meta e Subtítulo da Consulta',
          conteudo: 'Acolhimento e objetivos clínicos gerais.'
        },
        {
          id: `new-check-${Date.now()}`,
          tipo: 'checklist',
          titulo: 'Avaliação Inicial',
          itens: [
            'Quais os principais sintomas ou queixas reportados?',
            'Avaliação de parâmetros clínicos básicos'
          ]
        },
        {
          id: `new-ori-${Date.now()}`,
          tipo: 'checklist',
          titulo: 'Orientações & Recomendações',
          itens: [
            'Explicar condutas clínicas propostas'
          ]
        }
      ]
    };
    setConsultas([...consultas, newConsult]);
    setActiveConsultId(newId);
  };

  const handleDeleteConsultation = async (id: string, name: string) => {
    const confirmed = await requestConfirm({
      title: 'Excluir Consulta',
      message: `Deseja realmente remover a consulta "${name}" deste cronograma especial? Esta ação é irreversível.`,
      variant: 'danger'
    });

    if (confirmed) {
      const remaining = consultas.filter(c => c.id !== id);
      setConsultas(remaining);
      if (activeConsultId === id) {
        setActiveConsultId(remaining.length > 0 ? remaining[0].id : null);
      }
      showAlert({
        title: 'Consulta Excluída',
        message: 'Consulta removida com sucesso.',
        type: 'success'
      });
    }
  };

  const handleMoveConsultation = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === consultas.length - 1) return;
    
    const nextIdx = direction === 'up' ? index - 1 : index + 1;
    const copy = [...consultas];
    const temp = copy[index];
    copy[index] = copy[nextIdx];
    copy[nextIdx] = temp;
    setConsultas(copy);
  };

  const updateActiveConsult = (updated: Partial<SpecialConsultItem>) => {
    if (!activeConsultId) return;
    setConsultas(prev => prev.map(c => c.id === activeConsultId ? { ...c, ...updated } : c));
  };

  const addStringItem = (field: 'anamnese' | 'vacinas' | 'triagens' | 'orientacoes', value: string) => {
    if (!activeConsult || !value.trim()) return;
    const array = activeConsult[field] || [];
    updateActiveConsult({ [field]: [...array, value.trim()] });
  };

  const removeStringItem = (field: 'anamnese' | 'vacinas' | 'triagens' | 'orientacoes', index: number) => {
    if (!activeConsult) return;
    const array = activeConsult[field] || [];
    updateActiveConsult({ [field]: array.filter((_, idx) => idx !== index) });
  };

  const editStringItem = (field: 'anamnese' | 'vacinas' | 'triagens' | 'orientacoes', index: number, newValue: string) => {
    if (!activeConsult) return;
    const array = activeConsult[field] || [];
    const updatedArray = array.map((item, idx) => idx === index ? newValue : item);
    updateActiveConsult({ [field]: updatedArray });
  };

  const addDevItem = (texto: string, categoria: 'Grossa' | 'Fina' | 'Linguagem' | 'Social' | 'Geral') => {
    if (!activeConsult || !texto.trim()) return;
    const array = activeConsult.desenvolvimento || [];
    updateActiveConsult({ desenvolvimento: [...array, { texto: texto.trim(), categoria }] });
  };

  const removeDevItem = (index: number) => {
    if (!activeConsult) return;
    const array = activeConsult.desenvolvimento || [];
    updateActiveConsult({ desenvolvimento: array.filter((_, idx) => idx !== index) });
  };

  const editDevItem = (index: number, updatedItem: Partial<{ texto: string, categoria: 'Grossa' | 'Fina' | 'Linguagem' | 'Social' | 'Geral' }>) => {
    if (!activeConsult) return;
    const array = activeConsult.desenvolvimento || [];
    const updatedArray = array.map((item, idx) => idx === index ? { ...item, ...updatedItem } : item);
    updateActiveConsult({ desenvolvimento: updatedArray });
  };

  // --- GEMINI CORE AUTOFILL TRIGGER FOR CRONOGRAMA CONSULTATION ---
  const [aiProposal, setAiProposal] = useState<SpecialConsultItem | null>(null);
  const [runningAI, setRunningAI] = useState(false);
  const [showAiProposal, setShowAiProposal] = useState(false);

  const handleTriggerAIConsult = async () => {
    if (!activeConsult) return;
    setRunningAI(true);
    try {
      const data = await generateCustomSpecialSectionFromIA(titulo || 'Acompanhamento Clínico Especial', activeConsult.idade);
      if (data) {
        setAiProposal({
          id: activeConsult.id,
          idade: activeConsult.idade,
          subtitulo: data.subtitulo || '',
          anamnese: data.anamnese || [],
          desenvolvimento: data.desenvolvimento || [],
          vacinas: data.vacinas || [],
          triagens: data.triagens || [],
          orientacoes: data.orientacoes || [],
          proxima: data.proxima || ''
        });
        setShowAiProposal(true);
      }
    } catch (err: any) {
      showAlert({
        title: 'Falha no Gemini',
        message: err.message || 'Erro ao gerar diretrizes especiais por IA.',
        type: 'error'
      });
    } finally {
      setRunningAI(false);
    }
  };

  const handleApproveAiProposal = () => {
    if (!aiProposal) return;
    updateActiveConsult({
      subtitulo: aiProposal.subtitulo,
      anamnese: aiProposal.anamnese,
      desenvolvimento: aiProposal.desenvolvimento,
      vacinas: aiProposal.vacinas,
      triagens: aiProposal.triagens,
      orientacoes: aiProposal.orientacoes,
      proxima: aiProposal.proxima
    });
    setShowAiProposal(false);
    setAiProposal(null);
    showAlert({
      title: 'Conteúdo Integrado',
      message: 'As diretrizes acadêmicas propostas pela Inteligência Artificial do Gemini foram mescladas com sucesso nesta consulta.',
      type: 'success'
    });
  };

  // --- STEP 2: NODES ENGINE ---
  const [nos, setNos] = useState<ProtocoloNo[]>(() => {
    if (protocol?.nos) {
      return JSON.parse(JSON.stringify(protocol.nos));
    }
    return [
      {
        id: 'inicio',
        tipo: 'conduta',
        texto: 'Achegada ao leito do paciente e avaliação primária de sinais vitais.',
        subtexto: 'Verificar frequência cardíaca, frequência respiratória, temperatura, oximetria de pulso e nível de consciência.',
        proximo: ''
      }
    ];
  });

  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  // Auto-set the first node as active node if there is any
  useEffect(() => {
    if (nos.length > 0 && !activeNodeId) {
      setActiveNodeId(nos[0].id);
    }
  }, [nos, activeNodeId]);

  const activeNode = nos.find(n => n.id === activeNodeId) || null;

  // Track category selection
  const finalCategory = categoria;

  // --- REFACTOR ID HELPER ---
  const handleRefactorNodeId = (oldId: string, newId: string) => {
    const trimmedNew = newId.trim();
    if (!trimmedNew || oldId === trimmedNew) return;

    // Check uniqueness
    if (nos.some(n => n.id === trimmedNew)) {
      showAlert({
        title: 'ID Duplicado',
        message: 'Atenção: Este ID de etapa já está em uso por outra etapa.',
        type: 'warning'
      });
      return;
    }

    setNos(prev => {
      return prev.map(no => {
        let copy = { ...no };
        if (no.id === oldId) {
          copy.id = trimmedNew;
        }
        if (no.proximo === oldId) {
          copy.proximo = trimmedNew;
        }
        if (no.opcoes) {
          copy.opcoes = no.opcoes.map(op => 
            op.proximo === oldId ? { ...op, proximo: trimmedNew } : op
          );
        }
        return copy;
      });
    });

    if (activeNodeId === oldId) {
      setActiveNodeId(trimmedNew);
    }
  };

  // --- NODE DELETION ---
  const handleDeleteNode = async (idToDelete: string) => {
    if (nos.length <= 1) {
      showAlert({
        title: 'Operação Inválida',
        message: 'Erro: O protocolo deve conter pelo menos uma etapa.',
        type: 'error'
      });
      return;
    }

    // Check who points to this deleted node
    const pointingNodes: string[] = [];
    nos.forEach(n => {
      if (n.id === idToDelete) return;
      if (n.proximo === idToDelete) {
        pointingNodes.push(n.id);
      }
      if (n.opcoes && n.opcoes.some(op => op.proximo === idToDelete)) {
        if (!pointingNodes.includes(n.id)) {
          pointingNodes.push(n.id);
        }
      }
    });

    let confirmMsg = `Deseja realmente excluir a etapa "${idToDelete}"?`;
    if (pointingNodes.length > 0) {
      confirmMsg += `\n\nATENÇÃO: Este nó é o próximo passo para as seguintes etapas: ${pointingNodes.join(', ')}. Suas conexões serão quebradas e redefinidas para vazio. Deseja reajustar após a remoção?`;
    }

    const confirmed = await requestConfirm({
      title: 'Excluir Etapa',
      message: confirmMsg,
      variant: 'danger'
    });
    if (!confirmed) return;

    // Filter node out and clean its links
    setNos(prev => {
      const filtered = prev.filter(n => n.id !== idToDelete);
      return filtered.map(n => {
        let copy = { ...n };
        if (copy.proximo === idToDelete) {
          copy.proximo = '';
        }
        if (copy.opcoes) {
          copy.opcoes = copy.opcoes.map(op => 
            op.proximo === idToDelete ? { ...op, proximo: '' } : op
          );
        }
        return copy;
      });
    });

    // Update activeNodeId if deleted
    if (activeNodeId === idToDelete) {
      const remaining = nos.filter(n => n.id !== idToDelete);
      setActiveNodeId(remaining[0]?.id || null);
    }
  };

  // --- ADD NEW NODE HELPER ---
  const handleAddNewNode = () => {
    const nextSeqIndex = nos.length + 1;
    const newId = `etapa_${nextSeqIndex}_${Date.now().toString().slice(-4)}`;
    
    const newNode: ProtocoloNo = {
      id: newId,
      tipo: 'conduta',
      texto: `Nova Etapa de Atendimento ${nextSeqIndex}`,
      subtexto: '',
      proximo: ''
    };

    setNos(prev => [...prev, newNode]);
    setActiveNodeId(newId);
  };

  // --- REORDER NODES ---
  const moveNode = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= nos.length) return;

    setNos(prev => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
  };

  // --- UPDATE ACTIVE FIELDS ---
  const handleUpdateActiveNode = (fields: Partial<ProtocoloNo>) => {
    if (!activeNodeId) return;
    setNos(prev => {
      return prev.map(n => {
        if (n.id === activeNodeId) {
          const merged = { ...n, ...fields };
          // If node type changed from decision or checklist, sanitize extra structures
          if (fields.tipo) {
            if (fields.tipo !== 'decisao') delete merged.opcoes;
            if (fields.tipo !== 'checklist') delete merged.checklistItems;
            if (fields.tipo !== 'calculadora') {
              delete merged.calculadoraId;
              delete merged.calculadoraConfig;
              delete merged.condicoes;
            }
            if (fields.tipo === 'decisao') {
              merged.opcoes = merged.opcoes || [
                { label: 'Sim', proximo: '' },
                { label: 'Não', proximo: '' }
              ];
              delete merged.proximo;
            } else {
              merged.proximo = merged.proximo || '';
            }
            if (fields.tipo === 'checklist') {
              merged.checklistItems = merged.checklistItems || [
                { id: `c_${Date.now()}_1`, texto: 'Confirmar estabilidade respiratória' }
              ];
            }
            if (fields.tipo === 'calculadora') {
              merged.calculadoraId = merged.calculadoraId || 'dengue';
              merged.calculadoraConfig = merged.calculadoraConfig || {
                inputs: [],
                resultados_condicionais: false
              };
              merged.condicoes = merged.condicoes || [];
              delete merged.checklistItems;
              delete merged.opcoes;
            }
          }
          return merged;
        }
        return n;
      });
    });
  };

  // --- ADD DECISION OPTION ---
  const handleAddDecisionOption = () => {
    if (!activeNode || activeNode.tipo !== 'decisao') return;
    const options = activeNode.opcoes ? [...activeNode.opcoes] : [];
    options.push({ label: 'Nova Opção', proximo: '' });
    handleUpdateActiveNode({ opcoes: options });
  };

  // --- UPDATE DECISION OPTION ---
  const handleUpdateDecisionOption = (index: number, fields: Partial<ProtocoloOpcao>) => {
    if (!activeNode || activeNode.tipo !== 'decisao' || !activeNode.opcoes) return;
    const options = [...activeNode.opcoes];
    options[index] = { ...options[index], ...fields };
    handleUpdateActiveNode({ opcoes: options });
  };

  // --- DELETE DECISION OPTION ---
  const handleDeleteDecisionOption = (index: number) => {
    if (!activeNode || activeNode.tipo !== 'decisao' || !activeNode.opcoes) return;
    if (activeNode.opcoes.length <= 1) {
      showAlert({
        title: 'Opção Necessária',
        message: 'Mantenha pelo menos 1 opção em nós de decisão.',
        type: 'warning'
      });
      return;
    }
    const options = activeNode.opcoes.filter((_, idx) => idx !== index);
    handleUpdateActiveNode({ opcoes: options });
  };

  // --- ADD CHECKLIST ITEM ---
  const handleAddChecklistItem = () => {
    if (!activeNode || activeNode.tipo !== 'checklist') return;
    const items = activeNode.checklistItems ? [...activeNode.checklistItems] : [];
    items.push({ id: `item_${Date.now()}_${items.length}`, texto: 'Novo item a auditar/checar' });
    handleUpdateActiveNode({ checklistItems: items });
  };

  // --- UPDATE CHECKLIST ITEM ---
  const handleUpdateChecklistItem = (index: number, text: string) => {
    if (!activeNode || activeNode.tipo !== 'checklist' || !activeNode.checklistItems) return;
    const items = [...activeNode.checklistItems];
    items[index] = { ...items[index], texto: text };
    handleUpdateActiveNode({ checklistItems: items });
  };

  // --- DELETE CHECKLIST ITEM ---
  const handleDeleteChecklistItem = (index: number) => {
    if (!activeNode || activeNode.tipo !== 'checklist' || !activeNode.checklistItems) return;
    if (activeNode.checklistItems.length <= 1) {
      showAlert({
        title: 'Item Necessário',
        message: 'Mantenha pelo menos 1 item na lista de verificação.',
        type: 'warning'
      });
      return;
    }
    const items = activeNode.checklistItems.filter((_, idx) => idx !== index);
    handleUpdateActiveNode({ checklistItems: items });
  };

  // --- CALCULATOR CONFIG HELPERS ---
  const handleUpdateCalculatorConfig = (fields: any) => {
    if (!activeNode) return;
    const config = activeNode.calculadoraConfig || { inputs: [], formula: '', resultados_condicionais: false };
    handleUpdateActiveNode({
      calculadoraConfig: {
        ...config,
        ...fields
      }
    });
  };

  const handleAddCustomInput = () => {
    if (!activeNode) return;
    const config = activeNode.calculadoraConfig || { inputs: [], formula: '', resultados_condicionais: false };
    const inputs = [...(config.inputs || [])];
    inputs.push({
      id: `input_${Date.now().toString().slice(-4)}`,
      label: 'Novo Campo',
      type: 'number',
      unit: '',
      min: 0,
      max: 100,
      defaultValue: 0
    });
    handleUpdateCalculatorConfig({ inputs });
  };

  const handleDeleteCustomInput = (index: number) => {
    if (!activeNode) return;
    const config = activeNode.calculadoraConfig || { inputs: [], formula: '', resultados_condicionais: false };
    const inputs = (config.inputs || []).filter((_, idx) => idx !== index);
    handleUpdateCalculatorConfig({ inputs });
  };

  const handleUpdateCustomInput = (index: number, fields: any) => {
    if (!activeNode) return;
    const config = activeNode.calculadoraConfig || { inputs: [], formula: '', resultados_condicionais: false };
    const inputs = [...(config.inputs || [])];
    inputs[index] = { ...inputs[index], ...fields };
    handleUpdateCalculatorConfig({ inputs });
  };

  // --- CONDITIONS HELPERS ---
  const handleAddCondition = () => {
    if (!activeNode) return;
    const conds = [...(activeNode.condicoes || [])];
    conds.push({
      se: 'peso > 50',
      proximo: ''
    });
    handleUpdateActiveNode({ condicoes: conds });
  };

  const handleDeleteCondition = (index: number) => {
    if (!activeNode) return;
    const conds = (activeNode.condicoes || []).filter((_, idx) => idx !== index);
    handleUpdateActiveNode({ condicoes: conds });
  };

  const handleUpdateCondition = (index: number, fields: any) => {
    if (!activeNode) return;
    const conds = [...(activeNode.condicoes || [])];
    conds[index] = { ...conds[index], ...fields };
    handleUpdateActiveNode({ condicoes: conds });
  };

  // --- AUTOMATIC GRAPH VALIDATION ---
  interface ValidationWarning {
    nodeId: string;
    warning: string;
    severity: 'error' | 'warning';
  }

  const runAutomaticValidation = (): ValidationWarning[] => {
    const warnings: ValidationWarning[] = [];

    if (isSpecial && specialType === 'cronograma') {
      if (consultas.length === 0) {
        warnings.push({
          nodeId: 'geral',
          warning: 'O cronograma especial deve conter pelo menos uma consulta configurada.',
          severity: 'error'
        });
      }
      consultas.forEach((c) => {
        if (!c.idade || c.idade.trim().length === 0) {
          warnings.push({
            nodeId: c.id,
            warning: 'Existe uma consulta com o nome/momento em branco no cronograma.',
            severity: 'error'
          });
        }
      });
      return warnings;
    }

    if (nos.length === 0) {
      warnings.push({
        nodeId: 'geral',
        warning: 'O protocolo não possui nenhuma etapa criada.',
        severity: 'error'
      });
      return warnings;
    }

    // Build lists of IDs
    const validIds = nos.map(n => n.id);

    // Track which nodes are targeted: for orphaned warnings
    const targetedSet = new Set<string>();

    nos.forEach((no) => {
      // 1. Text validations
      if (!no.texto || no.texto.trim().length === 0) {
        warnings.push({
          nodeId: no.id,
          warning: `O texto descritivo está em branco para a etapa de ID "${no.id}".`,
          severity: 'error'
        });
      }

      // 2. Pointing to missing nodes or unconnected branches
      if (no.tipo === 'decisao') {
        if (!no.opcoes || no.opcoes.length === 0) {
          warnings.push({
            nodeId: no.id,
            warning: `Esta etapa de decisão não possui nenhuma alternativa configurada.`,
            severity: 'error'
          });
        } else {
          no.opcoes.forEach((op, oIdx) => {
            if (!op.label || op.label.trim().length === 0) {
              warnings.push({
                nodeId: no.id,
                warning: `Alternativa nº ${oIdx + 1} está com texto de rótulo em branco.`,
                severity: 'error'
              });
            }
            if (!op.proximo) {
              warnings.push({
                nodeId: no.id,
                warning: `A alternativa "${op.label || `Nº ${oIdx+1}`}" não possui um destino selecionado (está descontinuado).`,
                severity: 'warning'
              });
            } else if (!validIds.includes(op.proximo)) {
              warnings.push({
                nodeId: no.id,
                warning: `A alternativa "${op.label || `Nº ${oIdx+1}`}" aponta para a etapa inexiste "${op.proximo}".`,
                severity: 'error'
              });
            } else {
              targetedSet.add(op.proximo);
            }
          });
        }
      } else {
        // Sequential types
        if (no.tipo !== 'encaminhamento') {
          if (!no.proximo) {
            warnings.push({
              nodeId: no.id,
              warning: `Etapa sem preenchimento do próximo passo condutor. O fluxo terminará abruptamente neste ponto.`,
              severity: 'warning'
            });
          } else if (!validIds.includes(no.proximo)) {
            warnings.push({
              nodeId: no.id,
              warning: `O próximo passo aponta para a etapa ID "${no.proximo}", que não existe neste fluxograma.`,
              severity: 'error'
            });
          } else {
            targetedSet.add(no.proximo);
          }
        }
      }

      // Checklist missing items
      if (no.tipo === 'checklist') {
        if (!no.checklistItems || no.checklistItems.length === 0) {
          warnings.push({
            nodeId: no.id,
            warning: `Etapa do tipo Checklist vazia! Insira pelo menos 1 item a checar.`,
            severity: 'error'
          });
        } else {
          no.checklistItems.forEach((itm, iIdx) => {
            if (!itm.texto || itm.texto.trim().length === 0) {
              warnings.push({
                nodeId: no.id,
                warning: `O item de verificação nº ${iIdx + 1} está sem descrição.`,
                severity: 'error'
              });
            }
          });
        }
      }
    });

    // Capture orphans (excluding the starting node nos[0])
    nos.forEach((no, index) => {
      if (index > 0 && !targetedSet.has(no.id)) {
        warnings.push({
          nodeId: no.id,
          warning: `Esta etapa está isolada. Nenhum outro nó ou decisão ramificada direciona fluxo para ela.`,
          severity: 'warning'
        });
      }
    });

    return warnings;
  };

  const validationResults = runAutomaticValidation();
  const hasErrors = validationResults.some(w => w.severity === 'error');

  const handleFinishSave = () => {
    if (!titulo.trim()) {
      showAlert({
        title: 'Título Obrigatório',
        message: 'Insira o título do protocolo.',
        type: 'warning'
      });
      setStep(1);
      return;
    }
    if (!finalCategory.trim()) {
      showAlert({
        title: 'Categoria Recomendada',
        message: 'Selecione ou crie uma categoria para o protocolo.',
        type: 'warning'
      });
      setStep(1);
      return;
    }

    if (hasErrors) {
      showAlert({
        title: 'Erros Encontrados',
        message: 'Por favor, corrija os erros de validação fundamentais na etapa de revisão antes de prosseguir com a gravação.',
        type: 'error'
      });
      setStep(3);
      return;
    }

    const compiledProtocol: Protocolo = {
      id: protocol?.id || `protocolo-${titulo.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString().slice(-4)}`,
      titulo: titulo.trim(),
      categoria: finalCategory.trim(),
      descricao: descricao.trim(),
      status: status,
      nos: nos,
      customReviewIntervalMonths: customReviewIntervalMonths
    };

    onSave(compiledProtocol);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* EDITOR NAVIGATION STICKY HEADER */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 px-4 py-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-medical-600" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                {protocol ? 'Modo de Edição de Protocolo' : 'Ferramenta de Criação de Protocolo'}
              </span>
            </div>
            <h1 className="text-lg sm:text-2xl font-bold text-slate-900 mt-0.5">
              {titulo || 'Novo Protocolo Interativo'}
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            {new URLSearchParams(window.location.search || window.location.hash.split('?')[1]).has('edit') && (
              <button
                onClick={() => window.location.hash = '/admin'}
                className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-205 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-900 cursor-pointer"
              >
                Voltar para Validação
              </button>
            )}
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-500 hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleFinishSave}
              className="px-4 py-2 bg-medical-600 hover:bg-medical-700 text-white rounded-lg text-sm font-bold shadow-sm hover:shadow transition-all flex items-center gap-1.5"
            >
              <Save className="h-4 w-4" />
              {status === 'completo' ? 'Salvar e Publicar' : 'Salvar como Rascunho'}
            </button>
          </div>
        </div>

        {/* STEPPER PROGRESS CONTROL */}
        <div className="max-w-7xl mx-auto mt-5 grid grid-cols-3 gap-2 text-center text-xs sm:text-sm">
          <button
            onClick={() => setStep(1)}
            className={`pb-2.5 border-b-2 font-bold tracking-tight transition-all ${
              step === 1 
                ? 'border-medical-600 text-medical-700' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Passo 1: Metadados Básicos
          </button>
          <button
            onClick={() => setStep(2)}
            className={`pb-2.5 border-b-2 font-bold tracking-tight transition-all ${
              step === 2 
                ? 'border-medical-600 text-medical-700' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Passo 2: Construtor de Fluxograma
          </button>
          <button
            onClick={() => setStep(3)}
            className={`pb-2.5 border-b-2 font-bold tracking-tight transition-all ${
              step === 3 
                ? 'border-medical-600 text-medical-700' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Passo 3: Revisão e Publicação {validationResults.length > 0 && (
              <span className={`inline-block translate-y-[-2px] ml-1 h-2 w-2 rounded-full ${hasErrors ? 'bg-red-500' : 'bg-amber-500'}`} />
            )}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        
        {/* --- PASSO 1: INFORMAÇÕES GERAIS --- */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6"
          >
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Info className="h-5 w-5 text-medical-600" />
                Informações de Registro e Escopo Clínico
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Defina o título, a categoria departamental de buscas, o status de publicação e uma breve descrição explicativa para a inicialização do fluxo.
              </p>
            </div>

            <div className="space-y-4">
              {/* TITULO */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Nome do Protocolo Médico <span className="text-red-500">*</span>
                  </label>
                  <AIAutofillWidget
                    type="protocol"
                    itemName={titulo}
                    currentData={{
                      titulo,
                      categoria,
                      descricao,
                      status,
                      nos
                    }}
                    onApply={(approvedData) => {
                      if (approvedData.titulo) setTitulo(approvedData.titulo);
                      if (approvedData.categoria) setCategoria(approvedData.categoria);
                      if (approvedData.descricao) setDescricao(approvedData.descricao);
                      if (approvedData.status) setStatus(approvedData.status);
                      if (approvedData.nos) {
                        setNos(approvedData.nos);
                        if (approvedData.nos.length > 0) {
                          setActiveNodeId(approvedData.nos[0].id);
                        }
                      }
                    }}
                    isEditMode={!!protocol}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Ex: Choque Séptico em Idosos, Insuficiência Respiratória Aguda..."
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:border-medical-500 focus:ring-2 focus:ring-medical-100 outline-none text-slate-800 transition-all font-medium"
                />
              </div>

              {/* CATEGORY SELECTOR */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 font-sans">
                    Categoria do Departamento <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={categoria}
                    onChange={(e) => {
                      setCategoria(e.target.value);
                    }}
                    className="w-full text-sm p-3 bg-white rounded-xl border border-gray-200 focus:border-medical-500 focus:ring-2 focus:ring-medical-100 outline-none text-slate-800 transition-all font-medium dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:focus:ring-medical-500"
                  >
                    <option value="">Selecione...</option>
                    <option value="Ambulatório">Ambulatório</option>
                    <option value="Pronto Socorro">Pronto Socorro</option>
                  </select>
                </div>
              </div>

              {/* DESCRICAO */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Descrição Curta (Enquadramento Clínico)
                </label>
                <textarea
                  rows={3}
                  placeholder="Defina qual o público-alvo, os alvos clínicos que este fluxograma atinge e as diretrizes internacionais integradas..."
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:border-medical-500 focus:ring-2 focus:ring-medical-100 outline-none text-slate-800 transition-all leading-relaxed"
                />
              </div>

              {/* STATUS */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                  Status de Execução Inicial
                </label>
                <div className="grid grid-cols-2 gap-3 mt-1.5">
                  <div
                    onClick={() => setStatus('construcao')}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      status === 'construcao' 
                        ? 'border-indigo-500 bg-indigo-50/25 text-indigo-900 shadow-sm' 
                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold">Em Construção</span>
                      {status === 'construcao' ? <CheckCircle2 className="h-5 w-5 text-indigo-600" /> : <Square className="h-5 w-5 text-slate-300" />}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Disponível em modo de rascunho apenas para revisão rápida dos médicos administradores.</p>
                  </div>

                  <div
                    onClick={() => setStatus('completo')}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      status === 'completo' 
                        ? 'border-emerald-500 bg-emerald-50/25 text-emerald-900 shadow-sm' 
                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold">Completo (Ativo)</span>
                      {status === 'completo' ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> : <Square className="h-5 w-5 text-slate-300" />}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Aparecerá imediatamente para a navegação passo a passo interativa de todos os médicos comuns.</p>
                  </div>
                </div>
              </div>

              {/* REVIEW PERIODICITY */}
              <div className="mt-4">
                <ReviewIntervalSelector
                  value={customReviewIntervalMonths}
                  onChange={setCustomReviewIntervalMonths}
                  categoryName="Protocolos"
                  defaultMonths={12}
                />
              </div>
            </div>

            <div className="border-t border-gray-100 pt-5 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                Avançar para Construtor
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* --- PASSO 2: CONSTRUTOR DE FLUXOGRAMA OU CRONOGRAMA --- */}
        {step === 2 && (
          isSpecial && specialType === 'cronograma' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full text-left"
            >
              {/* TIMELINE COLUMN */}
              <div className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-slate-50">
                  <div className="text-left">
                    <h2 className="text-sm font-bold text-slate-850 uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar className="h-4.5 w-4.5 text-indigo-600" />
                      Cronograma Clínico ({consultas.length})
                    </h2>
                    <p className="text-[11px] text-gray-500 font-medium">Cadastre as consultas preventivas sequenciais.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddConsultation}
                    className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] rounded-lg shadow-sm flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Adicionar
                  </button>
                </div>

                <div className="max-h-[580px] overflow-y-auto divide-y divide-gray-100 p-2 space-y-1">
                  {consultas.map((c, idx) => {
                    const isActive = c.id === activeConsultId;
                    return (
                      <div
                        key={c.id}
                        onClick={() => setActiveConsultId(c.id)}
                        className={`p-3 rounded-xl transition-all cursor-pointer flex justify-between items-center group border ${
                          isActive 
                            ? 'border-indigo-500 bg-indigo-50/40 ring-2 ring-indigo-100 shadow-sm' 
                            : 'border-transparent hover:bg-slate-50'
                        }`}
                      >
                        <div className="overflow-hidden pr-2 flex-grow text-left">
                          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                            <span className="bg-indigo-600 text-white font-extrabold text-[8px] uppercase px-1 rounded-sm shrink-0">
                              Etapa {idx + 1}
                            </span>
                            <span className="font-sans text-[10px] text-indigo-700 dark:text-indigo-400 font-semibold bg-indigo-50 px-1.5 py-0.2 rounded shrink-0">
                              Consulta
                            </span>
                          </div>
                          <p className="text-sm font-bold text-slate-805 truncate leading-snug">
                            {c.idade || <span className="italic text-gray-400">Sem nome</span>}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate mt-0.5 font-medium">
                            {c.subtitulo || 'Sem descrição cadastrada'}
                          </p>
                        </div>

                        {/* LINE REORDER & DELETION */}
                        <div className="flex items-center gap-1 shrink-0 bg-white/40 group-hover:bg-white rounded-lg p-0.5 border border-transparent group-hover:border-slate-100">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={(e) => { e.stopPropagation(); handleMoveConsultation(idx, 'up'); }}
                            className="p-1 hover:bg-slate-100 text-slate-400 hover:text-slate-705 rounded disabled:opacity-30 cursor-pointer"
                            title="Mover para Cima"
                          >
                            <ArrowUp className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === consultas.length - 1}
                            onClick={(e) => { e.stopPropagation(); handleMoveConsultation(idx, 'down'); }}
                            className="p-1 hover:bg-slate-100 text-slate-400 hover:text-slate-750 rounded disabled:opacity-30 cursor-pointer"
                            title="Mover para Baixo"
                          >
                            <ArrowDown className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleDeleteConsultation(c.id, c.idade); }}
                            className="p-1 hover:bg-red-50 text-slate-400 hover:text-red-650 rounded cursor-pointer"
                            title="Excluir Consulta"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 bg-indigo-50/20 border-t border-gray-100 flex items-center gap-2 text-[10px] text-slate-500 font-medium">
                  <Info className="h-4 w-4 text-indigo-500 shrink-0" />
                  <span className="text-left">Cadastre as etapas cronológicas do programa preventivo de consultas beira-leito.</span>
                </div>
              </div>

              {/* ACTIVE CONSULTATION WORKBENCH */}
              <div className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-6">
                {activeConsult ? (
                  <div className="text-left">
                    {/* WORKBENCH HEADER WITH IA TRIGGER */}
                    <div className="border-b border-gray-100 pb-3.5 mb-5 flex justify-between items-center flex-wrap gap-2 text-left">
                      <div className="text-left">
                        <h3 className="text-md font-bold text-slate-805 flex items-center gap-1.5 justify-start">
                          <Edit3 className="h-4.5 w-4.5 text-indigo-600" />
                          Consulta Ativa: <span className="text-indigo-600 font-extrabold">{activeConsult.idade}</span>
                        </h3>
                        <p className="text-xs text-slate-400 font-medium text-left">Preencha os checklists clínicos recomendados para esta etapa.</p>
                      </div>

                      <button
                        type="button"
                        disabled={runningAI}
                        onClick={handleTriggerAIConsult}
                        className="px-3.5 py-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-750 text-white font-extrabold text-xs rounded-xl shadow border border-indigo-200 flex items-center gap-1.5 transition-all outline-none disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {runningAI ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            Analisando com IA...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                            Atualizar por IA (Individual)
                          </>
                        )}
                      </button>
                    </div>

                    {runningAI && (
                      <div className="p-10 border border-dashed border-indigo-150 rounded-2xl bg-indigo-50/5 text-center flex flex-col items-center justify-center space-y-3">
                        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
                        <p className="text-sm font-bold text-slate-700">O Gemini está gerando as melhores condutas científicas...</p>
                        <p className="text-xs text-slate-400 max-w-sm">Estruturando dados de anamnese, exames lab, vacinas e alertas baseados no título "{titulo}" e período "{activeConsult.idade}".</p>
                      </div>
                    )}

                    {/* AI REVIEW AND APPROVAL BLOCK */}
                    {showAiProposal && aiProposal && !runningAI && (
                      <div className="p-5 border border-indigo-200 bg-indigo-50/20 rounded-2xl space-y-4 shadow-sm mb-6 animate-fadeIn text-left">
                        <div className="flex justify-between items-start flex-wrap gap-2 text-left">
                          <div className="text-left">
                            <span className="bg-indigo-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">Aprovação Necessária (IA)</span>
                            <h4 className="text-sm font-bold text-indigo-900 mt-1 text-left">Revisão Sugerida pelo Gemini</h4>
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => { setShowAiProposal(false); setAiProposal(null); }}
                              className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-505 text-xs font-bold rounded-lg border border-slate-200 transition-colors cursor-pointer"
                            >
                              Voltar / Editar Manualmente
                            </button>
                            <button
                              type="button"
                              onClick={handleApproveAiProposal}
                              className="px-3.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <Check className="h-3.5 w-3.5" />
                              Aceitar e Mesclar
                            </button>
                          </div>
                        </div>

                        <div className="bg-white/80 rounded-xl p-4 border border-indigo-100 divide-y divide-indigo-50 text-xs space-y-3.5">
                          <div className="pb-2 text-left">
                            <span className="font-bold text-indigo-700 block">Subtítulo Sugerido:</span>
                            <input 
                              type="text" 
                              value={aiProposal.subtitulo || ''} 
                              onChange={(e) => setAiProposal({ ...aiProposal, subtitulo: e.target.value })}
                              className="w-full mt-1 px-2 py-1 border rounded bg-white text-xs font-medium text-slate-700 font-sans outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                          </div>
                          <div className="pt-2.5 pb-2 text-left">
                            <span className="font-bold text-indigo-700 block mb-1">Perguntas de Anamnese:</span>
                            <div className="space-y-1">
                              {aiProposal.anamnese.map((itm, i) => (
                                <div key={i} className="flex gap-2 items-center">
                                  <input 
                                    type="text" 
                                    value={itm}
                                    onChange={(e) => {
                                      const copy = [...aiProposal.anamnese];
                                      copy[i] = e.target.value;
                                      setAiProposal({ ...aiProposal, anamnese: copy });
                                    }}
                                    className="flex-grow px-2 py-0.5 border rounded text-xs bg-white focus:ring-1 focus:ring-indigo-500"
                                  />
                                  <button 
                                    type="button" 
                                    onClick={() => {
                                      const copy = aiProposal.anamnese.filter((_, idx) => idx !== i);
                                      setAiProposal({ ...aiProposal, anamnese: copy });
                                    }}
                                    className="p-0.5 text-slate-400 hover:text-red-500 rounded"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              ))}
                              {aiProposal.anamnese.length === 0 && <p className="text-[11px] text-slate-400 italic">Lista vazia.</p>}
                            </div>
                          </div>
                          <div className="pt-2.5 pb-2 text-left">
                            <span className="font-bold text-indigo-700 block mb-1">Parâmetros / Exame Físico:</span>
                            <div className="space-y-1">
                              {aiProposal.desenvolvimento.map((itm, i) => (
                                <div key={i} className="flex gap-2 items-center">
                                  <input 
                                    type="text" 
                                    value={itm.texto}
                                    onChange={(e) => {
                                      const copy = [...aiProposal.desenvolvimento];
                                      copy[i] = { ...copy[i], texto: e.target.value };
                                      setAiProposal({ ...aiProposal, desenvolvimento: copy });
                                    }}
                                    className="flex-grow px-2 py-0.5 border rounded text-xs bg-white focus:ring-1 focus:ring-indigo-500"
                                  />
                                  <select 
                                    value={itm.categoria}
                                    onChange={(e) => {
                                      const copy = [...aiProposal.desenvolvimento];
                                      copy[i] = { ...copy[i], categoria: e.target.value as any };
                                      setAiProposal({ ...aiProposal, desenvolvimento: copy });
                                    }}
                                    className="px-1 border rounded text-[10px] bg-slate-50 font-semibold text-indigo-700"
                                  >
                                    <option value="Geral">Geral</option>
                                    <option value="Grossa">M. Grossa</option>
                                    <option value="Fina">M. Fina</option>
                                    <option value="Linguagem">Linguagem</option>
                                    <option value="Social">Social</option>
                                  </select>
                                  <button 
                                    type="button" 
                                    onClick={() => {
                                      const copy = aiProposal.desenvolvimento.filter((_, idx) => idx !== i);
                                      setAiProposal({ ...aiProposal, desenvolvimento: copy });
                                    }}
                                    className="p-0.5 text-slate-400 hover:text-red-500 rounded"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              ))}
                              {aiProposal.desenvolvimento.length === 0 && <p className="text-[11px] text-slate-400 italic">Lista vazia.</p>}
                            </div>
                          </div>
                          <div className="pt-2.5 pb-2 text-left">
                            <span className="font-bold text-indigo-700 block mb-1">Medidas Preventivas / Profilaxias / Vacinas:</span>
                            <div className="space-y-1">
                              {aiProposal.vacinas.map((itm, i) => (
                                <div key={i} className="flex gap-2 items-center">
                                  <input 
                                    type="text" 
                                    value={itm}
                                    onChange={(e) => {
                                      const copy = [...aiProposal.vacinas];
                                      copy[i] = e.target.value;
                                      setAiProposal({ ...aiProposal, vacinas: copy });
                                    }}
                                    className="flex-grow px-2 py-0.5 border rounded text-xs bg-white focus:ring-1 focus:ring-indigo-500"
                                  />
                                  <button 
                                    type="button" 
                                    onClick={() => {
                                      const copy = aiProposal.vacinas.filter((_, idx) => idx !== i);
                                      setAiProposal({ ...aiProposal, vacinas: copy });
                                    }}
                                    className="p-0.5 text-slate-400 hover:text-red-500 rounded"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              ))}
                              {aiProposal.vacinas.length === 0 && <p className="text-[11px] text-slate-400 italic">Lista vazia.</p>}
                            </div>
                          </div>
                          <div className="pt-2.5 pb-2 text-left">
                            <span className="font-bold text-indigo-700 block mb-1">Exames de Triagem / Laboratório:</span>
                            <div className="space-y-1">
                              {aiProposal.triagens.map((itm, i) => (
                                <div key={i} className="flex gap-2 items-center">
                                  <input 
                                    type="text" 
                                    value={itm}
                                    onChange={(e) => {
                                      const copy = [...aiProposal.triagens];
                                      copy[i] = e.target.value;
                                      setAiProposal({ ...aiProposal, triagens: copy });
                                    }}
                                    className="flex-grow px-2 py-0.5 border rounded text-xs bg-white focus:ring-1 focus:ring-indigo-500"
                                  />
                                  <button 
                                    type="button" 
                                    onClick={() => {
                                      const copy = aiProposal.triagens.filter((_, idx) => idx !== i);
                                      setAiProposal({ ...aiProposal, triagens: copy });
                                    }}
                                    className="p-0.5 text-slate-400 hover:text-red-500 rounded"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              ))}
                              {aiProposal.triagens.length === 0 && <p className="text-[11px] text-slate-400 italic">Lista vazia.</p>}
                            </div>
                          </div>
                          <div className="pt-2.5 pb-2 text-left">
                            <span className="font-bold text-indigo-700 block mb-1">Orientações e Sinais de Alerta:</span>
                            <div className="space-y-1">
                              {aiProposal.orientacoes.map((itm, i) => (
                                <div key={i} className="flex gap-2 items-center">
                                  <input 
                                    type="text" 
                                    value={itm}
                                    onChange={(e) => {
                                      const copy = [...aiProposal.orientacoes];
                                      copy[i] = e.target.value;
                                      setAiProposal({ ...aiProposal, orientacoes: copy });
                                    }}
                                    className="flex-grow px-2 py-0.5 border rounded text-xs bg-white focus:ring-1 focus:ring-indigo-500"
                                  />
                                  <button 
                                    type="button" 
                                    onClick={() => {
                                      const copy = aiProposal.orientacoes.filter((_, idx) => idx !== i);
                                      setAiProposal({ ...aiProposal, orientacoes: copy });
                                    }}
                                    className="p-0.5 text-slate-400 hover:text-red-500 rounded"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              ))}
                              {aiProposal.orientacoes.length === 0 && <p className="text-[11px] text-slate-400 italic">Lista vazia.</p>}
                            </div>
                          </div>
                          <div className="pt-2.5 text-left">
                            <span className="font-bold text-indigo-700 block">Duração sugerida pós-retorno:</span>
                            <input 
                              type="text" 
                              value={aiProposal.proxima || ''} 
                              onChange={(e) => setAiProposal({ ...aiProposal, proxima: e.target.value })}
                              className="w-full mt-1 px-2 py-1 border rounded bg-white text-xs font-medium text-slate-700 font-sans outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 text-xs pt-1">
                          <button
                            type="button"
                            onClick={() => { setShowAiProposal(false); setAiProposal(null); }}
                            className="px-3.5 py-1.8 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold cursor-pointer"
                          >
                            Voltar Sem Salvar
                          </button>
                          <button
                            type="button"
                            onClick={handleApproveAiProposal}
                            className="px-5 py-1.8 bg-indigo-650 hover:bg-indigo-700 text-white rounded-lg font-bold shadow flex items-center gap-1 cursor-pointer"
                          >
                            <Check className="h-4 w-4" />
                            Aprovar e Integrar no Cronograma
                          </button>
                        </div>
                      </div>
                    )}

                    {/* MANUALLY EDITABLE WORKBENCH BODY */}
                    {!runningAI && !showAiProposal && (
                      <div className="space-y-6 text-left border border-slate-200/80 rounded-3xl p-6 bg-white dark:bg-slate-900/10 dark:border-slate-800 shadow-sm">
                        {/* IDENTIFICAÇÃO BÁSICA */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">Nome/Etapa da Consulta *</label>
                            <input
                              type="text"
                              value={activeConsult.idade}
                              onChange={(e) => updateActiveConsult({ idade: e.target.value })}
                              placeholder="ex: Primeira Consulta, 2º Trimestre, 6 Meses"
                              className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 focus:ring-1 focus:ring-indigo-505 focus:border-indigo-500 outline-none text-xs font-bold text-slate-800 bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">Subtítulo / Alvo Clínico</label>
                            <input
                              type="text"
                              value={activeConsult.subtitulo || ''}
                              onChange={(e) => updateActiveConsult({ subtitulo: e.target.value })}
                              placeholder="ex: Avaliação básica e introdução de profilaxia"
                              className="w-full mt-1.5 px-3 py-2 rounded-xl border border-slate-200 focus:ring-1 focus:ring-indigo-505 focus:border-indigo-500 outline-none text-xs font-bold text-slate-800 bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
                            />
                          </div>
                        </div>

                        {/* UNIVERSAL BLOCK EDITOR COMPONENT */}
                        <div className="pt-2">
                          <UniversalBlockEditor 
                            blocks={activeConsult.blocos || []}
                            onChange={(updatedBlocks) => updateActiveConsult({ blocos: updatedBlocks })}
                            availableProtocols={availableProtocols}
                          />
                        </div>

                        {/* SINAIS DE ALERTA SECTION */}
                        <div className="border-t border-slate-100 pt-6">
                          <div className="flex justify-between items-center mb-3">
                            <div>
                              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                                <AlertTriangle className="h-4.5 w-4.5 text-amber-500" />
                                Sinais de Alerta (Vigilância Clínica)
                              </h4>
                              <p className="text-xs text-slate-400 font-medium">Defina os achados clínicos que requerem intervenção imediata e suas condutas.</p>
                            </div>
                          </div>

                          {/* Existing Alertas List */}
                          <div className="space-y-3 mb-4">
                            {(activeConsult.alertas || []).map((alerta, idx) => (
                              <div key={idx} className="flex flex-col sm:flex-row gap-3 items-start p-3 bg-slate-50 rounded-xl border border-slate-150 relative">
                                <div className="flex-grow w-full space-y-2">
                                  <div className="flex gap-2 items-center">
                                    <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded ${
                                      alerta.gravidade === 'red' ? 'bg-red-105 text-red-700' : 'bg-amber-105 text-amber-700'
                                    }`}>
                                      {alerta.gravidade === 'red' ? 'Grave' : 'Moderado'}
                                    </span>
                                    <input
                                      type="text"
                                      value={alerta.texto}
                                      onChange={(e) => {
                                        const updated = [...(activeConsult.alertas || [])];
                                        updated[idx] = { ...updated[idx], texto: e.target.value };
                                        updateActiveConsult({ alertas: updated });
                                      }}
                                      placeholder="Sinal de alerta (ex: Pressão arterial ≥ 140/90)"
                                      className="flex-grow text-xs font-bold text-slate-800 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-500 outline-none"
                                    />
                                  </div>
                                  <input
                                    type="text"
                                    value={alerta.conduta || ''}
                                    onChange={(e) => {
                                      const updated = [...(activeConsult.alertas || [])];
                                      updated[idx] = { ...updated[idx], conduta: e.target.value };
                                      updateActiveConsult({ alertas: updated });
                                    }}
                                    placeholder="Conduta recomendada (ex: Encaminhar para urgência, iniciar sulfato)"
                                    className="w-full text-xs text-slate-650 bg-transparent border-b border-transparent hover:border-slate-200 focus:border-indigo-400 outline-none italic"
                                  />
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                  <select
                                    value={alerta.gravidade}
                                    onChange={(e) => {
                                      const updated = [...(activeConsult.alertas || [])];
                                      updated[idx] = { ...updated[idx], gravidade: e.target.value as 'yellow' | 'red' };
                                      updateActiveConsult({ alertas: updated });
                                    }}
                                    className="text-[10px] font-semibold bg-white border rounded px-1.5 py-0.5 text-slate-600 focus:ring-1 focus:ring-indigo-500"
                                  >
                                    <option value="yellow">Moderado</option>
                                    <option value="red">Grave</option>
                                  </select>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = (activeConsult.alertas || []).filter((_, i) => i !== idx);
                                      updateActiveConsult({ alertas: updated });
                                    }}
                                    className="p-1 hover:bg-red-150 text-slate-400 hover:text-red-600 rounded cursor-pointer"
                                    title="Excluir Sinal de Alerta"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}

                            {(!activeConsult.alertas || activeConsult.alertas.length === 0) && (
                              <p className="text-xs text-slate-400 italic bg-slate-50/50 p-4 rounded-xl border border-dashed text-center">
                                Nenhum sinal de alerta cadastrado para esta consulta.
                              </p>
                            )}
                          </div>

                          {/* Form to Add New Alerta */}
                          <div className="bg-slate-50/50 border border-slate-150 rounded-xl p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
                            <div className="flex-grow grid grid-cols-1 md:grid-cols-12 gap-3">
                              <div className="md:col-span-6">
                                <input
                                  id="new-alerta-texto"
                                  type="text"
                                  placeholder="Novo sinal de alerta (ex: Sangramento vaginal)"
                                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs text-slate-808 outline-none focus:ring-1 focus:ring-indigo-500"
                                />
                              </div>
                              <div className="md:col-span-4">
                                <input
                                  id="new-alerta-conduta"
                                  type="text"
                                  placeholder="Conduta recomendada (opcional)"
                                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs text-slate-808 outline-none focus:ring-1 focus:ring-indigo-500"
                                />
                              </div>
                              <div className="md:col-span-2">
                                <select
                                  id="new-alerta-gravidade"
                                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs text-slate-808 outline-none focus:ring-1 focus:ring-indigo-500"
                                >
                                  <option value="yellow">Moderado</option>
                                  <option value="red">Grave</option>
                                </select>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const textInput = document.getElementById('new-alerta-texto') as HTMLInputElement;
                                const condInput = document.getElementById('new-alerta-conduta') as HTMLInputElement;
                                const gravSelect = document.getElementById('new-alerta-gravidade') as HTMLSelectElement;
                                if (textInput && textInput.value.trim()) {
                                  const current = activeConsult.alertas || [];
                                  updateActiveConsult({
                                    alertas: [
                                      ...current,
                                      {
                                        texto: textInput.value.trim(),
                                        gravidade: (gravSelect?.value as any) || 'yellow',
                                        conduta: condInput?.value.trim() || ''
                                      }
                                    ]
                                  });
                                  textInput.value = '';
                                  if (condInput) condInput.value = '';
                                }
                              }}
                              className="px-4 py-2 bg-indigo-650 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
                            >
                              <Plus className="h-4 w-4" />
                              Adicionar Alerta
                            </button>
                          </div>
                        </div>

                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-10 text-center text-slate-400 font-sans italic">
                    Nenhuma consulta cadastrada neste cronograma especial. Clique em "Adicionar" para iniciar.
                  </div>
                )}
              </div>

              {/* NAVIGATION FOOTER */}
              <div className="lg:col-span-12 border-t border-gray-150 pt-5 mt-2 flex justify-between items-center bg-transparent w-full">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-bold rounded-xl text-xs flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar para Informações Cruzadas
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-1 cursor-pointer"
                >
                  Avançar para Revisão e Publicação
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
            {/* LEFT COLUMN: LIST OF ALL SEQUENTIAL NODES */}
            <div className="lg:col-span-5 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden whitespace-nowrap">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-slate-50">
                <div>
                  <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <ListPlus className="h-4.5 w-4.5 text-medical-600" />
                    Etapas do Fluxo ({nos.length})
                  </h2>
                  <p className="text-[11px] text-gray-500 font-medium">Reordene ou adicione condutas beira-leito.</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddNewNode}
                  className="px-2.5 py-1.5 bg-medical-600 hover:bg-medical-700 text-white font-bold text-[11px] rounded-lg shadow-sm flex items-center gap-1"
                >
                  <Plus className="h-3 w-3" />
                  Adicionar Nó
                </button>
              </div>

              <div className="max-h-[620px] overflow-y-auto divide-y divide-gray-100 p-2 space-y-1">
                {nos.map((no, idx) => {
                  const isActive = no.id === activeNodeId;
                  
                  let badgeVariant: 'medical' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'accent' = 'neutral';
                  if (no.tipo === 'decisao') badgeVariant = 'info';
                  if (no.tipo === 'conduta') badgeVariant = 'success';
                  if (no.tipo === 'alerta') badgeVariant = 'warning';
                  if (no.tipo === 'checklist') badgeVariant = 'accent';
                  if (no.tipo === 'calculadora') badgeVariant = 'medical';

                  return (
                    <div
                      key={no.id}
                      onClick={() => setActiveNodeId(no.id)}
                      className={`p-3 rounded-xl transition-all cursor-pointer flex justify-between items-center group border ${
                        isActive 
                          ? 'border-medical-500 bg-medical-50/40 ring-2 ring-medical-100 shadow-sm' 
                          : 'border-transparent hover:bg-slate-50'
                      }`}
                    >
                      <div className="overflow-hidden pr-3 flex-grow text-left">
                        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                          <span className="font-mono text-[10px] font-bold text-gray-400 select-all shrink-0 bg-slate-100 px-1 rounded">
                            {no.id}
                          </span>
                          <Badge variant={badgeVariant} className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded shrink-0">
                            {no.tipo}
                          </Badge>
                          {idx === 0 && (
                            <span className="bg-medical-700 text-white font-extrabold text-[8px] uppercase px-1 rounded-sm shrink-0">
                              Início
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-slate-800 truncate leading-snug">
                          {no.texto || <span className="italic text-gray-400">Texto em branco</span>}
                        </p>
                      </div>

                      {/* QUICK REORDER ACTIONS */}
                      <div className="flex items-center gap-1 shrink-0 bg-white/40 group-hover:bg-white rounded-lg p-0.5 border border-transparent group-hover:border-slate-100">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={(e) => { e.stopPropagation(); moveNode(idx, 'up'); }}
                          className="p-1 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded disabled:opacity-30"
                          title="Mover para Cima"
                        >
                          <ArrowUp className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === nos.length - 1}
                          onClick={(e) => { e.stopPropagation(); moveNode(idx, 'down'); }}
                          className="p-1 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded disabled:opacity-30"
                          title="Mover para Baixo"
                        >
                          <ArrowDown className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleDeleteNode(no.id); }}
                          className="p-1 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded"
                          title="Excluir Etapa"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 bg-slate-50 border-t border-gray-100 flex items-center gap-2">
                <Info className="h-4 w-4 text-slate-400" />
                <span className="text-[10px] text-slate-500 font-medium whitespace-normal">
                  Arranje a ordem sequencial desejada no menu. Ordens adjacentes ajudam na navegação do mapa clínico geral.
                </span>
              </div>
            </div>

            {/* RIGHT COLUMN: ACTIVE NODE DETAILED EDITOR */}
            <div className="lg:col-span-7 bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-6">
              
              {activeNode ? (
                <div>
                  <div className="border-b border-gray-100 pb-3 mb-5 flex justify-between items-center">
                    <div>
                      <h3 className="text-md font-bold text-slate-800 flex items-center gap-2">
                        <Edit3 className="h-4.5 w-4.5 text-medical-600" />
                        Campos Clínicos do Nó
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">Editando etapa ativa do fluxograma.</p>
                    </div>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded font-mono font-bold">
                      Índice: {nos.findIndex(n => n.id === activeNode.id) + 1}
                    </span>
                  </div>

                  <div className="space-y-4">
                    
                    {/* ID DO NÓ & TIPO */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                          ID de Conexão Único (Sem Espaços)
                        </label>
                        <input
                          type="text"
                          value={activeNode.id}
                          onChange={(e) => handleRefactorNodeId(activeNode.id, e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))}
                          className="w-full text-xs font-mono font-bold p-3 bg-slate-50 rounded-xl border border-gray-200 focus:border-medical-500 outline-none text-slate-800 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 border-none">
                          Tipo de Comportamento do Nó
                        </label>
                        <select
                          value={activeNode.tipo}
                          onChange={(e) => handleUpdateActiveNode({ tipo: e.target.value as any })}
                          className="w-full text-xs font-bold p-3 bg-white rounded-xl border border-gray-200 focus:border-medical-500 outline-none text-slate-800 transition-all"
                        >
                          <option value="conduta">🟢 Conduta (Etapa Sequente)</option>
                          <option value="decisao">🔵 Decisão (Opções Ramificadas)</option>
                          <option value="alerta">🟡 Alerta (Aviso / Contraindicação)</option>
                          <option value="checklist">🔮 Checklist (Itens a Checar)</option>
                          <option value="calculadora">🧮 Calculadora Clínica</option>
                          <option value="encaminhamento">🔴 Encerramento de Atendimento</option>
                        </select>
                      </div>
                    </div>

                    {/* TEXTO DO NO */}
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        Texto de Auxílio Clínico / Pergunta Principal
                      </label>
                      <textarea
                        rows={2}
                        value={activeNode.texto}
                        onChange={(e) => handleUpdateActiveNode({ texto: e.target.value })}
                        placeholder="Ex: Qual o valor da temperatura retal detectada?"
                        className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:border-medical-500 outline-none text-slate-800 transition-all font-semibold"
                      />
                    </div>

                    {/* SUBTEXTO DO NO */}
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        Subtexto Médico / Notas Explicativas (Opcional)
                      </label>
                      <textarea
                        rows={1}
                        value={activeNode.subtexto || ''}
                        onChange={(e) => handleUpdateActiveNode({ subtexto: e.target.value })}
                        placeholder="Ex: Adicione critérios de exclusão ou notas regulatórias..."
                        className="w-full text-sm p-3 rounded-xl border border-gray-200 focus:border-medical-500 outline-none text-slate-800 transition-all"
                      />
                    </div>

                    {/* --- DECISAO OPTIONS EDITOR --- */}
                    {activeNode.tipo === 'decisao' && (
                      <div className="bg-sky-50/30 border border-sky-100 rounded-xl p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="block text-xs font-bold text-sky-800 uppercase tracking-wider">
                            Ramificações de Decisão Disparadas
                          </span>
                          <button
                            type="button"
                            onClick={handleAddDecisionOption}
                            className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-[10px] px-2 py-1 rounded"
                          >
                            + Adicionar Opção
                          </button>
                        </div>

                        <div className="space-y-3">
                          {activeNode.opcoes?.map((op, oIdx) => (
                            <div key={oIdx} className="flex flex-col sm:flex-row gap-2.5 items-end sm:items-center bg-white p-3 rounded-lg border border-sky-100 shadow-sm">
                              <div className="flex-grow w-full text-left">
                                <label className="block text-[9px] font-bold text-slate-400 uppercase">Texto da Resposta</label>
                                <input
                                  type="text"
                                  value={op.label}
                                  onChange={(e) => handleUpdateDecisionOption(oIdx, { label: e.target.value })}
                                  className="w-full text-xs p-2 rounded border border-gray-200"
                                />
                              </div>

                              <div className="w-full sm:w-48 shrink-0 text-left">
                                <label className="block text-[9px] font-bold text-slate-400 uppercase">Avançar para Etapa ID</label>
                                <select
                                  value={op.proximo}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    if (val === 'CREATE_NEW') {
                                      // Create a new node and link to it
                                      const nextNum = nos.length + 1;
                                      const newGenId = `etapa_${nextNum}_${oIdx}_${Date.now().toString().slice(-4)}`;
                                      const createdNode: ProtocoloNo = {
                                        id: newGenId,
                                        tipo: 'conduta',
                                        texto: `Etapa criada vinculada a "${op.label}"`,
                                        proximo: ''
                                      };
                                      setNos(prev => [...prev, createdNode]);
                                      handleUpdateDecisionOption(oIdx, { proximo: newGenId });
                                    } else {
                                      handleUpdateDecisionOption(oIdx, { proximo: val });
                                    }
                                  }}
                                  className="w-full text-xs p-2 rounded border border-gray-200 bg-white"
                                >
                                  <option value="">Fim de Fluxo (Vazio)</option>
                                  <option value="CREATE_NEW">+ Criar e Ir Para Nova Etapa...</option>
                                  {nos.filter(n => n.id !== activeNode.id).map(no => (
                                    <option key={no.id} value={no.id}>{no.id} ({no.tipo})</option>
                                  ))}
                                </select>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleDeleteDecisionOption(oIdx)}
                                className="p-2 text-slate-400 hover:text-red-500 rounded hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* --- CHECKLIST ITEMS EDITOR --- */}
                    {activeNode.tipo === 'checklist' && (
                      <div className="bg-purple-50/30 border border-purple-100 rounded-xl p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="block text-xs font-bold text-purple-800 uppercase tracking-wider">
                            Lista de Itens para Checagem Beira-Leito
                          </span>
                          <button
                            type="button"
                            onClick={handleAddChecklistItem}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-[10px] px-2 py-1 rounded"
                          >
                            + Adicionar Item
                          </button>
                        </div>

                        <div className="space-y-2">
                          {activeNode.checklistItems?.map((itm, iIdx) => (
                            <div key={itm.id} className="flex gap-2 items-center bg-white p-2 rounded-lg border border-purple-100 shadow-sm">
                              <span className="text-[10px] bg-purple-50 text-purple-700 font-bold px-1.5 py-1 rounded shrink-0">
                                {iIdx + 1}
                              </span>
                              <input
                                type="text"
                                value={itm.texto}
                                onChange={(e) => handleUpdateChecklistItem(iIdx, e.target.value)}
                                className="flex-grow text-xs p-1.5 focus:bg-slate-50 outline-none text-slate-700"
                                placeholder="..."
                              />
                              <button
                                type="button"
                                onClick={() => handleDeleteChecklistItem(iIdx)}
                                className="p-1 text-slate-400 hover:text-red-500 rounded shrink-0"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* --- CALCULADORA EDITOR --- */}
                    {activeNode.tipo === 'calculadora' && (
                      <div className="bg-cyan-50/20 border border-cyan-100 rounded-xl p-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="block text-xs font-bold text-cyan-800 uppercase tracking-wider">
                            Configurações da Calculadora Clínica
                          </span>
                        </div>

                        {/* SELECT PRE-BUILT LIBRARY OR CUSTOM */}
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                            Biblioteca de Calculadoras Internas
                          </label>
                          <select
                            value={activeNode.calculadoraId || 'custom'}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val === 'custom') {
                                handleUpdateActiveNode({
                                  calculadoraId: undefined,
                                  calculadoraConfig: {
                                    inputs: [],
                                    formula: '',
                                    resultados_condicionais: false
                                  }
                                });
                              } else {
                                const selectedCalc = getCalculatorById(val);
                                handleUpdateActiveNode({
                                  calculadoraId: val,
                                  calculadoraConfig: {
                                    inputs: selectedCalc ? selectedCalc.inputs : [],
                                    resultados_condicionais: true
                                  }
                                });
                              }
                            }}
                            className="w-full text-xs p-2.5 bg-white rounded-lg border border-gray-200 outline-none text-slate-700 font-semibold"
                          >
                            <option value="custom">⚙️ Fórmula/Inputs Personalizados (Customizado)</option>
                            {calculators.map(c => (
                              <option key={c.id} value={c.id}>🧮 {c.name} ({c.category})</option>
                            ))}
                          </select>
                        </div>

                        {/* EXPLAIN BULLET IF PRE-BUILT IS SELECTED */}
                        {activeNode.calculadoraId && (
                          <div className="p-3 bg-cyan-50/55 rounded-lg border border-cyan-150 text-xs text-cyan-900 leading-relaxed text-left">
                            {(() => {
                              const calc = getCalculatorById(activeNode.calculadoraId);
                              return (
                                <>
                                  <p className="font-bold text-cyan-950">{calc?.name}</p>
                                  <p className="mt-1 opacity-90 text-[11px]">{calc?.description}</p>
                                  <div className="mt-2 text-[10px] space-y-1">
                                    <p className="font-bold uppercase tracking-wider text-[9px] text-cyan-800 opacity-90">Campos do formulário carregados automaticamente:</p>
                                    <ul className="list-disc pl-4 space-y-0.5 text-slate-700">
                                      {calc?.inputs?.map(inp => (
                                        <li key={inp.id}>
                                          <strong>{inp.label}</strong> {inp.type === 'select' ? `(Seleção: ${inp.options?.map(o => o.label).join(', ')})` : `(Número, unid: "${inp.unit || 's/u'}", min: ${inp.min}, max: ${inp.max})`}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                        )}

                        {/* CUSTOM FORMULA SECTION */}
                        {!activeNode.calculadoraId && (
                          <div className="space-y-3 p-3 bg-white border border-gray-200 rounded-lg text-left">
                            <span className="block text-[11px] font-bold text-slate-700 uppercase">
                              Desenho do Formulário Customizado
                            </span>

                            {/* CUSTOM INPUTS */}
                            <div className="space-y-2">
                              {activeNode.calculadoraConfig?.inputs?.map((inp, idx) => (
                                <div key={inp.id} className="p-2.5 border border-slate-100 bg-slate-50/50 rounded-lg space-y-2 text-xs">
                                  <div className="flex justify-between items-center bg-white/20 p-1 rounded">
                                    <span className="font-bold text-slate-500 text-[10px] uppercase">Campo {idx + 1}</span>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteCustomInput(idx)}
                                      className="text-red-500 hover:text-red-700 bg-red-50 p-1 rounded"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </button>
                                  </div>

                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <label className="text-[9px] text-gray-400 font-bold uppercase block">ID do Campo</label>
                                      <input
                                        type="text"
                                        value={inp.id}
                                        onChange={(e) => handleUpdateCustomInput(idx, { id: e.target.value.trim() })}
                                        className="w-full p-1 border rounded text-xs focus:ring-1 focus:ring-cyan-500 bg-white"
                                        placeholder="idade"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-[9px] text-gray-400 font-bold uppercase block">Nome (Label)</label>
                                      <input
                                        type="text"
                                        value={inp.label}
                                        onChange={(e) => handleUpdateCustomInput(idx, { label: e.target.value })}
                                        className="w-full p-1 border rounded text-xs focus:ring-1 focus:ring-cyan-500 bg-white"
                                        placeholder="Idade do Paciente"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-[9px] text-gray-400 font-bold uppercase block">Tipo</label>
                                      <select
                                        value={inp.type}
                                        onChange={(e) => {
                                          const t = e.target.value as any;
                                          const upd: any = { type: t };
                                          if (t === 'select') {
                                            upd.options = [{ value: 'sim', label: 'Sim', score: 1 }, { value: 'nao', label: 'Não', score: 0 }];
                                          } else {
                                            delete upd.options;
                                          }
                                          handleUpdateCustomInput(idx, upd);
                                        }}
                                        className="w-full p-1 border rounded text-xs bg-white focus:ring-1 focus:ring-cyan-500"
                                      >
                                        <option value="number">Número</option>
                                        <option value="select">Lista de Seleção</option>
                                      </select>
                                    </div>

                                    {inp.type === 'number' ? (
                                      <div>
                                        <label className="text-[9px] text-gray-400 font-bold uppercase block">Unidade</label>
                                        <input
                                          type="text"
                                          value={inp.unit || ''}
                                          onChange={(e) => handleUpdateCustomInput(idx, { unit: e.target.value })}
                                          className="w-full p-1 border rounded text-xs focus:ring-1 focus:ring-cyan-500 bg-white"
                                          placeholder="Ex: kg, cP, anos"
                                        />
                                      </div>
                                    ) : (
                                      <div className="col-span-2">
                                        <label className="text-[9px] text-cyan-600 font-bold uppercase block">Opções (Formato JSON array)</label>
                                        <textarea
                                          rows={1}
                                          value={JSON.stringify(inp.options || [])}
                                          onChange={(e) => {
                                            try {
                                              const parsed = JSON.parse(e.target.value);
                                              handleUpdateCustomInput(idx, { options: parsed });
                                            } catch (err) {}
                                          }}
                                          className="w-full p-1 font-mono border rounded text-[10px] bg-white focus:ring-1 focus:ring-cyan-500"
                                          placeholder='[{"value":"sim","label":"Sim","score":1}]'
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}

                              <button
                                type="button"
                                onClick={handleAddCustomInput}
                                className="w-full py-1.5 text-[11px] font-bold border border-dashed border-cyan-300 text-cyan-600 hover:bg-cyan-50 rounded bg-cyan-50/10 cursor-pointer"
                              >
                                + Adicionar Campo Customizado
                              </button>
                            </div>

                            {/* MATH FORMULA */}
                            <div className="pt-2.5 border-t border-slate-100 mt-2">
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                                Fórmula Matemática (Expressão JS)
                              </label>
                              <input
                                type="text"
                                value={activeNode.calculadoraConfig?.formula || ''}
                                onChange={(e) => handleUpdateCalculatorConfig({ formula: e.target.value })}
                                className="w-full p-2 bg-slate-50 font-mono text-xs border rounded outline-none text-slate-800"
                                placeholder="Ex: peso * 60 ou (idade > 15 ? 100 : 50)"
                              />
                              <p className="text-[9px] text-slate-400 mt-1">Insira parâmetros correspondentes aos IDs dos campos configurados como variáveis aritméticas.</p>
                            </div>
                          </div>
                        )}

                        {/* FLOW DESTINATION PATTERNS (INFO VS CONDITIONAL) */}
                        <div className="pt-3 border-t border-cyan-100">
                          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                            Tipo de Saída / Regra de Destino
                          </label>
                          <select
                            value={activeNode.calculadoraConfig?.resultados_condicionais ? 'condicional' : 'informativo'}
                            onChange={(e) => {
                              const isCond = e.target.value === 'condicional';
                              handleUpdateCalculatorConfig({ resultados_condicionais: isCond });
                              if (!isCond) {
                                handleUpdateActiveNode({ condicoes: [] });
                              } else {
                                handleUpdateActiveNode({ condicoes: activeNode.condicoes || [{ se: 'result >= 4', proximo: '' }] });
                              }
                            }}
                            className="w-full text-xs p-2 bg-white rounded-lg border border-gray-200 outline-none text-slate-700"
                          >
                            <option value="informativo">Informativo Apenas (Caminho Único)</option>
                            <option value="condicional">Direcionamento Condicional (Multi-Caminho)</option>
                          </select>
                        </div>

                        {/* EDIT CONDITIONS */}
                        {activeNode.calculadoraConfig?.resultados_condicionais && (
                          <div className="p-3 bg-white border border-cyan-100 rounded-lg space-y-3 text-left">
                            <div className="flex justify-between items-center">
                              <span className="block text-[11px] font-bold text-cyan-800 uppercase">
                                Regras de Resolução de Fluxo
                              </span>
                              <button
                                type="button"
                                onClick={handleAddCondition}
                                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-[9px] px-2 py-1 rounded"
                              >
                                + Adicionar Regra
                              </button>
                            </div>

                            <p className="text-[9px] text-cyan-600">As regras são avaliadas de cima para baixo. A primeira verdadeira direciona o fluxo.</p>

                            <div className="space-y-3">
                              {(activeNode.condicoes || []).map((cond, cIdx) => (
                                <div key={cIdx} className="flex flex-col sm:flex-row gap-2 items-end sm:items-center bg-slate-50 p-2.5 rounded-lg border border-slate-150">
                                  <div className="flex-grow w-full text-left">
                                    <label className="block text-[9px] font-bold text-slate-400 uppercase">Se a expressão for verdadeira</label>
                                    <input
                                      type="text"
                                      value={cond.se}
                                      onChange={(e) => handleUpdateCondition(cIdx, { se: e.target.value })}
                                      className="w-full text-xs p-1.5 border rounded bg-white font-mono"
                                      placeholder="Ex: result >= 5 ou severidade === 'alta'"
                                    />
                                  </div>

                                  <div className="w-full sm:w-48 shrink-0 text-left">
                                    <label className="block text-[9px] font-bold text-slate-400 uppercase">Avançar para Etapa ID</label>
                                    <select
                                      value={cond.proximo || ''}
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        if (val === 'CREATE_NEW') {
                                          const nextNum = nos.length + 1;
                                          const newGenId = `etapa_${nextNum}_${cIdx}_${Date.now().toString().slice(-4)}`;
                                          const createdNode: ProtocoloNo = {
                                            id: newGenId,
                                            tipo: 'conduta',
                                            texto: `Trilha clínica se "${cond.se}"`,
                                            proximo: ''
                                          };
                                          setNos(prev => [...prev, createdNode]);
                                          handleUpdateCondition(cIdx, { proximo: newGenId });
                                        } else {
                                          handleUpdateCondition(cIdx, { proximo: val });
                                        }
                                      }}
                                      className="w-full text-xs p-1.5 rounded border border-gray-200 bg-white"
                                    >
                                      <option value="">Fim de Fluxo (Vazio)</option>
                                      <option value="CREATE_NEW">+ Criar e Ir Para Nova Etapa...</option>
                                      {nos.filter(n => n.id !== activeNode.id).map(no => (
                                        <option key={no.id} value={no.id}>{no.id} ({no.tipo})</option>
                                      ))}
                                    </select>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => handleDeleteCondition(cIdx)}
                                    className="p-1.5 text-slate-400 hover:text-red-500 rounded bg-white border border-slate-200 shadow-sm"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* --- NEXT SEQUENTIAL LINK ENGINE --- */}
                    {activeNode.tipo !== 'decisao' && activeNode.tipo !== 'encaminhamento' && !(activeNode.tipo === 'calculadora' && activeNode.calculadoraConfig?.resultados_condicionais) && (
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <label className="block text-xs font-bold text-slate-500 uppercase">
                          Próxima Etapa do Fluxograma
                        </label>
                        <div className="mt-1.5 flex gap-2">
                          <select
                            value={activeNode.proximo || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val === 'CREATE_NEW') {
                                const nextIndexSeq = nos.length + 1;
                                const generatedId = `etapa_${nextIndexSeq}_${Date.now().toString().slice(-4)}`;
                                const spawned: ProtocoloNo = {
                                  id: generatedId,
                                  tipo: 'conduta',
                                  texto: `Nova Etapa de Conduta ${nextIndexSeq}`,
                                  proximo: ''
                                };
                                setNos(prev => [...prev, spawned]);
                                handleUpdateActiveNode({ proximo: generatedId });
                              } else {
                                handleUpdateActiveNode({ proximo: val });
                              }
                            }}
                            className="flex-grow text-xs bg-white p-2.5 rounded-lg border border-gray-200 outline-none font-semibold text-slate-700"
                          >
                            <option value="">Fim de Fluxo (Sem continuidade)</option>
                            <option value="CREATE_NEW">+ Criar e Ir Para Nova Etapa...</option>
                            {nos.filter(n => n.id !== activeNode.id).map(no => (
                              <option key={no.id} value={no.id}>{no.id} ({no.tipo}) - {no.texto.slice(0, 45)}...</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-slate-400 italic">
                  Nenhuma etapa selecionada no menu à esquerda. Crie ou selecione uma para configurar.
                </div>
              )}

            </div>
          </motion.div>
          )
        )}

        {/* --- PASSO 3: REVISÃO E PUBLICAÇÃO --- */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* COMPOSITE STATS CARD */}
            <div className="md:col-span-4 bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-4 text-left">
              <h2 className="text-md font-bold text-slate-800 uppercase tracking-wider pb-2 border-b border-gray-100">
                Resumo Geral e Metas
              </h2>
              <div className="space-y-3 text-xs leading-normal">
                <div>
                  <span className="font-bold text-slate-500 uppercase block">Título do Protocolo:</span>
                  <p className="text-slate-800 font-semibold">{titulo || 'Não informado'}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-500 uppercase block">Categoria de Destino:</span>
                  <p className="text-slate-800 font-semibold">{finalCategory || 'Não informado'}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-500 uppercase block">Total de Etapas Cadastradas:</span>
                  <p className="text-slate-800 font-semibold">
                    {isSpecial && specialType === 'cronograma' 
                      ? `${consultas.length} consulta(s) no cronograma` 
                      : `${nos.length} nós no fluxograma`}
                  </p>
                </div>
                <div>
                  <span className="font-bold text-slate-500 uppercase block">Status de Armazenagem:</span>
                  <p className="text-slate-800 font-semibold">
                    {status === 'completo' ? (
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-100 rounded-full font-bold">Completo / Publicado</span>
                    ) : (
                      <span className="text-indigo-700 bg-indigo-50 px-2 py-0.5 border border-indigo-100 rounded-full font-bold">Rascunho em Construção</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-2">
                <button
                  onClick={() => setStatus(status === 'completo' ? 'construcao' : 'completo')}
                  className="w-full text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 p-2.5 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Alternar para {status === 'completo' ? 'Rascunho' : 'Publicado'}
                </button>
              </div>
            </div>

            {/* VALIDATOR AND WARNING REPORT PANEL */}
            <div className="md:col-span-8 bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-6 text-left">
              <div className="border-b border-gray-100 pb-3">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  {isSpecial && specialType === 'cronograma' ? 'Resultados da Auditoria do Cronograma' : 'Resultados da Auditoria de Integridade'}
                </h2>
                <p className="text-xs text-gray-400 mt-1 text-left">
                  {isSpecial && specialType === 'cronograma' 
                    ? 'Validador heurístico examinou todas as consultas sequenciais cadastradas.' 
                    : 'Validador heurístico examinou as conexões de todas as ramificações e ramais de decisão.'}
                </p>
              </div>

              {validationResults.length === 0 ? (
                <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-6 text-center text-emerald-900 space-y-2">
                  <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
                  <p className="font-bold text-sm">
                    {isSpecial && specialType === 'cronograma' ? 'Parabéns! Cronograma 100% estruturado!' : 'Parabéns! Fluxograma 100% íntegro!'}
                  </p>
                  <p className="text-xs text-emerald-700 max-w-md mx-auto leading-normal">
                    {isSpecial && specialType === 'cronograma'
                      ? 'Nenhum erro de cadastro ou consulta sem título identificados. O cronograma preventivo especial está pronto para publicação e visualização.'
                      : 'Nenhum erro de conexões, caminhos descontinuados ou etapas órfãs isoladas foi identificado. O protocolo está pronto para uso.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  
                  {/* Summary of alert boxes */}
                  <div className={`p-4 rounded-xl border flex items-start gap-3 ${hasErrors ? 'bg-red-50/50 border-red-100 text-red-900' : 'bg-amber-50/50 border-amber-100 text-amber-900'}`}>
                    <AlertTriangle className={`h-5 w-5 shrink-0 ${hasErrors ? 'text-red-500' : 'text-amber-500'}`} />
                    <div>
                      <p className="font-bold text-sm">
                        Foram identificadas {validationResults.length} inconsistência(s) de conexões
                      </p>
                      <p className="text-xs text-slate-500 mt-1 leading-normal">
                        {hasErrors 
                          ? 'Algumas etapas contêm erros crassos de links a nós inexistentes. Estes devem ser reajustados para gravação correta do fluxo.'
                          : 'Há alertas de etapas isoladas ou ramos descontinuados. Verifique se representam finais de fluxo intencionados.'}
                      </p>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-100 max-h-[350px] overflow-y-auto border border-gray-100 rounded-xl">
                    {validationResults.map((warn, wIdx) => (
                      <div key={wIdx} className="p-3 bg-white hover:bg-slate-50 flex items-center justify-between gap-3 text-xs leading-normal">
                        <div className="flex items-start gap-2 text-left">
                          <span className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${warn.severity === 'error' ? 'bg-red-500' : 'bg-amber-500'}`} />
                          <div>
                            <span className="font-mono bg-slate-100 px-1 py-0.2 rounded text-[10px] font-bold text-gray-500">
                              NÓ: {warn.nodeId}
                            </span>
                            <p className="text-slate-700 mt-1">{warn.warning}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (isSpecial && specialType === 'cronograma') {
                              if (warn.nodeId !== 'geral') {
                                setActiveConsultId(warn.nodeId);
                              }
                            } else {
                              if (warn.nodeId !== 'geral') {
                                setActiveNodeId(warn.nodeId);
                              }
                            }
                            setStep(2);
                          }}
                          className="px-2.5 py-1 bg-slate-100 text-slate-700 font-bold rounded text-[10px] hover:bg-slate-200 whitespace-nowrap cursor-pointer"
                        >
                          Ir Corrigir
                        </button>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              <div className="border-t border-gray-100 pt-5 flex justify-between items-center">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-bold shadow-sm cursor-pointer"
                >
                  Voltar ao Editor
                </button>

                <button
                  type="button"
                  disabled={hasErrors}
                  onClick={handleFinishSave}
                  className={`px-5 py-2.5 rounded-xl text-sm font-extrabold text-white shadow transition-all cursor-pointer ${
                    hasErrors 
                      ? 'bg-slate-300 cursor-not-allowed opacity-60' 
                      : 'bg-medical-600 hover:bg-medical-700'
                  }`}
                >
                  Confirmar e Registrar Protocolo
                </button>
              </div>

            </div>
          </div>

          {/* Live Flowchart Preview Card */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 text-left">
            <div className="border-b border-gray-150 pb-3 mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
                  <span className="p-1 px-2.5 rounded-full bg-medical-50 text-medical-700 font-extrabold text-[10px] uppercase tracking-wider">
                    Visualização
                  </span>
                  Pré-visualização Gráfica do Fluxograma Clínico
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Revise visualmente toda a estrutura de conexões, caminhos de decisão e fluxos projetados antes de publicar. Clique em qualquer etapa para ir direto editá-la.
                </p>
              </div>
            </div>

            <div className="w-full">
              <ProtocolFlowchart
                protocol={{
                  id: 'temp-preview',
                  titulo: titulo || 'Rascunho de Protocolo',
                  nos: nos
                }}
                onNodeClick={(nodeId) => {
                  // Direct navigation: select that clinical block and jump back to Step 2
                  setActiveNodeId(nodeId);
                  setStep(2);
                }}
                height="450px"
              />
            </div>
          </div>

          </motion.div>
        )}

      </div>

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
