module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'body': ['"Open Sans"']
    },
    fontSize: {
      m: ['20px', '1'],
      xl: ['38px', '1.2'],
    },
    extend: {
      colors: {
        'violett': '#B6A6F8',
        'black': '#222222',
        'lightGrey': '#EFEFEF'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
