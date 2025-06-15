/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
        'tinos': ['Tinos', 'serif']
      }
    },
  },
  plugins: [],
}
