import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050807",
        "background-secondary": "#0A100D",
        jade: "#3EB489",
        "jade-bright": "#4ADE9A",
        "jade-border": "rgba(62, 180, 137, 0.22)",
        cream: "#F2F4F3",
        card: "rgba(14, 20, 17, 0.72)",
        muted: "#9AA39E",
        graphite: "#050807",
        "ai-accent": "#818CF8",
        "violet-accent": "#A78BFA",
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
