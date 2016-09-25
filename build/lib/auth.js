'use strict';

var express = require('express');
var auth_lib = require('./auth_lib');
var email_lib = require('./email');
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
  var email = req.body.email;
  console.log(req.body);
  auth_lib.createUser(username, password, email).spread(function (user, created) {
    if (created) {
      email_lib(user, function () {
        res.send("Cannot send email");
      }, function () {
        res.render('success', { user: user });
      });
    } else {
      if (username == user.username) {
        res.render('reg', {
          error: 'The username has been userd',
          uerror: 'Please choose another name!'
        });
      } else if (email == user.email) {
        res.render('reg', {
          error: 'The email has been userd',
          eerror: 'Please choose another email!'
        });
      }
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