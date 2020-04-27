'use strict';

const Promise = require('bluebird');

const bodyParser = require('body-parser');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const cors = require('cors');

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

// CORS allow
app.use(cors({
    origin: true,
    credentials: true
}));

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
        maxAge: 3600 * 1000, // 1 hour,
    },
    // store: new MongoStore({
    //     mongooseConnection: mongoose.connection,
    //     ttl: 3600
    // })
}));

// Home
app.get('/', (req, res) => { // jshint ignore:line
    res.status(200).end('Hello world or whatever')
});

app.use((req, res, next) => {
    console.log(req.session);
    next();
});

////////// API ENDPOINTS //////////
//// account.js endpoints
app.use('/account', require('./account'));

//// ticket.js
app.use('/ticket', require('./ticket'));

//// property.js
app.use('/property', require('./property'));

server.listen(settings.PORT, () => console.log('Running at port %d', settings.PORT));

module.exports = app;
