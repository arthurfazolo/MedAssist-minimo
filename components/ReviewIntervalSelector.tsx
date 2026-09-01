import React from 'react';

interface ReviewIntervalSelectorProps {
  value?: number;
  onChange: (val: number | undefined) => void;
  categoryName: string;
  defaultMonths: number;
}

export const ReviewIntervalSelector: React.FC<ReviewIntervalSelectorProps> = ({
  value,
  onChange,
  categoryName,
  defaultMonths
}) => {
  const isCustom = value !== undefined;

  return (
    <div className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 space-y-3 dark:bg-slate-800/20 dark:border-slate-800">
      <div className="text-[11px] font-extrabold uppercase text-slate-400 dark:text-slate-500 tracking-wider">
        Periodicidade de Revisão Clínica ({categoryName})
      </div>
      
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-705 dark:text-slate-300 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={!isCustom}
            onChange={(e) => {
              if (e.target.checked) {
                onChange(undefined);
              } else {
                onChange(defaultMonths);
              }
            }}
            className="rounded border-slate-300 text-medical-600 focus:ring-medical-500 h-4 w-4"
          />
          Usar padrão da categoria ({defaultMonths} meses)
        </label>

        <div className="space-y-2">
          <div className="text-xs font-medium text-slate-500">
            Intervalo personalizado:
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              max={120}
              placeholder={`${defaultMonths}`}
              disabled={!isCustom}
              value={isCustom ? (value ?? '') : ''}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                onChange(isNaN(val) ? undefined : val);
              }}
              className="w-24 px-2.5 py-1.5 text-xs font-bold border border-slate-250 rounded-xl focus:outline-none focus:ring-1 focus:ring-medical-500 disabled:opacity-50 disabled:bg-slate-100 dark:bg-slate-850 dark:border-slate-700 dark:text-white dark:disabled:bg-slate-900"
            />
            <span className="text-xs text-slate-500 font-medium">
              meses
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewIntervalSelector;
