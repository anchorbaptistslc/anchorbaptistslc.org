/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layouts/**/*.html",
    "./content/**/*.{html,md}",
    "./themes/anchor-theme/layouts/**/*.html"
  ],
  safelist: [
    'bg-opacity-90',
    'bg-opacity-75',
    'bg-opacity-60',
    'bg-opacity-50',
    'bg-opacity-25',
    'bg-opacity-10',
    'bg-opacity-5',
    'text-gray-100',
    'underline',
    'underline-offset-2',
    'hover:no-underline',
    'transition-all',
    'transition-colors',
    'duration-200',
    'hover:text-[#4267B2]',
    'hover:text-[#FF0000]',
    'whitespace-nowrap',
    {
      pattern: /bg-(brand|gray|white)-(light|dark|900)/,
      variants: ['hover']
    },
    {
      pattern: /text-(brand|gray)-(light|dark|100|200)/,
      variants: ['hover']
    },
    {
      pattern: /mix-blend-(multiply|normal|overlay)/
    }
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#6E879D', // RGB(110, 135, 157)
          dark: '#122847',  // RGB(18, 40, 71)
          link: '#2B5282', // RGB(43, 82, 130) - for regular link state
          linkHover: '#3A6EAF', // RGB(58, 110, 175) - for hover state
        },
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
} 