import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react';
import type { AppTheme, Role, Transaction } from '../types';
import { mockTransactions } from '../data/mock';

type TransactionDraft = Omit<Transaction, 'id'>;

type Filters = {
  search: string;
  type: '' | Transaction['type'];
  category: string;
  sort: 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc';
};

type DashboardState = {
  role: Role;
  theme: AppTheme;
  transactions: Transaction[];
  filters: Filters;
  activePage: 'overview' | 'transactions' | 'insights' | 'team';
  editingTransactionId: number | null;
  modalOpen: boolean;
  toast: { id: number; message: string; kind: 'success' | 'error' } | null;
};

type Action =
  | { type: 'setRole'; role: Role }
  | { type: 'setTheme'; theme: AppTheme }
  | { type: 'setPage'; page: DashboardState['activePage'] }
  | { type: 'setFilters'; filters: Partial<Filters> }
  | { type: 'openModal'; editingTransactionId: number | null }
  | { type: 'closeModal' }
  | { type: 'saveTransaction'; transaction: TransactionDraft; id?: number }
  | { type: 'deleteTransaction'; id: number }
  | { type: 'load'; state: Partial<DashboardState> };

type DashboardContextValue = DashboardState & {
  canEdit: boolean;
  setRole: (role: Role) => void;
  setTheme: (theme: AppTheme) => void;
  setPage: (page: DashboardState['activePage']) => void;
  setFilters: (filters: Partial<Filters>) => void;
  openModal: (id?: number) => void;
  closeModal: () => void;
  saveTransaction: (transaction: TransactionDraft, id?: number) => void;
  deleteTransaction: (id: number) => void;
};

const STORAGE_KEY = 'finflow-dashboard-state';

const initialState: DashboardState = {
  role: 'admin',
  theme: 'dark',
  transactions: mockTransactions,
  filters: { search: '', type: '', category: '', sort: 'date-desc' },
  activePage: 'overview',
  editingTransactionId: null,
  modalOpen: false,
  toast: null,
};

const DashboardContext = createContext<DashboardContextValue | undefined>(undefined);

function reducer(state: DashboardState, action: Action): DashboardState {
  switch (action.type) {
    case 'load':
      return { ...state, ...action.state, filters: { ...state.filters, ...action.state.filters } };
    case 'setRole':
      return { ...state, role: action.role };
    case 'setTheme':
      return { ...state, theme: action.theme };
    case 'setPage':
      return { ...state, activePage: action.page };
    case 'setFilters':
      return { ...state, filters: { ...state.filters, ...action.filters } };
    case 'openModal':
      return { ...state, modalOpen: true, editingTransactionId: action.editingTransactionId };
    case 'closeModal':
      return { ...state, modalOpen: false, editingTransactionId: null };
    case 'saveTransaction': {
      const nextTransactions = action.id
        ? state.transactions.map((transaction) => (transaction.id === action.id ? { ...transaction, ...action.transaction, id: action.id } : transaction))
        : [{ ...action.transaction, id: Math.max(0, ...state.transactions.map((transaction) => transaction.id)) + 1 }, ...state.transactions];

      return { ...state, transactions: nextTransactions, modalOpen: false, editingTransactionId: null, toast: { id: Date.now(), message: action.id ? 'Transaction updated successfully.' : 'Transaction added successfully.', kind: 'success' } };
    }
    case 'deleteTransaction':
      return { ...state, transactions: state.transactions.filter((transaction) => transaction.id !== action.id), toast: { id: Date.now(), message: 'Transaction deleted.', kind: 'success' } };
    default:
      return state;
  }
}

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw) as Partial<DashboardState>;
      dispatch({ type: 'load', state: parsed });
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = state.theme;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        role: state.role,
        theme: state.theme,
        transactions: state.transactions,
        filters: state.filters,
        activePage: state.activePage,
      }),
    );
  }, [state.role, state.theme, state.transactions, state.filters, state.activePage]);

  useEffect(() => {
    if (!state.toast) {
      return;
    }

    const timeout = window.setTimeout(() => {
      dispatch({ type: 'load', state: { toast: null } });
    }, 2800);

    return () => window.clearTimeout(timeout);
  }, [state.toast]);

  const value = useMemo<DashboardContextValue>(
    () => ({
      ...state,
      canEdit: state.role === 'admin',
      setRole: (role) => dispatch({ type: 'setRole', role }),
      setTheme: (theme) => dispatch({ type: 'setTheme', theme }),
      setPage: (page) => dispatch({ type: 'setPage', page }),
      setFilters: (filters) => dispatch({ type: 'setFilters', filters }),
      openModal: (id) => dispatch({ type: 'openModal', editingTransactionId: id ?? null }),
      closeModal: () => dispatch({ type: 'closeModal' }),
      saveTransaction: (transaction, id) => dispatch({ type: 'saveTransaction', transaction, id }),
      deleteTransaction: (id) => dispatch({ type: 'deleteTransaction', id }),
    }),
    [state],
  );

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used inside DashboardProvider');
  }

  return context;
}
