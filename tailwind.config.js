/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#22C55E',
          dark: '#16A34A',
          light: '#4ADE80'
        },
        dark: {
          DEFAULT: '#0F172A',
          lighter: '#1E293B',
          card: 'rgba(30, 41, 59, 0.7)'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif']
      },
      boxShadow: {
        'glow': '0 0 30px -5px rgba(34, 197, 94, 0.15)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.1)'
      }
    },
  },
  plugins: [],
};