import React, { useState, useMemo, useEffect } from 'react';
import { Protocolo, ProtocoloNo } from '../types';

export interface UseProtocolFlowReturn {
  currentNode: ProtocoloNo | null;
  currentNodeId: string | null;
  setCurrentNodeId: React.Dispatch<React.SetStateAction<string | null>>;
  flowHistory: string[];
  setFlowHistory: React.Dispatch<React.SetStateAction<string[]>>;
  pathTaken: string[];
  setPathTaken: React.Dispatch<React.SetStateAction<string[]>>;
  checklistState: Record<string, boolean>;
  noteState: Record<string, string>;
  choicesState: Record<string, { label: string; to: string }>;
  calculatorState: Record<string, { inputs: Record<string, any>; result: any }>;
  handleSaveCalculatorResult: (nodeId: string, inputs: Record<string, any>, result: any) => void;
  handleNavigateToNode: (nextNodeId: string, choiceMade?: { label: string; fromNodeId: string }) => void;
  handleGoBackStep: () => void;
  handleRestartFlow: () => void;
  handleToggleCheckitem: (itemId: string) => void;
  handleUpdateNoteText: (nodeId: string, text: string) => void;
  generateClinicalReportText: () => string;
  initializeFlow: (proto: Protocolo) => void;
  restoreSession: (savedData: any) => void;
  clearSessionData: () => void;
}

export function useProtocolFlow(protocol: Protocolo | null): UseProtocolFlowReturn {
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
  const [flowHistory, setFlowHistory] = useState<string[]>([]);
  const [pathTaken, setPathTaken] = useState<string[]>([]);
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>({});
  const [noteState, setNoteState] = useState<Record<string, string>>({});
  const [choicesState, setChoicesState] = useState<Record<string, { label: string; to: string }>>({});
  const [calculatorState, setCalculatorState] = useState<Record<string, { inputs: Record<string, any>; result: any }>>({});

  const currentNode = useMemo<ProtocoloNo | null>(() => {
    if (!protocol || !currentNodeId) return null;
    return protocol.nos.find(n => n.id === currentNodeId) || null;
  }, [protocol, currentNodeId]);

  // Persistently save state when changed
  useEffect(() => {
    if (protocol && currentNodeId) {
      const data = {
        currentNodeId,
        flowHistory,
        pathTaken,
        checklistState,
        noteState,
        choicesState,
        calculatorState,
      };
      sessionStorage.setItem(`medassist_flow_session_${protocol.id}`, JSON.stringify(data));
    }
  }, [protocol, currentNodeId, flowHistory, pathTaken, checklistState, noteState, choicesState, calculatorState]);

  const restoreSession = (savedData: any) => {
    if (!savedData) return;
    setCurrentNodeId(savedData.currentNodeId || null);
    setFlowHistory(savedData.flowHistory || []);
    setPathTaken(savedData.pathTaken || []);
    setChecklistState(savedData.checklistState || {});
    setNoteState(savedData.noteState || {});
    setChoicesState(savedData.choicesState || {});
    setCalculatorState(savedData.calculatorState || {});
  };

  const clearSessionData = () => {
    if (protocol) {
      sessionStorage.removeItem(`medassist_flow_session_${protocol.id}`);
    }
  };

  const initializeFlow = (proto: Protocolo) => {
    setCurrentNodeId(proto.nos[0]?.id || null);
    setFlowHistory([]);
    setPathTaken([proto.nos[0]?.id || '']);
    setChecklistState({});
    setNoteState({});
    setChoicesState({});
    setCalculatorState({});
  };

  const handleSaveCalculatorResult = (nodeId: string, inputs: Record<string, any>, result: any) => {
    setCalculatorState(prev => ({
      ...prev,
      [nodeId]: { inputs, result }
    }));
  };

  const handleNavigateToNode = (nextNodeId: string, choiceMade?: { label: string; fromNodeId: string }) => {
    if (!protocol) return;

    if (currentNodeId) {
      setFlowHistory(prev => [...prev, currentNodeId]);
      if (choiceMade) {
        setChoicesState(prev => ({
          ...prev,
          [choiceMade.fromNodeId]: { label: choiceMade.label, to: nextNodeId }
        }));
      }
    }

    setCurrentNodeId(nextNodeId);
    setPathTaken(prev => [...prev, nextNodeId]);
  };

  const handleGoBackStep = () => {
    if (flowHistory.length === 0) return;

    const previousStack = [...flowHistory];
    const previousNodeId = previousStack.pop() || null;

    setFlowHistory(previousStack);
    setCurrentNodeId(previousNodeId);

    setPathTaken(prev => {
      const copy = [...prev];
      copy.pop();
      return copy;
    });
  };

  const handleRestartFlow = () => {
    if (!protocol) return;
    setCurrentNodeId(protocol.nos[0]?.id || null);
    setFlowHistory([]);
    setPathTaken([protocol.nos[0]?.id || '']);
    setChecklistState({});
    setNoteState({});
    setChoicesState({});
    setCalculatorState({});
    clearSessionData();
  };

  const handleToggleCheckitem = (itemId: string) => {
    setChecklistState(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleUpdateNoteText = (nodeId: string, text: string) => {
    setNoteState(prev => ({
      ...prev,
      [nodeId]: text
    }));
  };

  const generateClinicalReportText = (): string => {
    if (!protocol) return '';

    let report = `==================================================\n`;
    report += `MEDASSIST - RESUMO DE ATENDIMENTO CLÍNICO\n`;
    report += `Protocolo: ${protocol.titulo} (${protocol.categoria})\n`;
    report += `Data/Hora: ${new Date().toLocaleString('pt-BR')}\n`;
    report += `==================================================\n\n`;

    report += `--- TRILHA DE DECISÕES E CONDUTAS ---\n`;

    pathTaken.forEach((nid, index) => {
      const node = protocol.nos.find(n => n.id === nid);
      if (!node) return;

      const stepNum = index + 1;
      const typeLabel = node.tipo.toUpperCase();

      report += `[Etapa ${stepNum}] (${typeLabel}) ${node.texto}\n`;

      if (node.tipo === 'decisao' && choicesState[node.id]) {
        report += `   👉 Decisão tomada: ${choicesState[node.id].label}\n`;
      }

      if (node.tipo === 'checklist' && node.checklistItems) {
        report += `   ✓ Itens de Checklist Processados:\n`;
        node.checklistItems.forEach(item => {
          const isChecked = !!checklistState[item.id];
          report += `     [${isChecked ? 'X' : ' '}] ${item.texto}\n`;
        });
      }

      if (node.tipo === 'calculadora' && calculatorState[node.id]) {
        const calcRes = calculatorState[node.id];
        report += `   🧮 Calculadora Executada:\n`;
        report += `     - Dados de entrada: ${Object.entries(calcRes.inputs)
          .map(([k, v]) => `${k}: ${v}`)
          .join(', ')}\n`;
        report += `     - Resultado: ${calcRes.result.value} ${calcRes.result.unit || ''}\n`;
        report += `     - Avaliação clínica: ${calcRes.result.interpretation || ''}\n`;
        if (calcRes.result.recommendation) {
          report += `     - Conduta recomendada: ${calcRes.result.recommendation}\n`;
        }
      }

      if (noteState[node.id]?.trim()) {
        report += `   ✍ Anotação clínica: "${noteState[node.id]}"\n`;
      }

      report += `\n`;
    });

    report += `--------------------------------------------------\n`;
    report += `Aviso: Relatório gerado dinamicamente para fins de apoio à decisão clínica e transposição em prontuário eletrônico.\n`;

    return report;
  };

  return {
    currentNode,
    currentNodeId,
    setCurrentNodeId,
    flowHistory,
    setFlowHistory,
    pathTaken,
    setPathTaken,
    checklistState,
    noteState,
    choicesState,
    calculatorState,
    handleSaveCalculatorResult,
    handleNavigateToNode,
    handleGoBackStep,
    handleRestartFlow,
    handleToggleCheckitem,
    handleUpdateNoteText,
    generateClinicalReportText,
    initializeFlow,
    restoreSession,
    clearSessionData,
  };
}
