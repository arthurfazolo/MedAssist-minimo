import React from 'react';
import { UniversalBlock, Protocolo } from '../types';
import { 
  Type, AlertTriangle, CheckSquare, Calculator, Layers, Grid, Image, Link as LinkIcon, 
  FileText, Activity, Compass, Info, Check, Square, CheckSquare as CheckSquareIcon, ShieldAlert, ChevronRight
} from 'lucide-react';
import { EmbeddedCalculator } from './EmbeddedCalculator';

interface UniversalBlockViewerProps {
  blocks: UniversalBlock[];
  checkedState: Record<string, boolean>;
  onToggleCheck: (key: string) => void;
  recordValues: Record<string, string>;
  onRecordChange: (key: string, value: string) => void;
  // Calculadora helpers:
  calculatorStates?: Record<string, { inputs: Record<string, any>; result: any }>;
  onSaveCalculatorResult?: (blockId: string, inputs: Record<string, any>, result: any) => void;
  onNavigateCalculator?: (nextNodeId: string) => void;
  availableProtocols?: Protocolo[];
  onOpenProtocol?: (protocolId: string) => void;
}

export const UniversalBlockViewer: React.FC<UniversalBlockViewerProps> = ({
  blocks = [],
  checkedState,
  onToggleCheck,
  recordValues,
  onRecordChange,
  calculatorStates = {},
  onSaveCalculatorResult,
  onNavigateCalculator,
  availableProtocols = [],
  onOpenProtocol
}) => {
  if (blocks.length === 0) {
    return (
      <div className="p-6 text-center border border-dashed border-slate-205 rounded-xl bg-slate-50/50 dark:bg-slate-900/10 dark:border-slate-800">
        <p className="text-xs text-slate-500 font-medium">Esta consulta está vazia de blocos de conteúdos clínicos.</p>
      </div>
    );
  }

  const getSeverityStyles = (severity?: string) => {
    switch (severity) {
      case 'red':
        return 'bg-red-50/70 border-red-250 text-red-900 dark:bg-red-950/20 dark:border-red-900/50';
      case 'yellow':
        return 'bg-amber-50/70 border-amber-250 text-amber-900 dark:bg-amber-950/20 dark:border-amber-900/50';
      case 'info':
      default:
        return 'bg-sky-50/70 border-sky-250 text-sky-900 dark:bg-sky-950/20 dark:border-sky-900/50';
    }
  };

  const getSeverityBadgeClass = (severity?: string) => {
    switch (severity) {
      case 'red': return 'bg-red-100 text-red-800 border-red-300';
      case 'yellow': return 'bg-amber-100 text-amber-850 border-amber-300';
      default: return 'bg-sky-100 text-sky-850 border-sky-305';
    }
  };

  return (
    <div className="space-y-6">
      {blocks.map((block) => {
        return (
          <div key={block.id} className="transition-all duration-200">
            {/* 1. TEXT MODULE */}
            {block.tipo === 'texto' && (
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 text-left dark:bg-slate-910/40 dark:border-slate-800">
                {block.titulo && (
                  <h4 className="text-sm font-extrabold text-slate-800 mb-2.5 flex items-center gap-2 dark:text-slate-200">
                    <span className="w-1.5 h-3.5 bg-indigo-500 rounded" />
                    {block.titulo}
                  </h4>
                )}
                <p className="text-xs text-slate-650 leading-relaxed font-medium whitespace-pre-wrap dark:text-slate-350">
                  {block.conteudo}
                </p>
              </div>
            )}

            {/* 2. HIGHLIGHT / DESTAQUE MODULE */}
            {block.tipo === 'destaque' && (
              <div className={`border-l-4 rounded-r-2xl rounded-l p-4 text-left shadow-sm flex items-start gap-3.5 ${getSeverityStyles(block.gravidade)}`}>
                <AlertTriangle className={`h-5 w-5 shrink-0 mt-0.5 ${block.gravidade === 'red' ? 'text-red-650' : block.gravidade === 'yellow' ? 'text-amber-655' : 'text-sky-650'}`} />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest">{block.titulo || (block.gravidade === 'red' ? 'CRÍTICO / ALERTA' : block.gravidade === 'yellow' ? 'ATENÇÃO' : 'INFORMAÇÃO')}</span>
                  </div>
                  <p className="text-xs font-bold leading-relaxed">{block.conteudo}</p>
                </div>
              </div>
            )}

            {/* 3. CHECKLIST MODULE */}
            {block.tipo === 'checklist' && (
              <div className="bg-white border border-slate-200 rounded-2xl p-5 text-left dark:bg-slate-850 dark:border-slate-750">
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                  <span className="h-1.5 w-1.5 bg-sky-500 rounded-full" />
                  {block.titulo || 'Checklist de Verificação'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(block.itens || []).map((itemStr, itemIdx) => {
                    const key = `${block.id}_item_${itemIdx}`;
                    const isChecked = !!checkedState[key];
                    return (
                      <div 
                        key={itemIdx}
                        onClick={() => onToggleCheck(key)}
                        className={`p-3 border rounded-xl flex gap-3 items-start cursor-pointer select-none transition-all ${
                          isChecked 
                            ? 'bg-emerald-50/70 border-emerald-250 text-emerald-950 dark:bg-emerald-950/20 dark:border-emerald-900/50' 
                            : 'bg-slate-50/50 border-slate-200/80 hover:bg-slate-50 text-slate-700 dark:bg-slate-900/50 dark:border-slate-800'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isChecked ? (
                            <CheckSquareIcon className="h-4 w-4 text-emerald-650" />
                          ) : (
                            <Square className="h-4 w-4 text-slate-400" />
                          )}
                        </div>
                        <span className="text-xs font-bold leading-relaxed">{itemStr}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 4. CLINICAL CALCULATOR EMBED MODULE */}
            {block.tipo === 'calculadora' && block.calculadoraId && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left dark:bg-slate-900/40 dark:border-slate-800">
                <h4 className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                  <Calculator className="h-4 w-4 text-indigo-500" />
                  {block.titulo || 'Calculadora Clínica Integrada'}
                </h4>
                <EmbeddedCalculator
                  node={{
                    id: block.id,
                    titulo: block.titulo || 'Cálculo',
                    tipo: 'calculadora',
                    calculadoraId: block.calculadoraId,
                    proximo: ''
                  }}
                  savedState={calculatorStates[block.id]}
                  onSaveResult={(nodeId, inputs, result) => {
                    if (onSaveCalculatorResult) onSaveCalculatorResult(block.id, inputs, result);
                  }}
                  onNavigate={(nextNodeId) => {
                    if (onNavigateCalculator) onNavigateCalculator(nextNodeId);
                  }}
                />
              </div>
            )}

            {/* 5. TABELA DE COMPONENTES */}
            {block.tipo === 'tabela' && (
              <div className="bg-white border border-slate-200 rounded-2xl p-5 text-left dark:bg-slate-850 dark:border-slate-750 overflow-x-auto">
                {block.titulo && (
                  <h4 className="text-xs font-extrabold text-purple-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                    <Grid className="h-4 w-4 text-purple-500" />
                    {block.titulo}
                  </h4>
                )}
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30">
                      {(block.headers || []).map((h, hIdx) => (
                        <th key={hIdx} className="p-3 text-[10px] font-bold text-slate-600 uppercase tracking-wider dark:text-slate-400">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(block.rows || []).map((row, rIdx) => (
                      <tr key={rIdx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/30 dark:border-slate-800">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-3 text-xs font-bold text-slate-800 dark:text-slate-350">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* 6. IMAGEM SUPORTE */}
            {block.tipo === 'imagem' && block.url && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center dark:bg-slate-900/40 dark:border-slate-800">
                {block.titulo && (
                  <h4 className="text-xs font-extrabold text-rose-400 uppercase tracking-widest flex items-center gap-2 mb-3 text-left">
                    <Image className="h-4 w-4 text-rose-500" />
                    {block.titulo}
                  </h4>
                )}
                <div className="inline-block bg-white border border-slate-150 p-2.5 rounded-xl dark:bg-slate-800 dark:border-slate-700">
                  <img 
                    src={block.url} 
                    alt={block.legenda || block.titulo} 
                    className="max-h-60 mx-auto object-contain rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                  {block.legenda && (
                    <p className="text-[10px] font-semibold text-slate-400 mt-2 italic">{block.legenda}</p>
                  )}
                </div>
              </div>
            )}

            {/* 7. LINK EXTERNO */}
            {block.tipo === 'link' && block.linkUrl && (
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left flex justify-between items-center dark:bg-slate-900/40 dark:border-slate-850">
                <div className="flex gap-3 items-center">
                  <div className="p-2 bg-indigo-50 border border-indigo-150 rounded-xl text-indigo-650 flex items-center justify-center shrink-0">
                    <LinkIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-250 truncate max-w-sm">{block.titulo || 'Referência Externa'}</h5>
                    <p className="text-[10px] text-slate-400 truncate max-w-sm">{block.linkUrl}</p>
                  </div>
                </div>
                <a 
                  href={block.linkUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-indigo-650 hover:bg-indigo-755 text-white font-bold text-xs rounded-xl flex items-center gap-1 transition-colors shrink-0"
                >
                  {block.linkLabel || 'Acessar Diretriz'}
                  <ChevronRight className="h-3 w-3" />
                </a>
              </div>
            )}

            {/* 8. REGISTRO MÉDICO DESCRITIVO */}
            {block.tipo === 'registro' && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left dark:bg-slate-900/40 dark:border-slate-800">
                <h4 className="text-xs font-extrabold text-violet-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                  <FileText className="h-4 w-4 text-violet-500" />
                  {block.titulo || 'Campo de Registro Clínico'}
                </h4>
                {block.multiline ? (
                  <textarea
                    rows={3}
                    placeholder={block.placeholder || 'Digite as observações do paciente...'}
                    value={recordValues[block.id] || ''}
                    onChange={e => onRecordChange(block.id, e.target.value)}
                    className="w-full text-xs font-semibold p-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-slate-800 placeholder-slate-400 dark:bg-slate-805 dark:border-slate-750 dark:text-slate-300"
                  />
                ) : (
                  <input
                    type="text"
                    placeholder={block.placeholder || 'Digite o dado clínico...'}
                    value={recordValues[block.id] || ''}
                    onChange={e => onRecordChange(block.id, e.target.value)}
                    className="w-full text-xs font-semibold p-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-slate-800 placeholder-slate-400 dark:bg-slate-805 dark:border-slate-755 dark:text-slate-300"
                  />
                )}
              </div>
            )}

            {/* 9. SUB-PROTOCOLO EMBUTIDO */}
            {block.tipo === 'protocolo' && block.protocoloId && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left flex justify-between items-center dark:bg-slate-900/40 dark:border-slate-850">
                <div className="flex gap-3 items-center">
                  <div className="p-2 bg-teal-50 border border-teal-150 rounded-xl text-teal-650 flex items-center justify-center shrink-0">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-850 dark:text-slate-200">{block.titulo || 'Protocolo Associado'}</h5>
                    <p className="text-[10px] text-slate-405">Complemento estratégico navegável.</p>
                  </div>
                </div>
                {onOpenProtocol && (
                  <button 
                    onClick={() => onOpenProtocol(block.protocoloId!)}
                    className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl flex items-center gap-1 transition-colors shadow-sm cursor-pointer"
                  >
                    Abrir Protocolo Auxiliar
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            )}

            {/* 10. FLUXOGRAMA LOCAL */}
            {block.tipo === 'fluxograma' && (
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left dark:bg-slate-900/40 dark:border-slate-850">
                <h4 className="text-xs font-extrabold text-sky-400 uppercase tracking-widest flex items-center gap-2 mb-2.5">
                  <Layers className="h-4 w-4 text-sky-500" />
                  {block.titulo || 'Passo a Passo Estruturado'}
                </h4>
                <div className="p-3 bg-white border border-slate-150 rounded-xl text-xs font-extrabold text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-350">
                  {block.conteudo}
                </div>
              </div>
            )}

            {/* 11. REUTILIZAVEL */}
            {block.tipo === 'reutilizavel' && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left dark:bg-slate-900/40 dark:border-slate-800">
                <h4 className="text-xs font-extrabold text-blue-400 uppercase tracking-widest flex items-center gap-2 mb-2.5">
                  <Compass className="h-4 w-4 text-blue-500" />
                  {block.titulo || 'Componente Clínico Especializado'}
                </h4>
                <div className="p-3 bg-white border border-slate-150 rounded-xl text-xs font-bold text-slate-655 italic dark:bg-slate-800">
                  Dispositivo do sistema: {block.conteudo || 'padrão'}
                </div>
              </div>
            )}

          </div>
        );
      })}
    </div>
  );
};
