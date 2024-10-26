/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Poppins: ["poppins"],
      serif: ["Merriweather", "serif"],
      parisienne: ["parisienne", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
