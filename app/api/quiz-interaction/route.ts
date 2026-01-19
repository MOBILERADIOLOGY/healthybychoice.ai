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
      // Compelling analysis after quiz completion, before paywall
      prompt = `You are a warm, knowledgeable gut health expert. Someone just completed a gut health assessment.

Their original concern: "${chiefConcern || 'general wellness'}"

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
1. Opens warmly, referencing their ORIGINAL CONCERN and showing you remembered it
2. Highlights 2-3 KEY INSIGHTS connecting their answers TO their original concern (be specific!)
3. Creates curiosity about what their personalized plan would reveal
4. Ends with genuine encouragement about their potential for improvement

Format as JSON:
{
  "greeting": "Personal opening that references their original concern (1-2 sentences)",
  "insights": [
    {
      "title": "Short insight title",
      "detail": "Specific observation connecting THEIR answers to THEIR concern (2 sentences max)",
      "icon": "emoji"
    }
  ],
  "curiosityHook": "What makes their situation particularly addressable - create hope (1-2 sentences)",
  "encouragement": "Hopeful, confident closing about their improvement potential (1 sentence)",
  "improvementPotential": "high/medium/moderate based on their answers"
}

Be specific to THEIR answers and THEIR original concern. Make them feel truly seen and understood.
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
            ? "¡Gracias por completar tu evaluación! Tus respuestas revelan información valiosa." 
            : "Thanks for completing your assessment! Your answers reveal valuable insights.",
          insights: [
            { 
              title: fallbackLocale === 'es' ? "Tu Perfil Único" : "Your Unique Profile", 
              detail: fallbackLocale === 'es' 
                ? "Hemos identificado patrones específicos en tus respuestas que sugieren oportunidades claras de mejora."
                : "We've identified specific patterns in your responses that suggest clear opportunities for improvement.", 
              icon: "🔍" 
            }
          ],
          curiosityHook: fallbackLocale === 'es'
            ? "Tu plan personalizado revelará estrategias específicas para tu estilo de vida."
            : "Your personalized plan will reveal specific strategies tailored to your lifestyle.",
          encouragement: fallbackLocale === 'es'
            ? "¡Pequeños cambios pueden llevar a mejoras significativas!"
            : "Small changes can lead to significant improvements!",
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
