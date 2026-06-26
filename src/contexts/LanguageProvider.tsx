import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { LanguageContext, dictionaries, type Language } from './LanguageContext';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('kn-lang');
    return (saved === 'en' || saved === 'vi') ? saved : 'vi';
  });

  useEffect(() => {
    localStorage.setItem('kn-lang', language);
    document.documentElement.lang = language;
    document.title = 'Kn';
  }, [language]);

  const t = (key: string) => {
    return dictionaries[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
