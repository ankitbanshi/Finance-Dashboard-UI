import type { PropsWithChildren } from 'react';

export function Card({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return <section className={`dashboard-card rounded-3xl border border-white/10 bg-[var(--panel)] shadow-glow ${className}`}>{children}</section>;
}
