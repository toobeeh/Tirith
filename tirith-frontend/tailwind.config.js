/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        'desktop': '1024px',
        // => @media (min-width: 1024px) { ... }
      },
    },
  },
  plugins: [],
}

