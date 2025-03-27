import type { Config } from "tailwindcss";
import logger from "./lib/logger";

function hexadecimal(color: string) {
  return (percentage: number): string => {
    const decimal = `0${Math.round(255 * (percentage / 100)).toString(16)}`
      .slice(-2)
      .toUpperCase();
    return decimal;
  };
}

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
      transitionProperty: {
        width: "width",
      },
      colors: {
        background: "var(--accent-2)",
        "background-subtle": "var(--accent-2)",
        primary: {
          "100": "var(--accent-1)",
          "200": "var(--accent-3)",
          "300": "var(--accent-5)",
          "400": "var(--accent-7)",
          "500": "var(--accent-9)",
          "600": "var(--accent-10)",
          "700": "var(--accent-11)",
          "800": "var(--accent-12)",
        },
        card: {
          background: {
            light: "var(--gray-a3)",
            dark: "var(--gray-a2)",
          },
          border: {
            light: "var(--gray-a4)",
            dark: "var(--gray-a3)",
          },
        },
      },
      animation: {
        "spin-slow": "spin 5s linear infinite",
        "bounce-slow": "bounce 2s linear infinite",
        shimmer: "shimmer 1.5s infinite",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
      screens: {
        mobile: {
          max: "425px",
        },
        tablet: {
          min: "425px",
          max: "768px",
        },
      },

      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
    },
  },

  presets: [require("radix-themes-tw")],
  plugins: [require("postcss-import"), require("tailwindcss-animate")],
} satisfies Config;

// let isTablet =
// document.body.clientWidth <= 768 && document.body.clientWidth > 425;
// let isMobile = document.body.clientWidth <= 425;
