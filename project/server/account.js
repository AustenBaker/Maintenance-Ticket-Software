'use strict';

const Promise = require('bluebird');

const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('./database');

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(403).json({ error: 'ERR_NO_SUCH_USER' });
    else {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            req.session.loggedIn = true;
            const { first, last, username, email, type } = user;
            console.log(`User: ${username} logged in!`);
            return res
                .writeHead(200, { first, last, username, email, type })
                .end('Sucess - login');
        }
        else return res.status(401).json({ error: 'ERR_WRONG_PSWD' });
    }
});

// Logout
router.post('/logout', (req, res) => {
    req.session.loggedIn = false;
    res.redirect('/');
});

// Register account
router.post('/register', async (req, res) => {
    console.log(`Trying to register user with username=${req.body.username}`);

    // Checks if user already exists
    const userExists = await User.findOne( { username: req.body.username });
    if (userExists) return res.status(403).json({ error: "USER_EXISTS" });

    // User doesn't exist, create new
    else {
        const hashedPswd = await bcrypt.hash(req.body.password, 10);
        const body = { ...req.body, password: hashedPswd };
        const newUser = new User(body);
        newUser.save().then(data => {
            const { first, last, username, email, type } = data;
            return res
                .writeHead(200, { first, last, username, email, type })
                .end('Success - register');
        }).catch(err => res.status(400).json({ error: err }));
    }
});

// POST /recover
router.post('/recover', (req, res) => {
    // TODO
});

// POST /deactivate
router.post('/deactivate', (req, res) => {
    // TODO
});

// Delete user
router.delete('/delete', async (req, res) => {
    console.log(`Trying to delete user with username=${req.body.username}`);

    // Checks if user already exists
    const userDeleted = await User.findOneAndDelete( { username: req.body.username });
    if (userDeleted) return res.status(200).json({ success: "USER_DELETED" });
    else return res.status(404).json({ error: 'NO_SUCH_USER'} );
});

// Get user info TODO: JWT signed Bearer token for security
router.get('/:username', async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) res.status(400).json({ error: 'NO_SUCH_USER' });
    else {
        const { first, last, username, email, type } = user;
        res.status(200).json({ first, last, username, email, type });
    }
});

// PUT /update
router.put('/update', (req, res) => {

});


module.exports = router;