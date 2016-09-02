'use strict';

var express = require('express');
var router = express.Router();
var app = express();

var Sequelize = require('sequelize');
var sequelize = new Sequelize('test', 'test', 'test', {
  host: 'localhost',
  dialect: 'mysql',
  port: '3306',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
var Project = sequelize.import(__dirname + "/../model/project");
var User = sequelize.import(__dirname + "/../model/user");
Project.sync();
User.sync();

router.get('/find', function (req, res) {
  Project.findAll({
    where: {
      createdAt: {
        $lt: new Date(),
        $gt: new Date(new Date() - 24 * 60 * 60 * 1000)
      }
    }
  }).then(function (project) {
    console.log(project);
    res.json(project);
  });
});

router.get('/', function (req, res) {
  User.create({
    firstName: 'John',
    lastName: 'Hancock'
  }).then(function () {
    User.findAll({
      where: {
        createdAt: {
          $lt: new Date(),
          $gt: new Date(new Date() - 24 * 60 * 60 * 1000)
        }
      }
    }).then(function (user) {
      console.log(user);
      res.json(user);
    });
  });
});
// app.use('/orm',router)
// app.listen(4220,function(result){
//   console.log("OK")
// })

module.exports = router;