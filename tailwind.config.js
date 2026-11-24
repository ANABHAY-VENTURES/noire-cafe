/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F5F1E8',
          light: '#FAF7F2',
          dark: '#EAE3D6',
          muted: '#E3DCB',
        },
        espresso: {
          DEFAULT: '#30251F',
          dark: '#1C1612',
          soft: '#4A3B32',
          light: '#6E5D53',
        },
        olive: {
          DEFAULT: '#899078',
          light: '#A4AB94',
          dark: '#687056',
          subtle: '#E8EAE4',
        },
        caramel: {
          DEFAULT: '#BC8B62',
          light: '#D4A882',
          dark: '#9E6E45',
          subtle: '#F6EFE9',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.2em',
        ultra: '0.3em',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
