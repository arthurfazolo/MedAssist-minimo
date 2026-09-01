import React, { useState, useEffect } from 'react';
import { ProtocoloNo, CalculatorInput, CalculatorResult } from '../types';
import { getCalculatorById } from '../services/calculatorService';
import { Calculator, ArrowRight, Check, AlertTriangle, Info, ShieldAlert } from 'lucide-react';

interface EmbeddedCalculatorProps {
  node: ProtocoloNo;
  savedState?: { inputs: Record<string, any>; result: any };
  onSaveResult: (nodeId: string, inputs: Record<string, any>, result: any) => void;
  onNavigate: (nextNodeId: string, choiceMade?: { label: string; fromNodeId: string }) => void;
}

// Sandbox expression evaluator for conditions and custom formula math
export const evaluateConditionInScope = (expression: string, inputs: Record<string, any>, resultVal: any): boolean => {
  try {
    // Sanitize and replace user-friendly logical words 'ou' and 'e'
    let expr = expression
      .replace(/\bou\b/gi, '||')
      .replace(/\be\b/gi, '&&');

    // Create sandbox scope
    const scope: Record<string, any> = {
      ...inputs,
      result: resultVal,
      value: resultVal,
      // Common dengue groups & select constants for convenience
      A: 'A',
      B: 'B',
      C: 'C',
      D: 'D',
      masculino: 'masculino',
      feminino: 'feminino'
    };

    const keys = Object.keys(scope);
    const vals = keys.map(k => scope[k]);

    const fn = new Function(...keys, `return (${expr});`);
    return !!fn(...vals);
  } catch (err) {
    console.error(`Erro ao avaliar condicao "${expression}":`, err);
    return false;
  }
};

export const EmbeddedCalculator: React.FC<EmbeddedCalculatorProps> = ({
  node,
  savedState,
  onSaveResult,
  onNavigate
}) => {
  // Find predefined calculator definitions
  const prebuiltCalc = getCalculatorById(node.calculadoraId || '');

  // Fallback to custom config input schema if no prebuilt calculator is found
  const inputsSchema: CalculatorInput[] = prebuiltCalc
    ? prebuiltCalc.inputs
    : node.calculadoraConfig?.inputs || [];

  // Initialize input state
  const [inputs, setInputs] = useState<Record<string, any>>(() => {
    if (savedState?.inputs) return savedState.inputs;

    const initial: Record<string, any> = {};
    inputsSchema.forEach(inp => {
      initial[inp.id] = inp.defaultValue !== undefined ? inp.defaultValue : (inp.type === 'boolean' ? false : '');
    });
    return initial;
  });

  const [result, setResult] = useState<any>(savedState?.result || null);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(!!savedState);

  // Handle changing input values
  const handleInputChange = (id: string, value: any) => {
    setInputs(prev => ({
      ...prev,
      [id]: value
    }));
    setSavedSuccess(false); // Reset confirmation state since inputs changed
  };

  // Recalculate in real-time when inputs change
  useEffect(() => {
    if (inputsSchema.length === 0) return;

    if (prebuiltCalc) {
      // Prebuilt calculations
      const res = prebuiltCalc.calculate(inputs);
      setResult(res);
    } else if (node.calculadoraConfig?.formula) {
      // Custom mathematical equations evaluation
      try {
        const formulaStr = node.calculadoraConfig.formula;
        const keys = Object.keys(inputs);
        const vals = keys.map(k => {
          const val = parseFloat(inputs[k]);
          return isNaN(val) ? inputs[k] : val;
        });

        const fn = new Function(...keys, `return (${formulaStr});`);
        const val = fn(...vals);

        const customRes: CalculatorResult = {
          value: typeof val === 'number' ? Math.round(val * 100) / 100 : val,
          unit: 'Resultado',
          interpretation: 'Cálculo de fórmula personalizada concluído.',
          recommendation: 'Ajuste as condutas adicionais do paciente conforme julgamento clínico do especialista.',
          severity: 'low'
        };
        setResult(customRes);
      } catch (err) {
        setResult({
          value: 'Erro',
          interpretation: 'Fórmula incompleta ou incorreta.',
          recommendation: 'Verifique se todos os campos numéricos foram preenchidos.',
          severity: 'medium'
        });
      }
    }
  }, [inputs, prebuiltCalc, node.calculadoraConfig]);

  // Action upon submitting/confirming the calculation
  const handleUseResult = () => {
    // 1. Record the result persistently in the clinical walkthrough summary
    onSaveResult(node.id, inputs, result);
    setSavedSuccess(true);

    // 2. Resolve navigation flow mapping: conditional vs linear sequence
    if (node.condicoes && node.condicoes.length > 0) {
      // Conditional branching based on calculator values
      for (const cond of node.condicoes) {
        if (evaluateConditionInScope(cond.se, inputs, result?.value)) {
          onNavigate(cond.proximo, {
            label: `Resultado: ${result?.value} (${cond.se})`,
            fromNodeId: node.id
          });
          return;
        }
      }
    }

    // Fallback to sequential linear path if no conditions matched or if linear sequential mode
    if (node.proximo) {
      onNavigate(node.proximo, {
        label: `Resultado Calculado: ${result?.value} ${result?.unit || ''}`,
        fromNodeId: node.id
      });
    }
  };

  // Get color indicators according to severity of the resultado
  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'bg-red-50 border-red-200 text-red-900',
          badge: 'bg-red-100 text-red-800 border-red-300',
          title: 'text-red-800',
          bullet: 'bg-red-500'
        };
      case 'high':
        return {
          bg: 'bg-orange-50 border-orange-200 text-orange-900',
          badge: 'bg-orange-100 text-orange-800 border-orange-300',
          title: 'text-orange-850',
          bullet: 'bg-orange-500'
        };
      case 'medium':
        return {
          bg: 'bg-amber-50 border-amber-200 text-amber-900',
          badge: 'bg-amber-100 text-amber-800 border-amber-300',
          title: 'text-amber-800',
          bullet: 'bg-amber-500'
        };
      default:
        return {
          bg: 'bg-sky-50 border-sky-150 text-sky-950',
          badge: 'bg-sky-100 text-sky-850 border-sky-200',
          title: 'text-sky-900',
          bullet: 'bg-sky-500'
        };
    }
  };

  const colors = getSeverityStyles(result?.severity || 'low');

  return (
    <div className="mt-5 space-y-6 bg-slate-50/50 p-5 rounded-2xl border border-slate-150">
      <div className="flex items-center gap-2 mb-2 text-slate-700">
        <Calculator className="h-5 w-5 text-sky-600" />
        <span className="font-semibold text-sm uppercase tracking-wider text-slate-600">Calculadora inline ativa</span>
      </div>

      {/* INPUTS RENDERING CELL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {inputsSchema.map((input) => {
          return (
            <div key={input.id} className="space-y-1.5 flex flex-col items-start w-full">
              <label className="text-xs font-bold text-gray-700 flex items-center justify-start text-left">
                {input.label}
                {input.unit && (
                  <span className="text-gray-400 font-normal ml-1">({input.unit})</span>
                )}
              </label>

              {input.type === 'select' ? (
                <select
                  value={inputs[input.id]}
                  onChange={(e) => handleInputChange(input.id, e.target.value)}
                  className="w-full h-11 px-3 py-2 rounded-xl border border-gray-200 bg-white text-slate-800 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all shadow-sm"
                >
                  {input.options?.map((opt, oIdx) => (
                    <option key={oIdx} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : input.type === 'boolean' ? (
                <div
                  onClick={() => handleInputChange(input.id, !inputs[input.id])}
                  className={`w-full h-11 px-4 rounded-xl border cursor-pointer border-gray-200 flex items-center justify-between text-sm transition-all ${
                    inputs[input.id]
                      ? 'bg-sky-50/20 border-sky-500 text-sky-950 font-semibold'
                      : 'bg-white hover:border-gray-350 text-gray-700'
                  }`}
                >
                  <span className="text-left select-none">{input.label}</span>
                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                    inputs[input.id] ? 'bg-sky-600 border-sky-600 text-white' : 'border-gray-300'
                  }`}>
                    {inputs[input.id] && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                </div>
              ) : (
                <input
                  type="number"
                  min={input.min}
                  max={input.max}
                  step={input.step || 'any'}
                  placeholder={`Ex: ${input.defaultValue || ''}`}
                  value={inputs[input.id]}
                  onChange={(e) => {
                    const parsed = parseFloat(e.target.value);
                    handleInputChange(input.id, isNaN(parsed) ? '' : parsed);
                  }}
                  className="w-full h-11 px-3 py-2 rounded-xl border border-gray-200 bg-white text-slate-800 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all shadow-sm"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* RESULTS CALCULATION PANEL */}
      {result && (
        <div className={`p-5 rounded-2xl border transition-all ${colors.bg}`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className={`inline-block border px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide mb-2 ${colors.badge}`}>
                {result.severity} risco
              </span>
              <p className={`text-base font-bold flex items-center gap-1.5 justify-start text-left ${colors.title}`}>
                <span className={`w-2 h-2 rounded-full ${colors.bullet}`} />
                {result.interpretation}
              </p>
            </div>

            <div className="text-left sm:text-right flex-shrink-0">
              <span className="text-xs text-slate-400 font-medium block">Valor Estimado</span>
              <div className="flex items-baseline gap-1 justify-start sm:justify-end">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {result.value}
                </span>
                {result.unit && (
                  <span className="text-sm text-slate-500 font-bold ml-0.5">{result.unit}</span>
                )}
              </div>
            </div>
          </div>

          {/* Dengue Specific parameters presentation */}
          {prebuiltCalc?.id === 'dengue' && (
            <div className="mt-4 pt-3 border-t border-dashed border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="text-left bg-white/60 p-2.5 rounded-xl border border-slate-200/50">
                <span className="font-bold text-slate-500 block mb-0.5">Via Recomendada</span>
                <span className="font-semibold text-slate-800">{result.route || 'Oral'}</span>
              </div>
              <div className="text-left bg-white/60 p-2.5 rounded-xl border border-slate-200/50">
                <span className="font-bold text-slate-500 block mb-0.5">Velocidade de Infusão</span>
                <span className="font-semibold text-slate-800">{result.infusionRate || 'Orientação fracionada'}</span>
              </div>
            </div>
          )}

          {result.recommendation && (
            <div className="mt-4 pt-4 border-t border-slate-200/45 text-left text-xs text-slate-800">
              <div className="flex gap-2 items-start bg-white/90 p-3.5 rounded-xl border border-slate-100">
                <ShieldAlert className="h-5 w-5 text-sky-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-slate-900 mb-1">Recomendação Assistencial</span>
                  <span className="leading-relaxed">{result.recommendation}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* FOOTER CONFIRMATION INTERFACES */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={handleUseResult}
          className="bg-sky-600 hover:bg-sky-700 text-white font-bold h-11 px-5 rounded-xl shadow-sm hover:shadow transition-all text-sm flex items-center gap-2 group cursor-pointer"
        >
          {savedSuccess ? (
            <>
              <Check className="h-4 w-4 stroke-[3]" />
              Resultado Utilizado
            </>
          ) : (
            <>
              Usar este resultado e avançar
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
