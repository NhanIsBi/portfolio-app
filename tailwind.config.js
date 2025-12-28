/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          1: 'var(--primary-1)',
          2: 'var(--primary-2)',
        },
        secondary: {
          1: 'var(--secondary-1)',
          2: 'var(--secondary-2)',
        },
        dark: {
          bg: 'var(--bg-dark)',
          surface: 'var(--bg-surface)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}