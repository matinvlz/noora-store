import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Exact palette pulled from the Framer design
        navy: "#0F172A", // Deep Navy / Heading Slate
        body: "#5B6473", // body gray
        hairline: "rgba(15, 23, 42, 0.08)", // Hairline (Deep Navy 8%)
        offwhite: "#F8FAFC", // Off White
        beige: "#F5F0E6", // Soft Beige
        teal: "#14B8A6", // Soft Teal
        surface: "#FFFFFF", // Surface White
        charcoal: "#1E2937", // Warm Charcoal
        coral: "#F9736B", // Warm Coral
        lightgray: "#F1F5F9", // Warm Light Gray
      },
      fontFamily: {
        sans: ["var(--font-vazirmatn)", "Tahoma", "sans-serif"],
      },
      borderRadius: {
        card: "1.25rem",
        pill: "999px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.06)",
        "card-hover": "0 12px 32px rgba(15, 23, 42, 0.12)",
        soft: "0 4px 16px rgba(15, 23, 42, 0.06)",
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [animate],
};

export default config;
