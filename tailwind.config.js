/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./src/index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// tailwind.config.js
export default {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        pina: {
          black:   "#000000",
          white:   "#FFFFFF",
          yellow:  "#F8D34C",
          green:   "#5BC76E",
          blue:    "#2DC3E2",
          purple:  "#7C57C2",
          pink:    "#E85CBF",
          magenta: "#B32C8F",
          outline: "#FFD600",
          cyan:    "#15BCE0", // acento para highlights
          lime:    "#84E569", // acento para degradados
        },
      },
      boxShadow: {
        neon: "0 0 0 2px rgba(179,44,143,.35), 0 0 18px rgba(232,92,191,.6)",
        "neon-soft": "0 0 0 1px rgba(248,211,76,.25), 0 0 14px rgba(21,188,224,.45)",
      },
      backgroundImage: {
        "pina-noise":
          "radial-gradient(rgba(255,255,255,.015) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
