'use strict';

var fs = require("fs");
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var multer = require('multer');
var ROOT_PATH = path.join(__dirname, '../../');
var auth_lib = require('./auth_lib');

var app = express();

//handlebars
app.set('views', path.join(ROOT_PATH, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(ROOT_PATH, 'views/layouts/')
}));
app.set('view engine', '.hbs');

//bodyParser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/reg', function (req, res) {
  res.render('reg', {
    error: '',
    username: '',
    password: '',
    uerror: '',
    perror: ''
  });
});

app.post('/reg', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  console.log(req.body);
  auth_lib.createUser(username, password, res);
});

app.listen(4200, function (err) {
  console.log("Server OK");
});