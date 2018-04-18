const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production'; // true or false
// const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  // use: [
  //   {
  //     loader: 'css-loader',
  //     options: {
  //       url: false,
  //       minimize: true,
  //       sourceMap: true,
  //     },
  //   },
  //   {
  //     loader: 'sass-loader',
  //     options: {
  //       sourceMap: true,
  //     },
  //   },
  // ],
  use: [
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        sourceMap: true,
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
      },
    },
  ],
});

// const cssConfig = isProd ? cssProd : cssDev;
const buildPath = '/wp-content/themes/domsters-static-theme/dist/';
// const VENDOR_LIBS = ['faker', 'lodash'];

const config = {
  entry: {
    app: './src/js/app.js',
    // vendor: VENDOR_LIBS,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // chunkFilename: 'js/[name]s.[hash].js',
    // filename: 'js/[name].[hash].js',
    filename: '[name].js',
    // sourceMapFilename: '[file].map',
    publicPath: '/dist/',
  },
  devtool: 'eval',
  mode: 'development',
  // optimization: {
  //   minimize: false,
  //   runtimeChunk: {
  //     name: 'vendor',
  //   },
  //   splitChunks: {
  //     cacheGroups: {
  //       default: false,
  //       commons: {
  //         test: /node_modules/,
  //         name: 'vendor',
  //         chunks: 'initial',
  //         minSize: 1,
  //       },
  //     },
  //   },
  // },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
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
              // name: '[path][hash:6].[ext]',
              name: '[name].[ext]',
              publicPath: buildPath,
            },
          },
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin({
      // filename: 'app.css',
      // disable: !isProd,
      filename: getPath => {
        return getPath('[name].css').replace('css/js', 'css');
      },
      allChunks: true,
    }),
    new UglifyJSPlugin({
      cache: false,
      parallel: true,
      sourceMap: true,
    }),
    // new OptimizeCssAssetsPlugin(),
    new BrowserSyncPlugin({
      proxy: 'local.domsters.com',
      port: 3000,
      files: ['**/*.php'],
      // ghostMode: {
      //   clicks: false,
      //   location: false,
      //   forms: false,
      //   scroll: false,
      // },
      // injectChanges: true,
      // logFileChanges: true,
      // logLevel: 'debug',
      // logPrefix: 'webpack',
      notify: true,
      reloadDelay: 0,
    }),
  ],
  watch: true,
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    // port: 9000,
    // compress: true,
    // historyApiFallback: true,
    stats: 'errors-only',
    open: true,
  },
};

module.exports = config;
