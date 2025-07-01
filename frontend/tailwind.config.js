module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4CA1FF", // Light blue (Spendee vibe)
        lightbg: "#F9FBFD",
        card: "#FFFFFF",
        text: "#1E293B"
      },
      borderRadius: {
        xl: "1rem",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
