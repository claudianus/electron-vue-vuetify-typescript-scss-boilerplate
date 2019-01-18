const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PrettierPlugin = require("prettier-webpack-plugin")
const TSLintPlugin = require('tslint-webpack-plugin')

const main_config = {
  target: 'electron-main',
  mode: 'production',
  entry: './src/main/main.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js'
  },
  module: {
    rules: [{
      test: /\.(ts|tsx)?$/,
      loader: 'ts-loader',

    }]
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
    ],
  },
  plugins: [
    new PrettierPlugin(),
    new TSLintPlugin({
      files: ['./src/main/*.ts']
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false,
          }
        }
      })
    ],
  },
}

const renderer_config = {
  target: 'electron-renderer',
  mode: 'production',
  entry: './src/renderer/app.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js'
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(ts|tsx|js)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [
            /\.vue$/
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.vue',
      '.tsx',
      '.ts'
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/renderer/index.html'
    }),
    new PrettierPlugin(),
    new TSLintPlugin({
      files: ['./src/renderer/*.ts']
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false,
          }
        }
      })
    ],
  },
}

module.exports = [main_config, renderer_config];
