/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        wiki: {
          blue: "#3366CC",
          lightblue: "#C2DFFF",
          text: "#202122",
          gray: {
            50: "#F8F9FA",
            100: "#EAECF0",
            200: "#DADDE3",
            300: "#C8CCD1",
            400: "#A2A9B1",
            500: "#72777D",
            600: "#54595D",
            700: "#445577",
            800: "#101418",
            900: "#070412",
          },
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 4px 16px -4px rgba(0, 0, 0, 0.1)",
        medium:
          "0 4px 12px -2px rgba(0, 0, 0, 0.08), 0 8px 24px -4px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};
