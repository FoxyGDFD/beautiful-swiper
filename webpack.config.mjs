import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CompressionPlugin from 'compression-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

import path from 'path'
import { fileURLToPath } from 'url'

// ES modules equivalent of __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const prod = process.env.NODE_ENV === 'production'

export default {
  mode: prod ? 'production' : 'development',
  devtool: prod ? undefined : 'source-map',
  entry: './src/app/main.tsx',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
      '@entities': path.resolve(__dirname, 'src/entities'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@env': path.resolve(__dirname, 'src/shared/lib/env'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'esbuild-loader',
          options: {
            loader: 'tsx',
            target: 'es2020',
            jsx: 'automatic',
            minify: prod,
          },
        },
      },
      {
        test: /\.s?css$/,
        oneOf: [
          {
            test: /\.module\.s?css$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                options: {
                  modules: {
                    mode: 'local',
                    auto: (resourcePath) => resourcePath.endsWith('.module.scss'),
                    exportGlobals: true,
                    localIdentName: prod
                      ? '[hash:base64:8]'
                      : '[path][name]__[local]--[hash:base64:5]',
                    namedExport: true,
                  },
                }
              },
              "sass-loader"
            ]
          },
          {
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
          }
        ]
      },
      {
        test: /\.svg(\?react)?$/,
        issuer: /\.(ts|tsx|js|jsx)$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: true,
              svgoConfig: {
                plugins: [
                  { name: 'removeViewBox', active: false },
                  { name: 'removeDimensions', active: true },
                ],
              },
            },
          },
        ],
      },
    ]
  },

  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // TODO setup base path as /beautiful-swiper/
    clean: true,
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react-vendor',
          chunks: 'all',
          priority: 20,
        },
      },
    },
    minimize: true,
    minimizer: [
      new TerserPlugin(),
    ],
  },

  devServer: {
    hot: true,
    port: Number(process.env.PORT ?? '5173'),
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    historyApiFallback: true,
  },


  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 8192,
    }),
  ],
}