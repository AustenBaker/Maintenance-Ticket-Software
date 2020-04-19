'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');

// Connect to MongoDB
const dbURL = 'mongodb+srv://dev:FlrB0VpjgNRWTEQ9@cluster0-gcldf.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('MongoDB connected!'));

exports.User = mongoose.model('User', {
    first: String,
    last: String,
    username: String,
    password: String,
    email: String,
    type: String
});

exports.Ticket = mongoose.model('Ticket', {
    id: Number,
    email: String,
    aptComplex: String,
    unit: String,
    issue: String,
    details: String,
    emergency: Number,
    resolvedTime: Number,
    progress: String,
    closed: Boolean
});

exports.Property = mongoose.model('Property', {
    id: Number,
    name: String,
    location: Object
});
