/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '.dark-mode'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
    "!./node_modules/**/*"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        medical: {
          50:  '#EEF4FB',
          100: '#D5E5F5',
          500: '#2D7DD2',
          600: '#1B4F8A',
          700: '#163F6E',
          900: '#0D2640',
        },
        accent: {
          50:  '#E6F7F6',
          400: '#2DD4C8',
          500: '#0F9B8E',
          600: '#0C8A7E',
        }
      }
    }
  },
  plugins: [],
}
