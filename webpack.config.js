/**
 * @file
 * @author tommyzqfeng
 * @date 2016/12/13
 */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',

  entry:{
    app: './public/app.js'
  },

  output: {
    path: path.join(__dirname, './public/__build__'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/__build__/'
  },

  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
      {test: /\.vue$/, loader: 'vue'},
      {test: /\.css/, exclude: /^node_modules$/, loader: 'style-loader!css-loader'},
      {test: /\.less/, exclude: /^node_modules$/, loader: 'style-loader!css-loader!less-loader'},
      {test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/, loader: 'file-loader'}
    ]
  },

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('shared.js'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}