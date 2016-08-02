var path = require('path');
var webpack = require('webpack');



var config = {
  entry: [
  'webpack/hot/dev-server',
  'webpack-hot-middleware/client',
  './entry.jsx',
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};

module.exports = config;