var webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

var path = require('path')
const config = {
  mode: 'development',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.min\.js$/
      })
    ]
  },
  entry: {
    'vue-toast-xyc': './src/lib/index.js',
    'vue-toast-xyc.min': './src/lib/index.js'
  },
  output: {
    path: path.join(__dirname, './dist'),
    publicPath: '',
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'VueToastXYC'
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        include: path.join(__dirname, './src/lib'),
        enforce: 'pre',
        exclude: [
          path.join(__dirname, 'node_modules'),
          path.join(__dirname, 'dist')
        ]
      },
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
        include: path.join(__dirname, 'src/lib'),
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
}

console.log(
  `---------------- 当前环境：${process.env.NODE_ENV} ------------------`
)
if (process.env.NODE_ENV === 'development') {
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  )
}
module.exports = config
