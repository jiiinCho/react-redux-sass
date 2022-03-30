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
};
