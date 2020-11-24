const colors = require('tailwindcss/colors')

module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: {
    enabled: true,
    content: ['./src/**/*.vue'],
  },
  theme: {
    colors: colors,
    extend: {},
  },
  variants: {
    backgroundColor: ['even', 'hover'],
  },
  plugins: [],
}
