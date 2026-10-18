/** Paleta de marca tomada de css/base/variables.css del proyecto original,
 *  para que el resultado en React se vea idéntico a la versión HTML. */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-deep": "#14100c",
        "bg-panel": "#1c1712",
        "bg-card": "#241d16",
        "bg-card-hi": "#2c241a",
        line: "#3a2f22",
        gold: "#c9a23e",
        "gold-soft": "#e4c874",
        "gold-dim": "#8a6f2c",
        cream: "#f2e9d8",
        "cream-dim": "#b8ac97",
        muted: "#7d7161",
        ok: "#5a9e6f",
        warn: "#d1892f",
        danger: "#b9503f",
        info: "#5b8ba6",
      },
      fontFamily: {
        display: ["Cinzel", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "14px",
        sm: "8px",
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.35)",
      },
    },
  },
  plugins: [],
};
