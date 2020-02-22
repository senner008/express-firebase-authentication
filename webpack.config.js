const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin'); // Ding

module.exports = {
  entry: './client/main.js',
  mode : "development",
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  plugins: [
    new NodemonPlugin({
      watch: path.resolve('./src'),
      script: './src/app.js'
    })
],
};