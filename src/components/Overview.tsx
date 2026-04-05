import { Card } from './Card';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { StatCard } from './StatCard';
import { OverviewCharts } from './Charts';
import { EmptyState } from './EmptyState';
import { useDashboard } from '../context/dashboard-context';
import { formatCurrency, formatDate, getTopCategory } from '../utils/finance';
import { categoryMeta } from '../data/mock';
import { categoryIcons, fallbackCategoryIcon } from '../config/category-icons';

export function OverviewPage() {
  const { transactions, setPage } = useDashboard();
  const income = transactions.filter((transaction) => transaction.type === 'income').reduce((sum, transaction) => sum + transaction.amount, 0);
  const expenses = transactions.filter((transaction) => transaction.type === 'expense').reduce((sum, transaction) => sum + transaction.amount, 0);
  const balance = income - expenses;
  const savingsRate = income > 0 ? Math.max(0, Math.round(((income - expenses) / income) * 100)) : 0;
  const topCategory = getTopCategory(transactions);
  const avg = transactions.length ? Math.round(transactions.reduce((sum, transaction) => sum + transaction.amount, 0) / transactions.length) : 0;
  const recentTransactions = [...transactions].sort((left, right) => +new Date(right.date) - +new Date(left.date)).slice(0, 6);

  if (!transactions.length) {
    return <EmptyState title="No transactions yet" description="Add sample transactions to see the dashboard summary, charts, and insights come to life." />;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-4">
        <StatCard label="Total Balance" value={formatCurrency(balance)} meta="income minus expenses" icon={<AccountBalanceWalletRoundedIcon sx={{ fontSize: 22 }} />} />
        <StatCard label="Total Income" value={formatCurrency(income)} meta="all incoming cash flow" icon={<TrendingUpRoundedIcon sx={{ fontSize: 22 }} />} />
        <StatCard label="Total Expenses" value={formatCurrency(expenses)} meta="all outgoing cash flow" icon={<TrendingDownRoundedIcon sx={{ fontSize: 22 }} />} />
        <StatCard label="Transactions" value={String(transactions.length)} meta="records tracked locally" icon={<ReceiptLongRoundedIcon sx={{ fontSize: 22 }} />} />
      </div>

      <OverviewCharts />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="font-display text-xl font-semibold text-white">Recent Transactions</div>
              <div className="text-sm text-slate-400">Latest activity across the sample data set.</div>
            </div>
            <button className="text-sm text-teal-300 transition hover:text-teal-200" onClick={() => setPage('transactions')}>
              <span className="inline-flex items-center gap-1">View all <ArrowForwardRoundedIcon sx={{ fontSize: 16 }} /></span>
            </button>
          </div>

          <div className="space-y-2">
            {recentTransactions.map((transaction) => {
              const meta = categoryMeta[transaction.category];
              const CategoryIcon = categoryIcons[transaction.category] ?? fallbackCategoryIcon;

              return (
                <div key={transaction.id} className="flex items-center gap-4 rounded-2xl border border-white/0 px-3 py-3 transition hover:border-white/10 hover:bg-white/5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: meta.tint }}>
                    <CategoryIcon sx={{ fontSize: 20, color: meta.color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-white">{transaction.notes}</div>
                    <div className="text-xs font-mono text-slate-500">
                      {transaction.category} · {formatDate(transaction.date)}
                    </div>
                  </div>
                  <div className={`font-mono text-sm font-medium ${transaction.type === 'income' ? 'text-teal-300' : 'text-rose-300'}`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6">
          <div className="font-display text-xl font-semibold text-white">Quick Insights</div>
          <div className="mt-5 space-y-4">
            <InsightBlock label="Savings Rate" value={`${savingsRate}%`} subtext="of income saved this month" fill={`${Math.min(100, savingsRate)}%`} />
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Top Category</div>
              <div className="mt-3 font-mono text-2xl text-amber-300">{topCategory.name}</div>
              <div className="text-sm text-slate-400">{formatCurrency(topCategory.amount)} spent overall</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Average Transaction</div>
              <div className="mt-3 font-mono text-2xl text-violet-300">{formatCurrency(avg)}</div>
              <div className="text-sm text-slate-400">across all imported sample records</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function InsightBlock({ label, value, subtext, fill }: { label: string; value: string; subtext: string; fill: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</div>
      <div className="mt-3 font-mono text-2xl text-teal-300">{value}</div>
      <div className="text-sm text-slate-400">{subtext}</div>
      <div className="mt-4 h-2 rounded-full bg-white/5">
        <div className="h-2 rounded-full bg-teal-400 transition-all" style={{ width: fill }} />
      </div>
    </div>
  );
}
