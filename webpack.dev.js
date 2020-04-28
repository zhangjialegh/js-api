let merge = require("webpack-merge");
let path = require("path");
let common = require("./webpack.common.js");
module.exports = merge(common, {
  mode: "development",
  devServer: {
    disableHostCheck: true,
    progress: true,
    contentBase: path.join(__dirname, "./"),
    publicPath: "/dist/",
    hot: false,
    inline: false,
    port: 8009
  }
});
