const webpack = require("webpack");
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
  ],
};
