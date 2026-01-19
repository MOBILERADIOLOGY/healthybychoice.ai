import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

export async function POST(request: Request) {
  try {
    const { type, questionKey, answer, answers, locale, score, concern, chiefConcern } = await request.json()

    let prompt = ''
    
    if (type === 'concern_response') {
      // Empathetic response to their chief health concern
      prompt = `You are a warm, caring gut health expert having a genuine conversation with someone who just shared their health concern.

They said: "${concern}"

Language: ${locale === 'es' ? 'Spanish' : 'English'}

Respond with genuine empathy and interest (3-4 sentences max):
1. Acknowledge their specific concern with warmth - show you truly heard them
2. Validate that this is a real issue many people face
3. Connect it to gut health in an encouraging way (not preachy)
4. Express confidence that you can help and smoothly transition to the assessment

Be conversational and caring, not clinical. Use "I" and "we". 
Do NOT use bullet points or lists.
Make them feel heard and hopeful.

Respond in ${locale === 'es' ? 'Spanish' : 'English'} only.`
    }
    else if (type === 'question_response') {
      // Real-time response after each question
      prompt = `You are a friendly, knowledgeable gut health expert having a conversation with someone taking a health assessment. 
      
They just answered question about "${questionKey}" with: "${answer}"

Their chief health concern was: "${chiefConcern || 'general wellness'}"
Their previous answers so far: ${JSON.stringify(answers)}

Language: ${locale === 'es' ? 'Spanish' : 'English'}

Give a brief (1-2 sentences max), warm, encouraging response that:
- Acknowledges their answer naturally (don't repeat what they said)
- When possible, connects back to their original concern
- Provides a tiny relevant insight or encouragement
- Feels conversational, not clinical
- Uses emoji sparingly (max 1)

Do NOT:
- Ask follow-up questions
- Be preachy or judgmental
- Give medical advice
- Use bullet points

Examples of good responses:
- "That makes sense! Given what you shared earlier, this could be a key piece of the puzzle."
- "Interesting! Your fiber intake actually plays a bigger role than most people realize in how you feel day-to-day."
- "Sleep is so connected to gut health - this tells me a lot about what might help you most."

Respond in ${locale === 'es' ? 'Spanish' : 'English'} only.`
    } 
    else if (type === 'final_analysis') {
      // Compelling analysis after quiz completion, before paywall - BUILD HOPE, DON'T REVEAL
      prompt = `You are a warm, confident gut health expert. Someone just completed a gut health assessment.

Their original concern: "${chiefConcern || 'general wellness'}"
Their microbiome score: ${score}/100

IMPORTANT: Do NOT give specific advice, recommendations, or reveal what's in the report. 
Your job is to BUILD HOPE, CREATE ANTICIPATION, and make them feel their answers reveal something BREAKTHROUGH.

Language: ${locale === 'es' ? 'Spanish' : 'English'}

Create a compelling, hope-filled response that:
1. Opens warmly, acknowledging their concern and making them feel HEARD
2. Express excitement - their answers reveal a CLEAR PATH forward (don't say what it is!)
3. Use powerful words: "breakthrough", "game-changing", "transformation", "the missing piece", "revolutionary approach"
4. Make them feel their specific combination of answers is UNIQUE and the solution is PERSONALIZED just for them
5. Create URGENCY and HOPE - they are closer to their goal than they realize

DO NOT:
- Give any specific food recommendations
- Mention specific supplements or probiotics
- Reveal any protocol details
- Give actionable advice they can use without buying

Format as JSON:
{
  "greeting": "Warm opening that makes them feel heard and understood (1-2 sentences)",
  "insights": [
    {
      "title": "Intriguing title like 'Your Hidden Pattern' or 'The Missing Connection'",
      "detail": "Tease that you've discovered something important in their answers WITHOUT revealing what it is. Build curiosity. (2 sentences max)",
      "icon": "emoji"
    },
    {
      "title": "Another intriguing title like 'Your Transformation Potential' or 'The Breakthrough Waiting'",
      "detail": "Express confidence that their situation is highly addressable with the right approach. Don't say what the approach is. (2 sentences max)",
      "icon": "emoji"
    }
  ],
  "curiosityHook": "A compelling statement about how their personalized plan contains the game-changing strategies they've been missing (1-2 sentences)",
  "encouragement": "Powerful, hopeful closing - they're about to discover something that could transform everything (1 sentence)",
  "improvementPotential": "high"
}

Make them feel THIS IS IT - the answer they've been searching for is in the report.
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
        return NextResponse.json({ 
          success: true, 
          analysis: {
            greeting: content.text.slice(0, 150),
            insights: [
              { title: "Your Profile", detail: "Based on your answers, we've identified key areas for optimization.", icon: "🔍" }
            ],
            curiosityHook: "Your personalized plan will reveal specific strategies tailored to your lifestyle.",
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
    let fallbackType = 'question_response'
    let fallbackLocale = 'en'
    
    try {
      const body = await request.clone().json()
      fallbackType = body.type || 'question_response'
      fallbackLocale = body.locale || 'en'
    } catch {}
    
    if (fallbackType === 'concern_response') {
      return NextResponse.json({
        success: true,
        response: fallbackLocale === 'es'
          ? "Gracias por compartir eso conmigo. Puedo ver cuánto esto te importa, y quiero que sepas que la salud intestinal juega un papel enorme en cómo nos sentimos. Estoy aquí para ayudarte a encontrar respuestas. Hagamos algunas preguntas para crear un plan personalizado solo para ti."
          : "Thank you for sharing that with me. I can see how much this matters to you, and I want you to know that gut health plays a huge role in how we feel. I'm here to help you find answers. Let's go through some questions to create a personalized plan just for you."
      })
    }
    
    if (fallbackType === 'final_analysis') {
      return NextResponse.json({
        success: true,
        analysis: {
          greeting: fallbackLocale === 'es' 
            ? "¡Esto es emocionante! Tus respuestas revelan exactamente lo que necesitaba ver." 
            : "This is exciting! Your answers reveal exactly what I needed to see.",
          insights: [
            { 
              title: fallbackLocale === 'es' ? "El Patrón Oculto" : "The Hidden Pattern", 
              detail: fallbackLocale === 'es' 
                ? "He identificado una conexión clave en tus respuestas que la mayoría de las personas pasan por alto. Tu reporte personalizado revelará este descubrimiento revolucionario."
                : "I've identified a key connection in your answers that most people overlook. Your personalized report will reveal this game-changing discovery.", 
              icon: "🔑" 
            },
            { 
              title: fallbackLocale === 'es' ? "Tu Potencial de Transformación" : "Your Transformation Potential", 
              detail: fallbackLocale === 'es' 
                ? "Basándome en tu perfil único, veo un camino claro hacia resultados significativos. La pieza que falta está a tu alcance."
                : "Based on your unique profile, I see a clear path to significant results. The missing piece is within your reach.", 
              icon: "✨" 
            }
          ],
          curiosityHook: fallbackLocale === 'es'
            ? "Tu plan personalizado contiene las estrategias revolucionarias que han estado fuera de tu alcance hasta ahora."
            : "Your personalized plan contains the breakthrough strategies that have been out of reach until now.",
          encouragement: fallbackLocale === 'es'
            ? "¡Estás a punto de descubrir algo que podría transformar todo!"
            : "You're about to discover something that could transform everything!",
          improvementPotential: "high"
        }
      })
    }
    
    return NextResponse.json({ 
      success: true, 
      response: fallbackLocale === 'es' 
        ? "¡Interesante! Esto me ayuda a personalizar tu plan." 
        : "Interesting! This helps me personalize your plan."
    })
  }
}
