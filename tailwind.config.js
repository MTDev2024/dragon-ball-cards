/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "radial-glow":
          "radial-gradient(circle at center, rgba(250,204,21,0.28), transparent 70%)",
      },
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
