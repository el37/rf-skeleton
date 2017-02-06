module.exports = {
  entry : './src/main.jsx',
  output: { filename: 'public/bundle.js'},
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['es2015','react']
        }
      }
    ]
  }
}
