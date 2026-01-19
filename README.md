# Healthy By Choice - Bilingual (English/Spanish)

A complete gut health assessment app with full bilingual support and **AI-powered interactive quiz experience**. Users can switch between English and Spanish instantly using the language toggle in the navigation.

## 🤖 NEW: AI-Interactive Quiz Experience

The quiz now features **real-time AI engagement** to boost conversions:

1. **During the Quiz**: After each answer, Claude AI provides personalized, encouraging responses that acknowledge the user's input and share quick insights
2. **After Completion**: Before the paywall, users see their score with a compelling AI analysis that:
   - Greets them personally based on their goal
   - Highlights 2-3 specific insights from THEIR answers
   - Creates curiosity about what the full report reveals
   - Shows their "Improvement Potential" rating

This keeps users engaged longer and increases conversion by demonstrating AI value BEFORE asking for payment.

### Quiz Flow:
```
Question → User Answers → AI Response (typing effect) → Next Question
                    ↓ (after 10 questions)
         Score Reveal + AI Analysis → CTA to See Full Report
```

## 🌐 Language Features

- **Instant Language Switching**: 🇺🇸/🇪🇸 flags in the header toggle languages
- **Auto-Detection**: Automatically detects browser language preference
- **Persistent Selection**: Remembers user's language choice across sessions
- **No Page Reload**: Instant translation without refreshing

## 📁 Project Structure

```
healthybychoice-bilingual/
├── app/
│   ├── layout.tsx              # Main layout with LanguageProvider
│   ├── page.tsx                # Bilingual homepage
│   ├── globals.css             # Global styles
│   ├── quiz/
│   │   └── page.tsx            # AI-Interactive bilingual quiz
│   ├── results/
│   │   └── page.tsx            # Bilingual results + payment
│   └── api/
│       ├── quiz-interaction/   # NEW: Real-time AI quiz responses
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

## 🚀 Deployment Instructions

### Option 1: Replace Your Current Repo

1. **Backup your current `.env.local`** file with your API keys
2. Delete all files in your GitHub repo (except `.env` files on Vercel)
3. Upload all files from this package
4. Vercel will auto-deploy

### Option 2: Update Individual Files

If you prefer to update files one by one:

1. **Add new files:**
   - `lib/i18n-config.ts`
   - `lib/language-context.tsx`
   - `components/LanguageSwitcher.tsx`
   - `locales/en/common.json`
   - `locales/es/common.json`

2. **Replace existing files:**
   - `app/layout.tsx`
   - `app/page.tsx`
   - `app/quiz/page.tsx`
   - `app/results/page.tsx`

## 🔧 How to Edit Translations

### Adding/Editing Text

1. Open `locales/en/common.json` (English)
2. Open `locales/es/common.json` (Spanish)
3. Add or edit the same key in both files

**Example:**
```json
// locales/en/common.json
{
  "newSection": {
    "title": "New Feature",
    "description": "This is a new feature"
  }
}

// locales/es/common.json
{
  "newSection": {
    "title": "Nueva Función",
    "description": "Esta es una nueva función"
  }
}
```

### Using Translations in Components

```tsx
import { useLanguage } from '@/lib/language-context';

function MyComponent() {
  const { t } = useLanguage();
  
  return (
    <div>
      <h1>{t('newSection.title')}</h1>
      <p>{t('newSection.description')}</p>
    </div>
  );
}
```

### Dynamic Values

Use `{{variable}}` syntax for dynamic content:

```json
{
  "greeting": "Hello, {{name}}!"
}
```

```tsx
t('greeting', { name: 'Maria' })  // "Hello, Maria!"
```

## 🌍 Adding More Languages

To add Portuguese, French, or any other language:

1. Create `locales/pt/common.json` with translations
2. Update `lib/i18n-config.ts`:

```ts
export const locales = ['en', 'es', 'pt'] as const;

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
};
```

3. Update `lib/language-context.tsx`:

```ts
import pt from '../locales/pt/common.json';

const translations: Record<Locale, typeof en> = { en, es, pt };
```

4. Update `LanguageSwitcher.tsx` to add the new button

## 💰 Pricing Tiers (Unchanged)

| Plan | Price | Features |
|------|-------|----------|
| Starter | $5.99 | AI analysis, basic recommendations |
| Standard | $9.99 | + 14-Day Reset Protocol |
| Premium | $14.99 | + Probiotic guide |
| Complete | $19.99 | + Lifetime Fasting Protocol |

## 🔑 Environment Variables

Make sure these are set in Vercel:

```
NEXT_PUBLIC_SQUARE_APPLICATION_ID=xxx
NEXT_PUBLIC_SQUARE_LOCATION_ID=xxx
SQUARE_ACCESS_TOKEN=xxx
SQUARE_LOCATION_ID=xxx
ANTHROPIC_API_KEY=xxx
```

## ✅ Features

- ✅ Full English/Spanish support
- ✅ Language auto-detection
- ✅ Persistent language preference
- ✅ 10-question quiz
- ✅ AI-powered analysis
- ✅ 4-tier pricing
- ✅ Square payments
- ✅ Clickable upsell card
- ✅ Mobile responsive

---

Questions? The language switcher appears in the top-right corner of every page. Click 🇪🇸 for Spanish, 🇺🇸 for English.
