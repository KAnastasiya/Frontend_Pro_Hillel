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
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],

  devServer: {
    host: 'localhost',
    port: 8080,
    contentBase: outputDir,
    historyApiFallback: true,
  },
};
