import React, { useState } from 'react';
import { Activity, Shield, AlertTriangle, Scale, Info, Plus, Trash2, Edit3, Check, X } from 'lucide-react';
import { SpecialGuideConsult } from '../types/specialGuide';
import { useConfirmModal } from '../hooks/useModal';
import { ConfirmModal } from '../components/ui/Modal';

interface HipertensaoWidgetsProps {
  consult: SpecialGuideConsult;
  selectedId: string;
  updateMeta: (meta: Record<string, any>) => void;
  isAdmin?: boolean;
  isEditing?: boolean;
}

export const HipertensaoWidgets: React.FC<HipertensaoWidgetsProps> = ({
  consult,
  selectedId,
  updateMeta,
  isAdmin,
  isEditing,
}) => {
  // Load local state variables from meta
  const meta = consult.meta || {};
  const pasVal = meta.pasVal ?? '135';
  const padVal = meta.padVal ?? '85';
  const saltGrams = meta.saltGrams ?? '5';

  // Dynamic risk factors list loading
  const defaultRisks = [
    { label: '👴 Idade Elevada (>55H, >65M)', key: 'riskAge' },
    { label: '🚬 Tabagismo ativo', key: 'riskTabaco' },
    { label: '🩸 Diabetes Mellitus', key: 'riskDiabetes' },
    { label: '🥩 Dislipidemia / Colesterol', key: 'riskCholesterol' },
    { label: '🧬 Histórico DCV Familiar', key: 'riskFamily' },
    { label: '👁️ Lesão Órgão-Alvo (LOA)', key: 'riskLOA' },
    { label: '🧠 DCV/DRC Estabelecida', key: 'riskDCV' },
  ];

  const risksList = meta.hipertensaoRisks || defaultRisks;

  const [editingRiskKey, setEditingRiskKey] = useState<string | null>(null);
  const [editingLabelText, setEditingLabelText] = useState('');
  const [newRiskLabel, setNewRiskLabel] = useState('');

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

  // Dispatch helper
  const setMetaField = (field: string, value: any) => {
    updateMeta({
      ...meta,
      [field]: value,
    });
  };

  // 1. SBC 2020 BP Classifier
  const getPaClassification = (pasNum: number, padNum: number) => {
    if (isNaN(pasNum) || isNaN(padNum) || pasNum <= 0 || padNum <= 0) {
      return { label: 'Dados insuficientes', meta: 'Digite a PAS/PAD', color: 'slate' };
    }

    if (pasNum >= 140 && padNum < 90) {
      return {
        label: 'Hipertensão Sistólica Isolada',
        meta: 'SBC Estágio Especial',
        color: 'rose',
        comment: 'Frequente em pacientes geriátricos. Evitar hipotensão da diastólica (< 60 mmHg).'
      };
    }

    if (pasNum >= 180 || padNum >= 110) {
      return {
        label: 'Hipertensão Estágio 3',
        meta: 'Crise de Alto Risco',
        color: 'red',
        comment: 'Avaliação médica imediata. Iniciar intervenção medicamentosa urgente.'
      };
    }
    if ((pasNum >= 160 && pasNum <= 179) || (padNum >= 100 && padNum <= 109)) {
      return {
        label: 'Hipertensão Estágio 2',
        meta: 'Risco Cardiovascular Elevado',
        color: 'orange',
        comment: 'Indicação assertiva de terapia dupla combinada e acompanhamento semestral.'
      };
    }
    if ((pasNum >= 140 && pasNum <= 159) || (padNum >= 90 && padNum <= 99)) {
      return {
        label: 'Hipertensão Estágio 1',
        meta: 'Hipertensão Moderada',
        color: 'amber',
        comment: 'MEV de 3 meses se sem fatores adicionais de gravidade. Do contrário, iniciar farmacoterapia.'
      };
    }
    if ((pasNum >= 130 && pasNum <= 139) || (padNum >= 85 && padNum <= 89)) {
      return {
        label: 'Pré-Hipertensão',
        meta: 'Limítrofe Alerta',
        color: 'yellow',
        comment: 'Foco substancial em práticas saudáveis/MEV. Tratar se diabético de alto risco.'
      };
    }
    if ((pasNum >= 120 && pasNum <= 129) && (padNum >= 80 && padNum <= 84)) {
      return {
        label: 'Pressão Normal',
        meta: 'Faixa Saudável',
        color: 'sky',
        comment: 'Incentivar atividades e aferição preventiva anual rotineira.'
      };
    }
    if (pasNum < 120 && padNum < 80) {
      return {
        label: 'Pressão Ótima',
        meta: 'Fisiologia Perfeita',
        color: 'green',
        comment: 'Parabéns. Continuar monitorando anualmente.'
      };
    }

    return { label: 'Classificação Incompleta', meta: 'Dados parciais', color: 'slate' };
  };

  const pasNum = parseFloat(pasVal) || 0;
  const padNum = parseFloat(padVal) || 0;
  const classification = getPaClassification(pasNum, padNum);

  const getPaStageScore = (pas: number, pad: number): number => {
    if (pas >= 180 || pad >= 110) return 3;
    if ((pas >= 160 && pas <= 179) || (pad >= 100 && pad <= 109)) return 2;
    if ((pas >= 140 && pas <= 159) || (pad >= 90 && pad <= 99)) return 1;
    if ((pas >= 130 && pas <= 139) || (pad >= 85 && pad <= 89)) return 0.5;
    return 0;
  };

  // 2. Risk Stratification
  const calculateGlobalCardioRisk = () => {
    const stage = getPaStageScore(pasNum, padNum);

    const riskDCV = !!meta.riskDCV;
    const riskLOA = !!meta.riskLOA;
    const riskDiabetes = !!meta.riskDiabetes;

    if (riskDCV) return { level: 'Muito Alto / Estabelecido', color: 'red', desc: 'Paciente já possui sequelas de Doença Cardiovascular Clínica ou Renal Crônica.' };
    if (riskLOA) return { level: 'Alto Risco', color: 'red', desc: 'Presença evidente de Lesão de Órgão-Alvo (LOA: Retinopatia, microalbuminúria ou hipertrofia cardíaca).' };
    if (riskDiabetes) return { level: 'Alto Risco', color: 'red', desc: 'Paciente hipertenso portador de Diabetes é categorizado como alto risco cardiometabólico.' };

    let frCount = 0;
    risksList.forEach((item) => {
      if (item.key !== 'riskDCV' && item.key !== 'riskLOA' && item.key !== 'riskDiabetes') {
        if (!!meta[item.key]) {
          frCount++;
        }
      }
    });

    if (stage === 3) {
      return { level: 'Alto Risco', color: 'red', desc: 'Nível Estágio 3 confere risco adverso grave imediato.' };
    }
    if (stage === 2) {
      if (frCount >= 3) return { level: 'Alto Risco', color: 'red', desc: 'Estágio 2 com 3 ou mais fatores de risco cardiovascular.' };
      return { level: 'Risco Moderado', color: 'orange', desc: 'Estágio 2 com 1 a 2 fatores de risco.' };
    }
    if (stage === 1) {
      if (frCount >= 3) return { level: 'Alto Risco', color: 'red', desc: 'Estágio 1 associado a múltiplos fatores cardíacos.' };
      if (frCount >= 1) return { level: 'Risco Moderado', color: 'orange', desc: 'Estágio 1 com cofatores de risco.' };
      return { level: 'Baixo Risco', color: 'yellow', desc: 'Estágio 1 isolado e livre de cofatores adicionais.' };
    }
    if (stage === 0.5) {
      if (frCount >= 3) return { level: 'Alto Risco', color: 'red', desc: 'Pré-hipertensão com forte componente sindrômico.' };
      if (frCount >= 1) return { level: 'Baixo Risco', color: 'yellow', desc: 'Pré-hipertensão com co-fatores de risco.' };
      return { level: 'Sem risco incremental', color: 'green', desc: 'Níveis de pré-hipertensão isolados.' };
    }

    return { level: 'Risco Cardiovascular Basal', color: 'green', desc: 'Pressão ótima/normal livre de cofatores.' };
  };

  const riskResult = calculateGlobalCardioRisk();

  // Sodium calculation
  const sodiumValue = Math.round((parseFloat(saltGrams) || 0) * 400);

  // Risk Factors handlers
  const handleAddRisk = () => {
    if (!newRiskLabel.trim()) return;
    const newRisk = {
      label: newRiskLabel.trim(),
      key: 'custom_risk_' + Date.now().toString(36),
    };
    const updated = [...risksList, newRisk];
    updateMeta({ hipertensaoRisks: updated });
    setNewRiskLabel('');
  };

  const startEditingRisk = (key: string, label: string) => {
    setEditingRiskKey(key);
    setEditingLabelText(label);
  };

  const handleSaveRiskEdit = (key: string) => {
    if (!editingLabelText.trim()) return;
    const updated = risksList.map((r: any) =>
      r.key === key ? { ...r, label: editingLabelText.trim() } : r
    );
    updateMeta({ hipertensaoRisks: updated });
    setEditingRiskKey(null);
  };

  const handleDeleteRisk = async (key: string, label: string) => {
    const confirmed = await requestConfirm({
      title: 'Excluir Fator de Risco',
      message: `Tem certeza que deseja remover o fator de risco "${label}"?`,
      variant: 'danger',
    });
    if (confirmed) {
      const updated = risksList.filter((r: any) => r.key !== key);
      updateMeta({ hipertensaoRisks: updated });
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* SECTION 1: BLOOD PRESSURE STAGE CLASSIFIER */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-1.5 border-b border-slate-200/50 dark:border-slate-800 pb-1.5">
            <Activity className="h-4 w-4 text-rose-500" />
            <h4 className="text-[10.5px] uppercase font-black text-slate-500 tracking-wider">
              Aferidor de Consultório (SBC)
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[9px] font-bold text-slate-400 uppercase mb-0.5">
                Sistólica (PAS)
              </label>
              <input
                type="number"
                value={pasVal}
                onChange={(e) => setMetaField('pasVal', e.target.value)}
                className="w-full text-xs p-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-xl outline-none font-bold"
              />
            </div>
            <div>
              <label className="block text-[9px] font-bold text-slate-400 uppercase mb-0.5">
                Diastólica (PAD)
              </label>
              <input
                type="number"
                value={padVal}
                onChange={(e) => setMetaField('padVal', e.target.value)}
                className="w-full text-xs p-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-xl outline-none font-bold"
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-7 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-center">
          <div className="space-y-2">
            <span className="text-[9px] font-extrabold text-rose-600 dark:text-rose-400 uppercase tracking-widest block">
              Classificação SBC / SBD 2020
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
                {classification.label}
              </span>
              <span className="text-xs font-bold text-slate-400">
                ({classification.meta})
              </span>
            </div>
            {classification.comment && (
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700/60 pt-2 mt-1">
                <Info className="h-3.5 w-3.5 inline mr-1 text-slate-400 shrink-0" />
                {classification.comment}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 2: CARDIOVASCULAR RISK STRATIFICATION PANEL */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-3 mb-1">
          <Shield className="h-4.5 w-4.5 text-rose-500" />
          <h3 className="font-extrabold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider">
            Estratificação de Risco Cardiovascular Global
          </h3>
        </div>

        {isAdmin && isEditing && (
          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2.5">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Nome do novo fator de risco (Ex: Sedentarismo, Obesidade...)"
                value={newRiskLabel}
                onChange={e => setNewRiskLabel(e.target.value)}
                className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-850 dark:text-slate-200 focus:outline-none font-semibold"
              />
              <button
                type="button"
                onClick={handleAddRisk}
                className="py-1.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition shadow-sm flex items-center justify-center gap-1 shrink-0 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                Adicionar Fator
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          {/* Toggles */}
          <div className="md:col-span-7 space-y-2.5">
            <span className="text-[9.5px] font-extrabold text-slate-400 uppercase block tracking-wider">
              Assinale os Fatores Clínicos Verificados
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {risksList.map((item: any) => {
                const checked = !!meta[item.key];
                const isRiskEditing = editingRiskKey === item.key;

                return (
                  <div
                    key={item.key}
                    className="relative group/risk"
                  >
                    {isRiskEditing ? (
                      <div className="p-2 border rounded-xl bg-slate-50 dark:bg-slate-900 flex gap-1 items-center">
                        <input
                          type="text"
                          value={editingLabelText}
                          onChange={e => setEditingLabelText(e.target.value)}
                          className="flex-1 px-2 py-1 text-xs border rounded bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 outline-none font-semibold"
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveRiskEdit(item.key)}
                          className="p-1 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600"
                        >
                          <Check className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingRiskKey(null)}
                          className="p-1 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-1">
                        <button
                          type="button"
                          onClick={() => setMetaField(item.key, !checked)}
                          className={`flex-1 flex items-center gap-2 px-3 py-2 text-left text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                            checked
                              ? 'bg-rose-50 border-rose-200 text-rose-950 dark:bg-rose-950/20 dark:border-rose-900/40 dark:text-rose-300 font-bold'
                              : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-350'
                          }`}
                        >
                          <div
                            className={`h-4 w-4 rounded flex items-center justify-center shrink-0 border ${
                              checked ? 'border-rose-500 bg-rose-500 text-white' : 'border-slate-300 dark:border-slate-700'
                            }`}
                          >
                            {checked && '✓'}
                          </div>
                          <span className="truncate">{item.label}</span>
                        </button>

                        {isAdmin && isEditing && (
                          <div className="absolute right-2 top-2.5 flex gap-1 opacity-0 group-hover/risk:opacity-100 transition-opacity z-10 bg-inherit pl-2">
                            <button
                              type="button"
                              onClick={() => startEditingRisk(item.key, item.label)}
                              className="p-0.5 text-slate-400 hover:text-indigo-600 rounded transition cursor-pointer"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteRisk(item.key, item.label)}
                              className="p-0.5 text-rose-500 hover:text-rose-600 rounded transition cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rationale Display */}
          <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex flex-col justify-center">
            <div className="space-y-2">
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block">
                Score de Risco Adicional
              </span>
              <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-rose-500 text-white shadow-sm">
                {riskResult.level}
              </div>
              <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400 font-semibold mt-1">
                {riskResult.desc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: SALT AND SODIUM CONVERTER (Dynamic on h_mev) */}
      {selectedId === 'h_mev' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5 shadow-sm space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-3 mb-1">
            <Scale className="h-4.5 w-4.5 text-rose-500" />
            <h3 className="font-extrabold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider">
              Conversor Sal ↔ Sódio (Medida Comportamental)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase">
                Consumo diário declarado (Sal - gramas)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={saltGrams}
                  onChange={(e) => setMetaField('saltGrams', e.target.value)}
                  className="w-full pl-3 pr-10 py-2 text-xs border rounded-lg font-bold bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 focus:border-indigo-500 outline-none"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">gramas</span>
              </div>
            </div>

            <div className="md:col-span-7 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col justify-center">
              <div className="space-y-1">
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block">
                  Sódio Equivalente Estimado
                </span>
                <span className="text-2xl font-black text-slate-800 dark:text-white block">
                  {sodiumValue}{' '}
                  <span className="text-sm font-medium text-slate-400">mg / dia</span>
                </span>
                {sodiumValue > 2000 ? (
                  <div className="flex items-center gap-1.5 p-2 bg-red-500/10 border border-red-500/20 text-red-800 dark:text-red-300 text-[10px] font-bold rounded-lg mt-1.5">
                    <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                    <span>CONSUMO EXCESSIVO: Limite recomendado pela OMS (2000mg/dia) foi ultrapassado!</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold rounded-lg mt-1.5">
                    <span>✓ Consumo dentro das metas recomendadas para prevenção cardiovascular.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
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
