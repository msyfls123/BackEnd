'use strict';

var crypto = require('crypto');
var hmac = crypto.createHmac('sha1', 'a secret');
hmac.update('some data to hash');
console.log(hmac.digest('hex'));
var hmac2 = crypto.createHmac('sha1', 'a secret');
hmac2.update('time');
console.log(hmac2.digest('hex'));
var hmac3 = crypto.createHmac('sha1', 'a secret');
hmac3.update('12345515414123412313131');
console.log(hmac3.digest('hex'));