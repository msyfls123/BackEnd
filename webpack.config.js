var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

var extractCSS = new ExtractTextPlugin('one.css');
var extractSCSS = new ExtractTextPlugin('bundle.css');

module.exports = {
  entry: {
    main: path.resolve(APP_PATH,'main.js'),
    test: path.resolve(APP_PATH,'test.js'),
    date: path.resolve(APP_PATH,'date.js'),
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
      {test:/\.scss$/, loader:extractSCSS.extract("style-loader", "css-loader!sass-loader")},
      {test:/\.css$/, loader:extractCSS.extract("style-loader", "css-loader")},
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
    extractCSS,
    extractSCSS
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
