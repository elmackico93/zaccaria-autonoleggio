/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'white': '#FFFFFF',
        'white-smoke': '#F5F5F5',
        'light-silver': '#D9D9D9',
        'silver': '#C0C0C0',
        'silver-metallic': '#AAA9AD',
        'dark-silver': '#717171',
        'gunmetal': '#2C3539',
        'charcoal': '#222222',
        'black': '#0A0A0A',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'sans-serif'],
      },
    },
  },
  plugins: [],
  // Performance optimizations
  future: {
    hoverOnlyWhenSupported: true,
  },
  // Use JIT mode for faster builds and smaller CSS
  mode: 'jit',
}
