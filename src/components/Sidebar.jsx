import { BookOpen, FileText, History } from 'lucide-react';

export default function Sidebar({ recent, onPick }) {
  return (
    <aside className="hidden md:flex w-64 shrink-0 h-full border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="p-4 w-full">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={18} className="text-sky-500" />
          <h3 className="font-medium text-slate-900 dark:text-white">Recently opened</h3>
        </div>
        <ul className="space-y-2">
          {recent.length === 0 && (
            <li className="text-sm text-slate-500 dark:text-slate-400">No history yet. Load a PDF to get started.</li>
          )}
          {recent.map((item, idx) => (
            <li key={`${item}-${idx}`}>
              <button
                onClick={() => onPick(item)}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800/60 text-sm flex items-center gap-2"
                title={item}
              >
                <FileText size={16} className="text-slate-400" />
                <span className="truncate">{item}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <History size={14} />
          <span>Stores last 5 items</span>
        </div>
      </div>
    </aside>
  );
}
