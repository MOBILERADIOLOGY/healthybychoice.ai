import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

export async function POST(request: Request) {
  try {
    const { type, questionKey, answer, answers, locale, score } = await request.json()

    let prompt = ''
    
    if (type === 'question_response') {
      // Real-time response after each question
      prompt = `You are a friendly, knowledgeable gut health expert having a conversation with someone taking a health assessment. 
      
They just answered question about "${questionKey}" with: "${answer}"

Their previous answers so far: ${JSON.stringify(answers)}

Language: ${locale === 'es' ? 'Spanish' : 'English'}

Give a brief (1-2 sentences max), warm, encouraging response that:
- Acknowledges their answer naturally (don't repeat what they said)
- Provides a tiny relevant insight or encouragement
- Feels conversational, not clinical
- Uses emoji sparingly (max 1)

Do NOT:
- Ask follow-up questions
- Be preachy or judgmental
- Give medical advice
- Use bullet points

Examples of good responses:
- "Great start! Knowing your goals helps us personalize everything for you."
- "Interesting! Your fiber intake actually plays a bigger role than most people realize."
- "Sleep is so underrated for gut health - this tells me a lot about your microbiome patterns."

Respond in ${locale === 'es' ? 'Spanish' : 'English'} only.`
    } 
    else if (type === 'final_analysis') {
      // Compelling analysis after quiz completion, before paywall
      prompt = `You are a warm, knowledgeable gut health expert. Someone just completed a gut health assessment.

Their answers:
- Goal: ${answers.goal}
- Diet: ${answers.diet}
- Sugar intake: ${answers.sugar}
- Fiber/vegetables: ${answers.fiber}
- Fermented foods: ${answers.fermented}
- Bloating frequency: ${answers.bloating}
- Stress level: ${answers.stress}
- Sleep: ${answers.sleep}
- Antibiotics history: ${answers.antibiotics}
- Meals per day: ${answers.meals}

Their microbiome score: ${score}/100

Language: ${locale === 'es' ? 'Spanish' : 'English'}

Create a compelling, personalized analysis that:
1. Opens with a warm, personal greeting acknowledging their specific goal
2. Highlights 2-3 KEY INSIGHTS from their specific answers (be specific, not generic!)
3. Creates curiosity about what their full report would reveal
4. Ends with an encouraging statement about their potential for improvement

Format as JSON:
{
  "greeting": "Personal opening acknowledging their goal (1 sentence)",
  "insights": [
    {
      "title": "Short insight title",
      "detail": "Specific observation about THEIR answers (2 sentences max)",
      "icon": "emoji"
    }
  ],
  "curiosityHook": "What makes their situation particularly interesting/addressable (1-2 sentences)",
  "encouragement": "Hopeful closing about their improvement potential (1 sentence)",
  "improvementPotential": "high/medium/moderate based on their answers"
}

Be specific to THEIR answers. Don't be generic. Make them feel seen and understood.
Respond in ${locale === 'es' ? 'Spanish' : 'English'}.`
    }

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }]
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type')
    }

    if (type === 'final_analysis') {
      try {
        const analysis = JSON.parse(content.text)
        return NextResponse.json({ success: true, analysis })
      } catch {
        // If JSON parsing fails, return a structured fallback
        return NextResponse.json({ 
          success: true, 
          analysis: {
            greeting: content.text.slice(0, 100),
            insights: [
              { title: "Your Profile", detail: "Based on your answers, we've identified key areas for optimization.", icon: "🔍" }
            ],
            curiosityHook: "Your personalized report will reveal specific strategies tailored to your lifestyle.",
            encouragement: "Small changes can lead to significant improvements!",
            improvementPotential: "high"
          }
        })
      }
    }

    return NextResponse.json({ success: true, response: content.text })
  } catch (error: any) {
    console.error('Quiz interaction error:', error)
    
    // Fallback responses
    const { type, locale } = await request.json().catch(() => ({ type: 'question_response', locale: 'en' }))
    
    if (type === 'final_analysis') {
      return NextResponse.json({
        success: true,
        analysis: {
          greeting: locale === 'es' 
            ? "¡Gracias por completar tu evaluación! Tus respuestas revelan información valiosa." 
            : "Thanks for completing your assessment! Your answers reveal valuable insights.",
          insights: [
            { 
              title: locale === 'es' ? "Tu Perfil Único" : "Your Unique Profile", 
              detail: locale === 'es' 
                ? "Hemos identificado patrones específicos en tus respuestas que sugieren oportunidades claras de mejora."
                : "We've identified specific patterns in your responses that suggest clear opportunities for improvement.", 
              icon: "🔍" 
            }
          ],
          curiosityHook: locale === 'es'
            ? "Tu reporte personalizado revelará estrategias específicas para tu estilo de vida."
            : "Your personalized report will reveal specific strategies tailored to your lifestyle.",
          encouragement: locale === 'es'
            ? "¡Pequeños cambios pueden llevar a mejoras significativas!"
            : "Small changes can lead to significant improvements!",
          improvementPotential: "high"
        }
      })
    }
    
    return NextResponse.json({ 
      success: true, 
      response: locale === 'es' 
        ? "¡Interesante! Esto nos ayuda a personalizar tus resultados." 
        : "Interesting! This helps us personalize your results."
    })
  }
}
