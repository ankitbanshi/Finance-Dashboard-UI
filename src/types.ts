export type Role = 'admin' | 'analyst' | 'viewer';
export type TxnType = 'income' | 'expense';

export type Transaction = {
  id: number;
  notes: string;
  amount: number;
  type: TxnType;
  category: string;
  date: string;
};

export type AppTheme = 'dark' | 'light';
