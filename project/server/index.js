'use strict';

const Promise = require('bluebird');

const bodyParser = require('body-parser');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const mustache = require('mustache-express');

const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const settings = require('./settings.json');

const http = require('http');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// static paths
app.use(express.static('public'));
app.use('/deps', express.static('node_modules'));

// Creates session
app.use(cookieParser());
app.use(session({
    name: '_maint',
    secret: crypto.createHash('sha256').update('' + Date.now()).digest('hex'),
    resave: false,
    saveUninitialized: false,
    proxy: settings.proxy,
    cookie: {
        secure: settings.secure,
        httpOnly: true,
        maxAge: 3600 * 1000, // 1 hour
    }
}));

// Sets mustache as render template
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

// Home
app.get('/', (req, res) => { // jshint ignore:line
    res.status(200).end('Hello world or whatever')
});

////////// API ENDPOINTS //////////
//// account.js endpoints
app.use('/account', require('./account'));

//// ticket.js
app.use('/ticket', require('./ticket'));

//// property.js
app.use('/property', require('./property'));


server.listen(settings.PORT, () => console.log('Running at port %d', settings.PORT));
