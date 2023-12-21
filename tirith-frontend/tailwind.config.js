/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        'desktop': '1280px',
        // => @media (min-width: 1024px) { ... }
      },
    },
  },
  plugins: [],
}

