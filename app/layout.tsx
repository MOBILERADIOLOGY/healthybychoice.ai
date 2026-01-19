import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/language-context'

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-jakarta',
})

export const metadata: Metadata = {
  title: 'Healthy By Choice - Gut Health Assessment',
  description: 'Discover how your gut health impacts your weight with our free 3-minute assessment.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} font-sans antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
