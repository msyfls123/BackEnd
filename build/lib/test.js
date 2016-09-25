"use strict";

var email = require('./email.js');
email({
  username: "kimi",
  email: "745784917@qq.com",
  activeCode: "123456"
}, function () {
  console.log(1);
}, function () {
  console.log("ok");
});