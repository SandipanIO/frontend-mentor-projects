/* @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    fontFamily: {
      'lexend-deca': ["Lexend Deca", "sans-serif"],
      'big-shoulders-display': ["Big Shoulders Display", "cursive"],
    },
    extend: {
      colors: {
        'bright-orange': 'hsl(31, 77%, 52%)',
        'dark-cyan': 'hsl(184, 100%, 22%)',
        'very-dark-cyan': 'hsl(179, 100%, 13%)',
        'very-light-gray': 'hsl(0, 0%, 95%)',
        'transparent-white': 'hsla(0, 0%, 100%, 0.75)',
      },
    },
  },
  plugins: [],
}