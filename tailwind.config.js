const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // Your primary color
        secondary: '#6366F1', // Your secondary color
        accent: '#10B981', // Your accent color
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        serif: ['Merriweather', ...fontFamily.serif],
      },
      spacing: {
        '128': '32rem', // Custom spacing
        '144': '36rem', // Custom spacing
      },
    },
  },
  plugins: [],
};