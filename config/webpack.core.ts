/**
 * webpack 基础Core配置
 */
import { CWD, BUILD, CWD_NODE_MODULES, NODE_MODULES, SOURCE_PATH, STATIC_PATH } from './path';
import { IS_PRODOCTION, NODE_ENV } from './env';
import babelConfig from './babel';
import themeConfig from './../theme';
import entrys from './entry';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Babel 配置
 */
const babelLoader = `babel-loader?${JSON.stringify(babelConfig)}`;

//生产环境默认关闭SourceMap
const sourceMapEnable = IS_PRODOCTION ? false : true


export class WebpackConfig {
  cache = true
  mode = NODE_ENV
  devtool = sourceMapEnable ? 'source-map' as 'source-map' : false
  entry = {
    main: 'index.tsx',
    vendor: [ 'react', 'react-dom', 'react-router-dom' ]
  }
  output = {
    path: BUILD,
    filename: '[name].js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[id].chunk.js'
  }
  resolve = {
    //定义从package.json 的什么字段上去读入口文件
    mainFields: [ 'jsnext:main', "browser", "module", "main" ],
    extensions: [ '.webpack.js', '.web.js', '.js', '.jsx', '.ts', '.tsx' ],
    modules: [
      path.join(CWD, 'src'),
      CWD_NODE_MODULES,
      NODE_MODULES
    ],
    alias: {

    }
  }
  externals = {
    // 'react': 'React',
    // 'react-dom': 'ReactDOM',
    // 'lodash': '_',
    // 'axios': 'axios'
  }
  module = {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        loader: IS_PRODOCTION ? [ babelLoader, 'ts-loader?logLevel=error' ] : [ babelLoader, 'ts-loader?logLevel=error' ]
      },
      {
        exclude: /(node_modules|bower_components)/,
        test: /\.(js|jsx)$/,
        loader: babelLoader
      },
      {
        enforce: ('pre' as 'pre'),
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: sourceMapEnable,
              minimize: false
            }
          }, {
            loader: 'postcss-loader'
          }]
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            // activate source maps via loader query
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: IS_PRODOCTION ? '[hash:base64:5]' : '[name]__[local]___[hash:base64:5]',
                sourceMap: sourceMapEnable,
                importLoaders: 1,
                minimize: false
              }
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: sourceMapEnable,
                //传入全局的样式配置
                modifyVars: themeConfig
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff'
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: '10000',
          mimetype: 'application/octet-stream'
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/svg+xml'
        }
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '/images/[name].[ext]'
        }
      }
    ]
  }
  plugins = [
    new ExtractTextPlugin({ filename: 'css/[name].css', disable: !IS_PRODOCTION }),
    //https://github.com/jantimon/html-webpack-plugin#configuration
    new HtmlWebpackPlugin({
      title: 'title',
      filename: `index.html`,
      template: path.join(SOURCE_PATH, `template.ejs`),
      inject: 'body',
      //https://github.com/kangax/html-minifier#options-quick-reference
      minify: IS_PRODOCTION ? {
        minifyCSS: true,
        minifyJS: true
      } : false,
      hash: true, //if true then append a unique webpack compilation hash to all included scripts and CSS files. This is useful for cache busting.
      cache: true, //true (default) try to emit the file only if it was changed.
      showErrors: true, // if true (default) errors details will be written into the HTML page.
      chunks: [ 'vendor', 'main' ],
      chunksSortMode: 'auto', // Allows to control how chunks should be sorted before they are included to the html. Allowed values: 'none' | 'auto' | 'dependency' | {function} - default: 'auto'
      excludeChunks: [ 'unit-test' ],
      xhtml: false //If true render the link tags as self-closing, XHTML compliant. Default is false
    })
  ]
  optimization =  {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}
