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
        sans: ['basier-square', 'var(--font-space-grotesk)', ...fontFamily.sans],
        display: ['rb-freigeist-neue', 'ui-sans-serif', 'system-ui'],
        mono: ['jetbrains-mono', ...fontFamily.mono],
        'instrument-serif': ['Instrument Serif', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        // ElevenLabs Clean Palette
        white: '#FFFFFF',
        black: '#000000',

        // Replicate Core Colors
        replicate: {
          dark: '#202020',
          red: '#ea2804',
          green: '#2b9a66',
          secondaryRed: '#dd4425',
          githubDark: '#24292e',
        },

        // Domain Cinematic Dark Theme
        domain: {
          bg: 'hsl(201, 100%, 13%)',
          fg: '#ffffff',
          muted: 'hsl(240, 4%, 66%)',
          border: 'hsl(0, 0%, 18%)',
          card: 'rgba(255, 255, 255, 0.03)',
          'card-hover': 'rgba(255, 255, 255, 0.06)',
        },

        // Clean Gray Scale
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#030712',
        },

        // Primary is now just black for buttons
        primary: {
          DEFAULT: '#000000',
          50: '#F9FAFB',
          100: '#F3F4F6',
          500: '#000000',
          600: '#1F2937',
          700: '#111827',
          800: '#000000',
          900: '#000000',
        },

        // Accent for rare highlights
        accent: {
          DEFAULT: '#00D9FF',
          50: '#E6FAFF',
          100: '#CCF5FF',
          500: '#00D9FF',
          600: '#00B8DB',
          700: '#00A8CC',
        },

        // Status colors
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      zIndex: {
        60: '60',
        70: '70',
        80: '80',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.gray.500'),
              '&:hover': {
                color: `${theme('colors.gray.600')}`,
              },
              code: { color: theme('colors.gray.400') },
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontWeight: '600',
            },
            code: {
              color: theme('colors.indigo.500'),
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.gray.500'),
              '&:hover': {
                color: `${theme('colors.gray.400')}`,
              },
              code: { color: theme('colors.gray.400') },
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
