import type { Config } from "tailwindcss";

/**
 * Brand tokens come from brand_assets/README.md — use these exact values.
 * The default Tailwind color palette is intentionally replaced (not extended)
 * so generic utilities like `bg-indigo-500` are unavailable.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Gate every `hover:` behind (hover: hover) so taps never leave a sticky hover state.
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#FFFFFF",
      navy: "#0D2847",
      deep: "#0A2472",
      royal: "#123499",
      brand: "#2B59D8",
      sky: "#6E93F0",
      ink: {
        DEFAULT: "#0D2847",
        muted: "#5B6573",
      },
      surface: {
        base: "#FAF9F6",
        card: "#F3F1EC",
        elevated: "#FFFFFF",
      },
      // Functional only: form validation. Not a brand color.
      danger: "#B42318",
    },
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      // Mobile-first fluid scale; tracking tightens as size grows.
      fontSize: {
        "display-2xl": [
          "clamp(2.5rem, 1.55rem + 4.2vw, 4.75rem)",
          { lineHeight: "1.02", letterSpacing: "-0.042em", fontWeight: "600" },
        ],
        "display-xl": [
          "clamp(2.125rem, 1.5rem + 2.9vw, 3.75rem)",
          { lineHeight: "1.04", letterSpacing: "-0.038em", fontWeight: "600" },
        ],
        "display-lg": [
          "clamp(1.75rem, 1.35rem + 1.8vw, 2.75rem)",
          { lineHeight: "1.08", letterSpacing: "-0.032em", fontWeight: "600" },
        ],
        title: [
          "clamp(1.1875rem, 1.12rem + 0.3vw, 1.3125rem)",
          { lineHeight: "1.3", letterSpacing: "-0.018em", fontWeight: "600" },
        ],
        lead: [
          "clamp(1.0625rem, 0.99rem + 0.35vw, 1.1875rem)",
          { lineHeight: "1.65" },
        ],
        body: ["1.0625rem", { lineHeight: "1.7" }],
        small: ["0.9375rem", { lineHeight: "1.6" }],
        label: [
          "0.75rem",
          { lineHeight: "1.2", letterSpacing: "0.08em", fontWeight: "500" },
        ],
      },
      lineHeight: {
        body: "1.7",
      },
      // Intentional spacing tokens — prefer these over arbitrary steps.
      spacing: {
        "space-2xs": "0.25rem",
        "space-xs": "0.5rem",
        "space-sm": "1rem",
        "space-md": "1.5rem",
        "space-lg": "2.5rem",
        "space-xl": "4rem",
        "space-2xl": "6rem",
        "space-3xl": "9rem",
        section: "clamp(5.5rem, 4rem + 6vw, 8.5rem)",
        header: "4rem",
      },
      maxWidth: {
        page: "74rem",
        prose: "36rem",
      },
      borderRadius: {
        card: "1.5rem",
        panel: "2.5rem",
      },
      // Layered, navy-tinted, low-opacity shadows (base → elevated → floating).
      boxShadow: {
        elevated:
          "0 1px 2px rgb(13 40 71 / 0.05), 0 8px 24px -8px rgb(13 40 71 / 0.10), 0 0 0 1px rgb(13 40 71 / 0.05)",
        "elevated-hover":
          "0 2px 4px rgb(13 40 71 / 0.05), 0 18px 40px -12px rgb(18 52 153 / 0.22), 0 0 0 1px rgb(13 40 71 / 0.06)",
        floating:
          "0 2px 4px rgb(13 40 71 / 0.05), 0 20px 40px -12px rgb(13 40 71 / 0.18), 0 48px 96px -24px rgb(10 36 114 / 0.28), 0 0 0 1px rgb(13 40 71 / 0.05)",
        // On navy: deep drop + a 1px top highlight so cards read as lit from above.
        "on-navy":
          "0 24px 60px -16px rgb(3 10 30 / 0.6), inset 0 1px 0 rgb(255 255 255 / 0.10), 0 0 0 1px rgb(255 255 255 / 0.08)",
        cta: "0 1px 2px rgb(10 36 114 / 0.25), 0 10px 28px -8px rgb(43 89 216 / 0.6), inset 0 1px 0 rgb(255 255 255 / 0.22)",
        header:
          "0 1px 2px rgb(13 40 71 / 0.06), 0 10px 30px -12px rgb(13 40 71 / 0.18), 0 0 0 1px rgb(13 40 71 / 0.06)",
      },
      zIndex: {
        base: "0",
        elevated: "10",
        floating: "50",
      },
      // Emil Kowalski's curves: strong ease-out for UI, ease-in-out for on-screen movement.
      transitionTimingFunction: {
        out: "cubic-bezier(0.23, 1, 0.32, 1)",
        "in-out": "cubic-bezier(0.77, 0, 0.175, 1)",
        drawer: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
