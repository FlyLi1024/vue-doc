const path = require('path');
const chalk = require('chalk');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const config = require('./webpack.config');

module.exports = merge(config, {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/chunk-[id][chunkhash:7].js',
    path: path.resolve(__dirname, '../dist')
  },
  devServer: {
    host: '0.0.0.0',
    port: '8091',
    hot: true,
    quiet: true,
    // devtool: 'inline-source-map',
    overlay: {
      warnings: true,
      errors: true
    }
  },
  module: {
    rules: [
      {
        test: /\.(c|le)ss$/,
        use: ['style-loader', 'css-loader', 'less-loader']
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
          require.resolve('./md-loader-simple/index.js')
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/index.css',
      chunkFilename: 'css/chunk-[name][chunkhash:7].css'
    }),
    new ProgressBarPlugin({
      format: '  正在编译： [:bar] ' + chalk.green.bold(':percent'),
      clear: false,
      callback: () => {
        console.log(chalk.bold.yellow('编译完成！\n'));
        console.log(chalk.bold.yellow('http://localhost:8091'));
      }
    })
  ]
});
