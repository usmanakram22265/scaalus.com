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
      },
      // Mobile-first fluid scale; tracking tightens as size grows.
      fontSize: {
        "display-xl": [
          "clamp(2.375rem, 1.5rem + 4vw, 4.5rem)",
          { lineHeight: "1.04", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        "display-lg": [
          "clamp(1.875rem, 1.3rem + 2.6vw, 3.25rem)",
          { lineHeight: "1.08", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        title: [
          "clamp(1.25rem, 1.15rem + 0.3vw, 1.375rem)",
          { lineHeight: "1.3", letterSpacing: "-0.015em", fontWeight: "600" },
        ],
        lead: [
          "clamp(1.0625rem, 0.98rem + 0.4vw, 1.25rem)",
          { lineHeight: "1.6" },
        ],
        body: ["1.0625rem", { lineHeight: "1.7" }],
        small: ["0.9375rem", { lineHeight: "1.6" }],
        eyebrow: [
          "0.8125rem",
          { lineHeight: "1.4", letterSpacing: "0.02em", fontWeight: "600" },
        ],
      },
      letterSpacing: {
        tightest: "-0.03em",
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
        section: "clamp(6rem, 4.5rem + 6vw, 9rem)",
        header: "3.5rem",
        "header-lg": "4rem",
      },
      maxWidth: {
        page: "70rem",
        prose: "36rem",
      },
      borderRadius: {
        card: "1.75rem",
      },
      // Layered, navy-tinted, low-opacity shadows (base → elevated → floating).
      boxShadow: {
        elevated:
          "0 1px 2px rgb(13 40 71 / 0.05), 0 6px 16px -4px rgb(13 40 71 / 0.08), 0 0 0 1px rgb(13 40 71 / 0.04)",
        floating:
          "0 2px 4px rgb(13 40 71 / 0.04), 0 16px 32px -8px rgb(13 40 71 / 0.12), 0 40px 80px -20px rgb(13 40 71 / 0.18), 0 0 0 1px rgb(13 40 71 / 0.04)",
        // Cards on light sections.
        card: "0 1px 2px rgb(13 40 71 / 0.06), 0 16px 40px -12px rgb(18 52 153 / 0.18)",
        // Primary buttons: contact shadow, brand glow, top highlight.
        primary:
          "0 1px 2px rgb(10 36 114 / 0.2), 0 8px 24px -6px rgb(43 89 216 / 0.5), inset 0 1px 0 rgb(255 255 255 / 0.18)",
        button:
          "0 1px 2px rgb(10 36 114 / 0.2), 0 6px 16px -6px rgb(43 89 216 / 0.55), inset 0 1px 0 rgb(255 255 255 / 0.18)",
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
