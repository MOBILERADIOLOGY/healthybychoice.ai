# Healthy By Choice - Microbiome Health Assessment

AI-powered gut health assessment tool with 4-tier pricing, conversational AI quiz experience, and full bilingual support (English/Spanish).

## Features

### Core Features
- AI-first conversational quiz experience
- AI-personalized analysis (Claude AI)
- 4 pricing tiers: Starter ($5.99), Standard ($9.99), Premium ($14.99), Complete ($19.99)
- Square payment integration
- 14-Day Reset Protocol
- Lifetime Fasting Protocol (Complete plan)
- Probiotic recommendations

### AI-Interactive Quiz Experience
The quiz opens with a **warm AI conversation**:

1. **Welcome Phase**: AI greets user and asks about their chief health concern
2. **Concern Response**: AI empathetically acknowledges their concern and connects it to gut health
3. **Assessment Phase**: 10 questions with real-time AI feedback relating back to their concern
4. **Analysis Phase**: Before payment, users see personalized insights connecting their answers to their original concern

**Quiz Flow:**
```
AI Welcome → User Shares Concern → AI Acknowledges with Empathy
                    ↓
         10 Questions (AI responds to each, referencing their concern)
                    ↓
         Score Reveal + Personalized AI Analysis → Payment
```

### Bilingual Support
- 🇺🇸/🇪🇸 Language toggle in navigation
- Auto-detects browser language preference
- Persistent language selection (localStorage)
- Instant switching without page reload
- All content translated: quiz, results, reports, modals

## Tech Stack

- Next.js 14
- Tailwind CSS
- TypeScript
- Square Payments
- Anthropic Claude AI

## Color Scheme (Vibrant Wellness)

- **Primary**: Emerald Green (#10b981) - Growth, health, vitality
- **Accent**: Warm Amber/Orange (#f97316) - Energy, confidence, positivity  
- **Secondary**: Teal (#14b8a6) - Trust, calm wellness
- **Gold**: (#f59e0b) - Premium, confidence
- **Background**: Emerald-to-Amber gradient (wellness-focused)
- **Font**: Plus Jakarta Sans

## Project Structure

```
healthybychoice-bilingual/
├── app/
│   ├── layout.tsx              # Main layout with LanguageProvider
│   ├── page.tsx                # Bilingual homepage
│   ├── globals.css             # Global styles
│   ├── quiz/
│   │   └── page.tsx            # AI-Interactive bilingual quiz
│   ├── results/
│   │   └── page.tsx            # Bilingual results + payment + upsell
│   └── api/
│       ├── quiz-interaction/   # Real-time AI quiz responses
│       ├── create-payment/     # Square payment processing
│       └── generate-report/    # Claude AI report generation
├── components/
│   └── LanguageSwitcher.tsx    # Language toggle component
├── lib/
│   ├── i18n-config.ts          # i18n configuration
│   └── language-context.tsx    # React context for language state
├── locales/
│   ├── en/
│   │   └── common.json         # English translations
│   └── es/
│       └── common.json         # Spanish translations
└── config files...
```

## Environment Variables (add to Vercel)

```
SQUARE_APPLICATION_ID=your_square_app_id
SQUARE_ACCESS_TOKEN=your_square_access_token
SQUARE_LOCATION_ID=your_square_location_id
NEXT_PUBLIC_SQUARE_APPLICATION_ID=your_square_app_id
NEXT_PUBLIC_SQUARE_LOCATION_ID=your_square_location_id
ANTHROPIC_API_KEY=your_anthropic_api_key
```

## Deployment

1. Upload to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy

## Pricing Tiers

| Plan | Price | Features |
|------|-------|----------|
| Starter | $5.99 | AI analysis, microbiome score, basic recommendations, timeline |
| Standard | $9.99 | + 14-Day Reset Protocol, complete food guide, cooking oils guide |
| Premium | $14.99 | + Probiotic recommendations, supplement guide, gut-healing recipes |
| Complete | $19.99 | + Lifetime Fasting Protocol, 2-meal daily schedule, long-term maintenance |

## Upsell System

Users who purchase Starter, Standard, or Premium plans see a clickable upgrade card:
- "Unlock the Lifetime Fasting Protocol"
- Shows price difference to Complete plan
- Opens payment modal for easy upgrade

## API Endpoints

| Endpoint | Purpose |
|----------|---------|
| `/api/quiz-interaction` | AI welcome, concern response, question feedback, final analysis |
| `/api/generate-report` | Full AI report generation after payment |
| `/api/create-payment` | Square payment processing |

## How to Edit Translations

### Translation Files Location
- **English**: `locales/en/common.json`
- **Spanish**: `locales/es/common.json`

### Adding New Text

Add the key-value pair to both files:

**English (`locales/en/common.json`):**
```json
{
  "newSection": {
    "title": "New Section Title",
    "description": "This is the description"
  }
}
```

**Spanish (`locales/es/common.json`):**
```json
{
  "newSection": {
    "title": "Título de Nueva Sección",
    "description": "Esta es la descripción"
  }
}
```

### Using in Components
```tsx
const { t } = useLanguage();

return (
  <div>
    <h2>{t('newSection.title')}</h2>
    <p>{t('newSection.description')}</p>
  </div>
);
```

## Adding More Languages

To add a new language (e.g., Portuguese):

1. Create `locales/pt/common.json` with translations
2. Update `lib/i18n-config.ts`:
```ts
export const locales = ['en', 'es', 'pt'] as const;
```
3. Update `lib/language-context.tsx` to import the new locale
4. Update `LanguageSwitcher.tsx` to add the new button

## License

Proprietary - All rights reserved.
