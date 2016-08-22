var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();
var PORT = 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home',{
      html:"<b>Hello, XJW</b>"
    });
});

app.listen(PORT,function(result){
  console.log("Listening to Port: " + PORT)
});
