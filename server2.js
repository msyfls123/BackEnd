var fs = require("fs");
var path = require('path');
var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var multer = require('multer');

var webpack = require('webpack');
var config = require('./webpack.config');
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

fs.writeFile('./data.json',dataObjStr,options,function(err){
  if (err){
      console.log("Config Write Failed.");
    } else {
      console.log("Config Saved.");
    }
})

var app = express();

//handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//bodyParser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//webpack
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: false,
  publicPath: '/dist',
  stats: { colors: true }
}));
app.use(require('webpack-hot-middleware')(compiler));

//get image upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
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
  var imgUrl = path.join(__dirname,'uploads',req.file.filename);
  fs.createReadStream(imgUrl).pipe(res)
})

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/time/:time', function (req, res) {
    res.send("Success: "+req.params.time+"\nQuery: "+req.query.time);
});

app.listen(4200,function(result){
  console.log("OK")
})
