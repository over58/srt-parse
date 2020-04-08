const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

var path = require('path')
const config = {
  mode: "development",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.min\.js$/,
      }),
    ],
  },
  entry: {
    "srt-parse": "./src/index.js",
    "srt-parse.min": "./src/index.js",
  },
  output: {
    path: path.join(__dirname, "./dist"),
    publicPath: "",
    filename: "[name].js",
    globalObject: "this",
    library: "srtParse",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: path.join(__dirname, "src"),
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};

module.exports = config
