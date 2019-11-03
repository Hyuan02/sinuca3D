const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{ 
      test: /\.js$/, 
      exclude: /node_modules/, 
      loader: "babel-loader"
    }, 
    {
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }
  ]
  },
  mode: 'development'
};