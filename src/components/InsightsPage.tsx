import { Card } from './Card';
import { useDashboard } from '../context/dashboard-context';
import { formatCurrency, getCategoryTotals, getTopCategory, groupMonthlyTotals } from '../utils/finance';
import { categoryMeta } from '../data/mock';

export function InsightsPage() {
  const { transactions } = useDashboard();
  const income = transactions.filter((transaction) => transaction.type === 'income').reduce((sum, transaction) => sum + transaction.amount, 0);
  const expense = transactions.filter((transaction) => transaction.type === 'expense').reduce((sum, transaction) => sum + transaction.amount, 0);
  const savingsRate = income > 0 ? Math.max(0, Math.round(((income - expense) / income) * 100)) : 0;
  const topCategory = getTopCategory(transactions);
  const monthly = groupMonthlyTotals(transactions);
  const categories = getCategoryTotals(transactions);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Net Balance</div>
          <div className="mt-4 font-mono text-4xl text-teal-300">{formatCurrency(income - expense)}</div>
          <div className="mt-2 text-sm text-slate-400">income minus expenses</div>
        </Card>
        <Card className="p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Highest Spending Category</div>
          <div className="mt-4 font-mono text-4xl text-amber-300">{topCategory.name}</div>
          <div className="mt-2 text-sm text-slate-400">{formatCurrency(topCategory.amount)} total spent</div>
        </Card>
        <Card className="p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Savings Rate</div>
          <div className="mt-4 font-mono text-4xl text-violet-300">{savingsRate}%</div>
          <div className="mt-2 text-sm text-slate-400">percentage of income saved</div>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <Card className="p-6">
          <div className="font-display text-xl font-semibold text-white">Monthly Comparison</div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {monthly.map((month) => (
              <div key={month.month} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{month.label}</div>
                <div className="mt-3 text-sm font-mono text-teal-300">↑ {formatCurrency(month.income)}</div>
                <div className="text-sm font-mono text-rose-300">↓ {formatCurrency(month.expense)}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="font-display text-xl font-semibold text-white">Category Breakdown</div>
          <div className="mt-5 space-y-4">
            {categories.map(([category, value], index) => {
              const meta = categoryMeta[category];
              const max = categories[0]?.[1] ?? 1;

              return (
                <div key={category}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-slate-300">{category}</span>
                    <span className="font-mono text-slate-500">{formatCurrency(value)}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5">
                    <div className="h-2 rounded-full" style={{ width: `${(value / max) * 100}%`, background: meta?.color ?? ['#00d4b1', '#ff4d6d', '#f0a500'][index % 3] }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="font-display text-xl font-semibold text-white">Observation</div>
        <p className="mt-3 max-w-3xl text-sm text-slate-400">
          {income > expense
            ? 'Income is currently higher than expenses, which means the sample data shows a positive savings position. The largest expense category is shaping the budget more than any other line item.'
            : 'Expenses currently exceed income in the sample data. The strongest opportunity is to review the largest categories and trim recurring spend.'}
        </p>
      </Card>
    </div>
  );
}
