const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const debug = process.env.NODE_ENV !== "production";
const buildPath = '/wp-content/themes/domsters-static-theme/dist/';
const VENDOR_LIBS = [
  'faker', 'lodash'];

const config = {
  // mode: 'development',
  // devtool: isProduction ? 'eval-cheap-module-source-map' : 'source-map',
  devtool: debug ? "inline-sourcemap" : null,
  entry: {
    app: './src/js/app.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash].js',
    publicPath: '/dist/',
  },

  optimization: {
          minimize: false,
          runtimeChunk: {
              name: 'vendor'
          },
          splitChunks: {
              cacheGroups: {
                  default: false,
                  commons: {
                      test: /node_modules/,
                      name: "vendor",
                      chunks: "initial",
                      minSize: 1
                  }
              }
          }
      },

  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory',
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          // {
          //   loader: 'url-loader',
          //   options: {
          //     limit: 8192, // Convert images < 8kb to base64 strings
          //   },
          // },
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: buildPath
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin({
      filename: 'app.css',
      disable: true,
      allChunks: true
    }),
    new webpack.NamedModulesPlugin(),
    new UglifyJSPlugin({
          cache: false,
          parallel: true,
          sourceMap: false
        }),
    new OptimizeCssAssetsPlugin(),
    new BrowserSyncPlugin({
      proxy: 'local.domsters.com',
      port: 3000,
      files: ['**/*.php'],
      ghostMode: {
        clicks: false,
        location: false,
        forms: false,
        scroll: false,
      },
      injectChanges: true,
      logFileChanges: true,
      logLevel: 'debug',
      logPrefix: 'webpack',
      notify: true,
      reloadDelay: 0,
    }),
    new webpack.HotModuleReplacementPlugin({})
  ],
  watch: true,
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    compress: true,
    stats: 'errors-only',
    open: true
  }
};

module.exports = config;
