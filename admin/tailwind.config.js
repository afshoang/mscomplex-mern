/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBg: "#fff",
        secondBg: "#fafafb",
        txtColor: "#455560",
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
        'login': "url('/bg.jpg')",
      },
      boxShadow: {
        'main-shadow': 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      },
      borderRadius: {
        'main': '15px'
      }
    },
    container: {
      center: true,
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1280px',
    },
  },
  plugins: [],
}