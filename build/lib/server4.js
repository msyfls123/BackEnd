'use strict';

var mysql = require('mysql');

var con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'test',
  password: 'test',
  database: 'test',
  port: '3306'
});

con.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected");
  }
});

con.query('SELECT * from student2', function (err, rows, fields) {
  if (err) {
    console.log(err);
  } else {
    console.log(rows[0]);
  }
});

con.end(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Disconnected");
  }
});