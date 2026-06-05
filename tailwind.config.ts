import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Manna Color Palette — Sacred Provision Aesthetic
        // Primary: Gold — testimony, set apart, the wrapper that preserves
        primary: {
          50: '#FBF6E8',
          100: '#F5EBC9',
          200: '#EBD89A',
          300: '#DFC36A',
          400: '#D4A654',
          500: '#B8893D',  // Main gold — for buttons, key accents
          600: '#A0762F',
          700: '#8A6628',
          800: '#6B501F',
          900: '#4A3614',
        },
        // Accent: Burgundy/Wine — for emphasis, secondary CTAs
        accent: {
          50: '#FAEFED',
          100: '#F4D9D4',
          200: '#E7B0A6',
          300: '#D88578',
          400: '#B85544',
          500: '#8B2E1F',  // Main accent burgundy
          600: '#6B1F1F',
          700: '#581715',
          800: '#3F100E',
          900: '#290A08',
        },
        // Olive — earthy secondary, for nature/garden references
        olive: {
          50: '#F2F4ED',
          100: '#DFE3D2',
          200: '#BFC8A8',
          300: '#9FAC7E',
          400: '#7E8E5A',
          500: '#5B6B47',  // Main olive — for nature elements
          600: '#475438',
          700: '#373F2B',
          800: '#262C1D',
          900: '#171B11',
        },
        // Parchment — the warm background palette
        parchment: {
          50: '#FBF7EC',   // Lightest cream
          100: '#F5EEDD',  // Main parchment background
          200: '#EDE3CC',  // Slightly darker parchment
          300: '#E0D2B0',
          400: '#CCBA8E',
          500: '#B8A06D',
          600: '#9A8451',
          700: '#7A6840',
        },
        // Ink — deep text colors
        ink: {
          50: '#7A6A5A',
          100: '#6B5544',
          200: '#5A4636',
          300: '#4A3729',
          400: '#3D2817',  // Soft ink for body text
          500: '#2B1812',
          600: '#1F1410',  // Deep ink for headlines
          700: '#150C0A',
        },
        // Gold leaf variations — for borders, dividers, highlights
        gold: {
          50: '#FCF8EE',
          100: '#F8EFD3',
          200: '#F0DCA0',
          300: '#E5C66B',
          400: '#D4A654',
          500: '#C9A961',  // Gold leaf
          600: '#B8893D',
          700: '#8A6628',
          800: '#5C4519',
          900: '#3D2D11',
        },
      },
      fontFamily: {
        // Display: Cormorant Garamond — for headlines, sacred feel
        display: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        // Body: Lora — readable serif for prose
        body: ['var(--font-lora)', 'Lora', 'Georgia', 'serif'],
        // Small caps: Cormorant SC — for section overlines and labels
        smallcaps: ['var(--font-cormorant-sc)', 'Cormorant SC', 'serif'],
        // Default sans (keep for any remaining UI elements)
        sans: ['var(--font-lora)', 'Lora', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        // Manna gradients — warm parchment with subtle gold
        'parchment-gradient': 'linear-gradient(135deg, #F5EEDD 0%, #EDE3CC 100%)',
        'gold-gradient': 'linear-gradient(135deg, #C9A961 0%, #D4A654 50%, #B8893D 100%)',
        'sacred-gradient': 'linear-gradient(180deg, #FBF7EC 0%, #F5EEDD 50%, #EDE3CC 100%)',
      },
      boxShadow: {
        'gold': '0 4px 14px 0 rgba(184, 137, 61, 0.25)',
        'gold-lg': '0 20px 40px -10px rgba(184, 137, 61, 0.35), 0 10px 20px -10px rgba(31, 20, 16, 0.2)',
        'parchment': '0 2px 8px rgba(31, 20, 16, 0.08)',
        'ink': '0 4px 14px 0 rgba(31, 20, 16, 0.25)',
      },
      letterSpacing: {
        'wide-luxe': '0.25em',
        'extra-luxe': '0.4em',
      },
    },
  },
  plugins: [],
}
export default config
