const path = require('path');
const chalk = require('chalk');
const merge = require('webpack-merge');
// const webpack = require('webpack');
// const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const config = require('./webpack.config');
module.exports = merge(config, {
  mode: 'production',
  entry: './src/main.js',
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/chunk-[id][chunkhash:7].js',
    path: path.resolve(__dirname, '../dist')
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.(c|le)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              importLoaders: 2
            }
          }
        ]
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          require.resolve('../build/md-loader-simple/index.js')
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new OptimizeCSSAssetsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/index.css',
      chunkFilename: 'css/[name]-[chunkhash:7].css'
    }),
    new ProgressBarPlugin({
      format: '  正在打包： [:bar] ' + chalk.green.bold(':percent'),
      clear: false,
      callback: () => {
        console.log(chalk.bold.yellow('打包完成！\n'));
        console.log(chalk.bold.yellow('http://localhost:8091'));
      }
    })
    // new WebpackBuildNotifierPlugin({
    //   title: '打包成功',
    //   suppressSuccess: true,
    //   activateTerminalOnError: false
    // })
  ]
});
