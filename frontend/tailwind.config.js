module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        'neumorphism': '9px 9px 16px rgba(0, 0, 0, 0.6), -9px -9px 16px rgba(255, 255, 255, 0.1)',
        'inner-neumorphism': 'inset 4px 4px 8px rgba(0, 0, 0, 0.6), inset -4px -4px 8px rgba(255, 255, 255, 0.1)',
      },
      colors: {
        'gray-900': '#181818',
        'gray-800': '#1f1f1f',
        'gray-700': '#1c1c1c',
        'highlight': '#1db954',
        'gradient-start': '#0f0c29',
        'gradient-middle': '#302b63',
        'gradient-end': '#24243e',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-to-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
      },
      height: {
        '128': '32rem', // Add this line to define the custom height
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
