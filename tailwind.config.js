
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        cursor: {
            pointer: 'url("/icons/cursor.png"), pointer'
        },
        colors: {
          
            purple600: "hsl(238, 40%, 52%)",
            purple200: "hsl(239, 57%, 85%)",
            pink400: "hsl(358, 79%, 66%)",
            pink200: "hsl(357, 100%, 86%)",
            grey800: "hsl(212, 24%, 26%)",
            grey500: "hsl(211, 10%, 45%)",
            grey100: "hsl(223, 19%, 93%)",
            grey50: "hsl(228, 33%, 97%)",
            white100: "hsl(0, 100%, 100%)",
        },
        fontFamily: {
          rubik: ["Rubik", "sans-serif"],
        },
        fontSize: {
          base: "16px",
        },
        screens: {
          mobile: "375px",
          desktop: "1440px",
        },
      },
    },
    plugins: [],
  };
  