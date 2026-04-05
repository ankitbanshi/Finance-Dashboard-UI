import type { PropsWithChildren, ReactNode } from 'react';
import { Card } from './Card';

export function StatCard({ label, value, meta, icon, children, className = '' }: PropsWithChildren<{ label: string; value: string; meta: string; icon: ReactNode; className?: string }>) {
  return (
    <Card className={`relative overflow-hidden p-6 ${className}`}>
      <div className="absolute right-5 top-5 rounded-2xl bg-white/5 p-3 text-xl">{icon}</div>
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</div>
      <div className="mt-4 font-mono text-3xl tracking-tight text-white">{value}</div>
      <div className="mt-3 text-sm text-slate-400">{meta}</div>
      {children}
    </Card>
  );
}
