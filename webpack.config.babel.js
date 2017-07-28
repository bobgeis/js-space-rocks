
import path from 'path';
import webpack from 'webpack';

const devBuild = {
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
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
      { test: /\.(jpg|png)$/i, use: 'url-loader' }
    ]
  },
  devtool: 'source-map'
};

const hmrBuild = {
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
      { test: /\.(jpg|png)$/i, use: 'url-loader' }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  devtool: 'source-map'
};

const prodBuild = {
  entry: [
    './src/index.jsx'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
      { test: /\.(jpg|png)$/i, use: 'url-loader' }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({  // define a value at compile time
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

let config;
if(process.env.NODE_ENV === 'production') {
  config = prodBuild;
} else if (process.env.NODE_ENV === 'dev') {
  config = devBuild;
} else {
  config = hmrBuild;
}

export default config;
