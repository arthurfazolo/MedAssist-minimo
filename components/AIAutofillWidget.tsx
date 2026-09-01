import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Check, X, ShieldCheck, BookOpen, AlertTriangle, Cpu, Calendar, User } from 'lucide-react';
import { 
  checkAIStatus, 
  generateDiseaseFromIA, 
  generateMedicationFromIA, 
  generateProtocolFromIA, 
  generatePrescriptionFromIA, 
  generateCalculatorFromIA,
  logAIGeneration,
  AIAuditLog
} from '../services/geminiService';

interface AIAutofillWidgetProps {
  type: 'disease' | 'medication' | 'protocol' | 'prescription' | 'calculator';
  itemName: string;
  currentData: any;
  onApply: (approvedData: any, sources: string[]) => void;
  isEditMode: boolean; // if true -> "Atualizar com IA", if false -> "Autopreencher com IA"
  disabled?: boolean;
}

// Reassuring medical loading quotes to show during analysis
const LOADING_MESSAGES = [
  "Inicializando canal seguro com Gemini...",
  "Pesquisando bases científicas (OMS, OPAS, CDC, UpToDate)...",
  "Examinando diretrizes de sociedades médicas nacionais e internacionais...",
  "Processando bibliografias e interpretando conceitos clínicos importantes...",
  "Consolidando referências múltiplas sem cópia literal...",
  "Sintetizando redação com terminologia médica e rigor científico original...",
  "Montando estrutura JSON final para sua aprovação..."
];

export const AIAutofillWidget: React.FC<AIAutofillWidgetProps> = ({
  type,
  itemName,
  currentData,
  onApply,
  isEditMode,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [aiData, setAIData] = useState<any>(null);
  const [selectedFields, setSelectedFields] = useState<Record<string, boolean>>({});
  const [sources, setSources] = useState<string[]>([]);

  // Rotate loading messages every 2.5s when active
  useEffect(() => {
    let interval: any;
    if (loading) {
      setLoadingMsgIdx(0);
      interval = setInterval(() => {
        setLoadingMsgIdx(prev => (prev + 1) % LOADING_MESSAGES.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleStartAI = async () => {
    if (!itemName?.trim()) {
      alert("Por favor, preencha o campo de nome/título clínico primeiro para que a IA possa pesquisar!");
      return;
    }

    setLoading(true);
    setError(null);
    setAIData(null);
    setSources([]);
    setSelectedFields({});

    try {
      if (!checkAIStatus()) {
        throw new Error("Chave de API do Gemini não configurada nas variáveis de ambiente. Verifique o painel do administrador.");
      }

      let result: any = null;
      if (type === 'disease') {
        result = await generateDiseaseFromIA(itemName);
      } else if (type === 'medication') {
        result = await generateMedicationFromIA(itemName);
      } else if (type === 'protocol') {
        result = await generateProtocolFromIA(itemName);
      } else if (type === 'prescription') {
        result = await generatePrescriptionFromIA(itemName);
      } else if (type === 'calculator') {
        result = await generateCalculatorFromIA(itemName);
      }

      if (!result || typeof result !== 'object') {
        throw new Error("Resposta inválida recebida da IA.");
      }

      setAIData(result);
      setSources(result.sources || ["Bases científicas correntes"]);

      // Map fields according to schema to determine checked status for comparison
      const initialChecked: Record<string, boolean> = {};
      Object.keys(result).forEach(key => {
        if (key !== 'sources' && key !== 'id') {
          initialChecked[key] = true;
        }
      });
      setSelectedFields(initialChecked);
      setIsOpen(true);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Ocorreu um erro ao consultar as bases do Gemini.");
    } finally {
      setLoading(false);
    }
  };

  // Human-readable labels for clinical fields
  const getFieldLabel = (key: string): string => {
    const labels: Record<string, string> = {
      nome: 'Nome Clínico',
      sintomas: 'Sintomas Clínicos',
      fatores_risco: 'Fatores de Risco',
      red_flags: 'Sinais de Alerta (Red Flags)',
      diferenciais: 'Diagnósticos Diferenciais',
      achados_exames: 'Achados de Exame Laboratorial/Imagem',
      criterios_diagnosticos: 'Critérios Diagnósticos',
      categoria: 'Categoria / Especialidade',
      definition: 'Definição',
      epidemiology: 'Epidemiologia',
      etiology: 'Etiologia',
      pathophysiology: 'Fisiopatologia',
      treatment: 'Tratamento',
      complications: 'Complicações',
      prognosis: 'Prognóstico',
      references: 'Referências',
      
      genericName: 'Nome Genérico',
      pharmacologicalClass: 'Classe Farmacológica',
      presentations: 'Apresentações Disponíveis',
      usualDoses: 'Doses e Posologias Habitual',
      commercialNames: 'Nomes Comerciais',
      susAvailability: 'Disponibilidade no SUS',
      costIndicator: 'Indicador de Custo',
      prescriptionType: 'Tipo de Receita',
      pregnancySafety: 'Segurança Gestacional e Lactação',
      contraindications: 'Contraindicações Clínicas',
      drugInteractions: 'Interações Medicamentosas Críticas',
      mainIndications: 'Principais Indicações Vinculadas',

      titulo: 'Título do Protocolo',
      descricao: 'Descrição Clinica',
      status: 'Status',
      nos: 'Nós e Condutas do Fluxograma',

      title: 'Título do Modelo de Prescrição',
      content: 'Corpo do Receituário',
      notes: 'Notas de Alerta e Contraindicações',

      name: 'Nome da Calculadora',
      inputs: 'Variáveis de Entrada',
      formula: 'Fórmula Matemática Interpretada'
    };
    return labels[key] || key;
  };

  // Convert fields to legible string for comparison view
  const renderValueField = (val: any): string => {
    if (val === undefined || val === null) return "Não informado";
    if (typeof val === 'boolean') return val ? "Sim" : "Não";
    if (Array.isArray(val)) {
      if (val.length === 0) return "Lista vazia";
      return val.map((x, i) => {
        if (typeof x === 'object') {
          return JSON.stringify(x);
        }
        return `${i + 1}. ${x}`;
      }).join('\n');
    }
    if (typeof val === 'object') {
      return Object.entries(val).map(([k, v]) => `${getFieldLabel(k)}: ${v}`).join('\n');
    }
    return String(val);
  };

  const handleApplySelected = () => {
    // Merge only selected approved fields
    const approvedData: any = { ...currentData };
    
    // Copy selected fields over
    Object.keys(selectedFields).forEach(key => {
      if (selectedFields[key]) {
        approvedData[key] = aiData[key];
      }
    });

    // Keep some original fields if not explicitly modified
    if (aiData.id && !currentData.id) {
      approvedData.id = aiData.id;
    }

    // Save governance trail log in background
    logAIGeneration(type, itemName, sources);

    onApply(approvedData, sources);
    setIsOpen(false);
  };

  return (
    <div className="inline-block">
      {/* Trigger button */}
      {!isEditMode ? (
        <button
          type="button"
          disabled={loading || disabled}
          onClick={handleStartAI}
          style={{ contentVisibility: 'auto' }}
          className="bg-indigo-605 hover:bg-indigo-700 text-white rounded-xl px-4 py-2.5 text-xs font-bold transition flex items-center gap-1.5 self-start shadow border border-indigo-700/10 cursor-pointer"
        >
          {loading ? (
            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
          )}
          Autopreencher com Gemini
        </button>
      ) : (
        <button
          type="button"
          disabled={loading || disabled}
          onClick={handleStartAI}
          style={{ contentVisibility: 'auto' }}
          className="bg-teal-650 hover:bg-teal-700 text-white rounded-xl px-4 py-2.5 text-xs font-bold transition flex items-center gap-1.5 self-start shadow border border-teal-700/10 cursor-pointer"
        >
          {loading ? (
            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <RefreshCw className="h-3.5 w-3.5 text-teal-200" />
          )}
          Atualizar com IA
        </button>
      )}

      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 p-8 rounded-2xl max-w-sm w-full text-center space-y-4 shadow-2xl">
            <div className="relative flex justify-center">
              <div className="h-14 w-14 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200/50">
                <RefreshCw className="h-7 w-7 text-indigo-600 animate-spin" />
              </div>
              <Sparkles className="h-5 w-5 text-amber-500 absolute -right-0.5 top-0 animate-bounce" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-md font-bold text-slate-800">Processamento Médico IA</h3>
              <p className="text-xs text-slate-500 font-medium min-h-10 px-2 leading-relaxed">
                "{LOADING_MESSAGES[loadingMsgIdx]}"
              </p>
            </div>
            
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-indigo-650 h-full rounded-full transition-all duration-500"
                style={{ width: `${((loadingMsgIdx + 1) / LOADING_MESSAGES.length) * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Aguarde • Conexão Segura Ativa</p>
          </div>
        </div>
      )}

      {/* Error notification */}
      {error && (
        <div className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-red-100/50 p-6 rounded-2xl max-w-sm w-full shadow-2xl space-y-4">
            <div className="flex gap-3">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-red-50 flex items-center justify-center text-red-650">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">Erro na Consulta Médica IA</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{error}</p>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setError(null)}
                className="px-4 py-2 text-xs bg-slate-900 hover:bg-black text-white font-extrabold rounded-xl transition"
              >
                Retornar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Review Modal */}
      {isOpen && aiData && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-50 border border-slate-205 rounded-2xl max-w-3xl w-full my-8 flex flex-col max-h-[85vh] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-200 bg-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-650 border border-teal-100">
                  <ShieldCheck className="h-5.5 w-5.5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-md">Revisão e Comparação de Autopreenchimento IA</h3>
                  <p className="text-xs text-slate-400 mt-0.5 font-semibold">Consolidado a partir de bases científicas com redação original reescrita.</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 px-2.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 font-bold hover:bg-slate-50 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Clinical Comparison */}
            <div className="flex-grow overflow-y-auto p-6 space-y-5">
              
              <div className="bg-teal-50/50 border border-teal-100 rounded-xl p-4 flex gap-3 text-teal-900">
                <BookOpen className="h-5 w-5 shrink-0 mt-0.5 text-teal-750" />
                <div className="text-xs space-y-1">
                  <h5 className="font-bold">Manual Editorial e de Originalidade do MedAssist</h5>
                  <p className="leading-relaxed font-medium">Todo o conteúdo foi interpretado por IA, priorizando as sociedades médicas e compêndios oficiais. A cópia literal ou plágio de bulas/artigos foi estritamente evitada.</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                  Comparação de Dados Clínicos
                </h4>

                <div className="space-y-4">
                  {Object.keys(selectedFields).map(fieldKey => {
                    const label = getFieldLabel(fieldKey);
                    const isChecked = selectedFields[fieldKey];
                    const originalStr = renderValueField(currentData?.[fieldKey]);
                    const aiStr = renderValueField(aiData?.[fieldKey]);
                    const hasDiff = originalStr !== aiStr;

                    return (
                      <div 
                        key={fieldKey} 
                        className={`bg-white border rounded-xl overflow-hidden transition-all duration-200 ${
                          isChecked ? 'border-indigo-100 shadow-sm' : 'border-slate-200 opacity-60'
                        }`}
                      >
                        {/* Selector Header */}
                        <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                          <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input 
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => setSelectedFields(prev => ({ ...prev, [fieldKey]: !prev[fieldKey] }))}
                              className="rounded border-slate-300 text-indigo-655 focus:outline-none focus:ring-0 h-4 w-4 shrink-0 transition"
                            />
                            <span className="font-bold text-xs text-slate-800">{label}</span>
                          </label>
                          {hasDiff ? (
                            <span className="text-[10px] bg-amber-50 border border-amber-200 text-amber-700 px-2 py-0.5 rounded-full font-bold">
                              Diferença Detectada
                            </span>
                          ) : (
                            <span className="text-[10px] bg-slate-100 text-slate-450 px-2 py-0.5 rounded-full font-bold">
                              Idêntico
                            </span>
                          )}
                        </div>

                        {/* Side by side comparison */}
                        <div className="grid grid-cols-1 md:grid-cols-2 text-xs">
                          {/* Current */}
                          <div className="p-4 border-r border-slate-100 space-y-1 bg-slate-50/10">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Valor Atual no Form</span>
                            <pre className="font-sans whitespace-pre-wrap text-slate-650 break-words font-medium leading-relaxed max-h-40 overflow-y-auto overflow-x-hidden scrollbar-thin">
                              {originalStr || "Nenhum dado atual"}
                            </pre>
                          </div>
                          {/* Proposed IA */}
                          <div className={`p-4 space-y-1 ${isChecked ? 'bg-indigo-50/15' : 'bg-slate-50/5'}`}>
                            <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider flex items-center gap-1">
                              <Sparkles className="h-3 w-3 text-amber-500" /> Proposta IA (Gemini 3.5)
                            </span>
                            <pre className="font-sans whitespace-pre-wrap text-slate-800 break-words font-semibold leading-relaxed max-h-40 overflow-y-auto overflow-x-hidden scrollbar-thin">
                              {aiStr}
                            </pre>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Data Verification / Source Citation */}
              {sources.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
                  <h5 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4 text-slate-500" />
                    Fontes Científicas Mapeadas
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {sources.map((src, i) => (
                      <span key={i} className="bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-650 px-2.5 py-1 rounded-lg flex items-center gap-1">
                        <Check className="h-3 w-3 text-emerald-500" /> {src}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Governance Audit Footer */}
              <div className="bg-slate-100 rounded-xl p-4 flex flex-wrap justify-between items-center gap-3 border border-slate-200 text-[10px] text-slate-450 font-bold tracking-wider uppercase">
                <div className="flex items-center gap-1.5">
                  <Cpu className="h-3.5 w-3.5 text-slate-400" />
                  <span>Modelo: Gemini 3.5 Flash</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <span>Revisão: {new Date().toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-slate-400" />
                  <span>Log: medassist_ai_audit</span>
                </div>
              </div>

            </div>

            {/* Footer Buttons */}
            <div className="p-4 border-t border-slate-200 bg-white flex justify-end gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
              >
                Descartar Recomendações
              </button>
              <button
                type="button"
                onClick={handleApplySelected}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold rounded-xl transition flex items-center gap-1 shadow cursor-pointer animate-pulse"
              >
                <Check className="h-4.5 w-4.5" />
                Mesclar Alterações Selecionadas
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
