import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Transaction } from '../types';
import { Button } from './Button';
import { categories } from '../data/mock';
import { useDashboard } from '../context/dashboard-context';

const defaultDate = new Date().toISOString().slice(0, 10);

export function TransactionModal() {
  const { modalOpen, editingTransactionId, transactions, closeModal, saveTransaction, canEdit } = useDashboard();
  const editingTransaction = useMemo(
    () => transactions.find((transaction) => transaction.id === editingTransactionId) ?? null,
    [editingTransactionId, transactions],
  );
  const [form, setForm] = useState<Omit<Transaction, 'id'>>({
    notes: '',
    amount: 0,
    type: 'expense',
    category: 'Food',
    date: defaultDate,
  });

  useEffect(() => {
    if (editingTransaction) {
      setForm({
        notes: editingTransaction.notes,
        amount: editingTransaction.amount,
        type: editingTransaction.type,
        category: editingTransaction.category,
        date: editingTransaction.date,
      });
      return;
    }

    setForm({ notes: '', amount: 0, type: 'expense', category: 'Food', date: defaultDate });
  }, [editingTransaction, modalOpen]);

  useEffect(() => {
    if (!modalOpen || !canEdit) {
      return;
    }

    const body = document.body;
    body.classList.add('modal-open');

    return () => {
      body.classList.remove('modal-open');
    };
  }, [modalOpen, canEdit]);

  if (!modalOpen || !canEdit) {
    return null;
  }

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 p-4 pt-6 backdrop-blur-sm sm:items-center sm:pt-4" onClick={closeModal}>
      <div className="my-auto max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-white/10 bg-[var(--panel-strong)] p-5 shadow-2xl sm:p-6" onClick={(event) => event.stopPropagation()}>
        <div className="mb-6">
          <h2 className="font-display text-2xl font-semibold text-white">{editingTransaction ? 'Edit Transaction' : 'Add Transaction'}</h2>
          <p className="mt-1 text-sm text-slate-400">Add or update a transaction using mock data. Changes are stored locally.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Description</span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
              value={form.notes}
              onChange={(event) => setForm({ ...form, notes: event.target.value })}
              placeholder="e.g. Monthly rent payment"
            />
          </label>

          <label>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Amount</span>
            <input
              type="number"
              min="0"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
              value={form.amount}
              onChange={(event) => setForm({ ...form, amount: Number(event.target.value) })}
            />
          </label>

          <label>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Type</span>
            <select
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-teal-400"
              value={form.type}
              onChange={(event) => setForm({ ...form, type: event.target.value as Transaction['type'] })}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </label>

          <label>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Category</span>
            <select
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-teal-400"
              value={form.category}
              onChange={(event) => setForm({ ...form, category: event.target.value })}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Date</span>
            <input
              type="date"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
              value={form.date}
              onChange={(event) => setForm({ ...form, date: event.target.value })}
            />
          </label>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button className="w-full sm:w-auto" onClick={closeModal}>Cancel</Button>
          <Button
            className="w-full sm:w-auto"
            variant="primary"
            onClick={() => {
              if (!form.notes.trim() || !form.amount || !form.date) {
                return;
              }

              saveTransaction({ ...form, notes: form.notes.trim() }, editingTransactionId ?? undefined);
            }}
          >
            {editingTransaction ? 'Update Transaction' : 'Save Transaction'}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
