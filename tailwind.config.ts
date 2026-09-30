import type { Config } from "tailwindcss";

/**
 * Brand tokens live as CSS variables in app/globals.css — change them there.
 * The default Tailwind color palette is intentionally replaced (not extended)
 * so generic utilities like `bg-indigo-500` are unavailable.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      brand: {
        50: "rgb(var(--brand-50) / <alpha-value>)",
        100: "rgb(var(--brand-100) / <alpha-value>)",
        200: "rgb(var(--brand-200) / <alpha-value>)",
        300: "rgb(var(--brand-300) / <alpha-value>)",
        400: "rgb(var(--brand-400) / <alpha-value>)",
        500: "rgb(var(--brand-500) / <alpha-value>)",
        600: "rgb(var(--brand-600) / <alpha-value>)",
        700: "rgb(var(--brand-700) / <alpha-value>)",
        800: "rgb(var(--brand-800) / <alpha-value>)",
        900: "rgb(var(--brand-900) / <alpha-value>)",
      },
      ink: {
        DEFAULT: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--ink-muted) / <alpha-value>)",
      },
      surface: {
        base: "rgb(var(--surface-base) / <alpha-value>)",
        elevated: "rgb(var(--surface-elevated) / <alpha-value>)",
        floating: "rgb(var(--surface-floating) / <alpha-value>)",
      },
    },
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
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
      },
      // Layered, brand-tinted, low-opacity shadows (base → elevated → floating).
      boxShadow: {
        elevated:
          "0 1px 2px rgb(var(--brand-900) / 0.06), 0 4px 12px -2px rgb(var(--brand-900) / 0.08)",
        floating:
          "0 2px 4px rgb(var(--brand-900) / 0.05), 0 12px 24px -6px rgb(var(--brand-900) / 0.10), 0 32px 64px -12px rgb(var(--brand-900) / 0.14)",
      },
      zIndex: {
        base: "0",
        elevated: "10",
        floating: "50",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
