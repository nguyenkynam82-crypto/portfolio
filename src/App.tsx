import { useEffect, Suspense, lazy } from 'react';
import Lenis from 'lenis';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Preloader } from './components/ui/Preloader';
import { MusicPlayer } from './components/features/MusicPlayer';
import { LanguageProvider } from './contexts/LanguageProvider';
import { setLenis } from './lib/lenis';

import { HomePage } from './components/pages/HomePage';
const LegalLayout = lazy(() => import('./components/pages/LegalLayout').then(module => ({ default: module.LegalLayout })));

const getPrivacyHtml = (lang: 'vi' | 'en') => (lang === 'vi'
  ? import('./legal/vi/Privacy Policy.html?raw')
  : import('./legal/Privacy Policy.html?raw')).then(m => m.default);
const getTermsHtml = (lang: 'vi' | 'en') => (lang === 'vi'
  ? import('./legal/vi/Terms of Service.html?raw')
  : import('./legal/Terms of Service.html?raw')).then(m => m.default);
const getCookiesHtml = (lang: 'vi' | 'en') => (lang === 'vi'
  ? import('./legal/vi/Cookies Policy.html?raw')
  : import('./legal/Cookies Policy.html?raw')).then(m => m.default);
const getDisclaimerHtml = (lang: 'vi' | 'en') => (lang === 'vi'
  ? import('./legal/vi/Disclaimer.html?raw')
  : import('./legal/Disclaimer.html?raw')).then(m => m.default);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    setLenis(lenis);

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LanguageProvider>
        <HashRouter>
          <div className="relative min-h-screen w-full bg-background overflow-x-clip flex flex-col font-body text-foreground">
            <button
              type="button"
              className="skip-link"
              onClick={() => {
                const m = document.getElementById('main-content');
                if (m) { m.focus(); m.scrollIntoView(); }
              }}
            >
              Đến nội dung chính
            </button>
            <Preloader />

            <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/privacy-policy" element={<LegalLayout getHtmlContent={getPrivacyHtml} />} />
                <Route path="/terms-of-service" element={<LegalLayout getHtmlContent={getTermsHtml} />} />
                <Route path="/cookies-policy" element={<LegalLayout getHtmlContent={getCookiesHtml} />} />
                <Route path="/disclaimer" element={<LegalLayout getHtmlContent={getDisclaimerHtml} />} />
              </Routes>
            </Suspense>

            <MusicPlayer />
          </div>
        </HashRouter>
    </LanguageProvider>
  );
}

export default App;
