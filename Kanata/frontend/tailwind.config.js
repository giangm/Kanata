/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#FF7AC6",
        "secondary": "#BF95F9",
        "accent": "#FFB86B",
        "info": "#8BE8FD",
        "success": "#52FA7C",
        "warning": "#F1FA89",
        "error": "#FF5757",
      },
      spacing: {
        "75": "75vh",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"),require("daisyui")],
  daisyui: {
    themes: [
      {
        "dracula": {
          ...require("daisyui/src/theming/themes")["[data-theme=dracula]"],
          "base-100": "#181920",
        },
      },
    ],
    darkTheme: "dracula",
  },
}

