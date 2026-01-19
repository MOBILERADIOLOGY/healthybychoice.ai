'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/30">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="font-bold text-xl text-slate-800">{t('site.name')}</span>
            </Link>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Link 
                href="/quiz" 
                className="hidden md:block bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-teal-500/30 transition-all"
              >
                {t('nav.quiz')}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-teal-100 to-teal-200 text-teal-700 rounded-full text-sm font-semibold mb-6">
              🔬 {t('hero.badge')}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 mb-6 leading-tight">
              {t('hero.title')} <span className="text-teal-500">{t('hero.titleHighlight')}</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <Link 
              href="/quiz" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-teal-500/30 hover:-translate-y-1 transition-all"
            >
              {t('hero.cta')}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="text-sm text-slate-500 mt-4">{t('hero.ctaNote')}</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">{t('features.title')}</h2>
            <p className="text-slate-600 text-lg">{t('features.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['weight', 'energy', 'immunity', 'digestion'].map((key) => (
              <div key={key} className="bg-gradient-to-br from-slate-50 to-teal-50 rounded-2xl p-6 border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center text-2xl mb-4">
                  {key === 'weight' && '⚖️'}
                  {key === 'energy' && '⚡'}
                  {key === 'immunity' && '🛡️'}
                  {key === 'digestion' && '🌱'}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{t(`features.${key}.title`)}</h3>
                <p className="text-slate-600 text-sm">{t(`features.${key}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">{t('howItWorks.title')}</h2>
            <p className="text-slate-600 text-lg">{t('howItWorks.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {['step1', 'step2', 'step3'].map((step, i) => (
              <div key={step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4 shadow-lg shadow-teal-500/30">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{t(`howItWorks.${step}.title`)}</h3>
                <p className="text-slate-600">{t(`howItWorks.${step}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            {t('cta.title')} <span className="text-teal-400">{t('cta.titleHighlight')}</span>
          </h2>
          <p className="text-slate-300 text-lg mb-8">{t('cta.subtitle')}</p>
          <Link 
            href="/quiz" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-400 to-teal-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-teal-500/30 hover:-translate-y-1 transition-all"
          >
            {t('cta.button')}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <p className="text-sm text-slate-400 mt-4">{t('cta.note')}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="font-bold text-slate-800">{t('site.name')}</span>
            </div>
            <div className="flex gap-6 text-sm text-slate-500">
              <Link href="/privacy" className="hover:text-teal-600 transition-colors">{t('footer.privacy')}</Link>
              <Link href="/terms" className="hover:text-teal-600 transition-colors">{t('footer.terms')}</Link>
              <Link href="/contact" className="hover:text-teal-600 transition-colors">{t('footer.contact')}</Link>
            </div>
            <p className="text-sm text-slate-400">{t('footer.madeWith')}</p>
          </div>
          <div className="text-center mt-8 text-xs text-slate-400">
            <p>{t('footer.disclaimer')}</p>
            <p className="mt-2">{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
