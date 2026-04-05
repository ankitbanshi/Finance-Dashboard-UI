import type { Role, Transaction } from '../types';

export const categories = [
  'Salary',
  'Rent',
  'Food',
  'Transport',
  'Entertainment',
  'Healthcare',
  'Utilities',
  'Shopping',
  'Freelance',
  'Investment',
  'Other',
];

export const categoryMeta: Record<string, { color: string; tint: string }> = {
  Salary: { color: '#00d4b1', tint: 'rgba(0, 212, 177, 0.14)' },
  Rent: { color: '#ff4d6d', tint: 'rgba(255, 77, 109, 0.14)' },
  Food: { color: '#f0a500', tint: 'rgba(240, 165, 0, 0.14)' },
  Transport: { color: '#9b7bff', tint: 'rgba(155, 123, 255, 0.14)' },
  Entertainment: { color: '#4e9af1', tint: 'rgba(78, 154, 241, 0.14)' },
  Healthcare: { color: '#ff7043', tint: 'rgba(255, 112, 67, 0.14)' },
  Utilities: { color: '#26c6da', tint: 'rgba(38, 198, 218, 0.14)' },
  Shopping: { color: '#ec407a', tint: 'rgba(236, 64, 122, 0.14)' },
  Freelance: { color: '#66bb6a', tint: 'rgba(102, 187, 106, 0.14)' },
  Investment: { color: '#ffa726', tint: 'rgba(255, 167, 38, 0.14)' },
  Other: { color: '#8d6e63', tint: 'rgba(141, 110, 99, 0.14)' },
};

export const mockTransactions: Transaction[] = [
  { id: 1, notes: 'March Salary', amount: 5500, type: 'income', category: 'Salary', date: '2024-03-01' },
  { id: 2, notes: 'Apartment Rent', amount: 1200, type: 'expense', category: 'Rent', date: '2024-03-03' },
  { id: 3, notes: 'Grocery Shopping', amount: 180, type: 'expense', category: 'Food', date: '2024-03-05' },
  { id: 4, notes: 'Uber rides', amount: 45, type: 'expense', category: 'Transport', date: '2024-03-07' },
  { id: 5, notes: 'Netflix + Spotify', amount: 28, type: 'expense', category: 'Entertainment', date: '2024-03-08' },
  { id: 6, notes: 'Freelance project', amount: 1200, type: 'income', category: 'Freelance', date: '2024-03-10' },
  { id: 7, notes: 'Doctor visit', amount: 90, type: 'expense', category: 'Healthcare', date: '2024-03-12' },
  { id: 8, notes: 'Electric bill', amount: 110, type: 'expense', category: 'Utilities', date: '2024-03-14' },
  { id: 9, notes: 'Online shopping', amount: 230, type: 'expense', category: 'Shopping', date: '2024-03-15' },
  { id: 10, notes: 'Stock dividends', amount: 340, type: 'income', category: 'Investment', date: '2024-03-18' },
  { id: 11, notes: 'Restaurant dinner', amount: 85, type: 'expense', category: 'Food', date: '2024-03-19' },
  { id: 12, notes: 'Bus pass', amount: 35, type: 'expense', category: 'Transport', date: '2024-03-20' },
  { id: 13, notes: 'Consulting fee', amount: 800, type: 'income', category: 'Freelance', date: '2024-02-28' },
  { id: 14, notes: 'February Salary', amount: 5500, type: 'income', category: 'Salary', date: '2024-02-01' },
  { id: 15, notes: 'Feb Rent', amount: 1200, type: 'expense', category: 'Rent', date: '2024-02-03' },
  { id: 16, notes: 'Grocery run', amount: 155, type: 'expense', category: 'Food', date: '2024-02-10' },
  { id: 17, notes: 'Gym membership', amount: 50, type: 'expense', category: 'Healthcare', date: '2024-02-15' },
  { id: 18, notes: 'January Salary', amount: 5500, type: 'income', category: 'Salary', date: '2024-01-01' },
  { id: 19, notes: 'Jan Rent', amount: 1200, type: 'expense', category: 'Rent', date: '2024-01-03' },
  { id: 20, notes: 'Bonus payment', amount: 1500, type: 'income', category: 'Salary', date: '2024-01-20' },
];

export const mockUsers = [
  { id: 1, name: 'Alex Morgan', email: 'alex@finflow.com', role: 'admin' as Role, status: 'active', initials: 'AM', color: '#00d4b1' },
  { id: 2, name: 'Jordan Kim', email: 'jordan@finflow.com', role: 'analyst' as Role, status: 'active', initials: 'JK', color: '#f0a500' },
  { id: 3, name: 'Sam Rivera', email: 'sam@finflow.com', role: 'viewer' as Role, status: 'active', initials: 'SR', color: '#9b7bff' },
  { id: 4, name: 'Casey Park', email: 'casey@finflow.com', role: 'viewer' as Role, status: 'inactive', initials: 'CP', color: '#ff4d6d' },
  { id: 5, name: 'Morgan Lee', email: 'morgan@finflow.com', role: 'analyst' as Role, status: 'active', initials: 'ML', color: '#4e9af1' },
];

export const roleNames: Record<Role, string> = {
  admin: 'Admin User',
  analyst: 'Jordan Kim',
  viewer: 'Sam Rivera',
};

export const roleInitials: Record<Role, string> = {
  admin: 'A',
  analyst: 'JK',
  viewer: 'S',
};
