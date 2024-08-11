import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          xs: "375px",
          "2xl": "1400px",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },

      aspectRatio: {
        "2/3": "2/3",
        "3/1": "3/1",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    nextui({
      layout: {
        radius: {
          small: "4px",
          medium: "8px",
          large: "12px",
        },
      },
    }),
  ],
} satisfies Config;

export default config;
