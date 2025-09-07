import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        gloss: {
          '0%': { left: '-100%' },
          '100%': { left: '120%' },
        },
      },
      animation: {
        blob: 'blob 12s infinite ease-in-out',
        gloss: 'gloss 1.5s ease-in-out',
      },
    },
  },
  plugins: [daisyui],
}
