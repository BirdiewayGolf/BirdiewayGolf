/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          200: '#F7E9D7',
          300: '#E6C9A8',
        },
        emerald: {
          50: '#F1F9F5',
          700: '#156E3D',
          800: '#0F522E',
        },
      },
      height: {
        navbar: '80px',
      },
      spacing: {
        navbar: '80px',
      },
      maxWidth: {
        navbar: '1280px',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
      },
      backdropBlur: {
        navbar: '8px',
      },
      boxShadow: {
        navbar: '0 4px 12px rgba(0, 0, 0, 0.05)',
        'navbar-scrolled': '0 2px 8px rgba(0, 0, 0, 0.1)',
      },
      transitionProperty: {
        navbar: 'all',
      },
      transitionTimingFunction: {
        navbar: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        navbar: '300ms',
      },
      zIndex: {
        navbar: '50',
      },
    },
  },
  plugins: [],
}