/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      "dark-sky-purple": "#573F56",
      "dark-sky-pink": "#993861"
    },
    extend: {
      backgroundImage: {
        'campfire-background': "url('assets/backgrounds/Untitled_Artwork_2.png')"
      }
    },
  },
  plugins: [],
}

