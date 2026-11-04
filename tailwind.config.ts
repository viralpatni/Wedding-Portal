import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  // Disable dark mode — light mode only, always
  darkMode: false,
  theme: {
    extend: {
      // ── Color Palette ─────────────────────────────────────
      colors: {
        pearl: "#FBF7F2",
        blush: "#F6D6DC",
        peach: "#FFDCC8",
        champagne: "#EBD3B5",
        "rose-gold": "#D9A38F",
        "rose-dark": "#B76E79",
        espresso: "#3A2823",
        "gold-line": "#B8935A",
        lavender: "#E9DDF5",
        // Extended shades
        "rose-gold-light": "#EBC4B3",
        "rose-gold-deep": "#C4887A",
        "pearl-dark": "#F0E8DF",
        "espresso-light": "#6B4A42",
      },

      // ── Typography ────────────────────────────────────────
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        script: ['"Pinyon Script"', "cursive"],
        body: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-sm": "clamp(2.5rem, 6vw, 4rem)",
        "display-md": "clamp(3.5rem, 8vw, 7rem)",
        "display-lg": "clamp(4rem, 10vw, 10rem)",
        "display-xl": "clamp(5rem, 12vw, 12rem)",
        label: ["0.7rem", { letterSpacing: "0.2em", fontWeight: "500" }],
      },

      // ── Spacing ───────────────────────────────────────────
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "section": "8rem",
      },

      // ── Border Radius ─────────────────────────────────────
      borderRadius: {
        glass: "28px",
        arch: "50% 50% 0 0 / 60% 60% 0 0",
        pill: "9999px",
      },

      // ── Box Shadow ────────────────────────────────────────
      boxShadow: {
        glass: "0 8px 32px rgba(180, 110, 90, 0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
        "glass-strong": "0 16px 48px rgba(180, 110, 90, 0.15), inset 0 1px 0 rgba(255,255,255,0.8)",
        "gold-glow": "0 0 30px rgba(184, 147, 90, 0.3)",
        "rose-glow": "0 0 40px rgba(217, 163, 143, 0.4)",
        "soft-warm": "0 4px 24px rgba(58, 40, 35, 0.06)",
        "card-hover": "0 20px 60px rgba(58, 40, 35, 0.12)",
      },

      // ── Backdrop Blur ─────────────────────────────────────
      backdropBlur: {
        glass: "20px",
        "glass-heavy": "40px",
      },

      // ── Animation / Keyframes ─────────────────────────────
      transitionTimingFunction: {
        cinematic: "cubic-bezier(.22,1,.36,1)",
      },
      transitionDuration: {
        smooth: "600ms",
        slow: "1200ms",
        "very-slow": "2000ms",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-12px) rotate(1deg)" },
          "66%": { transform: "translateY(-6px) rotate(-0.5deg)" },
        },
        drift: {
          "0%": { transform: "translateY(0) translateX(0) rotate(0deg)", opacity: "0.7" },
          "100%": { transform: "translateY(-100vh) translateX(20px) rotate(360deg)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.08)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        curtainReveal: {
          "0%": { clipPath: "inset(0 0 100% 0)" },
          "100%": { clipPath: "inset(0 0 0% 0)" },
        },
        drawLine: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        waveform: {
          "0%, 100%": { height: "4px" },
          "50%": { height: "16px" },
        },
        petalFall: {
          "0%": { transform: "translateY(-10px) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "0.7" },
          "100%": { transform: "translateY(100vh) rotate(720deg)", opacity: "0" },
        },
      },
      animation: {
        float: "float 6s cubic-bezier(.22,1,.36,1) infinite",
        "float-slow": "float 10s cubic-bezier(.22,1,.36,1) infinite",
        drift: "drift 8s linear infinite",
        shimmer: "shimmer 3s linear infinite",
        heartbeat: "heartbeat 2s ease-in-out infinite",
        "fade-up": "fadeUp 0.8s cubic-bezier(.22,1,.36,1) forwards",
        petal: "petalFall 6s linear infinite",
      },

      // ── Background gradients ──────────────────────────────
      backgroundImage: {
        aurora: "radial-gradient(ellipse 80% 60% at 50% -10%, #F6D6DC 0%, #FBF7F2 50%, #FFDCC8 100%)",
        "pearl-mesh":
          "radial-gradient(ellipse at 20% 50%, #E9DDF5 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, #F6D6DC 0%, transparent 40%), radial-gradient(ellipse at 60% 80%, #FFDCC8 0%, transparent 40%), linear-gradient(180deg, #FBF7F2 0%, #FBF7F2 100%)",
        "gold-hairline": "linear-gradient(90deg, transparent, #B8935A, transparent)",
        "rose-shimmer": "linear-gradient(120deg, #D9A38F 0%, #EBC4B3 40%, #D9A38F 60%, #B76E79 100%)",
        "sunset-footer":
          "linear-gradient(180deg, #FBF7F2 0%, #FFDCC8 30%, #F6D6DC 60%, #EBD3B5 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
