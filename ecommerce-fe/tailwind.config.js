/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.jsx", "./*"],
  content: [],
  theme: {
    extend: {
      fontFamily: {
        base: "Inter, sans-serift",
        krona: "Krona One,sans-serif",
        inter: "Inter, sans-serif",
      },
      colors: {
        dark: "#0C080B",
        green: "#1E3329",
        yellow: "#FFD470",
        "light-yellow": "rgb(253, 246, 238)",
        "dark-grey": "#B8B8B8",
        "light-grey": "#ECECEC",
        light: "#FAFAFA",
        blue: "#2168d3",
        "light-blue": "#bbd5ef",
        aliceblue: "rgb(240,248,255)",
        "extra-light-blue": "#eaf0f3",
      },
      screens: {
        sm: { max: "767px" }, // Small: <= 767px
        md: { min: "768px" }, // Medium: >= 768px
        lg: { min: "1024px" }, // Large: >= 1024px
        xl: { min: "1280px" }, // Extra Large: >= 1280px
      },
    },
  },
  plugins: [],
};
