import { ChevronLeft, ChevronRight, Hash } from 'lucide-react';

export default function Pagination({ page, pages, onPrev, onNext, onJump }) {
  return (
    <div className="pointer-events-auto flex items-center gap-2 p-2 rounded-xl bg-slate-100/70 dark:bg-slate-900/70 backdrop-blur border border-slate-200 dark:border-slate-800 shadow-lg">
      <button
        onClick={onPrev}
        disabled={page <= 1}
        className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-white/80 dark:bg-slate-800/80 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm transition"
        title="Previous page"
      >
        <ChevronLeft size={18} />
      </button>
      <div className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
        <Hash size={14} className="text-slate-400" />
        <span className="font-medium">{page}</span>
        <span className="opacity-50">/</span>
        <span>{pages || '—'}</span>
      </div>
      <button
        onClick={onNext}
        disabled={pages ? page >= pages : false}
        className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-white/80 dark:bg-slate-800/80 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm transition"
        title="Next page"
      >
        <ChevronRight size={18} />
      </button>
      {onJump && (
        <input
          type="number"
          min={1}
          max={pages || undefined}
          placeholder="Go to"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const num = Number(e.currentTarget.value);
              if (!Number.isNaN(num) && num >= 1) onJump(num);
              e.currentTarget.value = '';
            }
          }}
          className="ml-2 w-24 text-sm px-2 py-2 rounded-md bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 text-slate-900 dark:text-white placeholder-slate-400"
        />
      )}
    </div>
  );
}
