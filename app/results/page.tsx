'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { useLanguage } from '@/lib/language-context'
import LanguageSwitcher from '@/components/LanguageSwitcher'

interface Answers {
  goal?: string
  diet?: string
  sugar?: string
  fiber?: string
  fermented?: string
  bloating?: string
  stress?: string
  sleep?: string
  antibiotics?: string
  meals?: string
}

interface AIAnalysis {
  microbiomeSnapshot: string
  goalConnection: string
  keyFindings: Array<{ type: string; title: string; description: string }>
  topRecommendations: string[]
  foodsToAdd: string[]
  foodsToAvoid: string[]
  personalizedTips: string
}

const planPrices: Record<string, string> = {
  starter: '5.99',
  standard: '9.99',
  premium: '14.99',
  complete: '19.99',
}

const planAmounts: Record<string, number> = {
  starter: 599,
  standard: 999,
  premium: 1499,
  complete: 1999,
}

declare global {
  interface Window {
    Square: any
  }
}

export default function ResultsPage() {
  const { t, locale } = useLanguage()
  const [answers, setAnswers] = useState<Answers | null>(null)
  const [showFullReport, setShowFullReport] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [paymentError, setPaymentError] = useState('')
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null)
  const [isLoadingAI, setIsLoadingAI] = useState(false)
  const [squareLoaded, setSquareLoaded] = useState(false)
  const [card, setCard] = useState<any>(null)
  const [selectedPlan, setSelectedPlan] = useState<string>('standard')
  const [purchasedPlan, setPurchasedPlan] = useState<string>('')
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [upgradeCard, setUpgradeCard] = useState<any>(null)

  useEffect(() => {
    const stored = localStorage.getItem('quizAnswers')
    if (stored) {
      setAnswers(JSON.parse(stored))
    }
    
    // Check for pre-calculated score from interactive quiz
    const storedScore = localStorage.getItem('quizScore')
    if (storedScore) {
      // Score already shown in quiz, user is here to see report
    }
    
    const paid = localStorage.getItem('reportPaid')
    const plan = localStorage.getItem('purchasedPlan') || 'standard'
    if (paid === 'true') {
      setShowFullReport(true)
      setPurchasedPlan(plan)
      loadAIAnalysis(JSON.parse(stored || '{}'))
    }
  }, [])

  useEffect(() => {
    if (squareLoaded && !card && !showFullReport) {
      initializeSquare()
    }
  }, [squareLoaded, showFullReport])

  useEffect(() => {
    if (showUpgradeModal && squareLoaded) {
      setTimeout(() => {
        initializeUpgradeSquare()
      }, 100)
    }
  }, [showUpgradeModal, squareLoaded])

  const initializeSquare = async () => {
    try {
      const payments = window.Square.payments(
        process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID,
        process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID
      )
      const cardInstance = await payments.card()
      await cardInstance.attach('#card-container')
      setCard(cardInstance)
    } catch (error) {
      console.error('Square initialization error:', error)
    }
  }

  const initializeUpgradeSquare = async () => {
    try {
      const payments = window.Square.payments(
        process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID,
        process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID
      )
      const cardInstance = await payments.card()
      await cardInstance.attach('#upgrade-card-container')
      setUpgradeCard(cardInstance)
    } catch (error) {
      console.error('Square upgrade initialization error:', error)
    }
  }

  const loadAIAnalysis = async (quizAnswers: Answers) => {
    setIsLoadingAI(true)
    try {
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: quizAnswers }),
      })
      const data = await response.json()
      if (data.success) {
        setAiAnalysis(data.analysis)
      }
    } catch (error) {
      console.error('AI analysis error:', error)
    }
    setIsLoadingAI(false)
  }

  const handlePayment = async () => {
    if (!card) {
      setPaymentError('Payment form not ready. Please refresh the page.')
      return
    }

    setIsProcessingPayment(true)
    setPaymentError('')

    try {
      const result = await card.tokenize()
      if (result.status !== 'OK') {
        throw new Error(result.errors?.[0]?.message || 'Payment failed')
      }

      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          sourceId: result.token,
          amount: planAmounts[selectedPlan]
        }),
      })

      const data = await response.json()
      if (data.success) {
        localStorage.setItem('reportPaid', 'true')
        localStorage.setItem('purchasedPlan', selectedPlan)
        setPurchasedPlan(selectedPlan)
        setShowFullReport(true)
        loadAIAnalysis(answers!)
      } else {
        throw new Error(data.error || 'Payment failed')
      }
    } catch (error: any) {
      setPaymentError(error.message)
    }
    setIsProcessingPayment(false)
  }

  const handleUpgradePayment = async () => {
    if (!upgradeCard) {
      setPaymentError('Payment form not ready. Please wait a moment and try again.')
      return
    }

    setIsProcessingPayment(true)
    setPaymentError('')

    const upgradeAmount = 1999 - (planAmounts[purchasedPlan] || 999)

    try {
      const result = await upgradeCard.tokenize()
      if (result.status !== 'OK') {
        throw new Error(result.errors?.[0]?.message || 'Payment failed')
      }

      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          sourceId: result.token,
          amount: upgradeAmount
        }),
      })

      const data = await response.json()
      if (data.success) {
        localStorage.setItem('purchasedPlan', 'complete')
        setPurchasedPlan('complete')
        setShowUpgradeModal(false)
        window.location.reload()
      } else {
        throw new Error(data.error || 'Payment failed')
      }
    } catch (error: any) {
      setPaymentError(error.message)
    }
    setIsProcessingPayment(false)
  }

  const calculateScore = () => {
    if (!answers) return 50
    let score = 50
    if (answers.diet === 'whole' || answers.diet === 'plant') score += 15
    else if (answers.diet === 'mixed') score += 5
    else if (answers.diet === 'processed') score -= 10
    if (answers.sugar === 'rarely') score += 10
    else if (answers.sugar === 'daily-multiple') score -= 15
    if (answers.fiber === 'multiple') score += 15
    else if (answers.fiber === 'rarely') score -= 10
    if (answers.fermented === 'daily') score += 10
    if (answers.bloating === 'rarely') score += 10
    else if (answers.bloating === 'daily') score -= 15
    if (answers.stress === 'minimal') score += 5
    else if (answers.stress === 'high') score -= 10
    if (answers.sleep === '7-plus') score += 10
    else if (answers.sleep === 'less-5') score -= 10
    if (answers.antibiotics === 'multiple') score -= 15
    return Math.max(10, Math.min(90, score))
  }

  if (!answers) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-coral-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">No Quiz Results Found</h2>
          <Link href="/quiz" className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-full font-semibold">
            {t('nav.quiz')}
          </Link>
        </div>
      </main>
    )
  }

  const score = calculateScore()
  const scoreLabel = score >= 70 ? t('results.score.good') : score >= 50 ? t('results.score.moderate') : t('results.score.needsAttention')
  const scoreColor = score >= 70 ? 'from-green-400 to-green-500' : score >= 50 ? 'from-amber-400 to-amber-500' : 'from-red-400 to-red-500'

  const hasResetProtocol = ['standard', 'premium', 'complete'].includes(purchasedPlan)
  const hasProbiotics = ['premium', 'complete'].includes(purchasedPlan)
  const hasFastingProtocol = purchasedPlan === 'complete'

  const upgradePrice = (19.99 - parseFloat(planPrices[purchasedPlan] || '9.99')).toFixed(2)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      <Script
        src="https://web.squarecdn.com/v1/square.js"
        onLoad={() => setSquareLoaded(true)}
      />

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
              {purchasedPlan && (
                <span className="text-sm font-semibold text-teal-600 bg-teal-100 px-4 py-2 rounded-full">
                  ✓ {t(`plans.${purchasedPlan}`)}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-teal-100 to-teal-200 text-teal-700 rounded-full text-sm font-semibold mb-4">
            ✨ {t('results.ready')}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
            {t('results.title')} <span className="text-teal-500">{t('results.titleHighlight')}</span>
          </h1>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-8 text-center">
          <h2 className="text-lg text-slate-500 mb-4">{t('results.score.label')}</h2>
          <div className={`text-7xl font-extrabold bg-gradient-to-r ${scoreColor} bg-clip-text text-transparent mb-2`}>{score}</div>
          <div className={`text-lg font-semibold bg-gradient-to-r ${scoreColor} bg-clip-text text-transparent`}>{scoreLabel}</div>
          <div className="mt-6 h-4 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-red-400 via-amber-400 to-green-400 transition-all duration-1000" style={{ width: `${score}%` }}></div>
          </div>
        </div>

        {/* Goal Connection */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            {t('results.goal.title')} <span className="text-teal-500">{t(`goals.${answers.goal || 'weight'}`)}</span>
          </h2>
          <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl p-6">
            <p className="text-slate-600">
              {t('results.goal.connection', { goal: t(`goals.${answers.goal || 'weight'}`).toLowerCase() })}
            </p>
          </div>
        </div>

        {/* Payment Section (if not paid) */}
        {!showFullReport && (
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2 text-center">🔓 {t('results.unlock.title')}</h2>
              <p className="text-slate-300 text-center mb-6">{t('results.unlock.subtitle')}</p>

              <div className="bg-white/10 rounded-xl p-4 mb-6 text-center">
                <span className="font-semibold text-teal-400">💎 {t('results.unlock.totalValue')}</span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {['starter', 'standard', 'premium', 'complete'].map((plan) => {
                  const features: Record<string, string[]> = {
                    starter: [
                      locale === 'es' ? '→ Tu perfil de microbioma' : '→ Your microbiome profile',
                      locale === 'es' ? '→ Por qué te sientes así' : '→ Why you feel the way you do',
                      locale === 'es' ? '→ Primeros pasos personalizados' : '→ Your personalized first steps',
                    ],
                    standard: [
                      locale === 'es' ? '→ Todo en Starter, más...' : '→ Everything in Starter, plus...',
                      locale === 'es' ? '→ El reset de 14 días que transforma' : '→ The 14-day reset that transforms',
                      locale === 'es' ? '→ Alimentos que sanan vs dañan' : '→ Foods that heal vs harm',
                      locale === 'es' ? '→ Secretos de los aceites' : '→ The cooking oil secrets',
                    ],
                    premium: [
                      locale === 'es' ? '→ Todo en Standard, más...' : '→ Everything in Standard, plus...',
                      locale === 'es' ? '→ Los probióticos exactos para ti' : '→ The exact probiotics for YOU',
                      locale === 'es' ? '→ Suplementos que realmente funcionan' : '→ Supplements that actually work',
                      locale === 'es' ? '→ Recetas que reparan tu intestino' : '→ Recipes that repair your gut',
                    ],
                    complete: [
                      locale === 'es' ? '→ Todo en Premium, más...' : '→ Everything in Premium, plus...',
                      locale === 'es' ? '→ Ayuna como un profesional' : '→ Learn to fast like a pro',
                      locale === 'es' ? '→ Timing de comidas para resultados' : '→ Meal timing for real results',
                      locale === 'es' ? '→ Transforma tu estilo de vida' : '→ Transform your lifestyle forever',
                    ],
                  }
                  
                  return (
                    <button 
                      key={plan}
                      onClick={() => setSelectedPlan(plan)} 
                      className={`p-4 rounded-xl text-left transition-all relative flex flex-col ${
                        selectedPlan === plan 
                          ? plan === 'complete' 
                            ? 'bg-gradient-to-br from-amber-400 to-coral-500 text-white ring-2 ring-amber-300' 
                            : plan === 'standard'
                              ? 'bg-gradient-to-br from-teal-400 to-teal-500 text-white ring-2 ring-teal-300'
                              : 'bg-white text-slate-800 ring-2 ring-teal-400'
                          : plan === 'standard'
                            ? 'bg-teal-500/20 hover:bg-teal-500/30'
                            : plan === 'complete'
                              ? 'bg-gradient-to-br from-amber-500/20 to-coral-500/20 hover:from-amber-500/30 hover:to-coral-500/30'
                              : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      {plan === 'standard' && (
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-coral-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          {t('pricing.popular')}
                        </div>
                      )}
                      <div className={`text-xs font-semibold mb-1 ${selectedPlan === plan ? '' : 'text-teal-500'}`}>
                        {t(`plans.${plan}`)}
                      </div>
                      <div className="text-xl font-extrabold mb-3">${planPrices[plan]}</div>
                      <div className={`text-xs space-y-1 flex-grow ${selectedPlan === plan ? 'text-white/90' : 'text-slate-300'}`}>
                        {features[plan].map((feature, idx) => (
                          <div key={idx}>{feature}</div>
                        ))}
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="bg-white rounded-xl p-6 mb-4">
                <div id="card-container" className="mb-4"></div>
                {paymentError && <p className="text-red-500 text-sm mb-4">{paymentError}</p>}
                <button 
                  onClick={handlePayment} 
                  disabled={isProcessingPayment} 
                  className={`w-full py-4 rounded-xl font-bold text-lg disabled:opacity-50 transition-all ${
                    selectedPlan === 'complete' 
                      ? 'bg-gradient-to-r from-amber-500 to-coral-500 text-white' 
                      : 'bg-gradient-to-r from-teal-500 to-teal-600 text-white'
                  }`}
                >
                  {isProcessingPayment 
                    ? t('results.processing') 
                    : `🚀 ${t('results.unlock.getButton', { plan: t(`plans.${selectedPlan}`), price: planPrices[selectedPlan] })}`
                  }
                </button>
              </div>
              
              <p className="text-sm text-slate-400 text-center">🔒 {t('results.unlock.secure')}</p>
            </div>
          </div>
        )}

        {/* Full Report Content */}
        {showFullReport && (
          <>
            {/* Loading State */}
            {isLoadingAI && (
              <div className="bg-white rounded-2xl p-8 mb-8 text-center">
                <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-500">{t('results.generating')}</p>
              </div>
            )}

            {/* AI Analysis */}
            {aiAnalysis && (
              <div className="bg-white rounded-2xl border-2 border-teal-200 p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center text-2xl">🤖</div>
                  <h2 className="text-2xl font-bold text-slate-800">{t('results.aiAnalysis.title')}</h2>
                </div>
                
                <div className="bg-teal-50 rounded-xl p-6 mb-6">
                  <h3 className="font-semibold text-slate-700 mb-2">{t('results.aiAnalysis.snapshot')}</h3>
                  <p className="text-slate-600">{aiAnalysis.microbiomeSnapshot}</p>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-slate-700 mb-3">{t('results.aiAnalysis.recommendations')}</h3>
                  <ul className="space-y-2">
                    {aiAnalysis.topRecommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-teal-500">✓</span>
                        <span className="text-slate-600">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <h4 className="font-semibold text-green-700 mb-2">✅ {t('results.aiAnalysis.foodsToAdd')}</h4>
                    <ul className="text-sm text-green-600 space-y-1">
                      {aiAnalysis.foodsToAdd.map((food, i) => <li key={i}>• {food}</li>)}
                    </ul>
                  </div>
                  <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                    <h4 className="font-semibold text-red-700 mb-2">❌ {t('results.aiAnalysis.foodsToLimit')}</h4>
                    <ul className="text-sm text-red-600 space-y-1">
                      {aiAnalysis.foodsToAvoid.map((food, i) => <li key={i}>• {food}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* 14-Day Reset Protocol */}
            {hasResetProtocol && (
              <div className="bg-white rounded-2xl border-2 border-purple-200 p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-500 flex items-center justify-center text-2xl">🚀</div>
                  <h2 className="text-2xl font-bold text-slate-800">{t('results.resetProtocol.title')}</h2>
                </div>
                
                <div className="bg-red-50 rounded-xl p-6 mb-4 border border-red-200">
                  <h3 className="font-semibold text-red-700 mb-3">🚫 {t('results.resetProtocol.remove')}</h3>
                  <p className="text-red-600 text-sm">{t('results.resetProtocol.removeList')}</p>
                </div>

                <div className="bg-amber-50 rounded-xl p-6 mb-4 border border-amber-200">
                  <h3 className="font-semibold text-amber-700 mb-2">🔥 {t('results.resetProtocol.cooking')}</h3>
                  <p className="text-amber-600 text-sm">{t('results.resetProtocol.cookingTip')}</p>
                </div>

                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h3 className="font-semibold text-green-700 mb-2">✅ {t('results.resetProtocol.focus')}</h3>
                  <p className="text-green-600 text-sm">{t('results.resetProtocol.focusList')}</p>
                </div>
              </div>
            )}

            {/* Probiotic Guide */}
            {hasProbiotics && (
              <div className="bg-white rounded-2xl border-2 border-pink-200 p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center text-2xl">💊</div>
                  <h2 className="text-2xl font-bold text-slate-800">{t('results.probiotics.title')}</h2>
                </div>
                <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                  <ul className="text-purple-600 space-y-2 text-sm">
                    <li>• <strong>Lactobacillus rhamnosus GG</strong> — {t('results.probiotics.strain1').split('—')[1]}</li>
                    <li>• <strong>Bifidobacterium longum</strong> — {t('results.probiotics.strain2').split('—')[1]}</li>
                    <li>• <strong>Saccharomyces boulardii</strong> — {t('results.probiotics.strain3').split('—')[1]}</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Fasting Protocol (Complete plan only) */}
            {hasFastingProtocol && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-300 p-8 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-coral-500 flex items-center justify-center text-2xl">⏰</div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">{t('results.fasting.title')}</h2>
                    <p className="text-amber-600 text-sm font-semibold">⭐ {t('results.fasting.exclusive')}</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 mb-4 border border-amber-200">
                  <h3 className="font-bold text-slate-800 mb-4">🍽️ {t('results.fasting.twoMeal')}</h3>
                  <div className="space-y-3 text-sm">
                    <p><strong>1.</strong> {t('results.fasting.firstMeal')}</p>
                    <p><strong>2.</strong> {t('results.fasting.secondMeal')}</p>
                    <p className="text-red-600"><strong>✕</strong> {t('results.fasting.noEating')}</p>
                  </div>
                </div>

                <div className="bg-red-50 rounded-xl p-4 mb-4 border border-red-200">
                  <p className="text-red-600 text-sm"><strong>{t('results.fasting.betweenMeals')}</strong></p>
                </div>

                <div className="p-4 bg-amber-100 rounded-xl text-center border border-amber-300">
                  <p className="text-amber-800 font-semibold">🔁 {t('results.fasting.habit')}</p>
                </div>
              </div>
            )}

            {/* Clickable Upgrade Card */}
            {!hasFastingProtocol && (
              <>
                <button 
                  onClick={() => setShowUpgradeModal(true)}
                  className="w-full text-left bg-white rounded-2xl p-6 mb-8 border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-xl hover:shadow-amber-200/50 hover:-translate-y-1 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">⭐</span>
                        <h3 className="font-bold text-slate-800">{t('results.upsell.title')}</h3>
                      </div>
                      <p className="text-slate-600 mb-4 text-sm">
                        {t('results.upsell.description')}
                      </p>
                      <p className="text-amber-600 font-semibold">
                        {t('results.upsell.price', { price: upgradePrice })} →
                      </p>
                    </div>
                    <div className="text-amber-500 group-hover:translate-x-2 transition-transform">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>

                {/* Upgrade Payment Modal */}
                {showUpgradeModal && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-8 relative animate-fade-in">
                      <button 
                        onClick={() => setShowUpgradeModal(false)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      <div className="text-center mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-coral-500 flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg">
                          ⭐
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">{t('results.upgradeModal.title')}</h2>
                        <p className="text-slate-500">{t('results.upgradeModal.subtitle')}</p>
                      </div>

                      <div className="bg-amber-50 rounded-xl p-4 mb-6 border border-amber-200">
                        <h3 className="font-semibold text-amber-800 mb-2">{t('results.upgradeModal.whatYouGet')}</h3>
                        <ul className="text-sm text-amber-700 space-y-1">
                          <li>✓ {t('results.upgradeModal.feature1')}</li>
                          <li>✓ {t('results.upgradeModal.feature2')}</li>
                          <li>✓ {t('results.upgradeModal.feature3')}</li>
                          <li>✓ {t('results.upgradeModal.feature4')}</li>
                          <li>✓ {t('results.upgradeModal.feature5')}</li>
                        </ul>
                      </div>

                      <div className="text-center mb-4">
                        <span className="text-3xl font-extrabold text-slate-800">
                          ${upgradePrice}
                        </span>
                        <span className="text-slate-500 ml-2">{t('results.upgradeModal.oneTime')}</span>
                      </div>

                      <div id="upgrade-card-container" className="mb-4"></div>
                      
                      {paymentError && (
                        <p className="text-red-500 text-sm mb-4 text-center">{paymentError}</p>
                      )}

                      <button
                        onClick={handleUpgradePayment}
                        disabled={isProcessingPayment}
                        className="w-full py-4 bg-gradient-to-r from-amber-500 to-coral-500 text-white rounded-xl font-bold text-lg disabled:opacity-50 transition-all hover:shadow-lg hover:shadow-coral-500/30"
                      >
                        {isProcessingPayment 
                          ? t('results.processing') 
                          : `🚀 ${t('results.upgradeModal.upgradeButton')} — $${upgradePrice}`
                        }
                      </button>

                      <p className="text-center text-xs text-slate-400 mt-4">
                        🔒 {t('results.upgradeModal.secure')}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Timeline */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">⏱️ {t('results.timeline.title')}</h2>
              <div className="space-y-6">
                {[
                  { day: '7', key: 'week1', color: 'from-teal-400 to-teal-500' },
                  { day: '14', key: 'week2', color: 'from-purple-400 to-purple-500' },
                  { day: '30', key: 'month', color: 'from-coral-400 to-coral-500' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <span className="text-white font-bold">{item.day}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{t(`results.timeline.${item.key}.title`)}</h3>
                      <p className="text-slate-500">{t(`results.timeline.${item.key}.desc`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-slate-50 rounded-2xl p-6 text-sm text-slate-500">
              <strong>Disclaimer:</strong> {t('results.disclaimer')}
            </div>
          </>
        )}

        {/* Retake Link */}
        <div className="text-center mt-12">
          <Link href="/quiz" className="text-teal-600 hover:text-teal-700 font-semibold">← {t('results.retake')}</Link>
        </div>
      </div>
    </main>
  )
}
