const path = require('path');

module.exports = {
  entry: './sample/src/app.js',
  output: {
    path: path.join(__dirname, 'sample/public/js'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
};
