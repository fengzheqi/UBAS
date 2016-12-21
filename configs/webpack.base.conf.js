/**
 * @file
 * @author tommyzqfeng
 * @date 2016/11/14
 */
var path = require('path');
var projectRoot = path.resolve(__dirname, '../');
var projectPublic = path.resolve(__dirname, '../public');

module.exports = {
  entry: {
    public: './public/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: path.resolve(__dirname,'public/assets'),
    filename: 'bundle.js'
  },
  resolve: {},
  resolveLoader: {},
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectPublic
      },
      {
        test: /\.json/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ],
    loaders: [

    ]
  },
  vue: {

  }
};