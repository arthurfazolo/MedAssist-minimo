import React from 'react';

type BadgeVariant = 'medical' | 'success' | 'warning' | 'danger' |
                   'info' | 'neutral' | 'accent';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  medical:  'bg-medical-50 text-medical-700 ring-medical-600/20',
  success:  'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  warning:  'bg-amber-50 text-amber-700 ring-amber-600/20',
  danger:   'bg-red-50 text-red-700 ring-red-600/20',
  info:     'bg-sky-50 text-sky-700 ring-sky-600/20',
  neutral:  'bg-slate-100 text-slate-600 ring-slate-500/20',
  accent:   'bg-accent-50 text-accent-600 ring-accent-500/20',
};

const dotStyles: Record<BadgeVariant, string> = {
  medical:  'bg-medical-500',
  success:  'bg-emerald-500',
  warning:  'bg-amber-500',
  danger:   'bg-red-500',
  info:     'bg-sky-500',
  neutral:  'bg-slate-400',
  accent:   'bg-accent-500',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  children,
  dot = false,
  className = ''
}) => {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5
                      rounded-md text-xs font-semibold ring-1 ring-inset
                      ${variantStyles[variant]} ${className}`}>
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0
                          ${dotStyles[variant]}`} />
      )}
      {children}
    </span>
  );
};
