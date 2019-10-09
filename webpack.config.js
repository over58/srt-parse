var webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

var path = require('path');
const config = {
  mode: 'development',
  entry: './src/lib/index.js',
  output: {
    path: path.join(__dirname, './dist'),
    publicPath: '',
    filename: 'vue-toast-xyc.js',
    libraryTarget: 'umd',
    library: 'VueToastX'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV === 'development'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [new VueLoaderPlugin(), new CleanWebpackPlugin()]
};

console.log(`---------------- 当前环境：${process.env.NODE_ENV} ------------------`);
if (process.env.NODE_ENV === 'development') {
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  );
}
module.exports = config;
