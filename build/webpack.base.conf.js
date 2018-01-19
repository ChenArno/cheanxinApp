var path = require('path');
var utils = require('./utils');
var config = require('../config');
var vueLoaderConfig = require('./vue-loader.conf');
var glob = require('glob');
var entries = getEntry('./src/views/**/*.js'); // 获得入口js文件
var webpack = require('webpack');
const vuxLoader = require('vux-loader');
const AutoDllPlugin = require('autodll-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
const webpackConfig = {
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].bundle.js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'router': path.resolve(__dirname, '../src/router'),
      'common': path.resolve(__dirname, '../src/common'),
      'store': path.resolve(__dirname, '../src/store'),
      'views': path.resolve(__dirname, '../src/views'),
      'api': path.resolve(__dirname, '../src/api'),
      'utils': path.resolve(__dirname, '../src/utils'),
      'muse-components': 'muse-ui/src'
    }
  },
  externals: {
    mui: 'mui'  //严格模式.babelrc
  },
  plugins: [
    new AutoDllPlugin({
      inject: true,
      filename: '[name]_[hash].js',
      path: './dll',
      entry: {
        vendor: [
          'vue',
          'axios',
          'echarts',
          'js-md5',
          'vue-router',
          'vuex',
          'fundebug-javascript',
          'vue-circle-menu',
          'vue-scroller',
          'babel-polyfill'
        ]
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
};

module.exports = vuxLoader.merge(webpackConfig, {
  options: {},
  plugins: [{
    name: 'vux-ui'
  }, {
    name: 'i18n',
    vuxStaticReplace: false,
    staticReplace: false,
    extractToFiles: 'src/locales/components.yml',
    localeList: ['zh-CN', 'en']
  }, {
    name: 'less-theme',
    path: 'src/assets/theme/theme.less'
  },{
    name: 'duplicate-style'
  }]
});

function getEntry(globPath) {
  var entries = {},
    basename, tmp, pathname;

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/').splice(-3);
    pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
    entries[pathname] = ["babel-polyfill", entry];   //解决es6兼容性问题
  });
  return entries;
}
