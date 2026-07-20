const path = require("path");
const webpack = require("webpack");
module.exports = {
  mode: "production",
  entry: "./web/src/index.js",
  output: { path: path.resolve(__dirname, "web/dist"), filename: "xmrescrow-msig.bundle.js" },
  module: { rules: [
    { test: /\.js$/, exclude: /node_modules/, use: { loader: "babel-loader", options: { presets: ["@babel/preset-env"] } } },
  ]},
  devtool: false,
  externals: ["worker_threads","ws","perf_hooks","child_process"],
  plugins: [
    new webpack.ProvidePlugin({ process: "process/browser", Buffer: ["buffer","Buffer"] }),
    new webpack.NormalModuleReplacementPlugin(/^node:/, (r) => { r.request = r.request.replace(/^node:/, ""); }),
  ],
  resolve: {
    alias: { fs: "memfs" },
    fallback: {
      assert: require.resolve("assert"),
      crypto: require.resolve("crypto-browserify"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      os: require.resolve("os-browserify/browser"),
      path: require.resolve("path-browserify"),
      querystring: require.resolve("querystring-es3"),
      stream: require.resolve("stream-browserify"),
      url: require.resolve("url"),
      util: require.resolve("util"),
      zlib: require.resolve("browserify-zlib"),
    },
  },
};
