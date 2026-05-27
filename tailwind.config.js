/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        shopee: {
          orange: '#EE4E2E',
          darkOrange: '#D73211',
          lightOrange: '#FF6B45',
          red: '#D0011B',
          bg: '#FFF5F2',
        }
      },
      fontFamily: {
        shopee: ['Roboto', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
