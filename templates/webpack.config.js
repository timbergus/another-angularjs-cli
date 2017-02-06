const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => ({
  context: resolve(__dirname, 'src'),
  devtool: env.prod ? 'source-map' : 'eval',
  bail: env.prod,
  entry: resolve(__dirname, 'src', 'app', 'index.js'),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.[chunkhash].js',
    pathinfo: !env.prod
  },
  devServer: {
    inline: true,
    contentBase: resolve(__dirname, 'dist'),
    port: 3000
  },
  resolve: {
    extensions: ['.js', '.html', '.scss']
  },
  module: {
    loaders: [
      {
        test: /\.js?$|\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.jpg$/,
        exclude: /node_modules/,
        loader: 'file-loader'
      },
      {
        test: /\.png$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        query: {
          mimetype: 'image/png'
        }
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader'
      },
      {
        test: /\.json$/,
        include: /node_modules/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
});
