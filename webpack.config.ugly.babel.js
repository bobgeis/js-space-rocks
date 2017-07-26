
import path from 'path';
import webpack from 'webpack';

export default {
  entry: [
    './src/index.jsx'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        comparisons: true,
        dead_code: true,
        evaluate: true,
        join_vars: true,
        keep_fargs: false,
        pure_getters: true,
        screw_ie8: true,
        unused: true,
        warnings: false
      },
      output: {
        ascii_only: true,
        comments: false
      }
    })
  ]
};
