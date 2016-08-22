var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
  entry: {
    main: path.resolve(APP_PATH,'main.js'),
    vendors:["react","react-dom","react-router"]
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].js',
    publicPath: 'dist/'
  },
  module:{
    loaders:[
      {test:/\.js$/, loader:'babel', exclude:/node_modules/},
      {test:/\.scss$/, loader:ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")},
      {test:/\.(png|jpg|gif)$/, loader:'url?limit=8192&name=[path][name].[ext]?[hash]'},
      {test:/\.(html|tpl)$/, loader:'html-loader'}
    ]
  },
  resolve:{
    extensions:['','.js'],
    alias:{
      components: path.resolve(APP_PATH,'components')
    }
  },
  babel: {
    presets: ['es2015','react'],
    plugins: ['transform-runtime']
  },
  plugins:[
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: false,
      minimum:true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: JSON.stringify("production"),
      },
    }),
    new ExtractTextPlugin("bundle.css")
  ],
  devServer:{
    historyApiFallback: true,
    hot: false,
    inline: true,
    proxy:{
      '/api/*':{
        target: 'http://127.0.0.1:4000',
        secure: false
      }
    }
  },
  devtool: false
};
