const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InjectBodyPlugin = require("inject-body-webpack-plugin").default;

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "auto",
    filename: "[name].js",
  },
  resolve: {
    extensions: [".js", ".jsx"], // add your other extensions here
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new InjectBodyPlugin({
      content: "<main id=root></main>",
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, "public"),
      publicPath: "/build/",
    },
    open: true,
    port: 3000,
    allowedHosts: ["localhost", ".preview.csb.app"],
    client: { overlay: true },
  },
};
