/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            50: "#ecfdf3",
            100: "#d1fae5",
            400: "#4ade80",
            500: "#34C759", 
            600: "#16a34a",
          },
          blue: {
            400: "#4f63d2",
            500: "#1E2A78", 
            600: "#162060",
          },
        },
      },
    },
  },
  plugins: [],
};
