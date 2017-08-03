const path = require('path');
module.exports = {
  entry: './client/ReactVT.js',
  output: {
    path: path.resolve('./chrome-ext/panel'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
}