/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        slideIn: "slideIn 0.6s ease-in-out forwards", // Animação de entrada
        slideOut: "slideOut 0.6s ease-in-out forwards", // Animação de saída
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(1000%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideOut: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-1000%)" },
        },
      }




    },
  },
  plugins: [],
}