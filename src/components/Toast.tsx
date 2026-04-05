import { useEffect, useState } from 'react';
import { useDashboard } from '../context/dashboard-context';

export function Toast() {
  const { toast } = useDashboard();
  const [visibleToast, setVisibleToast] = useState(toast);

  useEffect(() => {
    setVisibleToast(toast);
  }, [toast]);

  useEffect(() => {
    if (!visibleToast) {
      return;
    }

    const timeout = window.setTimeout(() => setVisibleToast(null), 2800);
    return () => window.clearTimeout(timeout);
  }, [visibleToast]);

  if (!visibleToast) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-[60] rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm text-white shadow-2xl backdrop-blur">
      <div className={`flex items-center gap-2 ${visibleToast.kind === 'success' ? 'text-teal-300' : 'text-rose-300'}`}>
        <span>{visibleToast.kind === 'success' ? '✓' : '✕'}</span>
        <span>{visibleToast.message}</span>
      </div>
    </div>
  );
}
