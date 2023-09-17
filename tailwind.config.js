/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#20a6d1",
        secondary: '#115870',
        error: '#ff0000',
      },
    },
  },
  plugins: [],
};
