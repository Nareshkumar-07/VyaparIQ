import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        vyapar: {
          navy: '#002970',
          cyan: '#00BAF2',
          success: '#16A34A',
          warning: '#F59E0B',
          error: '#EF4444',
          bg: '#F4F8FC',
        },
      },
      spacing: {
        'safe-bottom': 'max(1rem, env(safe-area-inset-bottom))',
      },
      borderRadius: {
        'card': '12px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
  darkMode: 'class',
}

export default config
