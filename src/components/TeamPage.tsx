import { Card } from './Card';
import { mockUsers } from '../data/mock';

export function TeamPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {mockUsers.map((user) => (
        <Card key={user.id} className="p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl font-display text-lg font-bold" style={{ background: `${user.color}20`, color: user.color }}>
              {user.initials}
            </div>
            <div className="min-w-0">
              <div className="truncate text-lg font-semibold text-white">{user.name}</div>
              <div className="truncate text-sm font-mono text-slate-500">{user.email}</div>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono uppercase tracking-[0.18em] text-slate-300">{user.role}</span>
            <span className="text-sm text-slate-400">{user.status}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
