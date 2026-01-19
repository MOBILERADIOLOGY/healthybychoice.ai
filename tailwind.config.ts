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
        coral: {
          50: '#fef3f2',
          100: '#ffe4e1',
          200: '#ffcdc7',
          300: '#fea99f',
          400: '#fb7a6a',
          500: '#f97316',
          600: '#e14d2a',
          700: '#be3d1f',
          800: '#9d361d',
          900: '#82331f',
        },
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
