import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        solamo: {
          green: "#79B900",
          darkGreen: "#5f9200",
          lightGreen: "#f2f9e6",
          ink: "#172217",
          gray: "#5b6660",
          border: "#e8ebe4",
        },
      },
      fontFamily: {
        sans: ["var(--font-albert-sans)", "sans-serif"],
        josefin: ["var(--font-josefin)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
