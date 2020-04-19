'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');

// Connect to MongoDB
const dbURL = 'mongodb+srv://dev:FlrB0VpjgNRWTEQ9@cluster0-gcldf.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('MongoDB connected!'));

exports.User = mongoose.model('User', new Schema({
    first: { type: String },
    last: { type: String },
    units: { type: Array },
    username: { type: String, required: true, unique: true },
    password: { type: String },
    email: { type: String, unique: true },
    phone: { type: Number },
    contactPreference: { type: Number },
    entryPermissions: { type: String, default: 'ANY' },
    type: { type: String },
    note: { type: String },
    tickets: { type: Array },
    activate: { type: Boolean, default: true }
}));


exports.Ticket = mongoose.model('Ticket', new Schema({
    id: { type: Number, unique: true },
    email: { type: String, unique: true },
    aptComplex: { type: String },
    unit: { type: String },
    issue: { type: String },
    emergency: { type: Number, default: 0, max: 2 },
    resolvedTime: { type: Number },
    progress: { type: String },
    closed: { type: Boolean, default: false }
}));

exports.Property = mongoose.model('Property', new Schema({
    id: { type: Number, unique: true },
    name: { type: String },
    location: { type: Object }
}));
