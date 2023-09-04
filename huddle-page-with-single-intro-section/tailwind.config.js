/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '968px',
      // => @media (min-width: 968px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        md: '3rem'
      },
    },
    fontFamily: {
      'open-sans': ['Open Sans', 'sans-serif'],
      'poppins': ['Poppins', 'sans-serif'], 
    },
    extend: {
      colors: {
        'primary': 'hsl(257, 40%, 49%)',
        'secondary': 'hsl(300, 69%, 71%)',
      },
      backgroundImage: {
        'hero-desktop': 'url("../images/bg-desktop.svg")',
        'hero-mobile': 'url("../images/bg-mobile.svg")',
      },
      gridTemplateRows: {
        'layout': 'auto 1fr auto',
      }
    },
  },
  plugins: [],
}

