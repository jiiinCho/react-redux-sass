const webpack = require("webpack");
require("dotenv").config({ path: "./.env" });

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    hot: true,
    open: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.REACT_APP_BASE_URL": JSON.stringify(
        process.env.REACT_APP_BASE_URL
      ),
      "process.env.name": JSON.stringify("environmetal variable test"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", //3. Inject styles in js into DOM
          "css-loader", //2. turns css into commonjs (js)
          "sass-loader", //1. turns sass into css
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
