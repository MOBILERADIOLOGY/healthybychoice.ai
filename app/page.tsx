'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
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
                className="hidden md:block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all hover:-translate-y-0.5"
              >
                {t('nav.quiz')}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
              🔬 {t('hero.badge')}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 mb-6 leading-tight">
              {t('hero.title')} <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">{t('hero.titleHighlight')}</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <Link 
              href="/quiz" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-1 transition-all"
            >
              {t('hero.cta')}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="text-sm text-slate-500 mt-4">{t('hero.ctaNote')}</p>
            
            {/* Trust badge */}
            <div className="mt-10 flex items-center justify-center gap-2">
              <div className="flex -space-x-2">
                {['😊', '🌟', '💚', '✨', '🎯'].map((emoji, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-sm border-2 border-white shadow-sm">
                    {emoji}
                  </div>
                ))}
              </div>
              <span className="text-sm text-slate-600 ml-2">{t('hero.trusted')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">{t('features.title')}</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">{t('features.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { key: 'weight', icon: '⚖️', color: 'from-emerald-400 to-emerald-500' },
              { key: 'energy', icon: '⚡', color: 'from-amber-400 to-orange-500' },
              { key: 'immunity', icon: '🛡️', color: 'from-teal-400 to-cyan-500' },
              { key: 'digestion', icon: '🌱', color: 'from-green-400 to-emerald-500' },
            ].map(({ key, icon, color }) => (
              <div key={key} className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  {icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{t(`features.${key}.title`)}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{t(`features.${key}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 via-white to-amber-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">{t('howItWorks.title')}</h2>
            <p className="text-slate-600 text-lg">{t('howItWorks.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: 'step1', num: 1, color: 'from-emerald-500 to-teal-500' },
              { step: 'step2', num: 2, color: 'from-amber-500 to-orange-500' },
              { step: 'step3', num: 3, color: 'from-teal-500 to-cyan-500' },
            ].map(({ step, num, color }) => (
              <div key={step} className="text-center group">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform`}>
                  {num}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{t(`howItWorks.${step}.title`)}</h3>
                <p className="text-slate-600">{t(`howItWorks.${step}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-amber-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            {t('cta.title')} <span className="text-amber-300">{t('cta.titleHighlight')}</span>
          </h2>
          <p className="text-emerald-100 text-lg mb-8">{t('cta.subtitle')}</p>
          <Link 
            href="/quiz" 
            className="inline-flex items-center gap-2 bg-white text-emerald-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            {t('cta.button')}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <p className="text-sm text-emerald-200 mt-4">{t('cta.note')}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="font-bold text-slate-800">{t('site.name')}</span>
            </div>
            <div className="flex gap-6 text-sm text-slate-500">
              <Link href="/privacy" className="hover:text-emerald-600 transition-colors">{t('footer.privacy')}</Link>
              <Link href="/terms" className="hover:text-emerald-600 transition-colors">{t('footer.terms')}</Link>
              <Link href="/contact" className="hover:text-emerald-600 transition-colors">{t('footer.contact')}</Link>
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
