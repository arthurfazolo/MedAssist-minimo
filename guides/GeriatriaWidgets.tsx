import React, { useState } from 'react';
import { Scale, Activity, CheckSquare, Square, Plus, Trash2, Edit3, Check, X } from 'lucide-react';
import { SpecialGuideConsult } from '../types/specialGuide';
import { useConfirmModal } from '../hooks/useModal';
import { ConfirmModal } from '../components/ui/Modal';

interface GeriatriaWidgetsProps {
  consult: SpecialGuideConsult;
  selectedId: string;
  updateMeta: (meta: Record<string, any>) => void;
  isAdmin?: boolean;
  isEditing?: boolean;
}

export const GeriatriaWidgets: React.FC<GeriatriaWidgetsProps> = ({
  consult,
  selectedId,
  updateMeta,
  isAdmin,
  isEditing,
}) => {
  // Extract or initialize bio metrics
  const bio = consult.meta?.geratriaBio || {
    peso: '',
    altura: '',
    imc: '',
    panturrilha: '',
    tugTempo: '',
  };

  // Extract or initialize Katz scale
  const katzState = consult.meta?.katzState || {
    banho: true,
    vestir: true,
    higiene: true,
    transferencia: true,
    continencia: true,
    alimentacao: true,
  };

  // Extract or initialize Lawton scale
  const lawtonState = consult.meta?.lawtonState || {
    telefone: 3,
    viagens: 3,
    compras: 3,
    refeicoes: 3,
    trabalhoDom: 3,
    medicamentos: 3,
    dinheiro: 3,
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

  // Dynamic bio fields loading and management
  const defaultBioFields = [
    { key: 'peso', label: 'Peso (kg)', type: 'peso' },
    { key: 'altura', label: 'Estatura (cm)', type: 'altura' },
    { key: 'panturrilha', label: 'Panturrilha (cm)', type: 'panturrilha' },
    { key: 'tugTempo', label: 'TUG Test (s)', type: 'tugTempo' },
  ];

  const bioFields = consult.meta?.geratriaBioFields || defaultBioFields;
  const [editingFieldKey, setEditingFieldKey] = useState<string | null>(null);
  const [editingLabelText, setEditingLabelText] = useState('');
  const [newFieldLabel, setNewFieldLabel] = useState('');

  // Exams matrix list management
  const defaultExams = [
    'Hemograma Completo',
    'Glicemia de Jejum / HbA1c',
    'Perfil Lipídico Completo',
    'Função Renal (Ureia e Creatinina)',
    'Função Tireoidiana (TSH e T4 Livre)',
    'Dosagem de Vitamina B12 e Vitamina D',
  ];
  const examsList = consult.meta?.geriatriaExamsList || defaultExams;

  const examStatus = consult.meta?.geriatriaExamStatus?.[selectedId] || {
    solicitados: {},
    revisados: {},
    alterados: {},
    alteradosNotes: {},
  };

  const [editingExamIndex, setEditingExamIndex] = useState<number | null>(null);
  const [editingExamText, setEditingExamText] = useState('');
  const [newExamText, setNewExamText] = useState('');

  // Scores calculations
  const calculateKatzScore = () => {
    return Object.values(katzState).filter((val) => val === true).length;
  };

  const calculateLawtonScore = (): number => {
    return (Object.values(lawtonState) as number[]).reduce((acc: number, curr: number) => acc + curr, 0);
  };

  const getKatzClassification = (score: number) => {
    if (score === 6) return 'Independência funcional total';
    if (score >= 4) return 'Dependência funcional parcial';
    return 'Dependência funcional grave';
  };

  const getLawtonClassification = (score: number) => {
    if (score === 21) return 'Independência total';
    if (score >= 14) return 'Dependência parcial (necessita auxílio)';
    return 'Dependência grave (totalmente dependente)';
  };

  // State update dispatchers
  const handleUpdateBioField = (field: string, val: string) => {
    const updatedBio = { ...bio, [field]: val };

    if (field === 'peso' || field === 'altura') {
      const p = parseFloat(field === 'peso' ? val : bio.peso);
      const h = parseFloat(field === 'altura' ? val : bio.altura);
      if (p > 0 && h > 0) {
        const hMetros = h / 100;
        const imcVal = p / (hMetros * hMetros);
        updatedBio.imc = imcVal.toFixed(1);
      } else {
        updatedBio.imc = '';
      }
    }

    updateMeta({ geratriaBio: updatedBio });
  };

  const handleToggleKatz = (item: string) => {
    const updatedKatz = { ...katzState, [item]: !katzState[item] };
    updateMeta({ katzState: updatedKatz });
  };

  const handleChangeLawton = (item: string, val: number) => {
    const updatedLawton = { ...lawtonState, [item]: val };
    updateMeta({ lawtonState: updatedLawton });
  };

  // Section 1: Dynamic Bio fields handlers
  const handleAddBioField = () => {
    if (!newFieldLabel.trim()) return;
    const newField = {
      key: 'custom_bio_' + Date.now().toString(36),
      label: newFieldLabel.trim(),
      type: 'custom',
    };
    const updated = [...bioFields, newField];
    updateMeta({ geratriaBioFields: updated });
    setNewFieldLabel('');
  };

  const startEditingField = (key: string, label: string) => {
    setEditingFieldKey(key);
    setEditingLabelText(label);
  };

  const handleSaveFieldEdit = (key: string) => {
    if (!editingLabelText.trim()) return;
    const updated = bioFields.map((f: any) =>
      f.key === key ? { ...f, label: editingLabelText.trim() } : f
    );
    updateMeta({ geratriaBioFields: updated });
    setEditingFieldKey(null);
  };

  const handleDeleteBioField = async (key: string, label: string) => {
    const confirmed = await requestConfirm({
      title: 'Excluir Campo de Avaliação',
      message: `Tem certeza que deseja remover o campo "${label}"?`,
      variant: 'danger',
    });
    if (confirmed) {
      const updated = bioFields.filter((f: any) => f.key !== key);
      updateMeta({ geratriaBioFields: updated });
    }
  };

  // Section 3: Exams matrix handlers
  const handleAddExam = () => {
    if (!newExamText.trim()) return;
    const updated = [...examsList, newExamText.trim()];
    updateMeta({ geriatriaExamsList: updated });
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
    const currentExamStatusAll = consult.meta?.geriatriaExamStatus || {};
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
      geriatriaExamsList: updated,
      geriatriaExamStatus: {
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
      updateMeta({ geriatriaExamsList: updated });
    }
  };

  const updateExamStatusField = (field: 'solicitados' | 'revisados' | 'alterados', itemKey: string, val: boolean) => {
    const currentExamStatusAll = consult.meta?.geriatriaExamStatus || {};
    const currentStatus = currentExamStatusAll[selectedId] || {
      solicitados: {},
      revisados: {},
      alterados: {},
      alteradosNotes: {},
    };

    const updatedField = { ...currentStatus[field], [itemKey]: val };
    const updatedStatus = { ...currentStatus, [field]: updatedField };

    // Auto-request if reviewed
    if (field === 'revisados' && val) {
      updatedStatus.solicitados = { ...updatedStatus.solicitados, [itemKey]: true };
    }

    updateMeta({
      geriatriaExamStatus: {
        ...currentExamStatusAll,
        [selectedId]: updatedStatus,
      },
    });
  };

  const updateExamStatusNote = (itemKey: string, val: string) => {
    const currentExamStatusAll = consult.meta?.geriatriaExamStatus || {};
    const currentStatus = currentExamStatusAll[selectedId] || {
      solicitados: {},
      revisados: {},
      alterados: {},
      alteradosNotes: {},
    };

    const updatedNotes = { ...currentStatus.alteradosNotes, [itemKey]: val };
    const updatedStatus = { ...currentStatus, alteradosNotes: updatedNotes };

    updateMeta({
      geriatriaExamStatus: {
        ...currentExamStatusAll,
        [selectedId]: updatedStatus,
      },
    });
  };

  return (
    <div className="space-y-6 text-left">
      {/* SECTION 1: ANTROPOMETRIA & MOBILIDADE (Always visible) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h3 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm flex items-center gap-2">
              <Scale className="h-4.5 w-4.5 text-violet-500 animate-pulse" />
              Avaliação Antropométrica e Mobilidade
            </h3>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium">
              Registre peso, estatura, circunferência da panturrilha (CP) e teste de marcha (TUG).
            </p>
          </div>
        </div>

        {isAdmin && isEditing && (
          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2.5">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Nome da nova métrica (Ex: Circunferência Abdominal...)"
                value={newFieldLabel}
                onChange={e => setNewFieldLabel(e.target.value)}
                className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-850 dark:text-slate-200 focus:outline-none font-semibold"
              />
              <button
                type="button"
                onClick={handleAddBioField}
                className="py-1.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition shadow-sm flex items-center justify-center gap-1 shrink-0 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                Adicionar Campo
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {bioFields.map((f: any) => {
            const isFieldEditing = editingFieldKey === f.key;
            const isCustom = f.type === 'custom';

            return (
              <div
                key={f.key}
                className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-150 dark:border-slate-800 relative group/field"
              >
                {isFieldEditing ? (
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Editar Nome</label>
                    <input
                      type="text"
                      value={editingLabelText}
                      onChange={e => setEditingLabelText(e.target.value)}
                      className="w-full px-2 py-1 text-xs border rounded bg-white dark:bg-slate-900 text-slate-855 dark:text-slate-200 border-slate-250 dark:border-slate-700 outline-none font-bold"
                    />
                    <div className="flex gap-1 justify-end">
                      <button
                        type="button"
                        onClick={() => handleSaveFieldEdit(f.key)}
                        className="p-1 bg-green-500 hover:bg-green-600 text-white rounded transition cursor-pointer"
                      >
                        <Check className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingFieldKey(null)}
                        className="p-1 bg-red-500 hover:bg-red-600 text-white rounded transition cursor-pointer"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-start gap-1 mb-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                        {f.label}
                      </label>
                      {isAdmin && isEditing && (
                        <div className="flex gap-0.5 opacity-0 group-hover/field:opacity-100 transition-opacity shrink-0">
                          <button
                            type="button"
                            onClick={() => startEditingField(f.key, f.label)}
                            className="p-0.5 text-slate-400 hover:text-indigo-600 rounded transition cursor-pointer"
                          >
                            <Edit3 className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteBioField(f.key, f.label)}
                            className="p-0.5 text-rose-500 hover:text-rose-600 rounded transition cursor-pointer"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </div>

                    <input
                      type="number"
                      placeholder={
                        f.type === 'peso' ? 'Ex: 68.0' :
                        f.type === 'altura' ? 'Ex: 165' :
                        f.type === 'panturrilha' ? 'Circunferência' :
                        f.type === 'tugTempo' ? 'Tempo (s)' : 'Registrar valor...'
                      }
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-violet-500 text-xs font-semibold bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200"
                      value={bio[f.key] || ''}
                      onChange={(e) => handleUpdateBioField(f.key, e.target.value)}
                    />
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* IMC & CRITICAL ALERTS */}
        <div className="bg-slate-50 dark:bg-slate-900/40 rounded-xl p-3.5 border border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5 border-r border-slate-100 dark:border-slate-800 pr-3">
            <Activity className="h-4 w-4 text-violet-500 animate-pulse" />
            <span>IMC Atual Calculado:</span>
            <span className="font-extrabold text-slate-800 dark:text-slate-200 ml-auto font-mono text-sm">
              {bio.imc ? `${bio.imc} kg/m²` : '---'}
            </span>
          </div>

          <div className="flex flex-col justify-center space-y-1 pl-1">
            {bio.panturrilha && parseFloat(bio.panturrilha) < 31 && (
              <span className="text-[9px] font-black text-rose-500 block uppercase tracking-wider animate-pulse">
                ⚠️ CP &lt; 31cm: Risco de Sarcopenia/Perda de massa magra
              </span>
            )}
            {bio.tugTempo && parseFloat(bio.tugTempo) >= 12 && (
              <span className="text-[9px] font-black text-amber-500 block uppercase tracking-wider">
                ⚠️ TUG &ge; 12s: Alto risco de instabilidade postural e quedas
              </span>
            )}
            {(!bio.panturrilha || parseFloat(bio.panturrilha) >= 31) && (!bio.tugTempo || parseFloat(bio.tugTempo) < 12) && (
              <span className="text-[10px] text-slate-400 dark:text-slate-500 italic">Sem alertas de risco ativo</span>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 2: FUNCTIONALITY SCALES (Only active during Functional Evaluation stage) */}
      {selectedId === 'g_funcionalidade' && (
        <div className="space-y-6 pt-5 border-t border-slate-100 dark:border-slate-800">
          {/* KATZ CHECKBOXES */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
              <div>
                <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase">
                  Índice de Katz (Atividades Básicas - ABVDs)
                </h4>
                <p className="text-[10px] text-slate-400 mt-0.5 font-medium">
                  Selecione as atividades em que o idoso apresenta total independência funcional.
                </p>
              </div>
              <span className="shrink-0 text-xs font-bold text-violet-700 bg-violet-50 px-3 py-1 rounded-full dark:bg-violet-950/40 dark:text-violet-400 leading-none">
                {calculateKatzScore()}/6 - {getKatzClassification(calculateKatzScore())}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {Object.keys(katzState).map((item) => {
                const checked = katzState[item];
                const labels: Record<string, string> = {
                  banho: 'Banho (lava-se só ou com pouca ajuda)',
                  vestir: 'Vestir-se (pega e veste tudo sem auxílio)',
                  higiene: 'Higiene pessoal (vai ao banheiro só)',
                  transferencia: 'Transferência (deita e levanta só)',
                  continencia: 'Continência (controle de urina/fezes)',
                  alimentacao: 'Alimentação (leva a comida à boca só)',
                };
                return (
                  <div
                    key={item}
                    onClick={() => handleToggleKatz(item)}
                    className={`p-3 border rounded-xl flex items-center gap-2.5 cursor-pointer transition-all ${
                      checked
                        ? 'bg-violet-50/50 border-violet-200 text-violet-900 dark:bg-violet-950/20 dark:border-violet-800 dark:text-violet-300'
                        : 'bg-slate-50/50 hover:bg-slate-100/50 border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <div className="shrink-0">
                      {checked ? (
                        <CheckSquare className="h-4.5 w-4.5 text-violet-650" />
                      ) : (
                        <Square className="h-4.5 w-4.5 text-slate-300 dark:text-slate-600" />
                      )}
                    </div>
                    <span className="font-bold text-[10.5px] leading-snug">{labels[item]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* LAWTON MATRIX SELECTS */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
              <div>
                <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase">
                  Escala de Lawton & Brody (Atividades Instrumentais - AIVDs)
                </h4>
                <p className="text-[10px] text-slate-400 mt-0.5 font-medium">
                  Classifique a assistência requerida para as atividades de integração na comunidade.
                </p>
              </div>
              <span className="shrink-0 text-xs font-bold text-violet-700 bg-violet-50 px-3 py-1 rounded-full dark:bg-violet-950/40 dark:text-violet-400 font-mono leading-none">
                {calculateLawtonScore()}/21 - {getLawtonClassification(calculateLawtonScore())}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.keys(lawtonState).map((item) => {
                const score = lawtonState[item];
                const labels: Record<string, string> = {
                  telefone: 'Uso do Telefone (liga, localiza e grava contatos)',
                  viagens: 'Meios de Transporte (passagens, circula sozinho)',
                  compras: 'Realizar Compras (cuida de compras diárias sozinho)',
                  refeicoes: 'Preparo de Alimentos (planeja, cozinha e serve só)',
                  trabalhoDom: 'Trabalhos Domésticos (arruma casa sozinho)',
                  medicamentos: 'Medicamentos (administra doses e caixas sozinho)',
                  dinheiro: 'Gestão Financeira (banco, paga contas sozinho)',
                };
                return (
                  <div
                    key={item}
                    className="flex items-center justify-between gap-4 p-3 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50/30 dark:bg-slate-900/10"
                  >
                    <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 leading-tight block truncate max-w-[65%]">
                      {labels[item]}
                    </span>

                    <select
                      value={score}
                      onChange={(e) => handleChangeLawton(item, Number(e.target.value))}
                      className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-1.5 text-[10px] font-black text-slate-700 dark:text-slate-300 outline-none focus:ring-1 focus:ring-violet-500 transition-all cursor-pointer"
                    >
                      <option value={3}>Independente (3 pts)</option>
                      <option value={2}>Auxílio Parcial (2 pts)</option>
                      <option value={1}>Dependente (1 pt)</option>
                    </select>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

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
                  placeholder="Nome do exame a monitorar (Ex: Hemograma, TSH...)"
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

