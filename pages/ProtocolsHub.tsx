import React, { useState, useEffect } from 'react';
import { 
  Search, ArrowLeft, RotateCcw, CheckSquare, Square, AlertTriangle, 
  CheckCircle2, ArrowRight, Printer, Copy, FileText, Map, HelpCircle, 
  Send, ListPlus, Activity, BookOpen, Layers, Check, FileCheck,
  Shield, Download, Upload, Plus, Edit3, Trash2, CopyPlus, Heart, HeartPulse
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useAuth } from '../App';
import { Protocolo, ProtocoloNo, ProtocoloOpcao } from '../types';
import { getProtocols, saveProtocols as saveProtocolsStore } from '../services/protocolsService';
import { UniversalClinicalEditor } from './UniversalClinicalEditor';
import { ProtocolFlowchart } from '../components/ProtocolFlowchart';
import { motion, AnimatePresence } from 'motion/react';
import { preferencesService } from '../services/preferencesService';
import ClinicalDisclaimer from './ClinicalDisclaimer';
import { useFavorites } from '../hooks/useFavorites';
import { useProtocolFlow } from '../hooks/useProtocolFlow';
import { AlertModal, ConfirmModal } from '../components/ui/Modal';
import { useConfirmModal, useAlertModal } from '../hooks/useModal';
import { PrintableReport } from '../components/PrintableReport';
import { EmbeddedCalculator } from '../components/EmbeddedCalculator';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';

const ProtocolsHub: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  // --- STATE ---
  const [protocols, setProtocols] = useState<Protocolo[]>(() => {
    const rawProtocols = getProtocols();
    return rawProtocols.map(p => {
      const normalizedCat = (p.categoria === 'Ambulatório' || p.categoria === 'Pronto Socorro') 
        ? p.categoria 
        : 'Pronto Socorro';
      return { ...p, categoria: normalizedCat };
    });
  });

  const saveProtocols = (updated: Protocolo[]) => {
    setProtocols(updated);
    saveProtocolsStore(updated);
  };

  // Sync real-time updates from Firestore to React state
  useEffect(() => {
    const handleUpdate = () => {
      const rawProtocols = getProtocols();
      setProtocols(rawProtocols.map(p => {
        const normalizedCat = (p.categoria === 'Ambulatório' || p.categoria === 'Pronto Socorro') 
          ? p.categoria 
          : 'Pronto Socorro';
        return { ...p, categoria: normalizedCat };
      }));
    };
    window.addEventListener('medassist:protocols-updated', handleUpdate);
    return () => window.removeEventListener('medassist:protocols-updated', handleUpdate);
  }, []);

  const [controlMode, setControlMode] = useState<'list' | 'editor'>('list');
  const [editingProtocol, setEditingProtocol] = useState<Protocolo | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const { isFavorite, toggleFavorite } = useFavorites('protocols');

  // Interactive Flow States
  const [selectedProtocol, setSelectedProtocol] = useState<Protocolo | null>(null);
  const [fullMapMode, setFullMapMode] = useState(false);
  const [mapViewStyle, setMapViewStyle] = useState<'list' | 'flowchart'>('flowchart');

  useEffect(() => {
    const params1 = new URLSearchParams(window.location.search);
    const hashParts = window.location.hash.split('?');
    const params2 = new URLSearchParams(hashParts[1] || '');
    const editId = params1.get('edit') || params2.get('edit');
    if (editId && protocols.length > 0) {
      const found = protocols.find(p => p.id === editId);
      if (found) {
        setEditingProtocol(found);
        setControlMode('editor');
      }
    }
  }, [protocols]);

  // Print support ref
  const reportPrintRef = useRef<HTMLDivElement>(null);
  const handlePrintReport = useReactToPrint({
    contentRef: reportPrintRef,
    documentTitle: selectedProtocol ? `Relatório Clinico - ${selectedProtocol.titulo}` : 'Relatorio Clinico',
  });

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

  const {
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
  } = useProtocolFlow(selectedProtocol);

  const handleSelectProtocol = async (proto: Protocolo) => {
    setSelectedProtocol(proto);
    
    const sessionKey = `medassist_flow_session_${proto.id}`;
    const saved = sessionStorage.getItem(sessionKey);
    if (saved) {
      const confirmed = await requestConfirm({
        title: 'Restaurar Progresso',
        message: 'Identificamos um atendimento em andamento para este protocolo. Deseja restaurar o progresso anterior?',
        variant: 'default'
      });
      if (confirmed) {
        try {
          const parsed = JSON.parse(saved);
          restoreSession(parsed);
          setFullMapMode(false);
          return;
        } catch (e) {
          console.error('Erro ao restaurar sessao:', e);
        }
      }
    }
    initializeFlow(proto);
    setFullMapMode(false);
  };

  const handleBackToMainList = () => {
    clearSessionData();
    setSelectedProtocol(null);
  };

  // Parse ID from search parameters (e.g. ?id=some-id)
  useEffect(() => {
    if (protocols.length > 0) {
      const parts = window.location.hash.split('?');
      const params = new URLSearchParams(parts[1] || window.location.search);
      const id = params.get('id');
      if (id) {
        const proto = protocols.find(p => p.id === id);
        if (proto) {
          handleSelectProtocol(proto);
        }
      }
    }
  }, [protocols]);

  // Copy-to-clipboard feedback
  const [copiedFeedback, setCopiedFeedback] = useState(false);

  // Divided into "Ambulatório" and "Pronto Socorro" as requested
  const categories = ['all', 'Ambulatório', 'Pronto Socorro'];

  // --- ADMIN HANDLERS ---
  const handleDuplicateProtocol = (proto: Protocolo, e: React.MouseEvent) => {
    e.stopPropagation();
    const duplicated: Protocolo = {
      ...proto,
      id: `${proto.id}-copia-${Date.now().toString().slice(-4)}`,
      titulo: `${proto.titulo} (Cópia)`,
      status: 'construcao',
      nos: JSON.parse(JSON.stringify(proto.nos))
    };
    const updated = [...protocols, duplicated];
    saveProtocols(updated);
    showAlert({
      title: 'Protocolo Duplicado',
      message: 'Protocolo duplicado com sucesso em modo de rascunho!',
      type: 'success'
    });
  };

  const handleDeleteProtocol = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const confirmed = await requestConfirm({
      title: 'Excluir Protocolo',
      message: 'Deseja realmente excluir este protocolo de forma definitiva? Esta ação não pode ser desfeita.',
      variant: 'danger'
    });
    if (confirmed) {
      const updated = protocols.filter(p => p.id !== id);
      saveProtocols(updated);
      showAlert({
        title: 'Protocolo Excluído',
        message: 'Protocolo excluído com sucesso.',
        type: 'success'
      });
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(protocols, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `medassist_protocolos_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        let imported: Protocolo[] = [];
        if (Array.isArray(data)) {
          imported = data;
        } else if (data && typeof data === 'object' && data.id && data.titulo && data.nos) {
          imported = [data];
        } else {
          showAlert({
            title: 'Formato Inválido',
            message: 'Formato de arquivo inválido. Certifique-se de que o JSON representa protocolos válidos.',
            type: 'error'
          });
          return;
        }
        
        const confirmed = await requestConfirm({
          title: 'Importar Protocolos',
          message: `Deseja importar ${imported.length} protocolo(s)? Protocolos com IDs idênticos aos existentes serão sobrescritos.`,
          variant: 'warning'
        });
        if (confirmed) {
          const map = new Map(protocols.map(p => [p.id, p]));
          imported.forEach(p => {
            map.set(p.id, p);
          });
          saveProtocols(Array.from(map.values()));
          showAlert({
            title: 'Importação Concluída',
            message: 'Protocolos importados com sucesso!',
            type: 'success'
          });
        }
      } catch (err) {
        showAlert({
          title: 'Erro de Leitura',
          message: 'Erro ao ler arquivo JSON: ' + (err as Error).message,
          type: 'error'
        });
      }
    };
    reader.readAsText(file);
  };

  // FILTERED PROTOCOLS list
  const filteredProtocols = protocols.filter(p => {
    const matchesSearch = p.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || p.categoria === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // --- REPORT GENERATOR ---

  const handleCopyToClipboard = () => {
    const reportText = generateClinicalReportText();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(reportText)
        .then(() => {
          setCopiedFeedback(true);
          setTimeout(() => setCopiedFeedback(false), 2500);
        })
        .catch(() => {});
    }
  };

  if (controlMode === 'editor') {
    return (
      <UniversalClinicalEditor
        protocol={editingProtocol}
        existingCategories={Array.from(new Set(protocols.map(p => p.categoria)))}
        onSave={(compiled) => {
          const exists = protocols.some(p => p.id === compiled.id);
          const updated = exists
            ? protocols.map(p => p.id === compiled.id ? compiled : p)
            : [...protocols, compiled];
          saveProtocols(updated);
          setControlMode('list');
          setEditingProtocol(null);
          showAlert({
            title: 'Protocolo Gravado',
            message: 'Protocolo gravado com sucesso!',
            type: 'success'
          });
        }}
        onCancel={() => {
          setControlMode('list');
          setEditingProtocol(null);
        }}
      />
    );
  }

  return (
    <div className="px-4 py-8 sm:px-0">

      {/* --- RENDERIZAÇÃO PROTOCOLO ATIVO (PASSO A PASSO) --- */}
      {selectedProtocol ? (
          <div>
            {/* HEADER DO ATENDIMENTO ATIVO */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-5 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 dark:bg-slate-800 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleBackToMainList}
                icon={<ArrowLeft className="h-4 w-4" />}
                id="btn-back-to-list"
              >
                Sair
              </Button>
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="medical">
                    {selectedProtocol.categoria}
                  </Badge>
                  <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                    Atendimento em curso
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 dark:text-slate-100">
                  {selectedProtocol.titulo}
                </h1>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto">
              {/* Toggle Favorite */}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  toggleFavorite(selectedProtocol.id);
                }}
                icon={<Heart className={`h-4 w-4 ${isFavorite(selectedProtocol.id) ? "text-red-500 fill-red-500" : ""}`} />}
                title={isFavorite(selectedProtocol.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              >
                Favorito
              </Button>

              {/* Toggle Map Mode */}
              <Button
                variant={fullMapMode ? "primary" : "secondary"}
                size="sm"
                onClick={() => setFullMapMode(!fullMapMode)}
                icon={<Map className="h-4 w-4" />}
                title="Visualizar mapa completo de fluxograma"
              >
                {fullMapMode ? 'Modo Interativo' : 'Ver Fluxograma Completo'}
              </Button>

              <Button
                variant="destructive"
                size="sm"
                onClick={handleRestartFlow}
                icon={<RotateCcw className="h-3.5 w-3.5" />}
                title="Reiniciar todo o fluxo do zero"
              >
                Reiniciar
              </Button>
            </div>
          </div>

          {/* --- MAP VIEW (FULL FLOW) --- */}
          {fullMapMode ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6 dark:bg-slate-800 dark:border-slate-700"
            >
              <div className="flex flex-wrap gap-4 justify-between items-center border-b border-slate-100 pb-3 mb-6 dark:border-slate-700">
                <div>
                  <h2 className="text-lg font-bold text-slate-850 dark:text-slate-100 flex items-center gap-1.5">
                    <Map className="h-5 w-5 text-medical-600" />
                    Mapa Completo do Fluxograma
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5 dark:text-slate-400">
                    Visão geral sistêmica de todas as decisões e ramificações desenhadas para este atendimento. O nó atualmente ativo está destacado.
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Selector of Style View */}
                  <div className="bg-slate-100 p-1 rounded-xl flex items-center dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80">
                    <button
                      onClick={() => setMapViewStyle('flowchart')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                        mapViewStyle === 'flowchart'
                          ? 'bg-white text-medical-700 shadow dark:bg-slate-800 dark:text-medical-400'
                          : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-300'
                      }`}
                    >
                      <Layers className="h-3.5 w-3.5" />
                      Visualizar Fluxograma
                    </button>
                    <button
                      onClick={() => setMapViewStyle('list')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                        mapViewStyle === 'list'
                          ? 'bg-white text-medical-700 shadow dark:bg-slate-800 dark:text-medical-400'
                          : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-300'
                      }`}
                    >
                      <ListPlus className="h-3.5 w-3.5" />
                      Visualização em Blocos
                    </button>
                  </div>

                  <button
                    onClick={() => setFullMapMode(false)}
                    className="bg-medical-600 hover:bg-medical-700 text-white font-semibold px-4 py-2 rounded-xl text-xs cursor-pointer transition-colors"
                  >
                    Voltar ao Passo Atual
                  </button>
                </div>
              </div>

              {mapViewStyle === 'flowchart' ? (
                <div className="w-full">
                  <ProtocolFlowchart
                    protocol={selectedProtocol}
                    currentNodeId={currentNodeId}
                    pathTaken={pathTaken}
                    onNodeClick={(nodeId) => {
                      // Move directly to this clinical block
                      setCurrentNodeId(nodeId);
                      setFullMapMode(false);
                      if (!pathTaken.includes(nodeId)) {
                        setPathTaken(prev => [...prev, nodeId]);
                      }
                    }}
                    height="600px"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedProtocol.nos.map((no) => {
                    const isActive = currentNodeId === no.id;
                    const isVisisted = pathTaken.includes(no.id);

                    // Colors per type
                    let typeColorClass = 'border-l-4 border-l-slate-400';
                    if (no.tipo === 'decisao') typeColorClass = 'border-l-4 border-l-sky-500 bg-sky-50/20';
                    if (no.tipo === 'conduta') typeColorClass = 'border-l-4 border-l-emerald-500 bg-emerald-50/20';
                    if (no.tipo === 'alerta') typeColorClass = 'border-l-4 border-l-amber-500 bg-amber-50/20';
                    if (no.tipo === 'checklist') typeColorClass = 'border-l-4 border-l-purple-500 bg-purple-50/20';
                    if (no.tipo === 'encaminhamento') typeColorClass = 'border-l-4 border-l-indigo-500 bg-indigo-50/20';

                    return (
                      <div
                        key={no.id}
                        onClick={() => {
                          // Quick leap
                          setCurrentNodeId(no.id);
                          setFullMapMode(false);
                          if (!pathTaken.includes(no.id)) {
                            setPathTaken(prev => [...prev, no.id]);
                          }
                        }}
                        className={`p-4 rounded-xl border relative transition-all duration-150 cursor-pointer text-left ${typeColorClass} ${
                          isActive 
                            ? 'border-medical-500 ring-4 ring-medical-100 shadow-sm font-semibold dark:ring-medical-900/50' 
                            : isVisisted 
                              ? 'border-slate-300 opacity-80 dark:border-slate-600' 
                              : 'border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600'
                        }`}
                      >
                        {isActive && (
                          <span className="absolute -top-2.5 right-3 bg-medical-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm uppercase">
                            Etapa Ativa
                          </span>
                        )}

                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                            NÓ: {no.id} — {no.tipo}
                          </span>
                        </div>

                        <p className="text-sm font-semibold text-slate-800 line-clamp-2">
                          {no.texto}
                        </p>

                        <div className="mt-3 pt-2.5 border-t border-slate-100/60 text-xs text-slate-500">
                          {no.tipo === 'decisao' && no.opcoes ? (
                            <div className="space-y-1">
                              <span className="font-semibold block text-slate-400">Opções disponíveis:</span>
                              {no.opcoes.map((op, oIdx) => (
                                <div key={oIdx} className="flex items-center gap-1.5 text-sky-700">
                                  <span className="h-1 w-1 bg-sky-500 rounded-full" />
                                  <span>{op.label} → <span className="font-mono text-[10px] font-bold text-slate-400 bg-slate-100 px-1 py-0.2 rounded">{op.proximo}</span></span>
                                </div>
                              ))}
                            </div>
                          ) : no.proximo ? (
                            <p className="text-slate-400">
                              Próximo: <span className="font-mono font-bold bg-slate-100 select-all p-0.5 text-[10px] text-slate-600 rounded">{no.proximo}</span>
                            </p>
                          ) : (
                            <span className="text-indigo-600 font-semibold italic">Fim de fluxo / Encaminhamento</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          ) : (
            /* --- STEP-BY-STEP INTERACTIVE MODE (DEFAULT) --- */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT COLUMN: ACTIVE STEP CONTAINER */}
              <div className="lg:col-span-7 space-y-4">
                
                {currentNode ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentNode.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.15 }}
                      className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden dark:bg-slate-800 dark:border-slate-700"
                    >
                      {/* STEP CATEGORY COLOR HEADER */}
                      <div className={`p-4 text-white font-bold text-sm tracking-wide flex justify-between items-center ${
                        currentNode.tipo === 'decisao' ? 'bg-sky-600' :
                        currentNode.tipo === 'conduta' ? 'bg-emerald-600' :
                        currentNode.tipo === 'alerta' ? 'bg-amber-500' :
                        currentNode.tipo === 'checklist' ? 'bg-purple-600' :
                        currentNode.tipo === 'calculadora' ? 'bg-cyan-600 font-extrabold' :
                        'bg-indigo-600'
                      }`}>
                        <div className="flex items-center gap-2">
                          <Layers className="h-4 w-4" />
                          <span className="uppercase text-xs font-extrabold">
                            ETAPA {pathTaken.indexOf(currentNode.id) !== -1 ? pathTaken.indexOf(currentNode.id) + 1 : pathTaken.length} — {currentNode.tipo}
                          </span>
                        </div>
                        <span className="text-xs bg-black/15 px-2 py-0.5 rounded font-mono">
                          ID: {currentNode.id}
                        </span>
                      </div>

                      {/* STEP CONTENT BODY */}
                      <div className="p-6">
                        
                        {/* Title Display */}
                        <div className="mb-4">
                          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug dark:text-slate-100">
                            {currentNode.texto}
                          </h2>
                          {currentNode.subtexto && (
                            <p className="mt-2 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-700 flex gap-2">
                              {currentNode.tipo === 'alerta' && <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />}
                              <span>{currentNode.subtexto}</span>
                            </p>
                          )}
                        </div>

                        {/* --- INTERACTIVE ACTION INTERFACES DEPENDING ON NODE TYPE --- */}
                        
                        {/* 1. DECISÃO (Buttons for choices) */}
                        {currentNode.tipo === 'decisao' && currentNode.opcoes && (
                          <div className="mt-6 space-y-3">
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Selecione uma opção para prosseguir:</span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="decision-options">
                              {currentNode.opcoes.map((op, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => handleNavigateToNode(op.proximo, { label: op.label, fromNodeId: currentNode.id })}
                                  className="p-4 rounded-xl border-2 border-slate-200 hover:border-sky-500 hover:bg-sky-50/35 text-slate-800 hover:text-sky-900 font-semibold text-sm transition-all text-left flex justify-between items-center group shadow-sm hover:shadow dark:border-slate-600 dark:text-slate-200 dark:hover:border-sky-500 dark:hover:bg-sky-900/20 dark:hover:text-sky-300"
                                >
                                  <span>{op.label}</span>
                                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-sky-600 transition-colors flex-shrink-0 ml-2" />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 2. CHECKLIST (Interactive boxes) */}
                        {currentNode.tipo === 'checklist' && currentNode.checklistItems && (
                          <div className="mt-6 space-y-3">
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                              Marque os itens conforme realizados:
                            </span>
                            <div className="space-y-2" id="checklist-step-items">
                              {currentNode.checklistItems.map((item) => {
                                const checked = !!checklistState[item.id];
                                return (
                                  <div
                                    key={item.id}
                                    onClick={() => handleToggleCheckitem(item.id)}
                                    className={`p-3.5 rounded-xl border cursor-pointer flex items-start gap-3 transition-all ${
                                      checked 
                                        ? 'bg-purple-50/30 border-purple-300 text-purple-900 shadow-sm dark:bg-purple-900/20 dark:border-purple-700 dark:text-purple-200' 
                                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 dark:bg-slate-700 dark:border-slate-600 dark:hover:border-slate-500 dark:text-slate-200'
                                    }`}
                                  >
                                    <div className="mt-0.5 flex-shrink-0">
                                      {checked ? (
                                        <CheckSquare className="h-5 w-5 text-purple-600" />
                                      ) : (
                                        <Square className="h-5 w-5 text-slate-300" />
                                      )}
                                    </div>
                                    <span className="text-sm font-medium">
                                      {item.texto}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* 3. CALCULADORA (Inline embedded interactive calculator) */}
                        {currentNode.tipo === 'calculadora' && (
                          <div className="mt-4 text-left">
                            <EmbeddedCalculator
                              node={currentNode}
                              savedState={calculatorState[currentNode.id]}
                              onSaveResult={handleSaveCalculatorResult}
                              onNavigate={handleNavigateToNode}
                            />
                          </div>
                        )}

                        {/* Singularity Nav Flow (For Conduta, Alerta or Checklist with singular advance path) */}
                        {currentNode.tipo !== 'decisao' && currentNode.tipo !== 'calculadora' && currentNode.proximo && (
                          <div className="mt-6 pt-5 border-t border-slate-100 flex justify-end">
                            <button
                              onClick={() => handleNavigateToNode(currentNode.proximo!)}
                              className="bg-medical-600 hover:bg-medical-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:shadow transition-all text-sm flex items-center gap-1.5 group"
                              id="btn-next-step"
                            >
                              Avançar para Próxima Conduta
                              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                          </div>
                        )}

                        {/* End of Flow indications */}
                        {currentNode.tipo === 'encaminhamento' && (
                          <div className="mt-6 p-4 rounded-xl bg-indigo-50 border border-indigo-100 flex items-start gap-3 text-indigo-900">
                            <CheckCircle2 className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-bold text-sm">Protocolo Guiado Concluído com Sucesso</p>
                              <p className="text-xs text-indigo-700/95 mt-1">
                                Trilha clínica recomendada finalizada. Utilize o quadro lateral para copiar ou imprimir o percurso do atendimento para inserção no prontuário do seu paciente.
                              </p>
                            </div>
                          </div>
                        )}

                        {/* --- ANOTAÇÃO CLÍNICA DE BEIRA DE LEITO --- */}
                        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-750">
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 dark:text-slate-500">
                            Anotações clínicas para esta etapa (opcional):
                          </label>
                          <textarea
                            rows={2}
                            placeholder="Ex: Saturação em 92%, iniciado cateter de O2 a 2L/min sem sinal de desconforto..."
                            value={noteState[currentNode.id] || ''}
                            onChange={(e) => handleUpdateNoteText(currentNode.id, e.target.value)}
                            className="w-full text-sm p-3 rounded-lg border border-slate-200 focus:border-medical-500 focus:ring-2 focus:ring-medical-100 outline-none text-slate-800 placeholder-slate-400 bg-slate-50 focus:bg-white transition-all dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 dark:placeholder-slate-500 dark:focus:bg-slate-600"
                            id={`note-input-${currentNode.id}`}
                          />
                        </div>

                      </div>

                      {/* STEP CARD FOOTER: STEPPERS AND BACK BUTTONS */}
                      <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center dark:bg-slate-900 dark:border-slate-700">
                        <button
                          onClick={handleGoBackStep}
                          disabled={flowHistory.length === 0}
                          className="px-3.5 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-500 hover:bg-white hover:text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                          id="btn-back-step"
                        >
                          <ArrowLeft className="h-3 w-3" />
                          Voltar Etapa
                        </button>

                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <span>Histórico de etapas percorridas:</span>
                          <span className="font-bold font-mono text-slate-600 bg-slate-200/60 px-1.5 py-0.5 rounded dark:bg-slate-800 dark:text-slate-300">
                            {pathTaken.length}
                          </span>
                        </div>
                      </div>

                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center text-slate-400">
                    <HelpCircle className="h-10 w-10 mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold text-slate-700">Erro: Nenhuma etapa ativa encontrada.</p>
                    <button onClick={handleBackToMainList} className="mt-2 text-medical-600 hover:underline">Selecionar outro protocolo</button>
                  </div>
                )}

                {/* PROGRESS GRAPH BAR */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 flex items-center gap-1.5 overflow-x-auto text-xs whitespace-nowrap dark:bg-slate-800 dark:border-slate-700">
                  <span className="font-semibold text-slate-500 flex-shrink-0 dark:text-slate-400">Caminho:</span>
                  {pathTaken.map((nid, index) => {
                    const stepNo = selectedProtocol.nos.find(n => n.id === nid);
                    const isLatest = index === pathTaken.length - 1;
                    return (
                      <React.Fragment key={nid}>
                        {index > 0 && <span className="text-slate-300">&gt;</span>}
                        <button
                          onClick={() => {
                            // Can jump back in the stack safely if present
                            if (pathTaken.includes(nid)) {
                              const pos = pathTaken.indexOf(nid);
                              const newHistory = pathTaken.slice(0, pos);
                              const newPath = pathTaken.slice(0, pos + 1);
                              setFlowHistory(newHistory);
                              setPathTaken(newPath);
                              setCurrentNodeId(nid);
                            }
                          }}
                          className={`font-semibold rounded px-1.5 py-0.5 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                            isLatest 
                              ? 'text-medical-600 bg-medical-50 font-bold border border-medical-100 dark:bg-medical-900/30 dark:text-medical-400 dark:border-medical-800' 
                              : 'text-slate-400 dark:text-slate-500'
                          }`}
                        >
                          {nid} ({stepNo?.tipo})
                        </button>
                      </React.Fragment>
                    );
                  })}
                </div>

              </div>

              {/* RIGHT COLUMN: REALTIME REPORT & COPY PASTER SHEET */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden sticky top-20 dark:bg-slate-800 dark:border-slate-700">
                  
                  {/* Summary title */}
                  <div className="p-4 bg-slate-800 text-white flex justify-between items-center dark:bg-slate-900 dark:border-b dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <FileCheck className="h-4.5 w-4.5 text-medical-400" />
                      <h3 className="font-bold text-sm uppercase tracking-wide">
                        Registro Prontuário Clínico
                      </h3>
                    </div>
                    
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded uppercase font-bold text-slate-300">
                      Real-time
                    </span>
                  </div>

                  {/* Summary output panel */}
                  <div className="p-4 sm:p-5">
                    <p className="text-xs text-slate-500 mb-3.5 dark:text-slate-400">
                      Copie o resumo estruturado e as anotações do atendimento abaixo para anexar diretamente à evolução ou prontuário eletrônico do paciente:
                    </p>

                    <div className="bg-slate-900 text-slate-100 text-xs font-mono p-4 rounded-xl max-h-[380px] overflow-y-auto border border-slate-950 space-y-3 shadow-inner whitespace-pre-wrap select-all">
                      <p className="text-slate-500 text-[10px] border-b border-slate-800 pb-1.5 uppercase font-bold">
                        Pré-visualização do texto de evolução:
                      </p>
                      {selectedProtocol && (
                        <div>
                          <p className="text-medical-400"># ATENDIMENTO GUIADO - MEDASSIST</p>
                          <p>Protocolo: {selectedProtocol.titulo}</p>
                          <p>Data: {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}</p>
                          <p className="text-slate-500">---------------------------------------</p>
                          <div className="space-y-4 mt-2">
                            {pathTaken.map((nid, index) => {
                              const step = selectedProtocol.nos.find(n => n.id === nid);
                              if (!step) return null;
                              
                              const choice = choicesState[nid];
                              const note = noteState[nid];

                              // Check if any checklists are marked
                              const chkItems = step.checklistItems || [];
                              const checkedItems = chkItems.filter(item => !!checklistState[item.id]);

                              return (
                                <div key={nid} className="border-l-2 border-slate-800 pl-2 py-0.5">
                                  <p className="text-slate-400 font-bold">[{index + 1}] {step.texto}</p>
                                  {choice && <p className="text-sky-300 font-medium">  &gt; Opção: {choice.label}</p>}
                                  
                                  {checkedItems.length > 0 && (
                                    <div className="text-purple-300 ml-2">
                                      <p className="text-slate-500 italic">  Checado no Checklist:</p>
                                      {checkedItems.map(item => (
                                        <p key={item.id}>  - [x] {item.texto.substring(0, 50)}...</p>
                                      ))}
                                    </div>
                                  )}

                                  {note?.trim() && (
                                    <p className="text-teal-300 bg-teal-950/20 px-1 py-0.5 rounded mt-0.5 ml-2 font-medium">  &quot;{note}&quot;</p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Copier & Print Buttons */}
                    <div className="mt-4 grid grid-cols-2 gap-2" id="report-controls-panel">
                      <button
                        onClick={handleCopyToClipboard}
                        className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm hover:shadow ${
                          copiedFeedback 
                            ? 'bg-emerald-600 border border-emerald-600 text-white' 
                            : 'bg-medical-600 hover:bg-medical-700 text-white border border-medical-600'
                        }`}
                      >
                        {copiedFeedback ? (
                          <>
                            <Check className="h-4 w-4" />
                            Copiado!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Copiar para Prontuário
                          </>
                        )}
                      </button>

                      <button
                        onClick={handlePrintReport}
                        className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-800 border border-slate-200 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200 dark:border-slate-600"
                      >
                        <Printer className="h-4 w-4" />
                        Imprimir / PDF
                      </button>
                    </div>

                    {/* Disclaimer Banner */}
                    <div className="mt-4 bg-slate-50 rounded-xl border border-slate-100 p-3 italic text-[10px] text-slate-400 leading-normal dark:bg-slate-900 dark:border-slate-700 dark:text-slate-500">
                      Importante: Toda tomada de decisão clínica é de responsabilidade estrita do profissional de saúde assistente. O MedAssist funciona apenas como um guia estruturado educacional interativo beira-leito.
                    </div>

                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      ) : (
        /* --- RENDERIZAÇÃO DA PÁGINA INICIAL DO CLINICAL GUIDE (PROTOCOLS GRID) --- */
        <div>
          
          {/* HEADER SECTION */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-8 w-8 text-medical-600" />
                <h1 className="text-2xl font-bold text-medical-600 dark:text-medical-400">
                  Protocolos Clínicos
                </h1>
              </div>
              <p className="mt-2 text-sm text-slate-500 max-w-2xl dark:text-slate-400">
                Padronize e audite seus atendimentos clínicos beira-leito através de fluxogramas interativos estruturados de condutas e tomada de decisão rápida.
              </p>
            </div>
          </div>

          {/* ADMIN ACTION PANEL CARD */}
          {isAdmin && (
            <div className="bg-slate-900 text-white rounded-2xl p-5 mb-8 border border-slate-800 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="text-left">
                <h2 className="text-md font-bold flex items-center gap-2">
                  <Shield className="h-5 w-5 text-medical-400" />
                  Painel de Governança de Protocolos
                </h2>
                <p className="text-xs text-slate-300 mt-1 leading-normal">
                  Gerencie diretrizes clínicas beira-leito, crie fluxos ramificados interativos, ou envie backups das normas estruturadas do MedAssist.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setEditingProtocol(null);
                    setControlMode('editor');
                  }}
                  className="px-4 py-2 bg-medical-600 hover:bg-medical-700 text-white text-xs font-extrabold rounded-lg shadow flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Novo Protocolo
                </button>

                <button
                  type="button"
                  onClick={handleExportJSON}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors"
                  title="Exportar base em formato compacto JSON"
                >
                  <Download className="h-4 w-4" />
                  Exportar Diretrizes (JSON)
                </button>

                <label className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer select-none">
                  <Upload className="h-4 w-4" />
                  Importar Diretrizes
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJSON}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}

          {/* FILTERS PANEL */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.06)] mb-8 flex flex-col md:flex-row gap-4 items-stretch dark:bg-slate-800 dark:border-slate-700">
            
            {/* Search inputs */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="h-5 w-5" />
              </div>
              <input
                id="search-protocols"
                type="text"
                placeholder="Buscar por protocolo, categoria, palavras-chave..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-1 focus:ring-medical-600 focus:border-medical-600 outline-none text-slate-750 placeholder-slate-400 text-sm transition-all dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 dark:placeholder-slate-400 dark:focus:ring-medical-500 dark:focus:border-medical-500"
              />
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-medical-600 border-medical-600 text-white dark:bg-medical-500 dark:border-medical-500 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat === 'all' ? 'Ver Todos' : cat}
                </button>
              ))}
            </div>

          </div>

          {/* PROTOCOLS GRID */}
          {filteredProtocols.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center max-w-md mx-auto shadow-sm dark:bg-slate-800 dark:border-slate-700">
              <BookOpen className="h-10 w-10 text-slate-300 mx-auto mb-2" />
              <p className="font-semibold text-slate-700 dark:text-slate-200">Nenhum protocolo encontrado</p>
              <p className="text-slate-400 text-xs mt-1">Refine seus critérios de busca ou selecione outro departamento.</p>
              <button onClick={() => { setSearchTerm(''); setActiveCategory('all'); }} className="mt-4 bg-slate-100 p-2 py-1 px-3 text-sm font-semibold rounded hover:bg-slate-200">Limpar Filtros</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="protocols-grid">
              {filteredProtocols.map((protocol) => {
                
                // Color mapping dynamically based on category
                const isAmbulatorio = protocol.categoria === 'Ambulatório';
                
                return (
                  <motion.div
                    key={protocol.id}
                    id={`protocol-card-${protocol.id}`}
                    layoutId={`pcard-layout-${protocol.id}`}
                    onClick={() => handleSelectProtocol(protocol)}
                    className="bg-white rounded-2xl border border-slate-100 hover:border-medical-200 dark:hover:border-slate-600 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] transition-all duration-200 cursor-pointer overflow-hidden group flex flex-col text-left dark:bg-slate-800 dark:border-slate-700"
                  >
                    {/* Accent bar colorida por categoria */}
                    <div className={`h-1 ${
                      isAmbulatorio
                        ? 'bg-gradient-to-r from-medical-500 to-accent-400'
                        : 'bg-gradient-to-r from-red-600 to-amber-500'
                    }`} />

                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div>
                        {/* Top metadata */}
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <Badge 
                              variant={isAmbulatorio ? 'info' : 'danger'}
                              className="uppercase font-bold tracking-wider text-[10px]"
                            >
                              {protocol.categoria}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-2 font-sans">
                            {/* Heart favorites toggler */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(protocol.id);
                              }}
                              className="p-1 px-1.5 bg-slate-100 text-slate-400 hover:text-red-500 hover:bg-red-50 border border-slate-200 rounded transition-colors dark:bg-slate-700 dark:border-slate-600 dark:text-slate-400 dark:hover:bg-red-950/30"
                              title={isFavorite(protocol.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                            >
                              <Heart className={`h-3 w-3 ${isFavorite(protocol.id) ? "text-red-500 fill-red-500" : ""}`} />
                            </button>

                            <Badge 
                              variant={protocol.status === 'completo' ? 'success' : 'warning'}
                              dot
                              className="text-[10px]"
                            >
                              {protocol.status === 'completo' ? 'Completo' : 'Em Construção'}
                            </Badge>
                          </div>
                        </div>

                        {/* Header */}
                        <h3 className="font-display text-base font-semibold transition-colors tracking-tight line-clamp-1 text-medical-600 dark:text-medical-400">
                          {protocol.titulo}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed dark:text-slate-400">
                          {protocol.descricao}
                        </p>
                      </div>
                    </div>

                    {/* Bottom interactive card trigger bar */}
                    <div className="p-4 border-t border-slate-100 flex justify-between items-center transition-colors dark:border-slate-700 bg-slate-50/50 group-hover:bg-medical-50 dark:bg-slate-900/30 dark:group-hover:bg-medical-950/20">
                      <span className="text-[11px] font-bold uppercase transition-colors text-slate-500 group-hover:text-medical-700 dark:text-slate-400 dark:group-hover:text-medical-400">
                        Iniciar protocolo interativo
                      </span>
                      <ArrowRight className="h-4 w-4 transition-all text-slate-400 group-hover:text-medical-600 group-hover:translate-x-0.5" />
                    </div>

                    {/* ACCREDITED ADMIN CONTROLS ROW */}
                    {isAdmin && (
                      <div className="px-5 pb-4 shrink-0 flex gap-2 border-t border-dashed border-slate-100 pt-3 bg-slate-50/50 justify-end">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingProtocol(protocol);
                            setControlMode('editor');
                          }}
                          className="px-2.5 py-1.5 bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-100 text-[11px] font-bold rounded-lg flex items-center gap-1 transition-all"
                          title="Editar estrutura de nós, perguntas e respostas"
                        >
                          <Edit3 className="h-3 w-3" />
                          Editar
                        </button>
                        
                        <button
                          type="button"
                          onClick={(e) => handleDuplicateProtocol(protocol, e)}
                          className="px-2.5 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100 text-[11px] font-bold rounded-lg flex items-center gap-1 transition-all"
                          title="Duplicar como base para rascunho"
                        >
                          <CopyPlus className="h-3 w-3" />
                          Duplicar
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleDeleteProtocol(protocol.id, e)}
                          className="px-2.5 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 border border-red-100 text-[11px] font-bold rounded-lg flex items-center gap-1 transition-all"
                          title="Excluir de forma irrevogável"
                        >
                          <Trash2 className="h-3 w-3" />
                          Excluir
                        </button>
                      </div>
                    )}

                  </motion.div>
                );
              })}
            </div>
          )}

        </div>
      )}

      <ClinicalDisclaimer type="guide" />

      {/* Hidden container for react-to-print support */}
      <div className="hidden">
        <PrintableReport
          ref={reportPrintRef}
          protocol={selectedProtocol}
          pathTaken={pathTaken}
          checklistState={checklistState}
          noteState={noteState}
          choicesState={choicesState}
          calculatorState={calculatorState}
        />
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

export default ProtocolsHub;
