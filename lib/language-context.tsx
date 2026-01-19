'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale, defaultLocale, isValidLocale } from './i18n-config';

// Import translations directly
import en from '../locales/en/common.json';
import es from '../locales/es/common.json';

const translations: Record<Locale, typeof en> = { en, es };

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

export type { Locale };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage first
    const stored = localStorage.getItem('healthybychoice-locale');
    if (stored && isValidLocale(stored)) {
      setLocaleState(stored);
      return;
    }
    // Then check browser language
    const browserLang = navigator.language.split('-')[0];
    if (isValidLocale(browserLang)) {
      setLocaleState(browserLang);
      localStorage.setItem('healthybychoice-locale', browserLang);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('healthybychoice-locale', newLocale);
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: any = translations[locale];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    if (typeof value !== 'string') return key;
    
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (_, paramKey) => 
        String(params[paramKey] ?? `{{${paramKey}}}`)
      );
    }
    
    return value;
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ locale: defaultLocale, setLocale, t }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
