'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'
import LanguageSwitcher from '@/components/LanguageSwitcher'

const questionKeys = ['goal', 'diet', 'sugar', 'fiber', 'fermented', 'bloating', 'stress', 'sleep', 'antibiotics', 'meals']

const optionKeys: Record<string, string[]> = {
  goal: ['weight', 'skin', 'digestion', 'energy', 'mood'],
  diet: ['whole', 'mixed', 'processed', 'plant'],
  sugar: ['rarely', 'sometimes', 'daily', 'daily-multiple'],
  fiber: ['rarely', 'one-two', 'three-four', 'multiple'],
  fermented: ['never', 'rarely', 'weekly', 'daily'],
  bloating: ['daily', 'often', 'sometimes', 'rarely'],
  stress: ['high', 'moderate', 'low', 'minimal'],
  sleep: ['less-5', '5-6', '6-7', '7-plus'],
  antibiotics: ['none', 'once', 'twice', 'multiple'],
  meals: ['one-two', 'three', 'three-snacks', 'grazing'],
}

interface AIInsight {
  title: string
  detail: string
  icon: string
}

interface FinalAnalysis {
  greeting: string
  insights: AIInsight[]
  curiosityHook: string
  encouragement: string
  improvementPotential: string
}

export default function QuizPage() {
  const { t, locale } = useLanguage()
  const router = useRouter()
  
  // New: Opening conversation state
  const [quizPhase, setQuizPhase] = useState<'welcome' | 'concern' | 'questions' | 'analyzing' | 'results'>('welcome')
  const [chiefConcern, setChiefConcern] = useState('')
  const [aiWelcomeMessage, setAiWelcomeMessage] = useState('')
  const [aiConcernResponse, setAiConcernResponse] = useState('')
  const [isAiTyping, setIsAiTyping] = useState(false)
  
  // Quiz state
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [aiResponse, setAiResponse] = useState<string>('')
  const [showAiResponse, setShowAiResponse] = useState(false)
  const [finalAnalysis, setFinalAnalysis] = useState<FinalAnalysis | null>(null)
  const [score, setScore] = useState(0)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Welcome message on mount
  useEffect(() => {
    const welcomeEn = "Hi there! 👋 I'm your personal gut health guide. I'm here to help you understand how your gut health might be affecting how you feel every day. Before we dive into the assessment, I'd love to know what brought you here today."
    const welcomeEs = "¡Hola! 👋 Soy tu guía personal de salud intestinal. Estoy aquí para ayudarte a entender cómo tu salud intestinal puede estar afectando cómo te sientes cada día. Antes de comenzar la evaluación, me encantaría saber qué te trajo aquí hoy."
    
    const welcome = locale === 'es' ? welcomeEs : welcomeEn
    typeMessage(welcome, setAiWelcomeMessage).then(() => {
      setQuizPhase('concern')
    })
  }, [locale])

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [aiWelcomeMessage, aiConcernResponse, showAiResponse, aiResponse, quizPhase])

  const typeMessage = (text: string, setter: (value: string) => void): Promise<void> => {
    return new Promise((resolve) => {
      setIsAiTyping(true)
      let i = 0
      setter('')
      const interval = setInterval(() => {
        if (i < text.length) {
          setter(prev => prev + text.charAt(i))
          i++
        } else {
          clearInterval(interval)
          setIsAiTyping(false)
          resolve()
        }
      }, 25)
    })
  }

  const handleConcernSubmit = async () => {
    if (!chiefConcern.trim()) return
    
    setIsAiTyping(true)
    
    try {
      const response = await fetch('/api/quiz-interaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'concern_response',
          concern: chiefConcern,
          locale
        }),
      })
      const data = await response.json()
      
      if (data.success && data.response) {
        await typeMessage(data.response, setAiConcernResponse)
      } else {
        const fallbackEn = `Thank you for sharing that with me. ${chiefConcern.toLowerCase().includes('weight') ? 'Weight management' : chiefConcern.toLowerCase().includes('energy') ? 'Energy levels' : chiefConcern.toLowerCase().includes('skin') ? 'Skin health' : chiefConcern.toLowerCase().includes('digest') ? 'Digestive comfort' : 'Your wellbeing'} is deeply connected to gut health, and I'm confident we can help. Let's explore a few questions to create your personalized plan.`
        const fallbackEs = `Gracias por compartir eso conmigo. ${chiefConcern.toLowerCase().includes('peso') ? 'El control del peso' : chiefConcern.toLowerCase().includes('energía') ? 'Los niveles de energía' : chiefConcern.toLowerCase().includes('piel') ? 'La salud de la piel' : chiefConcern.toLowerCase().includes('digest') ? 'La comodidad digestiva' : 'Tu bienestar'} está profundamente conectado con la salud intestinal, y estoy seguro de que podemos ayudar. Exploremos algunas preguntas para crear tu plan personalizado.`
        await typeMessage(locale === 'es' ? fallbackEs : fallbackEn, setAiConcernResponse)
      }
    } catch (error) {
      const fallbackEn = "Thank you for sharing that with me. I can see this is important to you, and I want you to know that gut health plays a huge role in how we feel overall. Let's explore a few questions together to understand your situation better and create a personalized plan just for you."
      const fallbackEs = "Gracias por compartir eso conmigo. Puedo ver que esto es importante para ti, y quiero que sepas que la salud intestinal juega un papel enorme en cómo nos sentimos en general. Exploremos algunas preguntas juntos para entender mejor tu situación y crear un plan personalizado solo para ti."
      await typeMessage(locale === 'es' ? fallbackEs : fallbackEn, setAiConcernResponse)
    }
    
    // Wait a moment then transition to questions
    setTimeout(() => {
      setQuizPhase('questions')
    }, 2000)
  }

  const calculateScore = (currentAnswers: Record<string, string>) => {
    let s = 50
    if (currentAnswers.diet === 'whole' || currentAnswers.diet === 'plant') s += 15
    else if (currentAnswers.diet === 'mixed') s += 5
    else if (currentAnswers.diet === 'processed') s -= 10
    if (currentAnswers.sugar === 'rarely') s += 10
    else if (currentAnswers.sugar === 'daily-multiple') s -= 15
    if (currentAnswers.fiber === 'multiple') s += 15
    else if (currentAnswers.fiber === 'rarely') s -= 10
    if (currentAnswers.fermented === 'daily') s += 10
    if (currentAnswers.bloating === 'rarely') s += 10
    else if (currentAnswers.bloating === 'daily') s -= 15
    if (currentAnswers.stress === 'minimal') s += 5
    else if (currentAnswers.stress === 'high') s -= 10
    if (currentAnswers.sleep === '7-plus') s += 10
    else if (currentAnswers.sleep === 'less-5') s -= 10
    if (currentAnswers.antibiotics === 'multiple') s -= 15
    return Math.max(10, Math.min(90, s))
  }

  const getAIResponse = async (questionKey: string, answer: string, allAnswers: Record<string, string>) => {
    setIsAiTyping(true)
    setShowAiResponse(true)
    
    try {
      const response = await fetch('/api/quiz-interaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'question_response',
          questionKey,
          answer: t(`quiz.questions.${questionKey}.options.${answer}`),
          answers: allAnswers,
          chiefConcern,
          locale
        }),
      })
      const data = await response.json()
      
      if (data.success) {
        await typeMessage(data.response, setAiResponse)
      }
    } catch (error) {
      const fallback = locale === 'es' 
        ? '¡Entendido! Esto me ayuda a crear un mejor plan para ti.' 
        : 'Got it! This helps me create a better plan for you.'
      await typeMessage(fallback, setAiResponse)
    }
  }

  const getFinalAnalysis = async (allAnswers: Record<string, string>, calculatedScore: number) => {
    setQuizPhase('analyzing')
    
    try {
      const response = await fetch('/api/quiz-interaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'final_analysis',
          answers: allAnswers,
          chiefConcern,
          score: calculatedScore,
          locale
        }),
      })
      const data = await response.json()
      
      if (data.success) {
        setFinalAnalysis(data.analysis)
        setQuizPhase('results')
      }
    } catch (error) {
      setFinalAnalysis({
        greeting: locale === 'es'
          ? `¡Completaste tu evaluación! Basándonos en tu preocupación sobre "${chiefConcern}", tenemos información valiosa para ti.`
          : `You've completed your assessment! Based on your concern about "${chiefConcern}", we have valuable insights for you.`,
        insights: [
          {
            title: locale === 'es' ? 'Tu Perfil Único' : 'Your Unique Profile',
            detail: locale === 'es'
              ? 'Tus respuestas revelan patrones específicos que podemos abordar con estrategias personalizadas.'
              : 'Your responses reveal specific patterns we can address with personalized strategies.',
            icon: '🔍'
          }
        ],
        curiosityHook: locale === 'es'
          ? 'Tu reporte completo revelará exactamente qué cambios tendrían el mayor impacto para ti.'
          : 'Your full report will reveal exactly which changes would have the biggest impact for you.',
        encouragement: locale === 'es'
          ? '¡Con las estrategias correctas, puedes ver mejoras significativas!'
          : 'With the right strategies, you can see significant improvements!',
        improvementPotential: 'high'
      })
      setQuizPhase('results')
    }
  }

  const handleAnswer = async (value: string) => {
    const questionKey = questionKeys[currentQuestion]
    const newAnswers = { ...answers, [questionKey]: value }
    setAnswers(newAnswers)

    await getAIResponse(questionKey, value, newAnswers)

    setTimeout(() => {
      if (currentQuestion < questionKeys.length - 1) {
        setShowAiResponse(false)
        setAiResponse('')
        setCurrentQuestion(currentQuestion + 1)
      } else {
        const calculatedScore = calculateScore(newAnswers)
        setScore(calculatedScore)
        localStorage.setItem('quizAnswers', JSON.stringify(newAnswers))
        localStorage.setItem('quizScore', String(calculatedScore))
        localStorage.setItem('chiefConcern', chiefConcern)
        getFinalAnalysis(newAnswers, calculatedScore)
      }
    }, 2000)
  }

  const goBack = () => {
    if (currentQuestion > 0) {
      setShowAiResponse(false)
      setAiResponse('')
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const goToResults = () => {
    router.push('/results')
  }

  const progress = ((currentQuestion + 1) / questionKeys.length) * 100
  const currentKey = questionKeys[currentQuestion]

  // Results View
  if (quizPhase === 'results' && finalAnalysis) {
    const scoreColor = score >= 70 ? 'from-emerald-400 to-green-500' : score >= 50 ? 'from-amber-400 to-orange-500' : 'from-red-400 to-rose-500'
    const scoreLabel = score >= 70 
      ? (locale === 'es' ? 'Bueno' : 'Good') 
      : score >= 50 
        ? (locale === 'es' ? 'Moderado' : 'Moderate') 
        : (locale === 'es' ? 'Necesita Atención' : 'Needs Attention')

    return (
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
        <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100">
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
              <LanguageSwitcher />
            </div>
          </div>
        </nav>

        <div className="max-w-2xl mx-auto px-6 py-12">
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full text-sm font-semibold mb-6">
              ✨ {locale === 'es' ? '¡Evaluación Completa!' : 'Assessment Complete!'}
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8 mb-8">
              <h2 className="text-lg text-slate-500 mb-4">
                {locale === 'es' ? 'Tu Puntuación de Microbioma' : 'Your Microbiome Score'}
              </h2>
              <div className={`text-7xl font-extrabold bg-gradient-to-r ${scoreColor} bg-clip-text text-transparent mb-2`}>
                {score}
              </div>
              <div className={`text-lg font-semibold bg-gradient-to-r ${scoreColor} bg-clip-text text-transparent`}>
                {scoreLabel}
              </div>
              <div className="mt-6 h-4 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-400 via-amber-400 to-emerald-400 transition-all duration-1000" style={{ width: `${score}%` }}></div>
              </div>
            </div>
          </div>

          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-lg">🤖</span>
              </div>
              <div className="flex-1 bg-white rounded-2xl rounded-tl-none p-6 shadow-sm border border-emerald-100">
                <p className="text-slate-700 mb-4 font-medium">{finalAnalysis.greeting}</p>
                
                <div className="space-y-3 mb-4">
                  {finalAnalysis.insights.map((insight, i) => (
                    <div key={i} className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span>{insight.icon}</span>
                        <span className="font-semibold text-slate-800">{insight.title}</span>
                      </div>
                      <p className="text-slate-600 text-sm">{insight.detail}</p>
                    </div>
                  ))}
                </div>

                <p className="text-slate-600 italic mb-4">"{finalAnalysis.curiosityHook}"</p>
                
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700">
                  🚀 {locale === 'es' ? 'Alto Potencial de Mejora' : 'High Improvement Potential'}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <p className="text-slate-600 mb-6">{finalAnalysis.encouragement}</p>
            
            <button
              onClick={goToResults}
              className="w-full md:w-auto bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-1 transition-all"
            >
              {locale === 'es' ? '🔓 Ver Mi Plan Personalizado' : '🔓 See My Personalized Plan'}
            </button>
            
            <p className="text-sm text-slate-400 mt-4">
              {locale === 'es' 
                ? 'Tu plan incluye estrategias específicas para restaurar tu salud intestinal'
                : 'Your plan includes specific strategies to restore your gut health'}
            </p>
          </div>
        </div>
      </main>
    )
  }

  // Analyzing View
  if (quizPhase === 'analyzing') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-20 h-20 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            {locale === 'es' ? 'Creando tu plan personalizado...' : 'Creating your personalized plan...'}
          </h2>
          <p className="text-slate-500">
            {locale === 'es' ? 'Analizando tus respuestas para crear recomendaciones únicas' : 'Analyzing your responses to create unique recommendations'}
          </p>
        </div>
      </main>
    )
  }

  // Welcome & Concern Phase
  if (quizPhase === 'welcome' || quizPhase === 'concern') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
        <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100">
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
              <LanguageSwitcher />
            </div>
          </div>
        </nav>

        <div className="max-w-2xl mx-auto px-6 py-12">
          <div className="space-y-4">
            {/* AI Welcome Message */}
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-xl">🤖</span>
              </div>
              <div className="flex-1 bg-white rounded-2xl rounded-tl-none p-6 shadow-sm border border-emerald-100">
                {aiWelcomeMessage ? (
                  <p className="text-slate-700 leading-relaxed">{aiWelcomeMessage}</p>
                ) : (
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                )}
              </div>
            </div>

            {/* User Input for Chief Concern */}
            {quizPhase === 'concern' && !aiConcernResponse && (
              <div className="ml-[60px] animate-fade-in">
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
                  <p className="text-sm text-slate-500 mb-3">
                    {locale === 'es' 
                      ? '¿Cuál es tu principal preocupación de salud?' 
                      : "What's your main health concern right now?"}
                  </p>
                  <textarea
                    value={chiefConcern}
                    onChange={(e) => setChiefConcern(e.target.value)}
                    placeholder={locale === 'es' 
                      ? 'Ej: Me siento cansado todo el tiempo, problemas de digestión, quiero perder peso...' 
                      : 'E.g., I feel tired all the time, digestion issues, want to lose weight...'}
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none text-slate-700"
                    rows={3}
                  />
                  <button
                    onClick={handleConcernSubmit}
                    disabled={!chiefConcern.trim() || isAiTyping}
                    className="mt-3 w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                  >
                    {locale === 'es' ? 'Compartir' : 'Share'}
                  </button>
                </div>
              </div>
            )}

            {/* AI Response to Concern */}
            {aiConcernResponse && (
              <div className="flex items-start gap-3 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-xl">🤖</span>
                </div>
                <div className="flex-1 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl rounded-tl-none p-6 shadow-sm border border-emerald-100">
                  <p className="text-slate-700 leading-relaxed">{aiConcernResponse}</p>
                </div>
              </div>
            )}

            <div ref={chatEndRef}></div>
          </div>
        </div>
      </main>
    )
  }

  // Questions Phase
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100">
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
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-500">
              {t('quiz.progress', { current: currentQuestion + 1, total: questionKeys.length })}
            </span>
            <span className="text-sm font-semibold text-emerald-600">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-4">
          {/* AI Question */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-lg">🤖</span>
            </div>
            <div className="flex-1 bg-white rounded-2xl rounded-tl-none p-5 shadow-sm border border-emerald-100">
              {currentQuestion > 0 && (
                <button 
                  onClick={goBack}
                  className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 mb-3 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {t('quiz.back')}
                </button>
              )}
              <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                {t(`quiz.questions.${currentKey}.question`)}
              </h2>
            </div>
          </div>

          {/* Answer Options */}
          <div className="grid gap-2 ml-[52px]">
            {optionKeys[currentKey].map((optionKey) => (
              <button
                key={optionKey}
                onClick={() => handleAnswer(optionKey)}
                disabled={showAiResponse}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  answers[currentKey] === optionKey
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                } ${showAiResponse ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span className="font-medium">
                  {t(`quiz.questions.${currentKey}.options.${optionKey}`)}
                </span>
              </button>
            ))}
          </div>

          {/* AI Response */}
          {showAiResponse && (
            <div className="flex items-start gap-3 animate-fade-in">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-lg">🤖</span>
              </div>
              <div className="flex-1 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl rounded-tl-none p-4 shadow-sm border border-emerald-100">
                {isAiTyping && !aiResponse ? (
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                ) : (
                  <p className="text-slate-700">{aiResponse}</p>
                )}
              </div>
            </div>
          )}
          
          <div ref={chatEndRef}></div>
        </div>
      </div>
    </main>
  )
}
