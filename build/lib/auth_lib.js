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
// Auth.drop()
Auth.sync();

module.exports.createUser = function (username, password, email) {
  //make password hash
  var hmac = crypto.createHmac('sha1', 'ebichu');
  hmac.update(password);
  var password_hash = hmac.digest('hex');
  //make username hash
  var hmac2 = crypto.createHmac('sha1', 'pikachu');
  hmac2.update(username);
  var uuid = hmac2.digest('hex');
  //make active url hash
  var hmac3 = crypto.createHmac('sha1', 'helloworld');
  hmac3.update(username + new Date().getTime());
  var activeCode = hmac3.digest('hex');

  return Auth.findOrCreate({
    where: {
      $or: [{ username: username }, { email: email }]
    },
    defaults: {
      password: password_hash,
      username: username,
      email: email,
      uuid: uuid,
      active: false,
      avatar: null,
      activeCode: activeCode
    }
  });
};

module.exports.activeUser = function (activeCode) {
  return Auth.findOne({
    where: {
      activeCode: activeCode
    }
  });
};