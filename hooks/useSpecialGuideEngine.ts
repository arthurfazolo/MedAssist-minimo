import { useState, useEffect } from 'react';
import { db, cleanUndefined } from '../services/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { SpecialGuideDefinition, SpecialGuideConsult, SpecialGuideAlerta, SpecialGuideTriagem } from '../types/specialGuide';
import { migrateConsultItemToBlocks } from '../services/blockMigration';
import { getCalculatorById } from '../services/calculatorService';

export const useSpecialGuideEngine = (definition: SpecialGuideDefinition) => {
  // --- STATE OF CONSULT STRUCTS ---
  const [consults, setConsults] = useState<SpecialGuideConsult[]>(() => {
    const saved = localStorage.getItem(`medassist_${definition.key}_consults`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const formatted = definition.toSpecialFormat ? definition.toSpecialFormat(parsed) : parsed;
          return formatted.map((c: any) => ({
            ...c,
            blocos: c.blocos && c.blocos.length > 0 ? c.blocos : migrateConsultItemToBlocks(c)
          }));
        }
      } catch (e) {
        console.error(`Erro ao ler consultas de ${definition.key}:`, e);
      }
    }
    return (definition.initialConsults || []).map((c: any) => ({
      ...c,
      blocos: c.blocos && c.blocos.length > 0 ? c.blocos : migrateConsultItemToBlocks(c)
    }));
  });

  // Save changes to localStorage whenever consults change
  useEffect(() => {
    const dataToSave = definition.toOriginalFormat ? definition.toOriginalFormat(consults) : consults;
    localStorage.setItem(`medassist_${definition.key}_consults`, JSON.stringify(dataToSave));
  }, [consults, definition.key, definition.toOriginalFormat]);

  // Load from Firestore
  useEffect(() => {
    const loadFromFirestore = async () => {
      try {
        const docRef = doc(db, 'special_guides', definition.key);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data && Array.isArray(data.consults) && data.consults.length > 0) {
            const loaded = definition.toSpecialFormat ? definition.toSpecialFormat(data.consults) : data.consults;
            setConsults(loaded.map((c: any) => ({
              ...c,
              blocos: c.blocos && c.blocos.length > 0 ? c.blocos : migrateConsultItemToBlocks(c)
            })));
          }
        }
      } catch (e) {
        console.error(`Erro ao ler ${definition.key} do Firestore:`, e);
      }
    };
    loadFromFirestore();
  }, [definition.key, definition.toSpecialFormat]);

  const [selectedId, setSelectedId] = useState<string>(() => {
    return consults[0]?.id || '';
  });

  // Keep selectedId in sync with loaded consults
  useEffect(() => {
    if (consults.length > 0 && !consults.some(c => c.id === selectedId)) {
      setSelectedId(consults[0].id);
    }
  }, [consults, selectedId]);

  const activeConsult = consults.find(c => c.id === selectedId) || consults[0];

  const [isEditing, setIsEditing] = useState(false);
  const [runningAI, setRunningAI] = useState(false);
  const [isAIReviewOpen, setIsAIReviewOpen] = useState(false);
  const [aiProposalData, setAiProposalData] = useState<any>(null);
  const [aiSelectedFields, setAiSelectedFields] = useState<Record<string, boolean>>({
    subtitulo: true,
    anamnese: true,
    triagens: true,
    vacinas: true,
    alertas: true,
    orientacoes: true,
    proxima: true,
  });

  const [loadingMessage, setLoadingMessage] = useState('Analisando diretrizes com Inteligência Artificial...');

  // Checklist Interactive State
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>({});

  // Notes free text
  const [notesState, setNotesState] = useState<Record<string, string>>({});

  // Calculator inputs and results interactive state
  const [calculatorStates, setCalculatorStates] = useState<Record<string, { inputs: Record<string, any>; result: any }>>({});

  // Timeline search
  const [timelineSearch, setTimelineSearch] = useState('');

  // Edit item inline
  const [editingItemPath, setEditingItemPath] = useState<{
    section: string;
    index: number;
    value: string;
    categoria?: string;
    gravidade?: 'yellow' | 'red';
    conduta?: string;
  } | null>(null);

  // Rotating messages effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (runningAI) {
      const messages = [
        'Analisando literatura clínica atualizada...',
        'Mapeando diretrizes de acompanhamento especializado...',
        'Rascunhando condutas preventivas e exames...',
        'Sintetizando sinais de alerta críticos...',
        'Estruturando cronograma com o Gemini...',
      ];
      let i = 0;
      interval = setInterval(() => {
        i = (i + 1) % messages.length;
        setLoadingMessage(messages[i]);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [runningAI]);

  // --- INTERACTIVE HANDLERS ---
  const toggleCheck = (section: string, itemKey: string) => {
    const key = `${selectedId}_${section}_${itemKey}`;
    setChecklistState(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isChecked = (section: string, itemKey: string) => {
    const key = `${selectedId}_${section}_${itemKey}`;
    return !!checklistState[key];
  };

  const handleClearChecklist = () => {
    const clearedChecks = { ...checklistState };
    Object.keys(clearedChecks).forEach(k => {
      if (k.startsWith(`${selectedId}_`)) {
        delete clearedChecks[k];
      }
    });
    setChecklistState(clearedChecks);

    setNotesState(prev => {
      const copy = { ...prev };
      delete copy[selectedId];
      return copy;
    });

    setCalculatorStates(prev => {
      const copy = { ...prev };
      Object.keys(copy).forEach(k => {
        if (k.startsWith(`${selectedId}_`)) {
          delete copy[k];
        }
      });
      return copy;
    });
  };

  // --- ADMIN EDIT ACTION HANDLERS ---
  const startEditingItem = (section: string, index: number, value: string, extra?: any) => {
    setEditingItemPath({
      section,
      index,
      value,
      categoria: extra?.categoria,
      gravidade: extra?.gravidade,
      conduta: extra?.conduta,
    });
  };

  const handleSaveEditedItem = (value: string, extra?: any) => {
    if (!editingItemPath) return;
    const { section, index } = editingItemPath;

    setConsults(prev => prev.map(c => {
      if (c.id === selectedId) {
        const copy = { ...c };
        if (section === 'anamnese') {
          const arr = [...(copy.anamnese || [])];
          arr[index] = value;
          copy.anamnese = arr;
        } else if (section === 'vacinas') {
          const arr = [...(copy.vacinas || [])];
          arr[index] = value;
          copy.vacinas = arr;
        } else if (section === 'orientacoes') {
          const arr = [...(copy.orientacoes || [])];
          arr[index] = value;
          copy.orientacoes = arr;
        } else if (section === 'triagens') {
          const arr = [...(copy.triagens || [])];
          arr[index] = {
            texto: value,
            categoria: extra?.categoria || arr[index]?.categoria || 'Geral',
          };
          copy.triagens = arr;
        } else if (section === 'alertas') {
          const arr = [...(copy.alertas || [])];
          arr[index] = {
            texto: value,
            gravidade: extra?.gravidade || arr[index]?.gravidade || 'yellow',
            conduta: extra?.conduta !== undefined ? extra.conduta : (arr[index]?.conduta || ''),
          };
          copy.alertas = arr;
        }
        return copy;
      }
      return c;
    }));

    setEditingItemPath(null);
  };

  const handleDeleteListItem = (section: string, index: number) => {
    setConsults(prev => prev.map(c => {
      if (c.id === selectedId) {
        const copy = { ...c };
        if (section === 'anamnese') {
          copy.anamnese = (copy.anamnese || []).filter((_, i) => i !== index);
        } else if (section === 'vacinas') {
          copy.vacinas = (copy.vacinas || []).filter((_, i) => i !== index);
        } else if (section === 'orientacoes') {
          copy.orientacoes = (copy.orientacoes || []).filter((_, i) => i !== index);
        } else if (section === 'triagens') {
          copy.triagens = (copy.triagens || []).filter((_, i) => i !== index);
        } else if (section === 'alertas') {
          copy.alertas = (copy.alertas || []).filter((_, i) => i !== index);
        }
        return copy;
      }
      return c;
    }));
  };

  const handleAddNewItem = (section: string, value: any) => {
    setConsults(prev => prev.map(c => {
      if (c.id === selectedId) {
        const copy = { ...c };
        if (section === 'anamnese') {
          copy.anamnese = [...(copy.anamnese || []), typeof value === 'string' ? value : ''];
        } else if (section === 'vacinas') {
          copy.vacinas = [...(copy.vacinas || []), typeof value === 'string' ? value : ''];
        } else if (section === 'orientacoes') {
          copy.orientacoes = [...(copy.orientacoes || []), typeof value === 'string' ? value : ''];
        } else if (section === 'triagens') {
          const triagemObj: SpecialGuideTriagem = typeof value === 'string' 
            ? { texto: value, categoria: 'Geral' } 
            : { texto: value.texto || '', categoria: value.categoria || 'Geral' };
          copy.triagens = [...(copy.triagens || []), triagemObj];
        } else if (section === 'alertas') {
          const alertaObj: SpecialGuideAlerta = typeof value === 'string'
            ? { texto: value, gravidade: 'yellow', conduta: '' }
            : { texto: value.texto || '', gravidade: value.gravidade || 'yellow', conduta: value.conduta || '' };
          copy.alertas = [...(copy.alertas || []), alertaObj];
        }
        return copy;
      }
      return c;
    }));
  };

  const handleUpdateConsultMeta = (meta: Record<string, any>) => {
    setConsults(prev => prev.map(c => {
      if (c.id === selectedId) {
        return {
          ...c,
          meta: {
            ...(c.meta || {}),
            ...meta,
          },
        };
      }
      return c;
    }));
  };

  // --- SAVE DOCUMENT TO FIRESTORE ---
  const handleSaveGuide = async () => {
    try {
      const dataToSave = definition.toOriginalFormat ? definition.toOriginalFormat(consults) : consults;
      await setDoc(doc(db, 'special_guides', definition.key), cleanUndefined({ consults: dataToSave }));
      if (definition.onSave) {
        await definition.onSave(consults);
      }
      return true;
    } catch (e) {
      console.error(`Erro ao salvar ${definition.key} no Firestore:`, e);
      throw e;
    }
  };

  // --- AI PRE-FILL HANDLER ---
  const handleAutopreencherIA = async () => {
    if (!definition.aiGenerate) {
      console.warn('aiGenerate não foi fornecido na definição.');
      return;
    }
    setRunningAI(true);
    try {
      const response = await definition.aiGenerate(activeConsult.rotulo);
      if (response) {
        setAiProposalData(response);
        setAiSelectedFields({
          subtitulo: true,
          anamnese: true,
          triagens: true,
          vacinas: true,
          alertas: true,
          orientacoes: true,
          proxima: true,
        });
        setIsAIReviewOpen(true);
      } else {
        throw new Error('Retorno vazio ou inválido do autocompletar com IA.');
      }
    } catch (e: any) {
      console.error('Erro na geração por IA:', e);
      throw e;
    } finally {
      setRunningAI(false);
    }
  };

  const handleApplyAIProposal = () => {
    if (!aiProposalData) return;
    setConsults(prev => prev.map(c => {
      if (c.id === selectedId) {
        const updated = {
          ...c,
          subtitulo: aiSelectedFields.subtitulo ? (aiProposalData.subtitulo || c.subtitulo) : c.subtitulo,
          anamnese: aiSelectedFields.anamnese && Array.isArray(aiProposalData.anamnese) ? aiProposalData.anamnese : c.anamnese,
          triagens: aiSelectedFields.triagens && Array.isArray(aiProposalData.triagens) ? aiProposalData.triagens : c.triagens,
          vacinas: aiSelectedFields.vacinas && Array.isArray(aiProposalData.vacinas) ? aiProposalData.vacinas : c.vacinas,
          alertas: aiSelectedFields.alertas && Array.isArray(aiProposalData.alertas) ? aiProposalData.alertas : c.alertas,
          orientacoes: aiSelectedFields.orientacoes && Array.isArray(aiProposalData.orientacoes) ? aiProposalData.orientacoes : c.orientacoes,
          proxima: aiSelectedFields.proxima ? (aiProposalData.proxima || c.proxima) : c.proxima,
          blocos: undefined as any // Force re-generation from the updated fields!
        };
        updated.blocos = migrateConsultItemToBlocks(updated);
        return updated;
      }
      return c;
    }));
    setIsAIReviewOpen(false);
  };

  // --- REPORT GENERATOR ---
  const generateReport = (extraSectionText?: string): string => {
    if (!activeConsult) return '';
    const note = notesState[selectedId] || '';

    let rp = `==================================================\n`;
    rp += `MEDASSIST - RELATÓRIO DE MONITORAMENTO CLÍNICO\n`;
    rp += `Diretriz / ${definition.itemLabel}: ${activeConsult.rotulo}\n`;
    if (activeConsult.subtitulo) {
      rp += `Foco: ${activeConsult.subtitulo}\n`;
    }
    rp += `Data do Atendimento: ${new Date().toLocaleDateString('pt-BR')}\n`;
    rp += `==================================================\n\n`;

    const blocks = activeConsult.blocos || [];
    if (blocks.length === 0) {
      rp += `Nenhum bloco de conteúdo clínico registrado para esta consulta.\n\n`;
    } else {
      blocks.forEach((block) => {
        rp += `--- ${block.titulo ? block.titulo.toUpperCase() : 'SEÇÃO'} ---\n`;
        if (block.tipo === 'checklist') {
          const items = block.itens || [];
          if (items.length === 0) {
            rp += `Nenhum item registrado.\n`;
          } else {
            items.forEach((item, idx) => {
              const checked = !!checklistState[`${selectedId}_${block.id}_${idx}`];
              rp += ` [${checked ? 'Sim / Adequado' : 'Não / Pendente'}] ${item}\n`;
            });
          }
        } else if (block.tipo === 'destaque') {
          const alerts = (block as any).alertas || [];
          if (alerts.length === 0) {
            rp += `Nenhum sinal de alerta registrado.\n`;
          } else {
            alerts.forEach((alerta: any, idx: number) => {
              const checked = !!checklistState[`${selectedId}_${block.id}_${idx}`];
              rp += ` [${checked ? 'ALERTA RELEVANTE' : 'Sem sinais/OK'}] (${alerta.gravidade === 'red' ? 'GRAVE' : 'MODERADO'}) ${alerta.texto}\n`;
              if (checked && alerta.conduta) {
                rp += `   -> Conduta recomendada: ${alerta.conduta}\n`;
              }
            });
          }
        } else if (block.tipo === 'texto') {
          rp += `${block.conteudo || 'Sem conteúdo.'}\n`;
        } else if (block.tipo === 'calculadora') {
          const calcState = calculatorStates[`${selectedId}_${block.id}`];
          const calcDef = block.calculadoraId ? getCalculatorById(block.calculadoraId) : null;
          const calcName = calcDef ? calcDef.name : (block.calculadoraId || 'Calculadora não configurada');
          if (calcState && calcState.result) {
            rp += ` [CÁLCULO REALIZADO] ${calcName}\n`;
            rp += `   Resultado: ${calcState.result.value} ${calcState.result.unit || ''}\n`;
            rp += `   Interpretação: ${calcState.result.interpretation}\n`;
            if (calcState.result.recommendation) {
              rp += `   Recomendação: ${calcState.result.recommendation}\n`;
            }
          } else {
            rp += ` [ ] ${calcName} (Não calculada)\n`;
          }
        } else {
          rp += `${block.conteudo || ''}\n`;
        }
        rp += `\n`;
      });
    }

    if (note.trim()) {
      rp += `--- ANOTAÇÕES CLÍNICAS ADICIONAIS ---\n`;
      rp += `"${note}"\n\n`;
    }

    if (extraSectionText && extraSectionText.trim()) {
      rp += `--- INFORMAÇÕES ADICIONAIS DO WORKFLOW ---\n`;
      rp += `${extraSectionText}\n\n`;
    }

    rp += `--------------------------------------------------\n`;
    if (activeConsult.proxima) {
      rp += `Próxima consulta/reavaliação recomendada: ${activeConsult.proxima}\n`;
    }
    rp += `Garantia de segurança: MedAssist AI Clinical Companion 2026\n`;
    return rp;
  };

  return {
    consults,
    setConsults,
    selectedId,
    setSelectedId,
    activeConsult,
    isEditing,
    setIsEditing,
    runningAI,
    setRunningAI,
    isAIReviewOpen,
    setIsAIReviewOpen,
    aiProposalData,
    setAiProposalData,
    aiSelectedFields,
    setAiSelectedFields,
    loadingMessage,
    checklistState,
    setChecklistState,
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
  };
};
