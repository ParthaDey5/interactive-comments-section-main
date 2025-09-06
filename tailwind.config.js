
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: 'mode',
    theme: {
      extend: {
        cursor: {
            pointer: 'url("/icons/cursor.png"), pointer'
        },
        colors: {
          
            purple600: "hsl(238, 40%, 52%)",
            purple400: "hsl(238, 40%, 66%)",
            purple200: "hsl(239, 57%, 85%)",
            pink600: "hsl(358, 79%, 46%)",
            pink400: "hsl(358, 79%, 66%)",
            pink200: "hsl(357, 100%, 86%)",
            grey800: "hsl(212, 24%, 26%)",
            grey600: "hsl(211, 10%, 35%)",
            grey500: "hsl(211, 10%, 45%)",
            grey400: "hsl(211, 10%, 55%)",
            grey300: "hsl(211, 10%, 75%)",
            grey200: "hsl(223, 23%, 88%)",
            grey100: "hsl(223, 19%, 93%)",
            grey80: "hsl(225, 20%, 95%)",
            grey50: "hsl(228, 33%, 97%)",
            white100: "hsl(0, 100%, 100%)",
            dark100: "hsla(0, 0%, 0%, 0.4)",
        },
        fontFamily: {
          rubik: ["Rubik", "sans-serif"],
        },
        fontSize: {
          base: "16px",
        },
        screens: {
          desktop: "376px",
          
        },
      },
    },
    plugins: [],
  };
  