'use strict';

const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  // remove target at webpack-dev-server 4+ (needed for hot reload)
  target: "web",
  devServer: {
    contentBase: path.join(__dirname, './'),
    hot: true,
    historyApiFallback: true,
  },
  optimization: {
    minimize: false,
  },
});