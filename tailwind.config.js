/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
      },
      colors: {
        'premium-gold': '#D4AF37',
        'premium-black': '#1A1A1A',
      },
    },
  },
  plugins: [],
}
