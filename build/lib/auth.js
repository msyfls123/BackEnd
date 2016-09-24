'use strict';

var express = require('express');
var auth_lib = require('./auth_lib');
var router = express.Router();

router.get('/reg', function (req, res) {
  res.render('reg', {
    error: '',
    username: '',
    password: '',
    uerror: '',
    perror: ''
  });
});

router.post('/reg', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  console.log(req.body);
  auth_lib.createUser(username, password).spread(function (user, created) {
    if (created) {
      res.render('success', { user: user });
    } else {
      res.render('reg', {
        error: 'The username has been userd',
        uerror: 'Please choose another name!'
      });
    }
  });
});

router.get('/active/:code', function (req, res) {
  auth_lib.activeUser(req.params.code).then(function (user) {
    return user ? user.update({
      active: true,
      activeCode: null
    }) : null;
  }).then(function (user) {
    return res.render('success', { user: user });
  });
});

module.exports = router;