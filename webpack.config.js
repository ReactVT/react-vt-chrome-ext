const path = require('path');
module.exports = {
  entry: ['./chrome-ext/panel/configure-webpack.js', './client/ReactVT.js'],
  output: {
    path: path.resolve('./chrome-ext/panel'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
      {
        test: /\.(eot|png|svg|[ot]tf|woff2?)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        query: {limit: 100000}
      },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
}