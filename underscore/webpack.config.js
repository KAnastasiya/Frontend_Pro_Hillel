const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const outputDir = path.resolve(__dirname, './');

module.exports = {
  context: path.resolve(__dirname, 'src'),

  entry: {
    script: './script',
  },

  output: {
    path: outputDir,
    filename: '[name].js',
  },

  devtool: 'inline-source-map',

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'stage-2'],
        ignore: ['node_modules/', 'public/'],
      },
    }],
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true,
        unused: true,
        collapse_vars: true,
      },
    }),
  ],

  devServer: {
    host: 'localhost',
    port: 8800,
    contentBase: outputDir,
    historyApiFallback: true,
  },
};
