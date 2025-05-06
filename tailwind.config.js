// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['var(--font-open-sans)', ...fontFamily.sans],
      },
      colors: {
        primary: colors.purple,
        heading: colors.indigo,
        gray: colors.gray,
        neutral: colors.neutral,
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: theme('colors.primary.600'),
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1, h2': {
              color: theme('colors.heading.400'),
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              color: theme('colors.heading.500'),
              fontWeight: '600',
            },
            code: {
              color: theme('colors.primary.500'),
              backgroundColor: theme('colors.neutral.900'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            pre: {
              backgroundColor: theme('colors.neutral.900'),
              color: theme('colors.gray.100'),
              padding: '1rem',
              borderRadius: '0.375rem',
            },
            'pre code': {
              backgroundColor: 'transparent',
            },
            blockquote: {
              borderLeftColor: theme('colors.primary.500'),
              color: theme('colors.heading.700'),
            },
          },
        },
        dark: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: theme('colors.primary.400'),
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1, h2, h3, h4, h5, h6': {
              color: theme('colors.gray.100'),
            },
            pre: {
              backgroundColor: theme('colors.neutral.900'),
              color: theme('colors.gray.100'),
            },
            code: {
              backgroundColor: theme('colors.neutral.900'),
              color: theme('colors.primary.500'),
            },
            'pre code': {
              backgroundColor: 'transparent',
            },
            blockquote: {
              borderLeftColor: theme('colors.primary.500'),
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
