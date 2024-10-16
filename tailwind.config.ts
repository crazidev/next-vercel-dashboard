import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        background: "var(--accent-1)",
        "background-subtle": "var(--accent-2)",
        primary: {
          100: "var(--accent-1)",
          200: "var(--accent-3)",
          300: "var(--accent-5)",
          400: "var(--accent-7)",
          500: "var(--accent-9)",
          600: "var(--accent-10)",
          700: "var(--accent-11)",
          800: "var(--accent-12)",
        }
      },
      animation: {
        "spin-slow": "spin 5s linear infinite",
        "bounce-slow": "bounce 2s linear infinite",
      },
    },
  },

  presets: [require("radix-themes-tw")],
  plugins: [require("postcss-import")],
} satisfies Config;
