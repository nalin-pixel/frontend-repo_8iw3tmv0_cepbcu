import { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PDFViewer from './components/PDFViewer';
import SlideViewer from './components/SlideViewer';
import Controls from './components/Controls';
import Pagination from './components/Pagination';
import ModeToggle from './components/ModeToggle';

function App() {
  const [src, setSrc] = useState('');
  const [recent, setRecent] = useState(() => {
    const raw = localStorage.getItem('recent-pdfs');
    return raw ? JSON.parse(raw) : [];
  });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isDark, setIsDark] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  ));
  const [mode, setMode] = useState('read'); // 'read' | 'slide'
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(null); // unknown without parser
  const stageRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('recent-pdfs', JSON.stringify(recent.slice(0, 5)));
  }, [recent]);

  const handleSetUrl = (url) => {
    setSrc(url);
    setRecent((r) => [url, ...r.filter((i) => i !== url)].slice(0, 5));
    setPage(1);
  };

  const handleLoadFile = (blobUrl) => {
    setSrc(blobUrl);
    setRecent((r) => [blobUrl, ...r.filter((i) => i !== blobUrl)].slice(0, 5));
    setPage(1);
  };

  const onZoomIn = () => setZoom((z) => Math.min(3, +(z + 0.1).toFixed(2)));
  const onZoomOut = () => setZoom((z) => Math.max(0.4, +(z - 0.1).toFixed(2)));
  const onRotate = () => setRotation((r) => (r + 90) % 360);
  const toggleTheme = () => setIsDark((v) => !v);

  const onPrev = () => setPage((p) => Math.max(1, p - 1));
  const onNext = () => setPage((p) => (pages ? Math.min(pages, p + 1) : p + 1));
  const onJump = (p) => setPage(Math.max(1, p));

  const changeMode = (next) => setMode(next);

  // Keyboard shortcuts for slide mode
  useEffect(() => {
    if (mode !== 'slide') return;

    const handler = (e) => {
      // Ignore when typing in inputs
      const tag = (e.target?.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || e.target?.isContentEditable) return;

      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ': // space
          e.preventDefault();
          onNext();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          onPrev();
          break;
        case 'Home':
          e.preventDefault();
          setPage(1);
          break;
        case 'End':
          if (pages) {
            e.preventDefault();
            setPage(pages);
          }
          break;
        case '+':
        case '=':
          onZoomIn();
          break;
        case '-':
        case '_':
          onZoomOut();
          break;
        case 'r':
        case 'R':
          onRotate();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [mode, pages]);

  // Double-click to toggle fullscreen anywhere in the stage
  const handleDoubleClick = async () => {
    if (!stageRef.current) return;
    if (!document.fullscreenElement) {
      await stageRef.current.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <Header onSetUrl={handleSetUrl} onLoadFile={handleLoadFile} />
      <div className="flex-1 flex min-h-0">
        <Sidebar recent={recent} onPick={handleSetUrl} />
        <main ref={stageRef} onDoubleClick={handleDoubleClick} className="relative flex-1 min-w-0">
          {mode === 'read' ? (
            <PDFViewer src={src} zoom={zoom} rotation={rotation} />
          ) : (
            <SlideViewer src={src} page={page} zoom={zoom} rotation={rotation} onNext={onNext} onPrev={onPrev} />
          )}

          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
            <Controls
              onZoomIn={onZoomIn}
              onZoomOut={onZoomOut}
              onRotate={onRotate}
              isDark={isDark}
              toggleTheme={toggleTheme}
              fullscreenRef={stageRef}
            />
            {mode === 'slide' && (
              <Pagination page={page} pages={pages} onPrev={onPrev} onNext={onNext} onJump={onJump} />
            )}
            <ModeToggle mode={mode} onToggle={changeMode} />
          </div>

          {mode === 'slide' && src && (
            <div className="pointer-events-none fixed top-4 left-1/2 -translate-x-1/2 z-20 text-xs px-2 py-1 rounded bg-slate-900/70 text-white dark:bg-white/70 dark:text-slate-900">
              Tip: ← / → or Space to change slides • Double‑click to toggle fullscreen
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
