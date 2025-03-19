/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'mh-primary': '#4a5568',
        'mh-secondary': '#e2b046',
        'mh-accent': '#c53030',
        'mh-background': '#f7fafc',
        'mh-text': '#1a202c'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
} 