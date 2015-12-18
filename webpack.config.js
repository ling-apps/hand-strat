module.exports = {
  entry: './assets/src/app.js',
  output: {
    filename: 'public/js/app.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules|lib/}
    ]
  }
};
