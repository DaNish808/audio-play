const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  entry: ["babel-polyfill", "./src"],
  output: {
    filename: "main.js"
  },
  mode: "development",
  // watch: true,
  module: {
    rules: [
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test: /\.(mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ],
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new webpack.DefinePlugin({
      'process.env': {
        FIREBASE_URL: JSON.stringify(process.env.FIREBASE_URL),
        FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        FIREBASE_SENDER_ID: JSON.stringify(process.env.FIREBASE_SENDER_ID),
        FIREBASE_KEY: JSON.stringify(process.env.FIREBASE_KEY),
      },
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    open: true
  }
}