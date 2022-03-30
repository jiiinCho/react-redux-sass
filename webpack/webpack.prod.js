const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
require("dotenv").config({ path: "./.env" });

module.exports = {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env.REACT_APP_BASE_URL": JSON.stringify(
        process.env.REACT_APP_BASE_URL
      ),
      "process.env.name": JSON.stringify("environmetal variable test"),
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader", //2. turns css into commonjs (js)
          "sass-loader", //1. turns sass into css
        ],
      },
    ],
  },
};
