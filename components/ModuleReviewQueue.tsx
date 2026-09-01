import React, { useState } from 'react';
import { Calendar, User, FileText, AlertTriangle, CheckCircle, RefreshCw, Eye, Clipboard, List, AlertCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { performReviewOnItem, getReviewRemainingDays, computeReviewStatus, reviewQueueSorter } from '../services/reviewService';

export interface ModuleReviewQueueProps {
  type: 'disease' | 'protocol' | 'medication' | 'calculator' | 'prescription';
  items: any[];
  onUpdateItem: (updatedItem: any) => Promise<void>;
  currentUser: { name?: string; email?: string; role?: string } | null;
}

export const ModuleReviewQueue: React.FC<ModuleReviewQueueProps> = ({
  type,
  items,
  onUpdateItem,
  currentUser
}) => {
  // Local states
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [changesSummary, setChangesSummary] = useState('');
  const [notes, setNotes] = useState('');
  const [statusChoice, setStatusChoice] = useState<'up_to_date' | 'under_review'>('up_to_date');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [expandedHistoryId, setExpandedHistoryId] = useState<string | null>(null);
  const [editingActive, setEditingActive] = useState(false);

  // Sorting list by rule: overdue > review_due > up_to_date, then by oldest lastReviewedAt ascending
  const queueItems = [...items].sort(reviewQueueSorter);

  // Counters
  const overdueCount = items.filter(x => x.reviewStatus === 'overdue').length;
  const dueCount = items.filter(x => x.reviewStatus === 'review_due').length;
  const upToDateCount = items.filter(x => x.reviewStatus === 'up_to_date').length;
  const underReviewCount = items.filter(x => x.reviewStatus === 'under_review').length;

  const getTypeName = () => {
    switch (type) {
      case 'disease': return 'Doença';
      case 'protocol': return 'Protocolo';
      case 'medication': return 'Medicamento';
      case 'calculator': return 'Calculadora';
      case 'prescription': return 'Modelo de Prescrição';
      default: return 'Conteúdo';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'overdue':
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-red-50 text-red-700 border border-red-250 dark:bg-red-950/40 dark:text-red-400">
            Crítico / Vencido
          </span>
        );
      case 'review_due':
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-50 text-amber-700 border border-amber-250 dark:bg-amber-950/40 dark:text-amber-400">
            Revisão Pendente
          </span>
        );
      case 'under_review':
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-400">
            Em Revisão
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/40 dark:text-green-400">
            Atualizado / Em Dia
          </span>
        );
    }
  };

  const getPriorityBadge = (prio: string) => {
    switch (prio) {
      case 'high':
        return (
          <span className="px-2 py-0.5 text-[11px] font-bold uppercase rounded-md bg-red-100 text-red-800 dark:bg-red-950/20 dark:text-red-400">
            Alta
          </span>
        );
      case 'low':
        return (
          <span className="px-2 py-0.5 text-[11px] font-bold uppercase rounded-md bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400">
            Baixa
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 text-[11px] font-bold uppercase rounded-md bg-blue-100 text-blue-800 dark:bg-blue-950/20 dark:text-blue-400">
            Média
          </span>
        );
    }
  };

  const getEditPath = () => {
    if (!selectedItem) return '';
    switch (type) {
      case 'disease': return `/knowledge?edit=${selectedItem.id}`;
      case 'protocol': return `/guide?edit=${selectedItem.id}`;
      case 'medication': return `/medications?edit=${selectedItem.id}`;
      case 'calculator': return `/calculators?edit=${selectedItem.id}`;
      case 'prescription': return `/prescriptions?edit=${selectedItem.id}`;
      default: return '';
    }
  };

  const currentItemInList = selectedItem ? items.find(x => x.id === selectedItem.id) : null;
  const hasBeenModified = !!(
    selectedItem && 
    currentItemInList && 
    (currentItemInList.updatedAt !== selectedItem.initialUpdatedAt || 
     JSON.stringify(currentItemInList) !== selectedItem.initialJSON)
  );

  const handleOpenReview = (item: any) => {
    setSelectedItem({
      ...item,
      initialJSON: JSON.stringify(item),
      initialUpdatedAt: item.updatedAt
    });
    setEditingActive(false);
    setChangesSummary('');
    setNotes(item.reviewNotes || '');
    setStatusChoice('up_to_date');
    setPriority(item.reviewPriority || 'medium');
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSaveValidation = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedItem) return;

    if (!changesSummary.trim()) {
      setErrorMessage('Por favor, informe um sumário com o resumo das alterações.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const reviewerName = currentUser?.name || currentUser?.email || 'Administrador Clínico';
      const updated = performReviewOnItem(
        selectedItem,
        type,
        reviewerName,
        changesSummary,
        notes,
        statusChoice,
        priority
      );

      await onUpdateItem(updated);
      setSuccessMessage('Progresso da validação salvo com sucesso!');
      
      setSelectedItem({
        ...updated,
        initialJSON: selectedItem.initialJSON,
        initialUpdatedAt: selectedItem.initialUpdatedAt
      });

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err: any) {
      setErrorMessage(`Erro ao salvar validação: ${err.message || err}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    if (!changesSummary.trim()) {
      setErrorMessage('Por favor, informe um sumário com o resumo das alterações.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const reviewerName = currentUser?.name || currentUser?.email || 'Administrador Clínico';
      const updated = performReviewOnItem(
        selectedItem,
        type,
        reviewerName,
        changesSummary,
        notes,
        statusChoice,
        priority
      );

      await onUpdateItem(updated);
      setSuccessMessage('Revisão registrada com sucesso e conteúdo revalidado!');
      setTimeout(() => {
        setSelectedItem(null);
      }, 1500);
    } catch (err: any) {
      setErrorMessage(`Erro ao persistir revisão: ${err.message || err}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (isoStr?: string) => {
    if (!isoStr) return '-';
    try {
      return new Date(isoStr).toLocaleDateString('pt-BR');
    } catch (e) {
      return isoStr;
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Counters Panel */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-2xl p-4 flex items-center gap-4 shadow-sm dark:bg-slate-900 dark:border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-red-105 flex items-center justify-center text-red-650 shrink-0">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-red-700">{overdueCount}</div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Vencidos</div>
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-4 flex items-center gap-4 shadow-sm dark:bg-slate-900 dark:border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-amber-105 flex items-center justify-center text-amber-650 shrink-0">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-700">{dueCount}</div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Pendentes</div>
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-4 flex items-center gap-4 shadow-sm dark:bg-slate-900 dark:border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <RefreshCw className="h-5 w-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-700">{underReviewCount}</div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Em Revisão</div>
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-4 flex items-center gap-4 shadow-sm dark:bg-slate-900 dark:border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-green-105 flex items-center justify-center text-green-650 shrink-0">
            <CheckCircle className="h-5 w-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-green-700">{upToDateCount}</div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Em Dia</div>
          </div>
        </div>
      </div>

      {/* Queue items shelf */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-slate-800">
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-150 flex items-center justify-between dark:bg-slate-800/50 dark:border-slate-800">
          <h3 className="font-semibold text-slate-850 flex items-center gap-2 text-sm dark:text-slate-205">
            <List className="h-4 w-4 text-slate-500" />
            Fila Prioritária de Revisões ({queueItems.length} itens)
          </h3>
          <span className="text-xs text-slate-500 font-medium font-sans">
            Garantia automática de qualidade cíclica
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
            <thead className="bg-slate-25 dark:bg-slate-900">
              <tr>
                <th scope="col" className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Nome / Ref
                </th>
                <th scope="col" className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Status de Validade
                </th>
                <th scope="col" className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Prioridade
                </th>
                <th scope="col" className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Última Revisão
                </th>
                <th scope="col" className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Próxima Revisão
                </th>
                <th scope="col" className="px-5 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200 dark:bg-slate-900 dark:divide-slate-800">
              {queueItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-slate-500 text-sm">
                    Excelente! Nenhum item cadastrado nesta fila.
                  </td>
                </tr>
              ) : (
                queueItems.map(item => {
                  const remainingDays = getReviewRemainingDays(item.nextReviewAt || '');
                  return (
                    <tr key={item.id} className="hover:bg-slate-25 transition-colors dark:hover:bg-slate-800/40">
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900 dark:text-white">
                            {item.nome || item.titulo || item.title || item.name}
                          </span>
                          <span className="text-xs text-slate-500 font-mono">
                            ID: {item.id}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1 items-start">
                          {getStatusBadge(item.reviewStatus || 'up_to_date')}
                          {item.reviewStatus === 'overdue' && (
                            <span className="text-[10px] text-red-600 font-bold">
                              Expirou há {Math.abs(remainingDays)} dias
                            </span>
                          )}
                          {item.reviewStatus === 'review_due' && (
                            <span className="text-[10px] text-amber-600 font-bold">
                              Faltam {remainingDays} dias
                            </span>
                          )}
                          {item.reviewStatus === 'up_to_date' && (
                            <span className="text-[10px] text-slate-400">
                              Em dia ({remainingDays} dias restantes)
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        {getPriorityBadge(item.reviewPriority || 'medium')}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-xs text-slate-700 dark:text-slate-300">
                            {formatDate(item.lastReviewedAt)}
                          </span>
                          {item.reviewedBy && (
                            <span className="text-[10px] text-slate-400">
                              por {item.reviewedBy.split(' ')[0]}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-xs text-slate-700 dark:text-slate-300">
                        {formatDate(item.nextReviewAt)}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleOpenReview(item)}
                          className="px-3 py-1.5 rounded-lg bg-medical-50 text-medical-700 h-8 inline-flex items-center text-xs font-bold hover:bg-medical-100 transition-colors"
                        >
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          Revisar
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal Dialog */}
      {selectedItem && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto flex flex-col text-left dark:bg-slate-900 dark:border-slate-800">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between dark:border-slate-800">
              <div>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-medical-100 text-medical-805 dark:bg-medical-950/40">
                  {getTypeName()}
                </span>
                <h3 className="text-lg font-bold text-slate-850 mt-1 dark:text-white">
                  Formulário Oficial de Validação Clínica
                </h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 dark:hover:bg-slate-800 text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="p-6 space-y-5 flex-grow">
              {/* Item Info Card */}
              <div className="bg-slate-25 rounded-2xl p-4 border border-slate-150 space-y-3 dark:bg-slate-800/40 dark:border-slate-800">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wide flex justify-between items-center">
                  <span>Ficha sendo analisada</span>
                  {/* Status Indicator */}
                  {hasBeenModified ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 font-extrabold text-[10px] uppercase tracking-wider dark:bg-green-950/40 dark:text-green-400">
                      Alterações salvas
                    </span>
                  ) : editingActive ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 font-extrabold text-[10px] uppercase tracking-wider dark:bg-amber-950/40 dark:text-amber-400 animate-pulse">
                      Conteúdo em edição
                    </span>
                  ) : null}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-xs text-slate-700 dark:text-slate-300">
                  <div>
                    <strong>Conteúdo:</strong> <span className="text-slate-900 font-bold dark:text-white">{selectedItem.nome || selectedItem.titulo || selectedItem.title || selectedItem.name}</span>
                  </div>
                  <div>
                    <strong>Tipo:</strong> <span className="font-semibold">{getTypeName()}</span>
                  </div>
                  <div>
                    <strong>ID:</strong> <span className="font-mono bg-slate-100 px-1 py-0.5 rounded-sm text-[11px] dark:bg-slate-800 dark:text-slate-305">{selectedItem.id}</span>
                  </div>
                  <div>
                    <strong>Última revisão:</strong> <span>{formatDate(selectedItem.lastReviewedAt)}</span>
                  </div>
                  <div>
                    <strong>Próxima revisão:</strong> <span>{formatDate(selectedItem.nextReviewAt)}</span>
                  </div>
                </div>
              </div>

              {/* Seção de Ações Rápidas */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3 dark:bg-slate-850 dark:border-slate-800">
                <div className="text-xs font-bold text-slate-600 uppercase tracking-wider dark:text-slate-400">
                  Ações Rápidas do Revisor
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  {currentUser?.role === 'admin' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingActive(true);
                          window.location.hash = getEditPath();
                        }}
                        className="px-2.5 py-2 bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-900"
                        title="Abrir editor na aba atual (os dados digitados aqui serão perdidos!)"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        Editar Conteúdo
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingActive(true);
                          window.open(`#${getEditPath()}`, '_blank');
                        }}
                        className="px-2.5 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-900"
                        title="Abrir editor em uma nova aba (recomendado!)"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Abrir em Nova Aba
                      </button>
                    </>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => handleSaveValidation()}
                    disabled={isSubmitting}
                    className="px-2.5 py-2 bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-900"
                  >
                    <Clipboard className="h-3.5 w-3.5" />
                    Salvar Validação
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-2.5 py-2 bg-medical-605 text-white hover:bg-medical-700 disabled:opacity-50 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <CheckCircle className="h-3.5 w-3.5" />
                    Concluir Revisão
                  </button>
                </div>
              </div>

              {/* Status & Priority Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-350 flex items-center">
                    Resultado da Validação
                  </label>
                  <select
                    value={statusChoice}
                    onChange={(e: any) => setStatusChoice(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-xs bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-medical-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  >
                    <option value="up_to_date">Aprovar e Renovar Validade (Revisado / OK)</option>
                    <option value="under_review">Passar para Estado: Em Revisão Ativa</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-350">
                    Prioridade de Manutenção
                  </label>
                  <select
                    value={priority}
                    onChange={(e: any) => setPriority(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-xs bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-medical-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  >
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                  </select>
                </div>
              </div>

              {/* Changes Summary Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-350 flex items-center">
                  Consenso e Sumário das Alterações <span className="text-red-500 ml-0.5">*</span>
                </label>
                <textarea
                  value={changesSummary}
                  onChange={(e) => setChangesSummary(e.target.value)}
                  placeholder="Descreva as atualizações de diretrizes científicas, mudanças de dosagens, novos estudos ou correções que foram feitas..."
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-medical-500 dark:bg-slate-800 dark:border-slate-755 dark:text-white"
                />
              </div>

              {/* General review notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-350">
                  Parecer Clínico, Observações ou Backlogs
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Comentários adicionais para a próxima bancada de revisão médica..."
                  rows={2}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-medical-500 dark:bg-slate-800 dark:border-slate-755 dark:text-white"
                />
              </div>

              {/* Message Banner */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-slate-250 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-medical-600 hover:bg-medical-700 text-white rounded-xl text-xs font-extrabold shadow-sm transition-all flex items-center gap-1"
                >
                  {isSubmitting ? 'Registrando...' : 'Finalizar e Revalidar Ficha'}
                </button>
              </div>

              {/* Review History Logs in Drawer */}
              {Array.isArray(selectedItem.reviewHistory) && selectedItem.reviewHistory.length > 0 && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                    <Clipboard className="h-3.5 w-3.5" />
                    Histórico Clínico de Revisões ({selectedItem.reviewHistory.length})
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {selectedItem.reviewHistory.map((h: any) => {
                      const isExpanded = expandedHistoryId === h.id;
                      return (
                        <div key={h.id} className="border border-slate-100 rounded-xl p-2.5 hover:bg-slate-25 transition-all text-xs dark:bg-slate-800/20 dark:border-slate-800">
                          <button
                            type="button"
                            onClick={() => setExpandedHistoryId(isExpanded ? null : h.id)}
                            className="flex items-center justify-between w-full font-bold text-slate-750 dark:text-slate-300"
                          >
                            <span className="flex items-center gap-1 text-slate-800 dark:text-white">
                              {isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                              Revisado por {h.reviewedBy}
                            </span>
                            <span className="text-[10px] text-slate-450 font-normal">{formatDate(h.date)}</span>
                          </button>
                          {isExpanded && (
                            <div className="mt-2 pl-4 border-l-2 border-medical-500 text-slate-600 dark:text-slate-400 space-y-1">
                              <div><strong>Sumário:</strong> {h.changesSummary}</div>
                              {h.notes && <div><strong>Notas:</strong> {h.notes}</div>}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default ModuleReviewQueue;
