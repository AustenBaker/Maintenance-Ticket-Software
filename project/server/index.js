'use strict';

const Promise = require('bluebird');

const bodyParser = require('body-parser');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const mustache = require('mustache-express');
const mongoose = require('mongoose');

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

////////// Data Models ///////////
const User = mongoose.model('User', {
    first: String,
    last: String,
    username: String,
    password: String,
    email: String,
    type: String
});

const Ticket = mongoose.model('Ticket', {
    timestring: Number,
    issue: String,
    emergency: Boolean,
    resolvedTime: Number,
    progress: String,
    closed: Boolean
});

const Property = mongoose.model('Property', {
    id: Number,
    name: String,
    location: Object
});

////////// API ENDPOINTS //////////
//// account.js endpoints
// POST /account/login
app.post('/account/login', (req, res) => {
    const { username, password } = req.body;
    //Need somethign with
});

// POST /account/logout
app.post('/account/logout', (req, res) => {

});

// POST /account/register
app.post('/account/register', (req, res) => {

});
// POST /account/recover
app.post('/account/recover', (req, res) => {

});

// POST /account/deactivate
app.post('/account/deactivate', (req, res) => {

});

// DELETE /account/delete
app.delete('/account/delete', (req, res) => {

});

// GET /account/username
app.get('/account/:username', (req, res) => {

});

// PUT /account/update
app.put('/account/update', (req, res) => {

});

//// ticket.js
// POST /ticket/create
app.post('/ticket/create', (req, res) => {

});

// GET /ticket/id
app.get('/ticket/:id', (req, res) => {

});

// PUT /ticket/update
app.put('/ticket/update', (req, res) => {

});

// DELETE /ticket/delete
app.delete('/ticket/delete', (req, res) => {

});

//// property.js
// POST /property/create
app.post('/property/create', (req, res) => {

});

// PUT /property/update
app.put('/property/update', (req, res) => {

});

// DELETE /property/delete
app.delete('/property/delete', (req, res) => {

});


app.listen(settings.PORT, () => console.log('Running at port %d', settings.PORT));
module.exports = app;
