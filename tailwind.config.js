/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette — sampled from the P2N logo (black + electric blue).
        // These five tokens are CSS variables (see src/index.css) so the whole site
        // switches between the light and dark theme without touching any component:
        //   void = page background · offwhite = ink / body text · zincline = hairlines
        //   acid = primary accent (logo blue) · mist = alternate section surface
        void: "rgb(var(--c-void) / <alpha-value>)",
        offwhite: "rgb(var(--c-offwhite) / <alpha-value>)",
        zincline: "rgb(var(--c-zincline) / <alpha-value>)",
        acid: "rgb(var(--c-acid) / <alpha-value>)",
        mist: "rgb(var(--c-mist) / <alpha-value>)",
        azure: "#017AFB",      // exact logo blue — large fills, shadows, decoration
        cyanline: "#10A0F6",   // lighter end of the logo's blue gradient
        // Paper layer (Academy / annotations) — stays "paper" in both themes
        paper: "#F7FAFF",
        postit: "#DCEBFF",
        correction: "#FF4D4D",
        ballpoint: "#0868E6",
        graphite: "#111111",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        hand: ["'Kalam'", "cursive"],
        note: ["'Patrick Hand'", "cursive"],
      },
      borderRadius: {
        none: "0px",
      },
      boxShadow: {
        hard: "4px 4px 0px 0px #111111",
        "hard-sm": "2px 2px 0px 0px #111111",
        "hard-lg": "8px 8px 0px 0px #111111",
        "hard-acid": "4px 4px 0px 0px #017AFB",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
        marqueeReverse: "marqueeReverse 28s linear infinite",
      },
    },
  },
  plugins: [],
};
