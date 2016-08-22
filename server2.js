var fs = require("fs");
var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');

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

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(multer()); // for parsing multipart/form-data

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

app.get('/:time', function (req, res) {
    res.send("Success: "+req.params.time+"\nQuery: "+req.query.time);
});

app.post('/api',upload.single('file'), function(req, res){
  var imgUrl = path.join(__dirname,'uploads',req.file.filename);
  fs.createReadStream(imgUrl).pipe(res)
})

app.listen(3200,function(result){
  console.log("OK")
})
