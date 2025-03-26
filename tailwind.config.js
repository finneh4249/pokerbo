/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        pokerbo: {
          "primary": "#1a6f40",        // Poker table green
          "primary-content": "#ffffff", // White text on primary background
          "secondary": "#4b5563",      // Neutral grey
          "secondary-content": "#ffffff", // White text on secondary background
          "accent": "#f59e0b",         // Warm yellow/gold for chips
          "accent-content": "#ffffff", // White text on accent background
          "neutral": "#2a2e37",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-100-content": "#1f2937",
          "base-200": "#f9fafb",
          "base-200-content": "#1f2937",
          "base-300": "#f3f4f6",
          "base-300-content": "#1f2937",
          "info": "#3b82f6",           // Blue
          "info-content": "#ffffff",
          "success": "#10b981",        // Green
          "success-content": "#ffffff",
          "warning": "#fcd34d",        // Yellow
          "warning-content": "#1f2937", // Dark text on warning background
          "error": "#dc2626",          // Red (for hearts/diamonds)
          "error-content": "#ffffff",
        },
      },
    ],
  },
}
