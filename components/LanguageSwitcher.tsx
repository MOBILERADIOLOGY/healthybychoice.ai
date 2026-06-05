'use client';

import { useLanguage } from '@/lib/language-context';
import { Locale } from '@/lib/i18n-config';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  
  return (
    <div className="flex items-center gap-0 bg-parchment-200 rounded-none border border-gold-500/40 overflow-hidden">
      <button
        onClick={() => setLocale('en')}
        className={`px-4 py-2 text-xs font-smallcaps tracking-widest transition-all uppercase ${
          locale === 'en'
            ? 'bg-ink-600 text-parchment-100'
            : 'text-ink-400 hover:text-gold-700 hover:bg-parchment-100'
        }`}
        aria-label="English"
        style={{ fontFamily: 'var(--font-cormorant-sc)' }}
      >
        EN
      </button>
      <div className="w-px h-6 bg-gold-500/30"></div>
      <button
        onClick={() => setLocale('es')}
        className={`px-4 py-2 text-xs font-smallcaps tracking-widest transition-all uppercase ${
          locale === 'es'
            ? 'bg-ink-600 text-parchment-100'
            : 'text-ink-400 hover:text-gold-700 hover:bg-parchment-100'
        }`}
        aria-label="Español"
        style={{ fontFamily: 'var(--font-cormorant-sc)' }}
      >
        ES
      </button>
    </div>
  );
}

// Compact version for mobile
export function LanguageSwitcherCompact() {
  const { locale, setLocale } = useLanguage();
  
  const toggleLanguage = () => {
    setLocale(locale === 'en' ? 'es' : 'en');
  };
  
  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 bg-parchment-200 hover:bg-parchment-300 border border-gold-500/40 text-xs tracking-widest uppercase transition-all"
      aria-label="Toggle language"
      style={{ fontFamily: 'var(--font-cormorant-sc)' }}
    >
      <span className="text-ink-600">{locale === 'en' ? 'EN' : 'ES'}</span>
    </button>
  );
}
