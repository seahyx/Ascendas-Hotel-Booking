import { type Config } from "tailwindcss";

const colors = require("tailwindcss/colors");

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-gradient-mask-image")],
  corePlugins: {
    preflight: false,
  },
  important: "#__next",
} satisfies Config;
