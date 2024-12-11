/** @type {import('tailwindcss').Config} */
module.exports = {
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
        navbar: '80px', // Consistent with your navbar height
      },
      spacing: {
        navbar: '80px', // For spacing related to navbar
      },
      maxWidth: {
        navbar: '1280px', // Match your nav-container max-width
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'], // Serif font for logo/text
      },
      backdropBlur: {
        navbar: '8px', // Backdrop blur specifically for navbar
      },
      boxShadow: {
        navbar: '0 4px 12px rgba(0, 0, 0, 0.05)', // Subtle shadow for navbar
        'navbar-scrolled': '0 2px 8px rgba(0, 0, 0, 0.1)', // Enhanced shadow on scroll
      },
      transitionProperty: {
        navbar: 'all', // Apply transitions to all navbar properties
      },
      transitionTimingFunction: {
        navbar: 'cubic-bezier(0.4, 0, 0.2, 1)', // Smooth animation
      },
      transitionDuration: {
        navbar: '300ms', // Animation duration for navbar transitions
      },
      zIndex: {
        navbar: '50', // Ensure navbar is always on top
      },
    },
  },
  plugins: [],
};
