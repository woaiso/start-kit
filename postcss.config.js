

//https://github.com/michael-ciniawsky/postcss-load-config
module.exports = {
  map: 'inline',
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {
      browsers: [ 'last 2 versions', '> 5%' ],
    },
    'postcss-pxtorem': {
      rootValue: 100,
      unitPrecision: 5,
      propList: [ '*' ],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0
    }
  }
}
