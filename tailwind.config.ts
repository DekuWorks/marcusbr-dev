import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0D1310",
        jade: "#3EB489",
        cream: "#EEE7DC",
        card: "#151C18",
        muted: "#B7B2A8",
        gold: {
          DEFAULT: "#C9A227",
          light: "#E8D5A3",
          dark: "#8B6914",
          pale: "#F4E4BC",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(62, 180, 137, 0.15)",
        "glow-sm": "0 0 20px rgba(62, 180, 137, 0.1)",
        "glow-gold": "0 0 24px rgba(201, 162, 39, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
