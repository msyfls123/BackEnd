var fs = require("fs");
var path = require('path');
var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var multer = require('multer');
var ROOT_PATH = path.join(__dirname,'../../');
var router = require('./server3');

var webpack = require('webpack');
var config = require('../../webpack.config');
var compiler = webpack(config);


// test file read & write
var options = {encoding:'utf8', flag:'w'};
var dataObj = {
  num:3,
  data:[
    {name:"hello1"},
    {name:"hello2"},
    {name:"hello3"}
  ]
}
var dataObjStr = JSON.stringify(dataObj)
fs.writeFile(path.join(ROOT_PATH,'data','data.json'),dataObjStr,options,function(err){
  if (err){
      console.log("Config Write Failed.");
    } else {
      console.log("Config Saved.");
    }
})

var app = express();
app.use('/orm',router);

//handlebars
app.set('views',path.join(ROOT_PATH,'views'));
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(ROOT_PATH,'views/layouts/')
  })
);
app.set('view engine', 'handlebars');

//bodyParser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//webpack
if(process.env.NODE_ENV == "dev"){
  console.log("not production")
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: false,
    publicPath: '/dist',
    stats: { colors: true }
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}else{
  console.log("production")
  app.use('/dist', express.static('dist'));
}


//get image upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(ROOT_PATH,'uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+ '.' + file.originalname.split('.').pop())
  }
})
var upload = multer({ storage: storage })

app.get('/form',function(req, res){
  res.render('test');
})

app.post('/api',upload.single('file'), function(req, res){
  var imgUrl = path.join(ROOT_PATH,'uploads',req.file.filename);
  console.log(ROOT_PATH)
  fs.createReadStream(imgUrl).pipe(res)
})

//react server rendering
import React, {Component} from 'react'
import { Root } from '../components/index'
import { renderToString } from 'react-dom/server'

var dataTemp = renderToString(<Root/>)

app.get('/index', function (req, res) {
    res.end(dataTemp);
});

//test...
app.get('/', function(req, res) {
  res.sendFile(path.join(ROOT_PATH, 'index.html'));
});

app.get('/time/:time', function (req, res) {
    res.send("Success: "+req.params.time+"\nQuery: "+req.query.time);
});

app.listen(4200,function(result){
  console.log("OK")
})
