const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const config = require('../config/config');

module.exports = {
  // stats: 'minimal',
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.less'], // import导入时省略后缀
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@guide': path.resolve(__dirname, '../guide')
    }
  },
  module: {
    rules: [
      {
        test: /\.(svg|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[hash:7].[ext]',
          publicPath: '../'
        }
      },
      {
        test: /\.(otf|ttf|woff|woff2|eot?g)(\?\S*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'font/[name].[ext]',
          publicPath: '../'
        }
      },
      {
        test: /\.(js|jsx?|babel|es6)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/public/index.html'),
      title: config.title,
      inject: 'body'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin()
  ]
};
