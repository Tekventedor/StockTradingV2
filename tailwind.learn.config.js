/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layouts/learn/**/*.html",
    "./content/learn/**/*.{html,md}"
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