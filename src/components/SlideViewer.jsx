// Slide-mode PDF viewer: uses native PDF fragment "#page=" to navigate pages inside the embed.
// Adds interactive click zones (left/right) to move between pages.
import { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SlideViewer({ src, page = 1, zoom = 1, rotation = 0, onNext, onPrev }) {
  const computedSrc = useMemo(() => {
    if (!src) return '';
    try {
      const u = new URL(src, window.location.href);
      // Preserve existing hash but ensure page is set
      const base = u.toString().split('#')[0];
      return `${base}#page=${page}`;
    } catch {
      // Fallback for blob: or invalid URLs
      const base = String(src).split('#')[0];
      return `${base}#page=${page}`;
    }
  }, [src, page]);

  if (!src) return <EmptyState />;

  return (
    <div className="relative w-full h-full overflow-auto bg-slate-50 dark:bg-slate-950">
      <div className="flex justify-center py-6">
        <div
          className="relative shadow-2xl rounded-lg overflow-hidden bg-white dark:bg-slate-900"
          style={{ transform: `scale(${zoom}) rotate(${rotation}deg)`, transformOrigin: 'top center' }}
        >
          <embed src={computedSrc} type="application/pdf" className="w-[1200px] h-[800px]" />

          {/* Interactive click zones */}
          <button
            aria-label="Previous slide"
            onClick={onPrev}
            className="group absolute left-0 top-0 h-full w-1/3 flex items-center justify-start focus:outline-none"
            style={{ background: 'linear-gradient(90deg, rgba(2,6,23,0.10) 0%, rgba(2,6,23,0.00) 100%)' }}
          >
            <span className="m-4 inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 opacity-0 group-hover:opacity-100 transition">
              <ChevronLeft size={18} />
            </span>
          </button>
          <button
            aria-label="Next slide"
            onClick={onNext}
            className="group absolute right-0 top-0 h-full w-1/3 flex items-center justify-end focus:outline-none"
            style={{ background: 'linear-gradient(270deg, rgba(2,6,23,0.10) 0%, rgba(2,6,23,0.00) 100%)' }}
          >
            <span className="m-4 inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 opacity-0 group-hover:opacity-100 transition">
              <ChevronRight size={18} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <div className="mx-auto w-24 h-24 rounded-2xl bg-gradient-to-tr from-indigo-500 via-sky-500 to-teal-400 animate-pulse" />
        <h2 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">No PDF loaded</h2>
        <p className="mt-1 text-slate-500 dark:text-slate-400 text-sm">Use the top bar to paste a link or upload a file.</p>
      </div>
    </div>
  );
}
