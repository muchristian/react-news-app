/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./widgets/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: "#2a2a2a",
      primary1: "#f9f4ed",
      secondary: "#af695c",
      gray: "#eaeaea",
      success: "#30BE36",
      warning: "#FFBB38",
      danger: "#FF4040",
    },
  },
  plugins: [],
};
