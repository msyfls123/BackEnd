'use strict';

var express = require('express');
var router = express.Router();
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var options = {
    host: 'localhost',
    port: 3306,
    user: 'test',
    password: 'test',
    database: 'test',
    checkExpirationInterval: 300000,
    expiration: 2 * 24 * 60 * 60 * 1000,
    createDatabaseTable: true, // Whether or not to create the sessions database table, if one does not already exist.
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
};

var sessionStore = new MySQLStore(options);

module.exports.session = session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 2 * 24 * 60 * 60 * 1000 }
});