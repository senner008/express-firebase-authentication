const path = require('path');

module.exports = {
  entry: './client/main.js',
  mode : "development",
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  }
};