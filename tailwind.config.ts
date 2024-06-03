import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        transparent: 'transparent',
        'primary': '#386EDC',
        'secondary': '#20242D',
        'background': '#171A1C',
        'body-text': '#DFE4F1',
        'inactive-text': '#808080',
        'tertiary': '#77797C',
        'stroke-line': '#303745',
        'card': '20242D'
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config