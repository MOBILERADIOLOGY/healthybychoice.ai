'use client';

import { useLanguage } from '@/lib/language-context';
import { Locale } from '@/lib/i18n-config';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-slate-100 rounded-full p-1">
      <button
        onClick={() => setLocale('en')}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
          locale === 'en'
            ? 'bg-white text-slate-800 shadow-sm'
            : 'text-slate-500 hover:text-slate-700'
        }`}
        aria-label="English"
      >
        🇺🇸 EN
      </button>
      <button
        onClick={() => setLocale('es')}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
          locale === 'es'
            ? 'bg-white text-slate-800 shadow-sm'
            : 'text-slate-500 hover:text-slate-700'
        }`}
        aria-label="Español"
      >
        🇪🇸 ES
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
      className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-sm font-medium transition-all"
      aria-label="Toggle language"
    >
      <span>{locale === 'en' ? '🇺🇸' : '🇪🇸'}</span>
      <span className="text-slate-600">{locale === 'en' ? 'EN' : 'ES'}</span>
    </button>
  );
}
