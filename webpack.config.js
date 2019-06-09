const path = require("path");

module.exports = {
  entry: {
    index: "./src/index.js",
    react: "./src/react.js"
  },
  output: {
    path: __dirname,
    filename: "[name].js",
    libraryTarget: "commonjs"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: __dirname,
        exclude: /(node_modules|dist)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            plugins: ["@babel/plugin-proposal-object-rest-spread"]
          }
        }
      }
    ]
  },
  externals: {
    react: "commonjs react",
    "prop-types": "commonjs prop-types"
  }
};
