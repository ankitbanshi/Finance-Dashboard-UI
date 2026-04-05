import { useMemo, useState } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Card } from './Card';
import { Button } from './Button';
import { EmptyState } from './EmptyState';
import { useDashboard } from '../context/dashboard-context';
import { categories, categoryMeta } from '../data/mock';
import { formatCurrency, formatDate } from '../utils/finance';
import { categoryIcons, fallbackCategoryIcon } from '../config/category-icons';

const pageSize = 8;

export function TransactionsPage() {
  const { transactions, filters, setFilters, canEdit, openModal, deleteTransaction, theme } = useDashboard();
  const light = theme === 'light';
  const mobileActionClass = light
    ? 'text-slate-700 hover:bg-white/90 hover:text-slate-950'
    : 'text-slate-200 hover:bg-white/10 hover:text-white';
  const mobileActionSecondaryClass = light
    ? 'bg-white/80 text-slate-700 hover:bg-white/95 hover:text-slate-950'
    : 'bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white';
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const search = filters.search.toLowerCase();

    const result = transactions.filter((transaction) => {
      const matchesSearch = !search || transaction.notes.toLowerCase().includes(search) || transaction.category.toLowerCase().includes(search);
      const matchesType = !filters.type || transaction.type === filters.type;
      const matchesCategory = !filters.category || transaction.category === filters.category;

      return matchesSearch && matchesType && matchesCategory;
    });

    result.sort((left, right) => {
      if (filters.sort === 'date-desc') return +new Date(right.date) - +new Date(left.date);
      if (filters.sort === 'date-asc') return +new Date(left.date) - +new Date(right.date);
      if (filters.sort === 'amount-desc') return right.amount - left.amount;
      return left.amount - right.amount;
    });

    return result;
  }, [filters, transactions]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  if (!transactions.length) {
    return <EmptyState title="No transactions found" description="Use the Add Transaction button to create your first record and unlock the filters and analytics." />;
  }

  return (
    <div className="space-y-4">
      <Card className="p-4 md:p-5">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.3fr)_repeat(3,minmax(0,0.7fr))_auto]">
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"><SearchRoundedIcon sx={{ fontSize: 18 }} /></span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
              placeholder="Search transactions..."
              value={filters.search}
              onChange={(event) => setFilters({ search: event.target.value })}
            />
          </div>

          <select className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none" value={filters.type} onChange={(event) => setFilters({ type: event.target.value as '' | 'income' | 'expense' })}>
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <select className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none" value={filters.category} onChange={(event) => setFilters({ category: event.target.value })}>
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none" value={filters.sort} onChange={(event) => setFilters({ sort: event.target.value as typeof filters.sort })}>
            <option value="date-desc">Date: Newest</option>
            <option value="date-asc">Date: Oldest</option>
            <option value="amount-desc">Amount: High to Low</option>
            <option value="amount-asc">Amount: Low to High</option>
          </select>

          {canEdit && (
            <Button variant="primary" className="w-full lg:w-auto" onClick={() => openModal()}>
              <span className="inline-flex items-center gap-1.5">
                <AddRoundedIcon sx={{ fontSize: 18 }} />
                Add
              </span>
            </Button>
          )}
        </div>
      </Card>

      <Card className="hidden md:block">
        <div className="overflow-x-auto">
          <div className="min-w-[940px]">
            <div className="grid grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,0.9fr)_minmax(0,1.25fr)] border-b border-white/10 bg-white/5 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              <div>Description</div>
              <div>Amount</div>
              <div>Category</div>
              <div>Date</div>
              <div>Actions</div>
            </div>

            <div className="divide-y divide-white/10">
              {visible.length ? (
                visible.map((transaction) => {
                  const CategoryIcon = categoryIcons[transaction.category] ?? fallbackCategoryIcon;
                  const categoryColor = categoryMeta[transaction.category]?.color ?? '#94a3b8';

                  return (
                    <div key={transaction.id} className="grid grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,0.9fr)_minmax(0,1.25fr)] items-center gap-3 px-5 py-4 text-sm transition hover:bg-white/5">
                      <div className="min-w-0">
                        <div className="truncate font-medium text-white">{transaction.notes}</div>
                        <div className="mt-1 text-xs font-mono text-slate-500">{transaction.type}</div>
                      </div>
                      <div className={`font-mono ${transaction.type === 'income' ? 'text-teal-300' : 'text-rose-300'}`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </div>
                      <div>
                        <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-slate-300">
                          <CategoryIcon sx={{ fontSize: 14, color: categoryColor }} />
                          {transaction.category}
                        </span>
                      </div>
                      <div className="font-mono text-slate-500">{formatDate(transaction.date)}</div>
                      <div className="flex items-center gap-2">
                        {canEdit ? (
                          <>
                            <button className="rounded-xl border border-white/10 bg-white/5 px-2.5 py-2 text-xs text-slate-300 transition hover:border-amber-400/30 hover:bg-amber-400/10 hover:text-amber-200" onClick={() => openModal(transaction.id)}>
                              <span className="inline-flex items-center gap-1"><EditRoundedIcon sx={{ fontSize: 14 }} />Edit</span>
                            </button>
                            <button className="rounded-xl border border-white/10 bg-white/5 px-2.5 py-2 text-xs text-slate-300 transition hover:border-rose-400/30 hover:bg-rose-400/10 hover:text-rose-200" onClick={() => deleteTransaction(transaction.id)}>
                              <span className="inline-flex items-center gap-1"><DeleteRoundedIcon sx={{ fontSize: 14 }} />Delete</span>
                            </button>
                          </>
                        ) : (
                          <span className="text-xs text-slate-500">Viewer</span>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-5">
                  <EmptyState title="No matching records" description="Try changing the search term, filters, or sort order to reveal more transactions." />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-400">
              <div>
                Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filtered.length)} of {filtered.length}
              </div>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((value) => (
                  <button
                    key={value}
                    className={`h-9 w-9 rounded-xl border text-sm transition ${currentPage === value ? 'border-teal-400 bg-teal-400 text-slate-950' : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'}`}
                    onClick={() => setPage(value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-3 md:hidden">
        {visible.length ? (
          visible.map((transaction) => {
            const CategoryIcon = categoryIcons[transaction.category] ?? fallbackCategoryIcon;
            const categoryColor = categoryMeta[transaction.category]?.color ?? '#94a3b8';

            return (
            <Card key={transaction.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-base font-semibold text-white">{transaction.notes}</div>
                  <div className="mt-1 text-xs text-slate-500">{transaction.category} · {formatDate(transaction.date)}</div>
                </div>
                <div className={`shrink-0 font-mono text-sm font-semibold ${transaction.type === 'income' ? 'text-teal-300' : 'text-rose-300'}`}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className={`rounded-xl px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${transaction.type === 'income' ? 'bg-teal-400/10 text-teal-300' : 'bg-rose-400/10 text-rose-300'}`}>
                  {transaction.type}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-slate-300">
                  <CategoryIcon sx={{ fontSize: 14, color: categoryColor }} />
                  {transaction.category}
                </span>
              </div>

              {canEdit ? (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button className={`rounded-xl border border-white/10 px-3 py-2 text-sm transition ${mobileActionClass}`} onClick={() => openModal(transaction.id)}>
                    <span className="inline-flex items-center gap-1"><EditRoundedIcon sx={{ fontSize: 16 }} />Edit</span>
                  </button>
                  <button className={`rounded-xl border border-white/10 px-3 py-2 text-sm transition ${mobileActionSecondaryClass}`} onClick={() => deleteTransaction(transaction.id)}>
                    <span className="inline-flex items-center gap-1"><DeleteRoundedIcon sx={{ fontSize: 16 }} />Delete</span>
                  </button>
                </div>
              ) : null}
            </Card>
            );
          })
        ) : (
          <EmptyState title="No matching records" description="Try changing the search term, filters, or sort order to reveal more transactions." />
        )}
      </div>
    </div>
  );
}
