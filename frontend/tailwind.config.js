/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E53E3E',
        secondary: '#000000',
        accent: '#F6E05E',
        neutral: '#F7FAFC',
        highlight: '#3182CE',
      }
    },
  },
  plugins: [],
}

