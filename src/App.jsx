import { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PDFViewer from './components/PDFViewer';
import Controls from './components/Controls';

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
  };

  const handleLoadFile = (blobUrl) => {
    setSrc(blobUrl);
    setRecent((r) => [blobUrl, ...r.filter((i) => i !== blobUrl)].slice(0, 5));
  };

  const onZoomIn = () => setZoom((z) => Math.min(2, z + 0.1));
  const onZoomOut = () => setZoom((z) => Math.max(0.5, z - 0.1));
  const onRotate = () => setRotation((r) => (r + 90) % 360);
  const toggleTheme = () => setIsDark((v) => !v);

  return (
    <div className="h-screen w-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <Header onSetUrl={handleSetUrl} onLoadFile={handleLoadFile} />
      <div className="flex-1 flex min-h-0">
        <Sidebar recent={recent} onPick={handleSetUrl} />
        <main ref={stageRef} className="relative flex-1 min-w-0">
          <PDFViewer src={src} zoom={zoom} rotation={rotation} />
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20">
            <Controls
              onZoomIn={onZoomIn}
              onZoomOut={onZoomOut}
              onRotate={onRotate}
              isDark={isDark}
              toggleTheme={toggleTheme}
              fullscreenRef={stageRef}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
