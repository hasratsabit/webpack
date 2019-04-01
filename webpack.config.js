
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const devMode = process.env.NODE_ENV !== 'production'
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');


module.exports = {
    mode: devMode ? 'development' : 'production',
    entry: {
        app: './src/type.ts'
    },
    output: {
      filename: devMode ? '[name].bundle.js' : '[name].bundle.[hash].js',
      path: path.resolve(__dirname, 'dist')
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },

    optimization: {
      splitChunks: {
        chunks: "all",
        filename: "vendor.[hash].js"
      }
  },

    module: {
      rules: [
        {test: /\.js$/, exclude: /(node_modules|bower_components)/, use: {loader: 'babel-loader', options: { presets: ['@babel/preset-env']}}},
        {test: /\.tsx?$/, exclude: /(node_modules|bower_components)/, loader: "ts-loader"},
        {test: /\.scss$/, exclude: /(node_modules|bower_components)/, use: [ devMode ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]},
        {test: /\.(png|svg|jpg|gif)$/, exclude: /(node_modules|bower_components)/, use: ['file-loader']},
        {test: /\.(woff|woff2|eot|ttf|otf)$/, exclude: /(node_modules|bower_components)/, use: ['file-loader']}
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack'
      }),
      new MiniCssExtractPlugin({
        filename: "style.[hash].css"
      }),
       new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })
    ]
}