/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./SRC/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}