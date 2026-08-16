/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        // Paleta cálida "Sketchy UI" de Pomarium.
        // IMPORTANTE: prohibido usar tonos morados (#4d3571, #724e89, #975bab, #aa6bc4)
        // en cualquier parte del código, incluyendo sombras, bordes o placeholders.
        cream: {
          DEFAULT: "#F6EFDF",
          dark: "#EDE2C9",
        },
        ink: "#2E2A24",
        leaf: {
          DEFAULT: "#4E7A51",
          light: "#7FA679",
          dark: "#33532F",
        },
        clay: {
          DEFAULT: "#C97B4A",
          light: "#E3A972",
        },
        mustard: "#E3B23C",
        coral: "#E86F5C",
      },
      fontFamily: {
        hand: ["'Patrick Hand'", "cursive"],
        body: ["'Nunito'", "sans-serif"],
      },
      boxShadow: {
        sketchy: "4px 4px 0px 0px rgba(46,42,36,0.85)",
        "sketchy-sm": "2px 2px 0px 0px rgba(46,42,36,0.85)",
      },
    },
  },
  plugins: [],
};
