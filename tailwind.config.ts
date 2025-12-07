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
        olive: {
          DEFAULT: "#3A5635",
          50: "#E8EDE7",
          100: "#D4DDD2",
          200: "#ABBDA8",
          300: "#829D7E",
          400: "#5E7A59",
          500: "#3A5635",
          600: "#2F462B",
          700: "#243521",
          800: "#192516",
          900: "#0E140C",
        },
        cream: {
          DEFAULT: "#FAF8F5",
          50: "#FFFFFF",
          100: "#FAF8F5",
          200: "#F0EBE3",
          300: "#E6DDD1",
          400: "#DCD0BF",
        },
      },
      fontFamily: {
        heading: ["var(--font-paradise-seashore)", "serif"],
        body: ["var(--font-libre-franklin)", "sans-serif"],
        caslon: ["var(--font-libre-caslon-display)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
