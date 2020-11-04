module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: {
    enabled: false,
    content: ['./src/**/*.vue'],
  },
  theme: {
    extend: {},
  },
  variants: {
    backgroundColor: ['even', 'hover'],
  },
  plugins: [],
}
