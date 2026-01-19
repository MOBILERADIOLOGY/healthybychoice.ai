import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

export async function POST(request: Request) {
  try {
    const { answers } = await request.json()

    const prompt = `Based on this gut health quiz data, provide a personalized analysis:
    
Goal: ${answers.goal}
Diet: ${answers.diet}
Sugar intake: ${answers.sugar}
Fiber intake: ${answers.fiber}
Fermented foods: ${answers.fermented}
Bloating frequency: ${answers.bloating}
Stress level: ${answers.stress}
Sleep: ${answers.sleep}
Antibiotics: ${answers.antibiotics}
Meals per day: ${answers.meals}

Return a JSON object with:
- microbiomeSnapshot: 2-3 sentence overview
- goalConnection: how gut health relates to their goal
- topRecommendations: array of 4 specific recommendations
- foodsToAdd: array of 5 foods to add
- foodsToAvoid: array of 3 foods to limit
- personalizedTips: 1-2 personalized tips

Return ONLY valid JSON, no markdown.`

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }]
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type')
    }

    const analysis = JSON.parse(content.text)
    return NextResponse.json({ success: true, analysis })
  } catch (error: any) {
    console.error('AI generation error:', error)
    
    // Fallback response
    return NextResponse.json({
      success: true,
      analysis: {
        microbiomeSnapshot: "Your responses indicate opportunities to optimize your gut microbiome. With targeted dietary changes and lifestyle modifications, you can support a healthier bacterial balance.",
        goalConnection: "Your gut health directly impacts your goals through hormone regulation and nutrient absorption.",
        topRecommendations: [
          "Add 2-3 high-fiber foods to each meal, like berries, chia seeds, or half an avocado",
          "Replace daily sugar sources with naturally sweet, fiber-rich alternatives",
          "Time your fermented food intake with fiber-rich meals",
          "Aim for 7-8 hours of sleep when possible"
        ],
        foodsToAdd: ["leafy greens", "berries", "chia seeds", "artichokes", "beans and lentils"],
        foodsToAvoid: ["refined sugars", "processed sweets", "sugary beverages"],
        personalizedTips: "Focus on consistency over perfection. Small daily improvements compound over time."
      }
    })
  }
}
