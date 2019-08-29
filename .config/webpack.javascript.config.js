const VueLoaderPlugin = require("vue-loader/lib/plugin");
const path = require("path");
const config = require("./config");
const PRODUCTION = JSON.stringify(process.env.NODE_ENV === "production");

module.exports = {
  mode: PRODUCTION,
  context: config.SRC,
  entry: path.resolve(config.SRC, "js/main.js"),
  output: {
    path: path.resolve(config.DIST, "js/"),
    filename: "[name].bundle.js"
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.common.js",
      "@": path.join(config.SRC, "js/vue/"),
      js: path.resolve(config.SRC, "js/"),
      "~": config.PROJECT
    },
    extensions: [".js", ".vue", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-proposal-optional-chaining"
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      }
    ]
  },
  plugins: [new VueLoaderPlugin()],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: "vendor",
          chunks: "initial",
          enforce: true
        }
      }
    }
  },
  devtool: PRODUCTION ? "" : "source-map"
};
