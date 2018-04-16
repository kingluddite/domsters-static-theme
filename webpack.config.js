const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const buildPath = '/wp-content/themes/domsters-static-theme/dist/';
/* eslint-disable global-require */
// if (process.env.NODE_ENV === 'test') {
//   require('dotenv').config({ path: '.env.test' });
// } else if (process.env.NODE_ENV === 'development') {
//   require('dotenv').config({ path: '.env.development' });
// }
/* eslint-enable global-require */

// const isProduction = env === 'production';
// const buildPath = '/wp-content/themes/domsters-static-theme';

const config = {
  // mode: 'development',
  // devtool: isProduction ? 'eval-cheap-module-source-map' : 'source-map',

  entry: {
    app: './src/js/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    // filename: 'js/[name].bundle.js',
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                // sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              // options: { sourceMap: true },
            },
            {
              loader: 'sass-loader',
              options: {
                // sourceMap: true,
              },
            },
          ],
        }),
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
    new ExtractTextPlugin('/css/[name].css'),
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
  ],
  watch: true,
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
  },
};

// if true JS and CSS files will be minified
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new UglifyJSPlugin({
      cache: true,
      parallel: true,
      sourceMap: true,
    }),
    new OptimizeCssAssetsPlugin()
  );
}

module.exports = config;
