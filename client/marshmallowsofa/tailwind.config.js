/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      "dark-sky-purple": "#573F56",
      "dark-sky-pink": "#993861",
      "off-black": "#21211C",
      "off-white": "#CEC9B0",
      "off-white-hover": "#dbd8ca"
    },
    extend: {
      backgroundImage: {
        'campfire-background': "url('assets/backgrounds/Bg1_3.png')",
        'lobby-panel': "url('assets/backgrounds/Untitled_Artwork_4.png')"
      },
      fontFamily: {
        "sans": ["Playpen Sans", "sans-serif"]
      }
    },
  },
  plugins: [],
}

