import { Button } from './Button';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useDashboard } from '../context/dashboard-context';
import { roleNames } from '../data/mock';

type TopbarProps = {
  onOpenSidebar: () => void;
};

export function Topbar({ onOpenSidebar }: TopbarProps) {
  const { role, setRole, setTheme, theme, openModal, canEdit, activePage } = useDashboard();

  return (
    <header className="dashboard-topbar flex flex-col gap-3 border-b border-white/10 bg-black/10 px-4 py-4 backdrop-blur md:px-6 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex items-start justify-between gap-3 xl:block xl:space-y-0">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:bg-white/80 xl:hidden"
          onClick={onOpenSidebar}
          aria-label="Open dashboard menu"
        >
          <MenuRoundedIcon sx={{ fontSize: 18 }} /> <span>Dashboard</span>
        </button>
        <div className="min-w-0">
          <div className="font-display text-[clamp(1.5rem,4vw,2rem)] font-semibold tracking-tight text-white">
            {activePage === 'overview' ? 'Overview' : activePage === 'transactions' ? 'Transactions' : activePage === 'insights' ? 'Insights' : 'Team'}
          </div>
          <div className="text-sm text-slate-400">finflow / {activePage}</div>
        </div>
      </div>

      <div className="grid gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300 shadow-sm sm:w-auto">{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</div>
        <select
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none sm:w-auto"
          value={role}
          onChange={(event) => setRole(event.target.value as typeof role)}
        >
          <option value="admin">Admin</option>
          <option value="analyst">Analyst</option>
          <option value="viewer">Viewer</option>
        </select>
        <select
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none sm:w-auto"
          value={theme}
          onChange={(event) => setTheme(event.target.value as 'dark' | 'light')}
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
        {canEdit && (
          <Button variant="primary" className="w-full sm:w-auto" onClick={() => openModal()}>
            <span className="inline-flex items-center gap-1.5">
              <AddRoundedIcon sx={{ fontSize: 18 }} />
              Add Transaction
            </span>
          </Button>
        )}
        <div className="hidden rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 md:block">{roleNames[role]}</div>
      </div>
    </header>
  );
}
