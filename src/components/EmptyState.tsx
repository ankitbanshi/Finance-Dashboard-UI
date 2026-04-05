import { Card } from './Card';
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded';

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Card className="flex min-h-[220px] items-center justify-center px-6 py-12 text-center">
      <div>
        <div className="mb-4 text-slate-500/70"><SearchOffRoundedIcon sx={{ fontSize: 52 }} /></div>
        <h3 className="font-display text-xl font-semibold text-white">{title}</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-slate-400">{description}</p>
      </div>
    </Card>
  );
}
