'use strict';

var crypto = require('crypto');
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
var Auth = sequelize.import(__dirname + "/../model/auth");
Auth.sync();

module.exports.createUser = function (username, password, res) {
  var hmac = crypto.createHmac('sha1', 'ebichu');
  hmac.update(password);
  var password_hash = hmac.digest('hex');
  var hmac2 = crypto.createHmac('sha1', 'pikachu');
  hmac2.update(username);
  var uuid = hmac2.digest('hex');
  Auth.findOrCreate({
    where: {
      username: username
    },
    defaults: {
      password: password_hash,
      uuid: uuid,
      active: false
    }
  }).spread(function (user, created) {
    if (created) {
      res.render('success', {
        username: username,
        uuid: uuid
      });
    } else {
      res.render('reg', {
        error: 'The username has been userd',
        uerror: 'Please choose another name!'
      });
    }
  });
};