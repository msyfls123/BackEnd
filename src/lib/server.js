var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var ROOT_PATH = path.join(__dirname,'../../');

var app = express();
var PORT = 3210;

app.set('views',path.join(ROOT_PATH,'views'));
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(ROOT_PATH,'views/layouts/')
  })
);
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home',{
      html:"<b>Hello, XJW</b>"
    });
});

app.listen(PORT,function(result){
  console.log("Listening to Port:",PORT)
});
