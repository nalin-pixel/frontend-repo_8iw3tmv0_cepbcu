// Slide-mode PDF viewer: uses native PDF fragment "#page=" to navigate pages inside the embed.
// This avoids heavy parsers and works in most modern browsers.
import { useMemo } from 'react';

export default function SlideViewer({ src, page = 1, zoom = 1, rotation = 0 }) {
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

  return (
    <div className="relative w-full h-full overflow-auto bg-slate-50 dark:bg-slate-950">
      {src ? (
        <div className="flex justify-center py-6">
          <div
            className="shadow-2xl rounded-lg overflow-hidden bg-white dark:bg-slate-900"
            style={{ transform: `scale(${zoom}) rotate(${rotation}deg)`, transformOrigin: 'top center' }}
          >
            <embed src={computedSrc} type="application/pdf" className="w-[1200px] h-[800px]" />
          </div>
        </div>
      ) : (
        <EmptyState />
      )}
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
