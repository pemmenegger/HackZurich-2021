module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      margin: ["first"],
    },
  },
  plugins: [
    require("./tailwind/plugins/content-container"),
    require("./tailwind/plugins/text-styles"),
  ],
};
