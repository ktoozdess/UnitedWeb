/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors:{
        'text-darktheme': '#8D99AE',
        'text-lighttheme': '#2B2D42',
        'darkbg': '#2B2D42',
        'lightbg': '#8D99AE'
      }
    },
  },
  plugins: [],
}

