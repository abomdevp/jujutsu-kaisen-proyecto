/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base oscura
        'jjk-black':   '#0A0A0F',
        'jjk-surface': '#12121A',
        'jjk-card':    '#1A1A26',
        'jjk-border':  '#2A2A3E',
        // Acentos
        'jjk-purple':  '#7B4FE8',   // principal
        'jjk-violet':  '#A855F7',   // hover / glow
        'jjk-pink':    '#EC4899',   // secundario
        'jjk-red':     '#EF4444',   // peligro / enemigo
        'jjk-blue':    '#3B82F6',   // info
        'jjk-gold':    '#F59E0B',   // Special Grade
        // Texto
        'jjk-text':    '#E2E8F0',
        'jjk-muted':   '#94A3B8',
      },
      fontFamily: {
        'display': ['Fraunces', 'serif'],
        'body': ['Sora', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'jjk-hero': 'linear-gradient(to bottom, rgba(10, 10, 15, 0) 0%, rgba(10, 10, 15, 1) 100%)',
      }
    },
  },
  plugins: [],
}
