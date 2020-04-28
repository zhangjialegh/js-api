let webpack = require("webpack");
let UglifyJSPlugin = require("uglifyjs-webpack-plugin");
let merge = require("webpack-merge");
let common = require("./webpack.common.js");
let path = require("path");
module.exports = merge(common, {
  devtool: "source-map",
  mode: "production",
  devServer: {
    disableHostCheck: true,
    progress: true,
    contentBase: path.join(__dirname, "./"),
    publicPath: "/dist/",
    hot: false,
    inline: false
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
      uglifyOptions:{
        output: {
          comments: false,
          beautify: false
        }
      }
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  ]
});
