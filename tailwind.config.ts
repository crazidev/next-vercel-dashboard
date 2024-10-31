import type { Config } from "tailwindcss";

function hexadecimal(color: string) {
	return (percentage: number): string => {
	  const decimal = `0${Math.round(255 * (percentage / 100)).toString(16)}`.slice(-2).toUpperCase();
	 console.log(color.substring(2) + decimal);
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
          background: cardBgTransparent,
        },
      },
      animation: {
        "spin-slow": "spin 5s linear infinite",
        "bounce-slow": "bounce 2s linear infinite",
      },
    },
  },

  presets: [require("radix-themes-tw")],
  plugins: [require("postcss-import"), require("tailwindcss-animate")],
} satisfies Config;
