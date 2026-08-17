import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ═══ THEME ENGINE VARIABLES ═══
        base: "var(--bg-base)",
        surface: "var(--bg-surface)",
        elevated: "var(--bg-surface-elevated)",
        surfaceHover: "var(--bg-surface-hover)",
        borderSubtle: "var(--border-subtle)",
        borderStrong: "var(--border-strong)",
        accentPrimary: "var(--accent-primary)",
        accentSecondary: "var(--accent-secondary)",
        
        // ═══ KRISH OS LUXURY PALETTE ═══
        primary: "#04060B",         // Midnight Black
        secondary: "#081B33",       // Deep Space Navy
        card: "rgba(8, 12, 24, 0.6)",  // Navy Glass
        cardBorder: "rgba(255, 255, 255, 0.06)",

        // Accent Blues (icon-matched)
        accent: "#F8FAFC",          // Pearl White
        accentLight: "#3B82F6",     // Electric Blue
        accentGlow: "#4DA6FF",      // Azure Glow
        accentCyan: "#00E5FF",      // Neon Cyan

        // Gold System
        accentLuxury: "#FFD54A",    // Liquid Gold
        goldWarm: "#FFC107",        // Warm Gold

        // Text (High Visibility)
        muted: "#94A3B8",           // Bright Slate 400 (was too dark before)
        secondaryText: "#F1F5F9",   // Slate 100 (almost white for perfect readability)

        // Status
        success: "#00E676",
        warning: "#FFEA00",
        danger: "#FF1744",
      },
      borderRadius: {
        cards: "26px",
        buttons: "18px",
        inputs: "20px",
        sidebar: "28px",
        images: "22px",
        widgets: "26px",
      },
      boxShadow: {
        // Luxury depth
        luxury: "0 20px 60px -10px rgba(0,0,0,0.9), 0 0 20px rgba(255,255,255,0.03), inset 0 1px 1px rgba(255,255,255,0.1)",
        // Blue glow system
        blueGlow: "0 0 20px rgba(37,99,235,0.3), 0 0 50px rgba(37,99,235,0.15), 0 0 80px rgba(37,99,235,0.05)",
        blueSoft: "0 0 15px rgba(59,130,246,0.2)",
        blueIntense: "0 0 30px rgba(37,99,235,0.5), 0 0 60px rgba(37,99,235,0.2)",
        // Gold glow system
        goldGlow: "0 0 15px rgba(255,213,74,0.3), 0 0 40px rgba(255,213,74,0.1)",
        goldSoft: "0 0 10px rgba(255,213,74,0.15)",
        // Card system
        cardFloat: "0 25px 80px -15px rgba(0,0,0,0.8), 0 0 1px rgba(255,255,255,0.1)",
        hoverLift: "0 35px 100px -20px rgba(0,0,0,0.9), 0 0 30px rgba(37,99,235,0.08), inset 0 1px 2px rgba(255,255,255,0.15)",
        // Icon glow
        iconGlow: "0 4px 20px rgba(37,99,235,0.35), 0 0 40px rgba(37,99,235,0.12)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "glass-gradient": "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)",
        "blue-gradient": "linear-gradient(135deg, #2563EB 0%, #3B82F6 50%, #4DA6FF 100%)",
        "gold-gradient": "linear-gradient(135deg, #FFD54A 0%, #FFC107 100%)",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "SF Pro Display", "-apple-system", "sans-serif"],
      },
      animation: {
        'aurora': 'aurora 60s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        'breathe': 'breathe 6s ease-in-out infinite',
        'border-glow': 'border-glow 4s linear infinite',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'gradient-x': {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.03)', opacity: '1' },
        },
        'border-glow': {
          '0%, 100%': { 'border-color': 'rgba(37,99,235,0.3)' },
          '50%': { 'border-color': 'rgba(37,99,235,0.6)' },
        },
      }
    },
  },
  plugins: [],
};
export default config;
