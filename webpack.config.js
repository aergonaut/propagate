var config = {
  entry: {
    content: './src/content/index.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }
    ]
  },
  externals: {
    'zepto': 'var Zepto'
  }
};

module.exports = config;
