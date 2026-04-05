import { Area, Bar, CartesianGrid, Cell, ComposedChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from './Card';
import { useDashboard } from '../context/dashboard-context';
import { getCategoryTotals, groupMonthlyTotals } from '../utils/finance';
import { categoryMeta } from '../data/mock';

const palette = ['#00d4b1', '#ff4d6d', '#f0a500', '#9b7bff', '#4e9af1', '#ff7043'];
const incomeColor = '#10b981';
const expenseColor = '#ef4444';

export function OverviewCharts() {
  const { transactions, theme } = useDashboard();
  const monthly = groupMonthlyTotals(transactions);
  const categories = getCategoryTotals(transactions).slice(0, 6);
  const totalExpenses = categories.reduce((sum, [, value]) => sum + value, 0);
  const isLight = theme === 'light';
  const axisColor = isLight ? '#475569' : '#7c859a';
  const gridColor = isLight ? 'rgba(15,23,42,0.10)' : 'rgba(255,255,255,0.06)';
  const tooltipStyle = {
    background: isLight ? 'rgba(255, 255, 255, 0.98)' : 'rgba(8, 8, 14, 0.95)',
    border: isLight ? '1px solid rgba(15,23,42,0.14)' : '1px solid rgba(255,255,255,0.10)',
    borderRadius: 16,
    color: isLight ? '#0f172a' : '#ffffff',
  };
  const tooltipLabelStyle = { color: isLight ? '#334155' : '#cbd5e1' };
  const tooltipItemStyle = { color: isLight ? '#0f172a' : '#f8fafc' };

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
      <Card className="p-6">
        <div className="mb-1 font-display text-xl font-semibold text-white">Balance Trend</div>
        <p className="mb-3 text-sm text-slate-400">Monthly income versus expenses across the sample period.</p>
        <div className="mb-4 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: `${incomeColor}d9` }} />
            Income
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: `${expenseColor}cc` }} />
            Expense
          </span>
        </div>
        <div className="h-56 sm:h-72" style={{ overflow: 'visible' }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={monthly}>
              <CartesianGrid stroke={gridColor} vertical={false} />
              <XAxis dataKey="label" tick={{ fill: axisColor, fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: axisColor, fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${Math.round(Number(value) / 1000)}k`} />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={tooltipLabelStyle}
                itemStyle={tooltipItemStyle}
                formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name === 'income' ? 'Income' : 'Expense']}
              />
              <Bar dataKey="income" fill="rgba(16, 185, 129, 0.72)" radius={[10, 10, 0, 0]} barSize={28} />
              <Bar dataKey="expense" fill="rgba(239, 68, 68, 0.58)" radius={[10, 10, 0, 0]} barSize={28} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <div className="mb-1 font-display text-xl font-semibold text-white">Spending Breakdown</div>
        <p className="mb-5 text-sm text-slate-400">This month’s expense distribution by category.</p>
        <div className="relative h-48 sm:h-56" style={{ overflow: 'visible' }}>
          <ResponsiveContainer width="100%" height="100%" style={{ overflow: 'visible' }}>
            <PieChart>
              <Pie data={categories} dataKey={1} nameKey={0} innerRadius={70} outerRadius={94} paddingAngle={3}>
                {categories.map((entry, index) => (
                  <Cell key={entry[0]} fill={palette[index % palette.length] ?? categoryMeta[entry[0]]?.color ?? '#94a3b8'} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={tooltipLabelStyle}
                itemStyle={tooltipItemStyle}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-center">
            <div>
              <div className="font-mono text-2xl text-white">${totalExpenses.toLocaleString()}</div>
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">total spent</div>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {categories.map(([category, value], index) => {
            const meta = categoryMeta[category];
            return (
              <div key={category} className="flex items-center gap-3 text-sm">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: palette[index % palette.length] ?? meta?.color }} />
                <span className="flex-1 text-slate-300">{category}</span>
                <span className="font-mono text-slate-500">{totalExpenses ? `${Math.round((value / totalExpenses) * 100)}%` : '0%'}</span>
                <span className="font-mono text-white">${value.toLocaleString()}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

export function TrendChart() {
  const { transactions, theme } = useDashboard();
  const monthly = groupMonthlyTotals(transactions);
  const isLight = theme === 'light';
  const axisColor = isLight ? '#475569' : '#7c859a';
  const gridColor = isLight ? 'rgba(15,23,42,0.10)' : 'rgba(255,255,255,0.06)';
  const tooltipStyle = {
    background: isLight ? 'rgba(255, 255, 255, 0.98)' : 'rgba(8, 8, 14, 0.95)',
    border: isLight ? '1px solid rgba(15,23,42,0.14)' : '1px solid rgba(255,255,255,0.10)',
    borderRadius: 16,
    color: isLight ? '#0f172a' : '#ffffff',
  };
  const tooltipLabelStyle = { color: isLight ? '#334155' : '#cbd5e1' };
  const tooltipItemStyle = { color: isLight ? '#0f172a' : '#f8fafc' };

  return (
    <Card className="p-6">
      <div className="mb-1 font-display text-xl font-semibold text-white">6-Month Trend</div>
      <p className="mb-3 text-sm text-slate-400">Income and expenses trend over time.</p>
      <div className="mb-4 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: incomeColor }} />
          Income
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: expenseColor }} />
          Expense
        </span>
      </div>
      <div className="h-56 sm:h-80" style={{ overflow: 'visible' }}>
        <ResponsiveContainer width="100%" height="100%" style={{ overflow: 'visible' }}>
          <LineChart data={monthly}>
            <CartesianGrid stroke={gridColor} vertical={false} />
            <XAxis dataKey="label" tick={{ fill: axisColor, fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: axisColor, fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${Math.round(Number(value) / 1000)}k`} />
            <Tooltip
              contentStyle={tooltipStyle}
              labelStyle={tooltipLabelStyle}
              itemStyle={tooltipItemStyle}
              formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name === 'income' ? 'Income' : 'Expense']}
            />
            <Line type="monotone" dataKey="income" stroke={incomeColor} strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="expense" stroke={expenseColor} strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Area type="monotone" dataKey="income" stroke="transparent" fill="rgba(16, 185, 129, 0.08)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
