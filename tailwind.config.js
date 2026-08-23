// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './features/**/*.{js,ts,jsx,tsx}',
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
        sans: ['Inter', 'var(--font-inter)', ...fontFamily.sans],
        display: ['Inter', 'var(--font-inter)', ...fontFamily.sans],
        mono: ['JetBrains Mono', 'var(--font-jetbrains-mono)', ...fontFamily.mono],
        inter: ['Inter', 'var(--font-inter)', 'sans-serif'],
        'instrument-serif': ['Inter', 'var(--font-inter)', 'sans-serif'],
      },
      colors: {
        // Vercel Monochrome Scale
        'paper-white': '#fafafa',
        'pure-white': '#ffffff',
        hairline: '#ebebeb',
        ash: '#c9c9c9',
        smoke: '#a8a8a8',
        graphite: '#8f8f8f',
        slate: '#7d7d7d',
        stone: '#666666',
        charcoal: '#4d4d4d',
        obsidian: '#171717',
        carbon: '#000000',
        'terminal-green': '#297a3a',

        // Keep white/black
        white: '#FFFFFF',
        black: '#000000',

        // Replicate colors (preserved for blog pages backward compat)
        replicate: {
          dark: '#171717',
          red: '#ea2804',
          green: '#297a3a',
          secondaryRed: '#dd4425',
          githubDark: '#1a1a1a',
        },

        // Domain — now light theme
        domain: {
          bg: '#fafafa',
          fg: '#171717',
          muted: '#666666',
          border: '#ebebeb',
          card: '#ffffff',
          'card-hover': '#ffffff',
        },

        // Clean Gray Scale
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#ebebeb',
          300: '#c9c9c9',
          400: '#a8a8a8',
          500: '#8f8f8f',
          600: '#666666',
          700: '#4d4d4d',
          800: '#2a2a2a',
          900: '#171717',
          950: '#0a0a0a',
        },

        // Primary — obsidian for buttons
        primary: {
          DEFAULT: '#171717',
          50: '#fafafa',
          100: '#f5f5f5',
          500: '#171717',
          600: '#2a2a2a',
          700: '#171717',
          800: '#0a0a0a',
          900: '#000000',
        },

        // Accent (rare use only)
        accent: {
          DEFAULT: '#297a3a',
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#297a3a',
          600: '#1e6b2e',
          700: '#166534',
        },

        // Status colors
        success: '#297a3a',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
      },
      borderRadius: {
        nav: '2px',
        card: '6px',
        button: '6px',
        pill: '9999px',
      },
      boxShadow: {
        subtle: 'rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgb(250, 250, 250) 0px 0px 0px 2px',
        'subtle-2': 'rgb(235, 235, 235) 0px 0px 0px 1px',
        'ghost-border': '0 0 0 1px #ebebeb',
      },
      zIndex: {
        60: '60',
        70: '70',
        80: '80',
      },
      maxWidth: {
        page: '1280px',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.obsidian'),
              '&:hover': {
                color: theme('colors.charcoal'),
              },
              code: { color: theme('colors.obsidian') },
            },
            'h1,h2': {
              fontWeight: '500',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontWeight: '500',
            },
            code: {
              color: theme('colors.obsidian'),
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.gray.300'),
              '&:hover': {
                color: theme('colors.gray.200'),
              },
              code: { color: theme('colors.gray.300') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
      keyframes: {
        shuttle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        shuttle: 'shuttle 1s ease-in-out infinite',
        gradient: 'gradient 15s ease infinite',
        'fade-in': 'fadeIn 1s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
