import { useEffect, useState } from 'react';
import { Navigation } from '../layout/Navigation';
import { Footer } from '../layout/Footer';
import { useLanguage, type Language } from '../../contexts/LanguageContext';

interface LegalLayoutProps {
  getHtmlContent: (lang: Language) => Promise<string>;
}

export function LegalLayout({ getHtmlContent }: LegalLayoutProps) {
  const { language } = useLanguage();
  const [htmlContent, setHtmlContent] = useState<string>('');

  useEffect(() => {
    window.scrollTo(0, 0);
    let cancelled = false;
    getHtmlContent(language).then((html) => {
      if (!cancelled) setHtmlContent(html);
    });
    return () => { cancelled = true; };
  }, [getHtmlContent, language]);

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-primary/30 selection:text-white">
      <Navigation />

      <main className="pt-40 pb-24 px-6 md:px-12 max-w-4xl mx-auto min-h-[70vh]">
        {htmlContent ? (
          <article
            className="prose prose-invert prose-p:text-white/70 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-headings:font-display prose-headings:font-medium prose-h1:text-4xl md:prose-h1:text-5xl prose-h2:text-2xl max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        ) : (
          <div className="flex justify-center items-center h-40">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
