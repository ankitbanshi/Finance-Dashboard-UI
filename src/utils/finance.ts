import type { Transaction } from '../types';

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getTopCategory(transactions: Transaction[]) {
  const totals = new Map<string, number>();

  transactions
    .filter((transaction) => transaction.type === 'expense')
    .forEach((transaction) => {
      totals.set(transaction.category, (totals.get(transaction.category) ?? 0) + transaction.amount);
    });

  let topCategory = { name: '—', amount: 0 };
  totals.forEach((amount, name) => {
    if (amount > topCategory.amount) {
      topCategory = { name, amount };
    }
  });

  return topCategory;
}

export function groupMonthlyTotals(transactions: Transaction[]) {
  const order = ['2024-01', '2024-02', '2024-03'];

  return order.map((month) => {
    const label = new Date(`${month}-01T00:00:00`).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const income = transactions.filter((transaction) => transaction.type === 'income' && transaction.date.startsWith(month)).reduce((sum, transaction) => sum + transaction.amount, 0);
    const expense = transactions.filter((transaction) => transaction.type === 'expense' && transaction.date.startsWith(month)).reduce((sum, transaction) => sum + transaction.amount, 0);

    return { month, label, income, expense };
  });
}

export function getCategoryTotals(transactions: Transaction[]) {
  const totals = new Map<string, number>();

  transactions
    .filter((transaction) => transaction.type === 'expense')
    .forEach((transaction) => {
      totals.set(transaction.category, (totals.get(transaction.category) ?? 0) + transaction.amount);
    });

  return Array.from(totals.entries()).sort((left, right) => right[1] - left[1]);
}
