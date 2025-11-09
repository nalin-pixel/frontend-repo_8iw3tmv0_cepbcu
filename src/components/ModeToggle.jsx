import { Monitor, BookOpen } from 'lucide-react';

export default function ModeToggle({ mode, onToggle }) {
  const isSlide = mode === 'slide';
  return (
    <div className="inline-flex items-center gap-2 p-2 rounded-xl bg-slate-100/70 dark:bg-slate-900/70 backdrop-blur border border-slate-200 dark:border-slate-800 shadow-lg">
      <button
        onClick={() => onToggle('read')}
        className={`inline-flex items-center gap-2 h-9 px-3 rounded-md border text-sm transition ${
          !isSlide
            ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white'
            : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
        }`}
        title="Read mode"
      >
        <BookOpen size={16} />
        Read
      </button>
      <button
        onClick={() => onToggle('slide')}
        className={`inline-flex items-center gap-2 h-9 px-3 rounded-md border text-sm transition ${
          isSlide
            ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white'
            : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
        }`}
        title="Slide mode"
      >
        <Monitor size={16} />
        Slide
      </button>
    </div>
  );
}
