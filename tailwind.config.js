/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layouts/**/*.html",
    "./content/**/*.{html,md}",
    "./assets/css/**/*.css",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'var(--color-gray-700)',
            p: {
              marginTop: '1.5em',
              marginBottom: '1.5em',
              lineHeight: '1.75'
            },
            '[class~="lead"]': {
              color: 'var(--color-gray-600)'
            },
            a: {
              color: 'var(--color-blue-600)',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: 'var(--color-blue-800)',
                textDecoration: 'underline'
              }
            },
            h1: {
              color: 'var(--color-gray-900)',
              fontWeight: '800',
              fontSize: '2.25em',
              marginTop: '0',
              marginBottom: '0.8em',
              lineHeight: '1.1111111'
            },
            h2: {
              color: 'var(--color-gray-900)',
              fontWeight: '700',
              fontSize: '1.5em',
              marginTop: '2em',
              marginBottom: '1em',
              lineHeight: '1.3333333',
              borderBottomWidth: '1px',
              borderColor: 'var(--color-gray-200)',
              paddingBottom: '0.5em'
            },
            h3: {
              color: 'var(--color-gray-900)',
              fontWeight: '600',
              fontSize: '1.25em',
              marginTop: '1.6em',
              marginBottom: '0.6em',
              lineHeight: '1.6'
            },
            h4: {
              color: 'var(--color-gray-900)',
              fontWeight: '600',
              marginTop: '1.5em',
              marginBottom: '0.5em',
              lineHeight: '1.5'
            },
            'figure figcaption': {
              color: 'var(--color-gray-600)',
              fontSize: '0.875em',
              lineHeight: '1.4285714',
              marginTop: '0.8571429em'
            },
            code: {
              color: 'var(--color-gray-900)',
              fontWeight: '500',
              fontSize: '0.875em',
              backgroundColor: 'var(--color-gray-100)',
              padding: '0.25em 0.5em',
              borderRadius: '0.375rem',
              '&::before': {
                content: '""'
              },
              '&::after': {
                content: '""'
              }
            },
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            },
            pre: {
              color: 'var(--color-gray-200)',
              backgroundColor: 'var(--color-gray-800)',
              overflowX: 'auto',
              fontWeight: '400',
              fontSize: '0.875em',
              lineHeight: '1.7142857',
              marginTop: '1.7142857em',
              marginBottom: '1.7142857em',
              borderRadius: '0.375rem',
              paddingTop: '0.8571429em',
              paddingRight: '1.1428571em',
              paddingBottom: '0.8571429em',
              paddingLeft: '1.1428571em'
            },
            'pre code': {
              backgroundColor: 'transparent',
              borderWidth: '0',
              borderRadius: '0',
              padding: '0',
              fontWeight: '400',
              color: 'inherit',
              fontSize: 'inherit',
              fontFamily: 'inherit',
              lineHeight: 'inherit'
            },
            strong: {
              color: 'var(--color-gray-900)',
              fontWeight: '600'
            },
            blockquote: {
              fontWeight: '500',
              fontStyle: 'italic',
              color: 'var(--color-gray-900)',
              borderLeftWidth: '0.25rem',
              borderLeftColor: 'var(--color-gray-300)',
              quotes: '"\\201C""\\201D""\\2018""\\2019"',
              marginTop: '1.6em',
              marginBottom: '1.6em',
              paddingLeft: '1em'
            },
            ul: {
              listStyleType: 'disc',
              marginTop: '1.25em',
              marginBottom: '1.25em',
              paddingLeft: '1.625em'
            },
            ol: {
              listStyleType: 'decimal',
              marginTop: '1.25em',
              marginBottom: '1.25em',
              paddingLeft: '1.625em'
            },
            li: {
              marginTop: '0.5em',
              marginBottom: '0.5em'
            },
            'ul > li': {
              paddingLeft: '0.375em'
            },
            'ol > li': {
              paddingLeft: '0.375em'
            },
            '> ul > li p': {
              marginTop: '0.75em',
              marginBottom: '0.75em'
            },
            '> ul > li > *:first-child': {
              marginTop: '1.25em'
            },
            '> ul > li > *:last-child': {
              marginBottom: '1.25em'
            },
            '> ol > li > *:first-child': {
              marginTop: '1.25em'
            },
            '> ol > li > *:last-child': {
              marginBottom: '1.25em'
            },
            'ul ul, ul ol, ol ul, ol ol': {
              marginTop: '0.75em',
              marginBottom: '0.75em'
            },
            hr: {
              borderColor: 'var(--color-gray-200)',
              borderTopWidth: 1,
              marginTop: '3em',
              marginBottom: '3em'
            },
            table: {
              width: '100%',
              tableLayout: 'auto',
              textAlign: 'left',
              marginTop: '2em',
              marginBottom: '2em'
            },
            thead: {
              borderBottomWidth: '1px',
              borderBottomColor: 'var(--color-gray-300)'
            },
            'thead th': {
              color: 'var(--color-gray-900)',
              fontWeight: '600',
              verticalAlign: 'bottom',
              paddingRight: '0.5714286em',
              paddingBottom: '0.5714286em',
              paddingLeft: '0.5714286em'
            },
            'tbody tr': {
              borderBottomWidth: '1px',
              borderBottomColor: 'var(--color-gray-200)'
            },
            'tbody tr:last-child': {
              borderBottomWidth: '0'
            },
            'tbody td': {
              verticalAlign: 'baseline',
              paddingTop: '0.5714286em',
              paddingRight: '0.5714286em',
              paddingBottom: '0.5714286em',
              paddingLeft: '0.5714286em'
            }
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 