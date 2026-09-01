import React, { useState } from 'react';
import { TrendingUp, Activity, Baby, Plus, Trash2, Edit3, Check, X } from 'lucide-react';
import { SpecialGuideConsult } from '../types/specialGuide';
import { useConfirmModal } from '../hooks/useModal';
import { ConfirmModal } from '../components/ui/Modal';

interface PuericulturaWidgetsProps {
  consult: SpecialGuideConsult;
  selectedId: string;
  updateMeta: (meta: Record<string, any>) => void;
  isAdmin?: boolean;
  isEditing?: boolean;
}

export const PuericulturaWidgets: React.FC<PuericulturaWidgetsProps> = ({
  consult,
  updateMeta,
  isAdmin,
  isEditing,
}) => {
  // Extract or initialize anthropometria
  const ant = consult.meta?.antropometria || {
    peso: '',
    altura: '',
    pc: '',
    imc: '',
  };

  // Extract or initialize milestones
  const milestones = consult.meta?.milestones || {};

  // Extract developmental milestone definitions list
  const desenvolvimentoList = consult.meta?.desenvolvimento || [];

  // Extract age for disabling PC
  const idadeMinimaMeses = consult.meta?.idadeMinimaMeses ?? 0;

  // Milestone edit/add local states
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');
  const [editingCategory, setEditingCategory] = useState('');

  const [newMilestoneText, setNewMilestoneText] = useState('');
  const [newMilestoneCategory, setNewMilestoneCategory] = useState('Grossa');

  // Confirmation modal hooks
  const {
    isOpen: isConfirmOpen,
    title: confirmTitle,
    message: confirmMessage,
    variant: confirmVariant,
    requestConfirm,
    handleConfirm,
    handleCancel
  } = useConfirmModal();

  const handleUpdateAntroField = (field: 'peso' | 'altura' | 'pc', val: string) => {
    const updatedAntro = { ...ant, [field]: val };

    // Calculate IMC auto if weight is in kg and height is in cm
    if (field === 'peso' || field === 'altura') {
      const p = parseFloat(field === 'peso' ? val : ant.peso);
      const h = parseFloat(field === 'altura' ? val : ant.altura);
      if (p > 0 && h > 0) {
        const hMetros = h / 100;
        const imcVal = p / (hMetros * hMetros);
        updatedAntro.imc = imcVal.toFixed(1);
      } else {
        updatedAntro.imc = '';
      }
    }

    updateMeta({ antropometria: updatedAntro });
  };

  const handleUpdateMilestone = (milestoneText: string, status: 'Adequado' | 'Alerta' | 'Ausente') => {
    const currentMilestones = { ...milestones };

    if (currentMilestones[milestoneText] === status) {
      delete currentMilestones[milestoneText];
    } else {
      currentMilestones[milestoneText] = status;
    }

    updateMeta({ milestones: currentMilestones });
  };

  // Admin Milestone handlers
  const handleAddMilestone = () => {
    if (!newMilestoneText.trim() || !newMilestoneCategory.trim()) return;
    const newItem = {
      texto: newMilestoneText.trim(),
      categoria: newMilestoneCategory.trim()
    };
    const updated = [...desenvolvimentoList, newItem];
    updateMeta({ desenvolvimento: updated });
    setNewMilestoneText('');
  };

  const startEditing = (idx: number, item: any) => {
    setEditingIndex(idx);
    setEditingText(item.texto);
    setEditingCategory(item.categoria);
  };

  const handleSaveEdit = (idx: number) => {
    if (!editingText.trim() || !editingCategory.trim()) return;
    const updated = [...desenvolvimentoList];
    updated[idx] = {
      texto: editingText.trim(),
      categoria: editingCategory.trim()
    };
    updateMeta({ desenvolvimento: updated });
    setEditingIndex(null);
  };

  const handleDeleteMilestone = async (index: number) => {
    const confirmed = await requestConfirm({
      title: 'Excluir Marco de Desenvolvimento',
      message: `Tem certeza que deseja remover o marco "${desenvolvimentoList[index].texto}"?`,
      variant: 'danger'
    });
    if (confirmed) {
      const updated = desenvolvimentoList.filter((_, idx) => idx !== index);
      updateMeta({ desenvolvimento: updated });
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* SECTION 1: ANTROPOMETRIA */}
      <div className="space-y-4">
        <div>
          <h3 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm flex items-center gap-2">
            <TrendingUp className="h-4.5 w-4.5 text-amber-500 animate-pulse" />
            Antropometria e Crescimento (Beta)
          </h3>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium">
            Registre peso, estatura e perímetro cefálico para cálculo e monitoramento imediato.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
              Peso (kg)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.001"
                placeholder="Ex: 5.250"
                className="w-full pl-3 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs font-semibold bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                value={ant.peso || ''}
                onChange={(e) => handleUpdateAntroField('peso', e.target.value)}
              />
              <span className="absolute right-3 top-2.5 text-[10px] text-slate-400 font-bold">kg</span>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
              Estatura (cm)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                placeholder="Ex: 58.5"
                className="w-full pl-3 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs font-semibold bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                value={ant.altura || ''}
                onChange={(e) => handleUpdateAntroField('altura', e.target.value)}
              />
              <span className="absolute right-3 top-2.5 text-[10px] text-slate-400 font-bold">cm</span>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
              Perímetro Cefálico
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                placeholder="Ex: 38"
                disabled={idadeMinimaMeses > 24}
                className="w-full pl-3 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs font-semibold bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
                value={ant.pc || ''}
                onChange={(e) => handleUpdateAntroField('pc', e.target.value)}
              />
              <span className="absolute right-3 top-2.5 text-[10px] text-slate-400 font-bold">cm</span>
            </div>
          </div>
        </div>

        {/* IMC DISPLAY RESULT */}
        <div className="bg-slate-50 dark:bg-slate-900/40 rounded-xl p-3 flex justify-between items-center border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold">
            <Activity className="h-4 w-4 text-indigo-500 animate-pulse" />
            <span>IMC Atual Estimado:</span>
          </div>
          <div className="text-right">
            {ant.imc ? (
              <span className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                {ant.imc} <span className="text-[10px] font-bold text-slate-400">kg/m²</span>
              </span>
            ) : (
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium italic">Aguardando Peso/Altura</span>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 2: MARCOS DE DESENVOLVIMENTO */}
      {(desenvolvimentoList.length > 0 || isEditing) && (
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm flex items-center gap-2">
              <Baby className="h-4.5 w-4.5 text-indigo-500" />
              Marcos do Desenvolvimento (DNPM)
            </h3>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium">
              Avalie e assinale o status de aquisição dos marcos neuropsicomotores esperados.
            </p>
          </div>

          {/* Add Milestone Trigger (Admin Only) */}
          {isAdmin && isEditing && (
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2.5 text-left">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Categoria (Ex: Grossa, Fina, Linguagem, Pessoal-Social...)"
                  value={newMilestoneCategory}
                  onChange={e => setNewMilestoneCategory(e.target.value)}
                  className="w-full sm:w-1/3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-850 dark:text-slate-200 focus:outline-none font-bold"
                />
                <input
                  type="text"
                  placeholder="Descrição do novo marco de desenvolvimento..."
                  value={newMilestoneText}
                  onChange={e => setNewMilestoneText(e.target.value)}
                  className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-850 dark:text-slate-200 focus:outline-none font-semibold"
                />
              </div>
              <button
                type="button"
                onClick={handleAddMilestone}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition shadow-sm flex items-center justify-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Adicionar Marco de Desenvolvimento
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {desenvolvimentoList.map((item: any, idx: number) => {
              const status = milestones[item.texto] || '';
              const catBadge =
                item.categoria === 'Grossa'
                  ? 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-200'
                  : item.categoria === 'Fina'
                  ? 'bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-950/40 dark:text-purple-200'
                  : item.categoria === 'Linguagem'
                  ? 'bg-pink-50 text-pink-800 border-pink-200 dark:bg-pink-950/40 dark:text-pink-200'
                  : 'bg-teal-50 text-teal-800 border-teal-200 dark:bg-teal-950/40 dark:text-teal-200';

              const isItemEditing = editingIndex === idx;

              return (
                <div
                  key={idx}
                  className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 space-y-3 relative group/milestone text-left"
                >
                  {isItemEditing ? (
                    <div className="space-y-2">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Categoria</label>
                        <input
                          type="text"
                          value={editingCategory}
                          onChange={e => setEditingCategory(e.target.value)}
                          placeholder="Categoria"
                          className="w-full px-2.5 py-1 text-xs border rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-250 dark:border-slate-700 outline-none font-bold"
                        />
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block mt-1">Descrição</label>
                        <textarea
                          value={editingText}
                          onChange={e => setEditingText(e.target.value)}
                          placeholder="Descrição do marco..."
                          rows={2}
                          className="w-full px-2.5 py-1 text-xs border rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-250 dark:border-slate-700 outline-none resize-none font-semibold"
                        />
                      </div>
                      <div className="flex gap-1 justify-end">
                        <button 
                          type="button"
                          onClick={() => handleSaveEdit(idx)}
                          className="p-1 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
                          title="Salvar"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button 
                          type="button"
                          onClick={() => setEditingIndex(null)}
                          className="p-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                          title="Cancelar"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1.5 flex-1">
                          <span
                            className={`inline-block border text-[8px] uppercase tracking-wider font-black px-1.5 py-0.5 rounded-md ${catBadge}`}
                          >
                            {item.categoria}
                          </span>
                          <p className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-tight">
                            {item.texto}
                          </p>
                        </div>

                        {/* Admin editing controls on hover */}
                        {isAdmin && isEditing && (
                          <div className="flex gap-1 opacity-0 group-hover/milestone:opacity-100 transition-opacity shrink-0">
                            <button
                              type="button"
                              onClick={() => startEditing(idx, item)}
                              className="p-0.5 text-slate-400 hover:text-indigo-600 rounded transition"
                              title="Editar marco"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteMilestone(idx)}
                              className="p-0.5 text-rose-500 hover:text-rose-600 rounded transition"
                              title="Excluir marco"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Segmented Radio status select */}
                      <div className="grid grid-cols-3 gap-1 bg-white dark:bg-slate-950 p-0.5 rounded-xl border border-slate-150 dark:border-slate-800">
                        {(['Adequado', 'Alerta', 'Ausente'] as const).map((option) => {
                          const isSel = status === option;
                          const activeColors =
                            option === 'Adequado'
                              ? 'bg-emerald-500 text-white'
                              : option === 'Alerta'
                              ? 'bg-amber-500 text-white'
                              : 'bg-red-500 text-white';

                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => handleUpdateMilestone(item.texto, option)}
                              className={`py-1 text-[10px] rounded-lg font-black text-center transition-all cursor-pointer ${
                                isSel
                                  ? activeColors
                                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                              }`}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Confirmation Widget */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        title={confirmTitle}
        message={confirmMessage}
        variant={confirmVariant}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};
