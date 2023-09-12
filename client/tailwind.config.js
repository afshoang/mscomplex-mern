/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff5353",
        secondary: "#fef7f6",
        black: "#000",
        white: "#fff",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        dancing: ['Dancing Script', "cursive"]
      },
      backgroundImage: {
        'login': "url('./src/assets/images/bg.jpg')",
      }
    },
    container: {
      center: true,
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
  },
  plugins: [],
}