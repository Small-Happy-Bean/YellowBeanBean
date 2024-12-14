// Webpack config
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // Mode
  mode: "production",
  // Multi-entries
  entry: [
    "./src_es6/gameLoader.js",
  ],
  // Output to the base path of the project
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "."),
  },
  // Modules (If resource, css or other files included)
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {},
    ],
  },
  // Excluding dependencies
  externals: {
    phaser: "Phaser",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: "head",
    }),
  ],
};
