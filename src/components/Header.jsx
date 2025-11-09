import { useRef } from 'react';
import { FileUp, Link2 } from 'lucide-react';

export default function Header({ onSetUrl, onLoadFile }) {
  const urlRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = urlRef.current?.value?.trim();
    if (url) onSetUrl(url);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const blobUrl = URL.createObjectURL(file);
      onLoadFile(blobUrl);
    }
  };

  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/75 dark:bg-slate-900/75 border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-500 via-sky-500 to-teal-400" />
          <div>
            <h1 className="text-slate-900 dark:text-white font-semibold leading-tight">Sleek PDF Viewer</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 -mt-0.5">Fast. Minimal. Beautiful.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 mx-4 hidden md:flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Link2 size={18} />
            </span>
            <input
              ref={urlRef}
              type="url"
              placeholder="Paste a PDF URL and press Enter..."
              className="w-full pl-9 pr-3 py-2 rounded-md bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 text-sm text-slate-900 dark:text-white placeholder-slate-400"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-2 text-sm rounded-md bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 transition"
          >
            Load
          </button>
        </form>

        <div className="flex items-center gap-2">
          <label
            htmlFor="pdf-file"
            className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 cursor-pointer"
          >
            <FileUp size={16} />
            Open PDF
          </label>
          <input
            id="pdf-file"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </header>
  );
}
