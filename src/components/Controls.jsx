import { ZoomIn, ZoomOut, RotateCw, Moon, Sun, Maximize2, Minimize2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Controls({ onZoomIn, onZoomOut, onRotate, isDark, toggleTheme, fullscreenRef }) {
  const [isFs, setIsFs] = useState(false);

  useEffect(() => {
    const onChange = () => setIsFs(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const toggleFs = async () => {
    if (!fullscreenRef?.current) return;
    if (!document.fullscreenElement) {
      await fullscreenRef.current.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  const Btn = ({ children, onClick, title }) => (
    <button
      onClick={onClick}
      title={title}
      className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm transition"
    >
      {children}
    </button>
  );

  return (
    <div className="pointer-events-auto flex items-center gap-2 p-2 rounded-xl bg-slate-100/70 dark:bg-slate-900/70 backdrop-blur border border-slate-200 dark:border-slate-800 shadow-lg">
      <Btn onClick={onZoomOut} title="Zoom out"><ZoomOut size={18} /></Btn>
      <Btn onClick={onZoomIn} title="Zoom in"><ZoomIn size={18} /></Btn>
      <Btn onClick={onRotate} title="Rotate"><RotateCw size={18} /></Btn>
      <span className="w-px h-6 bg-slate-300 dark:bg-slate-700" />
      <Btn onClick={toggleTheme} title="Toggle theme">
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </Btn>
      <Btn onClick={toggleFs} title="Fullscreen">
        {isFs ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
      </Btn>
    </div>
  );
}
