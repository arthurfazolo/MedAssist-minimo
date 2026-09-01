import React, { useState } from 'react';
import { Calculator, AlertTriangle, ClipboardCheck, Activity, CheckSquare, Square, RefreshCw, Plus, Trash2, Edit3, Check, X } from 'lucide-react';
import { SpecialGuideConsult } from '../types/specialGuide';
import { usePreNatalCalculator } from '../hooks/usePreNatalCalculator';
import { useConfirmModal } from '../hooks/useModal';
import { ConfirmModal } from '../components/ui/Modal';

interface PreNatalWidgetsProps {
  consult: SpecialGuideConsult;
  selectedId: string;
  updateMeta: (meta: Record<string, any>) => void;
  isAdmin?: boolean;
  isEditing?: boolean;
}

export const PreNatalWidgets: React.FC<PreNatalWidgetsProps> = ({
  consult,
  selectedId,
  updateMeta,
  isAdmin,
  isEditing,
}) => {
  // Use persistent session-based pre-natal calculator hook
  const {
    calcMode,
    setCalcMode,
    dumDate,
    setDumDate,
    usgDate,
    setUsgDate,
    usgWeeks,
    setUsgWeeks,
    usgDays,
    setUsgDays,
    calcResult,
  } = usePreNatalCalculator();

  // Load physical examination fields from consult meta
  const exam = consult.meta?.examination?.[selectedId] || {
    peso: '',
    ganhoPonderal: '',
    paSistolica: '',
    paDiastolica: '',
    alturaUterina: '',
    bcf: '',
    edema: '',
    toqueVaginal: '',
  };

  // Load exam tracking matrix from consult meta
  const examStatus = consult.meta?.examStatus?.[selectedId] || {
    solicitados: {},
    revisados: {},
    alterados: {},
    alteradosNotes: {},
  };

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

  // Dynamic exam fields loading and management
  const defaultFields = [
    { key: 'pa', label: 'Pressão Arterial', type: 'pa' },
    { key: 'peso', label: 'Peso Corporal (kg)', type: 'peso' },
    { key: 'alturaUterina', label: 'Altura Uterina (AU)', type: 'au' },
    { key: 'bcf', label: 'Batimentos Cardiofetais', type: 'bcf' },
    { key: 'edema', label: 'Pesquisa de Edema (Maléolos)', type: 'edema' },
    { key: 'toqueVaginal', label: 'Resultado de Exame de Toque Vaginal (Se indicado)', type: 'toque' },
  ];

  const examFields = consult.meta?.examFields || defaultFields;
  const [editingFieldKey, setEditingFieldKey] = useState<string | null>(null);
  const [editingLabelText, setEditingLabelText] = useState('');
  const [newFieldLabel, setNewFieldLabel] = useState('');

  // Exams matrix list management (Section 3)
  const defaultExams = (consult.triagens || [])
    .filter((t) => t.categoria === 'Exame')
    .map((t) => t.texto);
  const examsList = consult.meta?.examsList || defaultExams;

  const [editingExamIndex, setEditingExamIndex] = useState<number | null>(null);
  const [editingExamText, setEditingExamText] = useState('');
  const [newExamText, setNewExamText] = useState('');

  // Helper update dispatchers
  const updateExamField = (field: string, val: any) => {
    const currentExaminationAll = consult.meta?.examination || {};
    const updatedExam = { ...exam, [field]: val };
    updateMeta({
      examination: {
        ...currentExaminationAll,
        [selectedId]: updatedExam,
      },
    });
  };

  const updateExamStatusField = (field: 'solicitados' | 'revisados' | 'alterados', itemKey: string, val: boolean) => {
    const currentExamStatusAll = consult.meta?.examStatus || {};
    const currentStatus = currentExamStatusAll[selectedId] || {
      solicitados: {},
      revisados: {},
      alterados: {},
      alteradosNotes: {},
    };

    const updatedField = { ...currentStatus[field], [itemKey]: val };
    const updatedStatus = { ...currentStatus, [field]: updatedField };

    // If marked as reviewed, automatically ensure it is marked as requested
    if (field === 'revisados' && val) {
      updatedStatus.solicitados = { ...updatedStatus.solicitados, [itemKey]: true };
    }

    updateMeta({
      examStatus: {
        ...currentExamStatusAll,
        [selectedId]: updatedStatus,
      },
    });
  };

  const updateExamStatusNote = (itemKey: string, val: string) => {
    const currentExamStatusAll = consult.meta?.examStatus || {};
    const currentStatus = currentExamStatusAll[selectedId] || {
      solicitados: {},
      revisados: {},
      alterados: {},
      alteradosNotes: {},
    };

    const updatedNotes = { ...currentStatus.alteradosNotes, [itemKey]: val };
    const updatedStatus = { ...currentStatus, alteradosNotes: updatedNotes };

    updateMeta({
      examStatus: {
        ...currentExamStatusAll,
        [selectedId]: updatedStatus,
      },
    });
  };

  const pas = parseInt(exam.paSistolica) || 0;
  const pad = parseInt(exam.paDiastolica) || 0;
  const isHighPA = pas >= 140 || pad >= 90;

  const handleResetCalculator = () => {
    setDumDate('');
    setUsgDate('');
    setUsgWeeks('');
    setUsgDays('');
  };

  // Section 2: Exame Físico handlers
  const handleAddExamField = () => {
    if (!newFieldLabel.trim()) return;
    const newField = {
      key: 'custom_' + Date.now().toString(36),
      label: newFieldLabel.trim(),
      type: 'custom',
    };
    const updated = [...examFields, newField];
    updateMeta({ examFields: updated });
    setNewFieldLabel('');
  };

  const startEditingField = (key: string, label: string) => {
    setEditingFieldKey(key);
    setEditingLabelText(label);
  };

  const handleSaveFieldEdit = (key: string) => {
    if (!editingLabelText.trim()) return;
    const updated = examFields.map((f: any) =>
      f.key === key ? { ...f, label: editingLabelText.trim() } : f
    );
    updateMeta({ examFields: updated });
    setEditingFieldKey(null);
  };

  const handleDeleteExamField = async (key: string, label: string) => {
    const confirmed = await requestConfirm({
      title: 'Excluir Campo de Exame',
      message: `Tem certeza que deseja remover o campo "${label}"? Os dados já inseridos para esta consulta serão mantidos, mas o campo não será mais exibido.`,
      variant: 'danger',
    });
    if (confirmed) {
      const updated = examFields.filter((f: any) => f.key !== key);
      updateMeta({ examFields: updated });
    }
  };

  // Section 3: Exams matrix handlers
  const handleAddExam = () => {
    if (!newExamText.trim()) return;
    const updated = [...examsList, newExamText.trim()];
    updateMeta({ examsList: updated });
    setNewExamText('');
  };

  const startEditingExam = (index: number, text: string) => {
    setEditingExamIndex(index);
    setEditingExamText(text);
  };

  const handleSaveExamEdit = (index: number) => {
    if (!editingExamText.trim()) return;
    const oldText = examsList[index];
    const updated = [...examsList];
    updated[index] = editingExamText.trim();

    // Migrate any exam status keys over
    const currentExamStatusAll = consult.meta?.examStatus || {};
    const currentStatus = currentExamStatusAll[selectedId] || {
      solicitados: {},
      revisados: {},
      alterados: {},
      alteradosNotes: {},
    };

    const newKey = editingExamText.trim();
    const updatedStatus = {
      ...currentStatus,
      solicitados: { ...currentStatus.solicitados, [newKey]: currentStatus.solicitados[oldText] },
      revisados: { ...currentStatus.revisados, [newKey]: currentStatus.revisados[oldText] },
      alterados: { ...currentStatus.alterados, [newKey]: currentStatus.alterados[oldText] },
      alteradosNotes: { ...currentStatus.alteradosNotes, [newKey]: currentStatus.alteradosNotes[oldText] },
    };
    delete updatedStatus.solicitados[oldText];
    delete updatedStatus.revisados[oldText];
    delete updatedStatus.alterados[oldText];
    delete updatedStatus.alteradosNotes[oldText];

    updateMeta({
      examsList: updated,
      examStatus: {
        ...currentExamStatusAll,
        [selectedId]: updatedStatus
      }
    });

    setEditingExamIndex(null);
  };

  const handleDeleteExam = async (index: number) => {
    const examName = examsList[index];
    const confirmed = await requestConfirm({
      title: 'Excluir Exame',
      message: `Tem certeza que deseja remover o monitoramento do exame "${examName}"?`,
      variant: 'danger',
    });
    if (confirmed) {
      const updated = examsList.filter((_, idx) => idx !== index);
      updateMeta({ examsList: updated });
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* SECTION 1: CALCULADORA GESTACIONAL (Inputs & Results) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* Calculator inputs */}
        <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 border-b border-slate-200/50 dark:border-slate-800 pb-1.5">
              <Calculator className="h-4 w-4 text-indigo-500" />
              <h4 className="text-[10.5px] uppercase font-black text-slate-500 tracking-wider">
                Calculadora de Idade Gestacional
              </h4>
            </div>

            <div>
              <label className="block text-[9px] font-bold text-slate-400 uppercase mb-0.5">
                Método de Estimativa
              </label>
              <select
                value={calcMode}
                onChange={(e) => setCalcMode(e.target.value as any)}
                className="w-full text-xs p-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-indigo-500 font-bold cursor-pointer"
              >
                <option value="dum">📅 DUM (Última Menstruação)</option>
                <option value="usg">👶 Ultrassom Precoce (1º Tri)</option>
              </select>
            </div>

            {calcMode === 'dum' ? (
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase mb-0.5">
                  Data da DUM
                </label>
                <input
                  type="date"
                  value={dumDate}
                  onChange={(e) => setDumDate(e.target.value)}
                  className="w-full text-xs p-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-xl outline-none"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-0.5">
                    Data do Ultrassom
                  </label>
                  <input
                    type="date"
                    value={usgDate}
                    onChange={(e) => setUsgDate(e.target.value)}
                    className="w-full text-xs p-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-xl outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[9px] font-bold text-slate-400 uppercase mb-0.5">
                      Semanas (IG)
                    </label>
                    <input
                      type="number"
                      placeholder="Semanas"
                      value={usgWeeks}
                      onChange={(e) => setUsgWeeks(e.target.value)}
                      className="w-full text-xs p-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-xl outline-none font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-slate-400 uppercase mb-0.5">
                      Dias
                    </label>
                    <input
                      type="number"
                      placeholder="Dias"
                      value={usgDays}
                      onChange={(e) => setUsgDays(e.target.value)}
                      className="w-full text-xs p-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-xl outline-none font-bold"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleResetCalculator}
            className="w-full py-1.5 bg-slate-200/50 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-400 font-extrabold rounded-xl transition cursor-pointer flex items-center justify-center gap-1"
          >
            <RefreshCw className="h-3 w-3" /> Resetar Calculadora
          </button>
        </div>

        {/* Calculator Display Results */}
        <div className="md:col-span-7 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-center min-h-[160px]">
          {calcResult ? (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[9px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">
                  Semana Gestacional Calculada
                </span>
                <span className="text-3xl font-black text-slate-800 dark:text-white tracking-tight block">
                  {calcResult.weeks}{' '}
                  <span className="text-xl font-medium text-slate-400 dark:text-slate-500">
                    semanas e {calcResult.days} dias
                  </span>
                </span>
                <span className="text-[10px] font-extrabold text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-100/40 dark:border-indigo-900 rounded-full px-2.5 py-0.5 mt-1 inline-block uppercase tracking-wider">
                  {calcResult.trimester}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 space-y-1">
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block">
                  Data Provável do Parto (DPP)
                </span>
                <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight block">
                  {calcResult.dpp.toLocaleDateString('pt-BR')}
                </span>
                <span className="text-[9px] text-slate-400 font-bold block">
                  (Baseado na Regra de Naegele em vigor)
                </span>
              </div>
            </div>
          ) : (
            <div className="py-4 text-slate-400 text-xs flex flex-col items-center justify-center text-center">
              <AlertTriangle className="h-8 w-8 text-amber-500 mb-2 animate-bounce" />
              <p className="font-extrabold text-slate-700 dark:text-slate-200 text-sm">
                Calculadora Gestacional Inativa
              </p>
              <p className="text-[10px] text-slate-400 max-w-sm mt-1">
                Insira a DUM ou os dados de USG na lateral esquerda para identificar a idade gestacional e sincronizar as diretrizes automaticamente.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: EXAME FÍSICO ESPECIAL DA GESTAÇÃO */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3 mb-1">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="h-4.5 w-4.5 text-indigo-500" />
            <h3 className="font-extrabold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider">
              Exame Físico Especial da Gestação (Consulta Ativa)
            </h3>
          </div>
        </div>

        {isAdmin && isEditing && (
          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2.5">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Nome do novo campo (Ex: Circunferência Abdominal...)"
                value={newFieldLabel}
                onChange={e => setNewFieldLabel(e.target.value)}
                className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-850 dark:text-slate-200 focus:outline-none font-semibold"
              />
              <button
                type="button"
                onClick={handleAddExamField}
                className="py-1.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition shadow-sm flex items-center justify-center gap-1 shrink-0 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                Adicionar Campo
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {examFields.map((f: any) => {
            const isFieldEditing = editingFieldKey === f.key;
            const isCustom = f.type === 'custom';

            // Custom or toque fields look better full-width
            const colSpanClass = (f.type === 'toqueVaginal' || isCustom)
              ? 'col-span-1 md:col-span-2'
              : 'col-span-1';

            return (
              <div
                key={f.key}
                className={`p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1.5 relative group/field ${colSpanClass}`}
              >
                {isFieldEditing ? (
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Editar Nome do Campo</label>
                    <input
                      type="text"
                      value={editingLabelText}
                      onChange={e => setEditingLabelText(e.target.value)}
                      className="w-full px-2.5 py-1 text-xs border rounded-lg bg-white dark:bg-slate-900 text-slate-855 dark:text-slate-200 border-slate-250 dark:border-slate-700 outline-none font-bold"
                    />
                    <div className="flex gap-1 justify-end">
                      <button
                        type="button"
                        onClick={() => handleSaveFieldEdit(f.key)}
                        className="p-1 bg-green-500 hover:bg-green-600 text-white rounded transition cursor-pointer"
                        title="Salvar"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingFieldKey(null)}
                        className="p-1 bg-red-500 hover:bg-red-600 text-white rounded transition cursor-pointer"
                        title="Cancelar"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-start gap-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase block">
                        {f.label}
                      </label>

                      {isAdmin && isEditing && (
                        <div className="flex gap-1 opacity-0 group-hover/field:opacity-100 transition-opacity shrink-0">
                          <button
                            type="button"
                            onClick={() => startEditingField(f.key, f.label)}
                            className="p-0.5 text-slate-400 hover:text-indigo-600 rounded transition cursor-pointer"
                            title="Editar campo"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteExamField(f.key, f.label)}
                            className="p-0.5 text-rose-500 hover:text-rose-600 rounded transition cursor-pointer"
                            title="Excluir campo"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Render inputs based on type */}
                    {f.type === 'pa' && (
                      <div className="space-y-1.5">
                        <div className="flex gap-1.5 items-center">
                          <input
                            type="number"
                            placeholder="PAS"
                            value={exam.paSistolica || ''}
                            onChange={(e) => updateExamField('paSistolica', e.target.value)}
                            className="w-full px-2 py-1 text-xs border rounded-lg font-bold bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 focus:border-indigo-500 outline-none"
                          />
                          <span className="text-slate-400">/</span>
                          <input
                            type="number"
                            placeholder="PAD"
                            value={exam.paDiastolica || ''}
                            onChange={(e) => updateExamField('paDiastolica', e.target.value)}
                            className="w-full px-2 py-1 text-xs border rounded-lg font-bold bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 focus:border-indigo-500 outline-none"
                          />
                        </div>
                        <span
                          className={`text-[8.5px] font-black block pt-1 uppercase tracking-wider ${
                            isHighPA ? 'text-rose-500 animate-pulse' : 'text-slate-400 dark:text-slate-500'
                          }`}
                        >
                          {isHighPA ? '⚠️ Alerta de Pressão Elevada!' : 'Níveis normais'}
                        </span>
                      </div>
                    )}

                    {f.type === 'peso' && (
                      <div className="space-y-1.5">
                        <input
                          type="number"
                          step="0.1"
                          placeholder="Ex: 72.5"
                          value={exam.peso || ''}
                          onChange={(e) => updateExamField('peso', e.target.value)}
                          className="w-full px-2 py-1 text-xs border rounded-lg font-bold bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 focus:border-indigo-500 outline-none"
                        />
                        <div className="flex gap-1 justify-between pt-0.5">
                          {(['adequado', 'insuficiente', 'excessivo'] as const).map((g) => {
                            const sel = exam.ganhoPonderal === g;
                            const cLabel =
                              g === 'adequado'
                                ? 'bg-emerald-500 text-white'
                                : g === 'insuficiente'
                                ? 'bg-amber-500 text-white'
                                : 'bg-rose-500 text-white';
                            return (
                              <button
                                key={g}
                                type="button"
                                onClick={() => updateExamField('ganhoPonderal', g === exam.ganhoPonderal ? '' : g)}
                                className={`flex-1 text-[8px] font-black uppercase py-0.5 rounded border border-transparent transition-all cursor-pointer ${
                                  sel ? cLabel : 'bg-slate-200/60 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                                }`}
                              >
                                {g.slice(0, 4)}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {f.type === 'au' && (
                      <div className="space-y-1.5">
                        <div className="relative">
                          <input
                            type="number"
                            placeholder="AU em cm"
                            value={exam.alturaUterina || ''}
                            onChange={(e) => updateExamField('alturaUterina', e.target.value)}
                            className="w-full pl-2.5 pr-8 py-1 text-xs border rounded-lg font-bold bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 focus:border-indigo-500 outline-none"
                          />
                          <span className="absolute right-2 top-1 text-[9px] text-slate-400 font-bold">cm</span>
                        </div>
                        <span className="text-[8.5px] text-slate-400 dark:text-slate-500 block">
                          Mede crescimento uterino.
                        </span>
                      </div>
                    )}

                    {f.type === 'bcf' && (
                      <div className="space-y-1.5">
                        <div className="relative">
                          <input
                            type="number"
                            placeholder="Ex: 140"
                            value={exam.bcf || ''}
                            onChange={(e) => updateExamField('bcf', e.target.value)}
                            className="w-full pl-2.5 pr-8 py-1 text-xs border rounded-lg font-bold bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 focus:border-indigo-500 outline-none"
                          />
                          <span className="absolute right-2 top-1 text-[9px] text-slate-400 font-bold">bpm</span>
                        </div>
                        <span className="text-[8.5px] text-slate-400 dark:text-slate-500 block">
                          Fisiológico: 110-160 bpm.
                        </span>
                      </div>
                    )}

                    {f.type === 'edema' && (
                      <div className="flex gap-2 mt-1">
                        {(['presente', 'ausente'] as const).map((ed) => {
                          const sel = exam.edema === ed;
                          return (
                            <button
                              key={ed}
                              type="button"
                              onClick={() => updateExamField('edema', ed === exam.edema ? '' : ed)}
                              className={`flex-1 py-1 rounded-lg text-xs font-bold uppercase transition-all border cursor-pointer ${
                                sel
                                  ? ed === 'presente'
                                    ? 'bg-amber-500 border-amber-500 text-white shadow-sm'
                                    : 'bg-emerald-500 border-emerald-500 text-white shadow-sm'
                                  : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500'
                              }`}
                            >
                              {ed}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {f.type === 'toqueVaginal' && (
                      <input
                        type="text"
                        placeholder="Ex: Colo posterior, grosso, impérvio, bolsa íntegra."
                        value={exam.toqueVaginal || ''}
                        onChange={(e) => updateExamField('toqueVaginal', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border rounded-lg bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-205 border-slate-200 dark:border-slate-800 focus:border-indigo-500 outline-none font-semibold"
                      />
                    )}

                    {/* Custom User Field */}
                    {isCustom && (
                      <input
                        type="text"
                        placeholder="Registrar valor do exame..."
                        value={exam[f.key] || ''}
                        onChange={(e) => updateExamField(f.key, e.target.value)}
                        className="w-full px-3 py-1.5 text-xs border rounded-lg bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-205 border-slate-200 dark:border-slate-800 focus:border-indigo-500 outline-none font-semibold"
                      />
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: EXAME STATUS TABLE MATRIX */}
      {(examsList.length > 0 || (isAdmin && isEditing)) && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-3 mb-1">
            <div className="flex items-center gap-2">
              <Activity className="h-4.5 w-4.5 text-indigo-500" />
              <h3 className="font-extrabold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider">
                Monitoramento de Exames Complementares (Consulta Ativa)
              </h3>
            </div>
          </div>

          {isAdmin && isEditing && (
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2.5">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Nome do exame a monitorar (Ex: Hemograma, Ultrassonografia...)"
                  value={newExamText}
                  onChange={e => setNewExamText(e.target.value)}
                  className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-850 dark:text-slate-200 focus:outline-none font-semibold"
                />
                <button
                  type="button"
                  onClick={handleAddExam}
                  className="py-1.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition shadow-sm flex items-center justify-center gap-1 shrink-0 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  Adicionar Exame
                </button>
              </div>
            </div>
          )}

          {examsList.length === 0 ? (
            <p className="text-[11px] text-slate-400 italic text-center py-4">Nenhum exame cadastrado para monitoramento.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 border-collapse dark:text-slate-300 min-w-[500px]">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 font-extrabold uppercase text-[9px] tracking-wider">
                    <th className="py-2.5">Exame de Rastreio</th>
                    <th className="py-2.5 text-center px-1">Solicitado</th>
                    <th className="py-2.5 text-center px-1">Resultado Revisado</th>
                    <th className="py-2.5 text-center px-1">Alterado</th>
                    <th className="py-2.5 w-1/3">Notas de Alteração</th>
                  </tr>
                </thead>
                <tbody>
                  {examsList.map((ex: string, idx: number) => {
                    const itemKey = ex;
                    const sol = !!examStatus.solicitados[itemKey];
                    const rev = !!examStatus.revisados[itemKey];
                    const alt = !!examStatus.alterados[itemKey];
                    const note = examStatus.alteradosNotes[itemKey] || '';
                    const isExamEditing = editingExamIndex === idx;

                    return (
                      <tr
                        key={idx}
                        className="border-b border-slate-100/50 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors group/exam"
                      >
                        <td className="py-3 font-bold text-slate-800 dark:text-slate-200 pr-4">
                          {isExamEditing ? (
                            <div className="flex gap-1.5 items-center">
                              <input
                                type="text"
                                value={editingExamText}
                                onChange={e => setEditingExamText(e.target.value)}
                                className="px-2 py-1 text-xs border rounded bg-white dark:bg-slate-900 text-slate-855 dark:text-slate-200 border-slate-250 dark:border-slate-700 outline-none font-bold flex-1"
                              />
                              <button
                                type="button"
                                onClick={() => handleSaveExamEdit(idx)}
                                className="p-1 bg-green-500 hover:bg-green-600 text-white rounded cursor-pointer"
                              >
                                <Check className="h-3 w-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingExamIndex(null)}
                                className="p-1 bg-red-500 hover:bg-red-600 text-white rounded cursor-pointer"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between gap-2">
                              <span>{ex}</span>
                              {isAdmin && isEditing && (
                                <div className="flex gap-1 opacity-0 group-hover/exam:opacity-100 transition-opacity">
                                  <button
                                    type="button"
                                    onClick={() => startEditingExam(idx, ex)}
                                    className="p-0.5 text-slate-400 hover:text-indigo-600 rounded transition cursor-pointer"
                                    title="Editar nome"
                                  >
                                    <Edit3 className="h-3.5 w-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteExam(idx)}
                                    className="p-0.5 text-rose-500 hover:text-rose-600 rounded transition cursor-pointer"
                                    title="Excluir exame"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="text-center">
                          <button
                            type="button"
                            onClick={() => updateExamStatusField('solicitados', itemKey, !sol)}
                            className="mx-auto block text-slate-400 hover:text-indigo-500 cursor-pointer"
                          >
                            {sol ? (
                              <CheckSquare className="h-4.5 w-4.5 text-indigo-500" />
                            ) : (
                              <Square className="h-4.5 w-4.5 text-slate-300 dark:text-slate-600" />
                            )}
                          </button>
                        </td>
                        <td className="text-center">
                          <button
                            type="button"
                            onClick={() => {
                              updateExamStatusField('revisados', itemKey, !rev);
                            }}
                            className="mx-auto block text-slate-400 hover:text-indigo-500 cursor-pointer"
                          >
                            {rev ? (
                              <CheckSquare className="h-4.5 w-4.5 text-indigo-500" />
                            ) : (
                              <Square className="h-4.5 w-4.5 text-slate-300 dark:text-slate-600" />
                            )}
                          </button>
                        </td>
                        <td className="text-center">
                          <button
                            type="button"
                            onClick={() => updateExamStatusField('alterados', itemKey, !alt)}
                            className="mx-auto block text-slate-400 hover:text-indigo-500 cursor-pointer"
                          >
                            {alt ? (
                              <CheckSquare className="h-4.5 w-4.5 text-rose-500" />
                            ) : (
                              <Square className="h-4.5 w-4.5 text-slate-300 dark:text-slate-600" />
                            )}
                          </button>
                        </td>
                        <td className="py-2.5">
                          <input
                            type="text"
                            placeholder={alt ? 'Registrar alteração...' : 'Nenhuma alteração...'}
                            value={note}
                            onChange={(e) => updateExamStatusNote(itemKey, e.target.value)}
                            className={`w-full py-1.5 px-2 text-xs border rounded-lg bg-transparent border-transparent ${
                              alt
                                ? 'border-amber-200 outline-none text-amber-700 bg-amber-50 dark:bg-amber-950/20 font-bold'
                                : 'text-slate-500 dark:text-slate-400 focus:border-slate-200 outline-none'
                            }`}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Confirmation Modal overlay */}
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
