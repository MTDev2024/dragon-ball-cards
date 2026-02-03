/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        // Nuage se déplace de droite à gauche.
        slide: {
          "0%": { transform: "translateX(200px)" },
          "100%": { transform: "translateX(-200px)" },
        },
      },
      animation: {
        slide: "slide 6s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};
