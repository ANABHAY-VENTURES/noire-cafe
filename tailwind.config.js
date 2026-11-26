/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          DEFAULT: '#0A0A0A',
          deep: '#050505',
          card: '#121212',
          surface: '#171717',
          border: '#242424',
          subtle: '#1C1C1C',
        },
        chalk: {
          DEFAULT: '#F5F5F3',
          pure: '#FFFFFF',
          muted: '#9E9E9C',
          dim: '#666664',
        },
        champagne: {
          DEFAULT: '#C5A880',
          light: '#DFCBB3',
          dark: '#9A7E58',
          glow: 'rgba(197, 168, 128, 0.15)',
        },
        // Backwards compatibility mappings for ultra-sleek monochrome transition
        ivory: {
          DEFAULT: '#0A0A0A',
          light: '#121212',
          dark: '#181818',
          muted: '#222222',
        },
        espresso: {
          DEFAULT: '#F5F5F3',
          dark: '#FFFFFF',
          soft: '#CCCCCC',
          light: '#8E8E8E',
        },
        olive: {
          DEFAULT: '#889480',
          light: '#AAB6A2',
          dark: '#586450',
          subtle: '#181E16',
        },
        caramel: {
          DEFAULT: '#C5A880',
          light: '#DFCBB3',
          dark: '#9A7E58',
          subtle: '#262018',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Manrope', 'system-ui', 'sans-serif'],
        mono: ['"Space Grotesk"', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        wide: '0.05em',
        widest: '0.22em',
        ultra: '0.35em',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
