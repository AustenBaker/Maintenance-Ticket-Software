'use strict';

const Promise = require('bluebird');

const bodyParser = require('body-parser');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const mustache = require('mustache-express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.Promise = Promise;

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

// Connect to MongoDB
const dbURL = 'mongodb+srv://dev:FlrB0VpjgNRWTEQ9@cluster0-gcldf.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('MongoDB connected!'));

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
    User.findOne({ username }).exec().then(user => {
        if (!user) return res.status(403).json({ error: 'ERR_NO_SUCH_USER' });
        else bcrypt.compare(password, user.password).then(match => {
            if (match) {
                req.session.loggedIn = true;
                const { first, last, username, email, type } = user;
                console.log(user);
                return res.writeHead(200, { first, last, username, email, type });
            } else return res.status(401).json({ error: 'ERR_WRONG_PSWD' });
        })
    });

});

// POST /account/logout
app.post('/account/logout', (req, res) => {
    req.session.loggedIn = false;
    res.redirect('/');
});

// POST /account/register
app.post('/account/register', (req, res) => {
    const obj = req.body;
    obj.password = 0;
    bcrypt.hash(req.body.password, 10).then(hashedPswd => {
        return { ...req.body, password: hashedPswd };
    }).then(body => {
        const newUser = new User(body);
        newUser.save().then(() => {
            const { first, last, username, email, type } = body;
            res.writeHead(200, { first, last, username, email, type });
        }).catch(err => console.error(err));
    });
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
