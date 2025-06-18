/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layouts/**/*.{html,js}",
    "./content/**/*.{html,md}",
    "./layouts/learn/**/*.{html,js}",
    "./static/**/*.{html,js}",
    "./themes/**/*.{html,js}",
    "./assets/**/*.{html,js}"
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            lineHeight: '1.75',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 