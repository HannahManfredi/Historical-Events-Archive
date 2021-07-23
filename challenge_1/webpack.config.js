const path = require('path');

module.exports = {
  entry: './client/app.jsx',
  mode: 'development',
  watch: true,
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: path.resolve('./client'),
        exclude: /node_modules/,
        use: ['source-map-loader', {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                "targets": "defaults"
              }],
              '@babel/preset-react'
            ]
          }
        }]
      }
    ]
  }
};