/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f2f8f5',
          100: '#e6f1eb',
          200: '#bfd8cc',
          300: '#99bfad',
          400: '#4d8d6f',
          500: '#005c31',
          600: '#00532c',
          700: '#004525',
          800: '#00361d',
          900: '#002a17',
          950: '#001d10',
        },
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'pulse-soft': {
          '0%, 100%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0.8,
          },
        },
        'scale-in': {
          '0%': {
            transform: 'scale(0.95)',
            opacity: 0,
          },
          '100%': {
            transform: 'scale(1)',
            opacity: 1,
          },
        },
      },
      animation: {
        'gradient-shift': 'gradient-shift 15s ease infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'scale-in': 'scale-in 0.2s ease-out',
      },
    },
  },
  plugins: [],
};