/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: '#E39836',
        gray: {
          DEFAULT: '#495057',
          dark: '#343A40',
          light: '#DEE2E6'
        },
        red: '#D92329',
        green: '#009744',
      },
    },
  },
  plugins: [],
}

