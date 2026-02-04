'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import ptBR from '@/translations/pt-BR.json';
import en from '@/translations/en.json';

export type Language = 'pt-BR' | 'en';

type TranslationValue = string | string[] | Record<string, unknown>;

interface Translations {
  [key: string]: TranslationValue | Translations;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string | string[];
  toggleLanguage: () => void;
}

const translations: Record<Language, Translations> = {
  'pt-BR': ptBR as Translations,
  'en': en as Translations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'preferred-language';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('pt-BR');
  const [mounted, setMounted] = useState(false);

  // Load saved language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (savedLanguage && (savedLanguage === 'pt-BR' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    }
    setMounted(true);
  }, []);

  // Save language preference when it changes
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    // Update html lang attribute for accessibility
    document.documentElement.lang = lang === 'pt-BR' ? 'pt-BR' : 'en';
  }, []);

  const toggleLanguage = useCallback(() => {
    const newLang = language === 'pt-BR' ? 'en' : 'pt-BR';
    setLanguage(newLang);
  }, [language, setLanguage]);

  // Translation function with nested key support (e.g., 'hero.title')
  const t = useCallback((key: string): string | string[] => {
    const keys = key.split('.');
    let value: unknown = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    if (typeof value === 'string' || Array.isArray(value)) {
      return value as string | string[];
    }

    console.warn(`Translation value is not a string or array: ${key}`);
    return key;
  }, [language]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Helper hook for getting typed translations
export function useTranslation() {
  const { t, language } = useLanguage();
  return { t, language };
}
