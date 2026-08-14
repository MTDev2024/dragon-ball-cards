/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { 900: "#02040a", 800: "#05070e", 700: "#0a0e1a", 600: "#131b33" },
        card: { from: "#161c2c", to: "#0c111c" },
        ball: {
          100: "#fff0c4",
          200: "#ffc357",
          400: "#f2941d",
          700: "#9d4a07",
          star: "#cf2e18",
        },
      },
      backgroundImage: {
        "hero-ground":
          "radial-gradient(120% 80% at 50% 8%, #131b33 0%, #0a0e1a 46%, #05070e 100%)",
        "ball-sphere":
          "radial-gradient(circle at 32% 26%, #fff0c4 0%, #ffc357 24%, #f2941d 58%, #9d4a07 100%)",
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
