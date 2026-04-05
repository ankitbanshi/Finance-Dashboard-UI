import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  compact?: boolean;
};

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'border-transparent bg-teal-400 text-slate-950 hover:bg-teal-300',
  secondary: 'border-white/10 bg-white/5 text-white hover:bg-white/10',
  ghost: 'border-white/10 bg-transparent text-slate-200 hover:bg-white/5',
};

export function Button({ children, className = '', variant = 'secondary', compact = false, ...props }: ButtonProps) {
  return (
    <button
      className={`dashboard-button inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition ${compact ? 'px-3 py-2' : ''} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
