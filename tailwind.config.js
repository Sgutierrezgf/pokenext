/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff4e52",
        "custom-gray-50": "#f7f8fc",
        "custom-gray-100": "#f0f1f6",
      },
      fontFamily: {
        lato: ["Lato"],
      },
    },
  },
  plugins: [],
};
