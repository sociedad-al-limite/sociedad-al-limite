import type { Config } from "tailwindcss";

// Tokens de marca extraídos del logo oficial de Sociedad al Límite.
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070708",
        char: { DEFAULT: "#0f0f12", 2: "#16161a", 3: "#1d1d22" },
        brand: { red: "#e3261b", hot: "#ff4027", deep: "#7a0e09" },
        silver: "#cfd2d7",
        steel: "#8c9198",
        muted: "#a6a9b0"
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial Narrow", "sans-serif"],
        ui: ["var(--font-ui)", "system-ui", "sans-serif"],
        read: ["var(--font-read)", "Georgia", "serif"]
      },
      maxWidth: { site: "1280px" }
    }
  },
  plugins: []
} satisfies Config;
