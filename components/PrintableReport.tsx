import React from 'react';
import { Protocolo } from '../types';

interface PrintableReportProps {
  protocol: Protocolo | null;
  pathTaken: string[];
  checklistState: Record<string, boolean>;
  noteState: Record<string, string>;
  choicesState: Record<string, { label: string; to: string }>;
  calculatorState?: Record<string, { inputs: Record<string, any>; result: any }>;
}

export const PrintableReport = React.forwardRef<HTMLDivElement, PrintableReportProps>(({
  protocol,
  pathTaken,
  checklistState,
  noteState,
  choicesState,
  calculatorState = {},
}, ref) => {
  if (!protocol) return null;

  return (
    <div
      ref={ref}
      className="p-8 bg-white text-gray-900 font-sans max-w-3xl mx-auto print:p-6 print:text-xs"
      style={{
        fontFamily: '"Inter", sans-serif',
      }}
    >
      {/* Print styles */}
      <style>{`
        @media print {
          body {
            background-color: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Header */}
      <div className="border-b-2 border-medical-600 pb-4 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-medical-800 print:text-xl">MedAssist</h1>
          <p className="text-xs text-gray-500 font-mono">SUPORTE À DECISÃO CLÍNICA</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold">Resumo de Atendimento Clínico</p>
          <p className="text-xs text-gray-500">{new Date().toLocaleString('pt-BR')}</p>
        </div>
      </div>

      {/* Protocol Info */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 print:p-3">
        <h2 className="text-lg font-bold text-gray-800 mb-2 print:text-sm">Protocolo Assistencial</h2>
        <div className="grid grid-cols-2 gap-2 text-sm print:text-xs">
          <div>
            <span className="font-semibold text-gray-600">Título: </span>
            <span className="text-gray-900 font-semibold">{protocol.titulo}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-600">Categoria: </span>
            <span className="text-gray-900">{protocol.categoria}</span>
          </div>
        </div>
      </div>

      {/* Decision Path */}
      <div className="mb-6">
        <h2 className="text-base font-bold text-gray-800 mb-4 border-b pb-1 print:text-xs print:mb-2 text-left">
          Fluxo de Decisões e Condutas Percorrido
        </h2>
        <div className="space-y-4 print:space-y-3 text-left">
          {pathTaken.map((nid, index) => {
            const node = protocol.nos.find(n => n.id === nid);
            if (!node) return null;

            return (
              <div key={nid} className="border-l-2 border-gray-200 pl-4 py-1 relative">
                {/* Visual bullet */}
                <div className="absolute -left-[5px] top-2.5 w-2 h-2 rounded-full bg-medical-500" />
                
                <div className="text-sm print:text-xs">
                  <div className="flex items-center gap-2 mb-1 text-left">
                    <span className="font-bold text-[10px] text-medical-700 bg-medical-50 px-2 py-0.5 rounded-full uppercase">
                      Etapa {index + 1}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400 capitalize">
                      {node.tipo}
                    </span>
                  </div>
                  <p className="text-gray-800 font-medium text-left">{node.texto}</p>

                  {/* Decisions */}
                  {node.tipo === 'decisao' && choicesState[node.id] && (
                    <div className="mt-1.5 flex items-center justify-start gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                      <span className="font-bold">👉 Decisão tomada:</span>
                      <span>{choicesState[node.id].label}</span>
                    </div>
                  )}

                  {/* Checklist Items */}
                  {node.tipo === 'checklist' && node.checklistItems && (
                    <div className="mt-2 bg-slate-50 p-2 rounded border border-slate-100 text-left">
                      <p className="text-xs font-bold text-gray-600 mb-1">✓ Checklist Processado:</p>
                      <ul className="space-y-1">
                        {node.checklistItems.map(item => {
                          const isChecked = !!checklistState[item.id];
                          return (
                            <li key={item.id} className="flex items-center gap-2 text-xs text-gray-700 justify-start">
                              <span className="font-mono font-bold">{isChecked ? '[X]' : '[ ]'}</span>
                              <span className={isChecked ? 'line-through text-gray-400' : ''}>{item.texto}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {/* Calculator Node Results */}
                  {node.tipo === 'calculadora' && calculatorState[node.id] && (
                    <div className="mt-2 bg-sky-50 border border-sky-100 p-3 rounded-lg text-left">
                      <p className="text-xs font-bold text-sky-800 mb-1 flex items-center gap-1 text-left">
                        <span>🧮 Resultado da Calculadora Clínica:</span>
                      </p>
                      <div className="text-xs space-y-1.5 text-gray-700">
                        <div className="text-left">
                          <span className="font-semibold text-gray-600">Inputs fornecidos: </span>
                          <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-gray-200 text-gray-700">
                            {Object.entries(calculatorState[node.id].inputs)
                              .map(([k, v]) => `${k} = ${v}`)
                              .join(', ')}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-1.5 justify-start text-left">
                          <span className="font-semibold text-gray-600">Resultado: </span>
                          <span className="text-sm font-bold text-sky-950 bg-white px-2 py-0.5 rounded border border-sky-200">
                            {calculatorState[node.id].result.value} {calculatorState[node.id].result.unit || ''}
                          </span>
                        </div>
                        {calculatorState[node.id].result.interpretation && (
                          <div className="text-left">
                            <span className="font-semibold text-gray-600">Interpretação: </span>
                            <span className="text-gray-800">{calculatorState[node.id].result.interpretation}</span>
                          </div>
                        )}
                        {calculatorState[node.id].result.recommendation && (
                          <div className="mt-1 bg-white p-2 rounded border border-sky-150 text-[11px] text-sky-950 text-left">
                            <span className="font-bold text-sky-900">Conduta Sugerida: </span>
                            <span className="italic">{calculatorState[node.id].result.recommendation}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Clinical Note */}
                  {noteState[node.id]?.trim() && (
                    <div className="mt-1.5 bg-amber-50/50 border border-amber-100 rounded p-2 text-xs text-left">
                      <span className="font-bold text-amber-800 text-left">✍ Anotação clínica:</span>
                      <p className="text-gray-700 italic mt-0.5 text-left">"{noteState[node.id]}"</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-10 pt-4 border-t border-gray-150 text-[10px] text-gray-400 leading-relaxed text-center">
        <p>Aviso de Confidencialidade e Segurança de Informação de Saúde.</p>
        <p>Este relatório foi gerado eletronicamente como ferramenta de suporte à decisão pelo profissional assistente.</p>
        <p className="font-semibold text-gray-500 mt-1">MedAssist © {new Date().getFullYear()}</p>
      </div>
    </div>
  );
});

PrintableReport.displayName = 'PrintableReport';
