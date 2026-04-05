import { useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { TransactionModal } from './components/Modal';
import { Toast } from './components/Toast';
import { useDashboard } from './context/dashboard-context';
import { OverviewPage } from './components/Overview';
import { TransactionsPage } from './components/TransactionsPage';
import { InsightsPage } from './components/InsightsPage';
import { TeamPage } from './components/TeamPage';

function ActivePage() {
  const { activePage } = useDashboard();

  switch (activePage) {
    case 'transactions':
      return <TransactionsPage />;
    case 'insights':
      return <InsightsPage />;
    case 'team':
      return <TeamPage />;
    default:
      return <OverviewPage />;
  }
}

export function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const body = document.body;
    if (sidebarOpen) {
      body.classList.add('no-scroll');
    } else {
      body.classList.remove('no-scroll');
    }

    return () => body.classList.remove('no-scroll');
  }, [sidebarOpen]);

  return (
    <div className="app-shell min-h-screen text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar onOpenSidebar={() => setSidebarOpen(true)} />
          <main className="flex-1 px-4 py-5 md:px-6">
            <ActivePage />
          </main>
        </div>
      </div>
      {sidebarOpen && <button className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] xl:hidden" aria-label="Close dashboard menu" onClick={() => setSidebarOpen(false)} />}
      <TransactionModal />
      <Toast />
    </div>
  );
}
