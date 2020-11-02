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
    extend: {},
  },
  variants: {
    backgroundColor: ['even', 'hover'],
  },
  plugins: [],
}
