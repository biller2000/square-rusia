/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    borderRadius: {
      none: "0",
      sm: "0.125rem",
      md: "0.375rem",
      lg: "0.5rem",
      full: "9999px",
      large: "12px",
      xxl: "3rem",
    },
    extend: {
      colors: {
        primaryColor: "#1379f3",
        hoverPrimaryColor: "#006AFF",
        "text-1": "#d9d9d9",
        grayColor: "#ffffff4d",
        borderColor: "#504952",
        blockColor: "#252028",
        overlayColor: "#1c202999",
      },
    },
  },
  plugins: [],
};
