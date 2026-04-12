import { Metadata } from 'next'  // ✅ Make sure this import exists at the top

export const metadata: Metadata = {  // ✅ CORRECT: colon after "metadata"
  title: 'Foundational Longevity Stack: 2 Science-Backed Basics | healthybychoice.ai',
  description: 'Simple, research-aware supplement guide: Omega-3 and Vitamin D3+K2 for lifelong wellness. FTC-compliant, transparent recommendations.',
  keywords: ['longevity supplements', 'omega-3', 'vitamin d3', 'k2', 'healthy aging'],
  openGraph: {
    title: 'Foundational Longevity Stack: 2 Science-Backed Basics',
    description: 'Simple, research-aware supplement guide for lifelong wellness',
    url: 'https://www.healthybychoice.ai/foundational',
    siteName: 'healthybychoice.ai',
    type: 'article',
  },
}
