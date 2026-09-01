import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-medical-600 hover:bg-medical-700 text-white shadow-sm hover:shadow',
  secondary:
    'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm',
  destructive:
    'bg-white hover:bg-red-50 text-red-600 hover:text-red-700 border border-red-200',
  ghost:
    'text-slate-500 hover:text-slate-900 hover:bg-slate-100',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm:  'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  md:  'px-4 py-2.5 text-sm rounded-xl gap-2',
  lg:  'px-5 py-3 text-base rounded-xl gap-2',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center font-semibold
                  transition-all duration-150 disabled:opacity-50
                  disabled:cursor-not-allowed
                  ${variantStyles[variant]}
                  ${sizeStyles[size]}
                  ${className}`}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4 shrink-0"
             xmlns="http://www.w3.org/2000/svg" fill="none"
             viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10"
                  stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};
