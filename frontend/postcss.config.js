module.exports = {
  parser: 'postcss-scss',
  map: false,
  plugins: {
    'autoprefixer': {},
    'postcss-pxtorem': {
      rootValue: 16,
      unitPrecision: 5,
      propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
      replace: true,
      mediaQuery: false,
      minPixelValue: 2,
      exclude: /node_modules/i
    }
  }
}
