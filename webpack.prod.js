'use strict';

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  // remove target at webpack-dev-server 4+ (needed for hot reload)
  target: "browserslist",
  devtool: 'source-map',
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false,
    })],
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
});