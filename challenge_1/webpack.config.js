const path = require('path');

module.exports = {
  entry: "/client/app.jsx",
  watch: true,
  mode: 'development',
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
        use: [{
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