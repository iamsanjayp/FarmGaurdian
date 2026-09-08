import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, type Language } from './translations';


interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (path: string, fallback?: string) => any;
  isMarathi: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'agricare_language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'mr') {
      return saved;
    }
    // Default to Marathi as requested by user
    return 'mr';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
  };

  const toggleLanguage = () => {
    setLanguageState(prev => (prev === 'mr' ? 'en' : 'mr'));
  };

  const t = (path: string, fallback?: string): any => {
    const keys = path.split('.');
    let current: any = translations[language];

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        // Fallback to English if missing in Marathi
        let engFallback: any = translations['en'];
        for (const fKey of keys) {
          if (engFallback && typeof engFallback === 'object' && fKey in engFallback) {
            engFallback = engFallback[fKey];
          } else {
            engFallback = undefined;
            break;
          }
        }
        return engFallback !== undefined ? engFallback : (fallback || path);
      }
    }

    return current !== undefined ? current : (fallback || path);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        isMarathi: language === 'mr',
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
