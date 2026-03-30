/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'night-blue': '#0d1b2a',
        'dark-blue': '#1b263b',
        'medium-blue': '#415a77',
        'light-blue': '#778da9',
        'orange': '#f77f00',
        'light-orange': '#fcbf49',
        'white': '#ffffff',
        'off-white': '#f8f9fa',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
