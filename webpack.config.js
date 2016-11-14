/**
 * @file
 * @author tommyzqfeng
 * @date 2016/11/14
 */
'use strict';

var path = require('path');

module.exports = {
  entry: {
    public: ['./public/js/*.js']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: path.resolve(__dirname,'public/assets'),
    filename: 'bundle.js'
  }
};