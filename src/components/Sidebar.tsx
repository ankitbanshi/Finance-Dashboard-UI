import { useDashboard } from '../context/dashboard-context';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import { roleInitials, roleNames } from '../data/mock';

const navItems = [
  { key: 'overview', label: 'Overview', Icon: DashboardRoundedIcon },
  { key: 'transactions', label: 'Transactions', Icon: ReceiptLongRoundedIcon },
  { key: 'insights', label: 'Insights', Icon: InsightsRoundedIcon },
  { key: 'team', label: 'Team', Icon: GroupsRoundedIcon },
] as const;

export function Sidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  const { activePage, setPage, role, theme } = useDashboard();
  const light = theme === 'light';

  return (
    <aside className={`dashboard-sidebar fixed inset-y-0 left-0 z-50 flex h-screen w-[82vw] max-w-[320px] flex-col border-r border-white/10 bg-black/20 px-4 py-5 shadow-[20px_0_60px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-transform duration-300 xl:sticky xl:top-0 xl:z-auto xl:flex xl:w-64 xl:max-w-none xl:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-400">
            <TrendingUpRoundedIcon sx={{ fontSize: 20, color: '#0f172a' }} />
          </div>
          <div>
            <div className={`font-display text-[18px] font-bold tracking-tight ${light ? 'text-slate-950' : 'text-white'}`}>Finflow</div>
            <div className={`text-sm ${light ? 'text-slate-600' : 'text-slate-400'}`}>finance dashboard</div>
          </div>
        </div>
      </div>

      <nav className="mt-6 flex-1 space-y-2 overflow-y-auto pr-1">
        <button
          type="button"
          className="mb-1 inline-flex items-center self-end rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-white/10 hover:text-slate-950 xl:hidden"
          onClick={onClose}
        >
          <CloseRoundedIcon sx={{ fontSize: 16 }} />
          Close
        </button>
        <div className={`px-2 pb-2 pt-1 text-[12px] font-bold uppercase tracking-[0.2em] ${light ? 'text-slate-800' : 'text-slate-500'}`}>Main</div>
        {navItems.map((item) => {
          const Icon = item.Icon;

          return (
            <button
              key={item.key}
              onClick={() => {
                setPage(item.key);
                onClose();
              }}
              className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-[15px] font-medium transition ${activePage === item.key
                ? light
                  ? 'border-teal-400/30 bg-teal-400/12 text-slate-950'
                  : 'border-teal-400/30 bg-teal-400/10 text-teal-200'
                : light
                  ? 'border-transparent bg-transparent text-slate-700 hover:border-slate-300/60 hover:bg-white/70'
                  : 'border-transparent bg-transparent text-slate-300 hover:border-white/10 hover:bg-white/5'
              }`}
            >
              <span className={`w-5 text-center opacity-80 ${light ? 'text-slate-800' : ''}`}><Icon sx={{ fontSize: 18 }} /></span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-400 font-display text-sm font-bold text-slate-950">
            {roleInitials[role]}
          </div>
          <div className="min-w-0">
            <div className={`truncate text-sm font-semibold ${light ? 'text-slate-950' : 'text-white'}`}>{roleNames[role]}</div>
            <div className={`text-sm ${light ? 'text-slate-600' : 'text-slate-400'}`}>{role}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
