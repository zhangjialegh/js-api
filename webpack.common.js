let path = require("path");
const resolve = dir => path.resolve(__dirname, dir);
module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    filename: "jsa.min.js",
    library: "jsa",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/"
  },
  resolve: {
    alias: {
      "@": resolve("src")
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "src")],
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
