/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        glare: "rgba(255, 255, 255, 0.15)",
        navbar: "rgba(0, 0, 0, 0.8)",
      },
    },
  },
  plugins: [],
}
