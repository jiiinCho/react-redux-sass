const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

/* 'envVars' passed from package.json */
module.exports = (envVars) => {
  const { env } = envVars;
  const envConfig = require(`./webpack.${env}.js`);
  const config = merge(commonConfig, envConfig);
  return config;
};
