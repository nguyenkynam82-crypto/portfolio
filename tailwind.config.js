/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        // LIGHT THEME RECOLOR (client: kn. / Nguyễn Kỳ Nam) — remap Tailwind's
        // black & white so every existing bg-black / text-white utility renders
        // the brand palette without editing each component:
        //   black -> #E1FFFB (mint, used as background)
        //   white -> #060935 (navy, used as text/foreground)
        black: "#E1FFFB",
        white: "#060935",
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', "sans-serif"],
        display: ['"Playfair Display"', "serif"],
        body: ['"Be Vietnam Pro"', "sans-serif"],
        heading: ['"Be Vietnam Pro"', "sans-serif"],
      },
      keyframes: {
        "fade-rise": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        }
      },
      animation: {
        "fade-rise": "fade-rise 0.8s ease-out both",
        "fade-rise-delay": "fade-rise 0.8s ease-out 0.2s both",
        "fade-rise-delay-2": "fade-rise 0.8s ease-out 0.4s both",
        "marquee": "marquee 30s linear infinite",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
