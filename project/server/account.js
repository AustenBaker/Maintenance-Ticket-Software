'use strict';

const Promise = require('bluebird');

const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('./database');

// Login status
router.post('/status', (req, res) => {
    const ssn = req.session;
    if (!ssn.loggedIn) res.json({ loggedIn: false });
    else {
        const { first, last, username, email, type } = ssn;
        const loggedIn = true;
        res.json({ loggedIn, first, last, username, email, type });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const ssn = req.session;
    const user = await User.findOne({ username });
    if (!user) return res.json({ error: 'NO_SUCH_USER' });
    else {
        bcrypt.compare(password, user.password);
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.json({ error: 'WRONG_PASSWORD' });

        const { first, last, units, username, email, phone, contactPreference, entryPermission, type, note, tickets, activate } = user;
        ssn.loggedIn = true;
        ssn.username = username;
        ssn.email = email;
        
        return res.json({ first, last, units, username, email, phone, contactPreference, entryPermission, type, note, tickets, activate });
    }
});

// Logout
router.post('/logout', (req, res) => {
    const ssn = req.session;
    if (ssn.destroy) ssn.destroy();

    res.json({ loggedIn: false });
});

// Register account
router.post('/register', async (req, res) => {
    //console.log(`Trying to register user with username=${req.body.username}`);

    // Checks if user already exists
    const userExists = await User.findOne( { username: req.body.username });
    if (userExists) return res.status(403).json({ error: "USER_EXISTS" });

    // User doesn't exist, create new
    else {
        const hashedPswd = await bcrypt.hash(req.body.password, 10);
        const body = { ...req.body, password: hashedPswd };
        const newUser = new User(body);
        const data = await newUser.save();
        const { first, last, units, username, email, phone, contactPreference, entryPermission, type, note, tickets, activate } = data;
        const ssn = req.session;
        ssn.loggedIn = true;
        ssn.username = username;
        ssn.email = email;

        return res.json({ first, 
            last, 
            units,
            username,  
            email, 
            phone, 
            contactPreference,
            entryPermission,
            type, 
            note, 
            tickets,
            activate,
        });
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
    // Checks if user already exists
    const userDeleted = await User.findOneAndDelete({ username: req.body.username });
    if (userDeleted) {
        res.status(200).json({ success: "USER_DELETED" });
    } else {
        res.status(404).json({ error: 'NO_SUCH_USER'} )
    }
    return res
});

// Get user info TODO: JWT signed Bearer token for security
router.get('/:username', async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) res.status(400).json({ error: 'NO_SUCH_USER' });
    else {
        const { first, last, units, username, email, phone, contactPreference, entryPermissions, type, note, tickets, activate } = user;
        res.status(200).json({ first, last, units, username, email, phone, contactPreference, entryPermissions, type, note, tickets, activate });
    }
});

// GET /email/:userEmail
router.get('/email/:email', async (req, res) => {
    const { email } = req.params;
    const user = await User.findOne({ email:email });
    if (!user) res.status(404).json({ error: 'NO_SUCH_USER' });
    else res.status(200).json(user.tickets);
});


// POST /update
router.put('/update', async (req, res) => {
    const updateObj = {};
    const { username } = req.body;

    const currentUser = await User.findOne({ username:username });
    if (!currentUser) return res.json({ error: "NO_USER_FOUND"})
    
    for (let prop in req.body) if (req.body[prop]) updateObj[prop] = req.body[prop];

    // password is updated, check and rehash
    if (req.body.password) {
        const { password } = req.body;
        await bcrypt.compare(password, currentUser.password, async function(err, res) {
            if (res){
                // they are the same
            } else {
                const hashedPswd = await bcrypt.hash(password, 10);
                updateObj.password = hashedPswd;
            }
        });
    }

    const updated = await User.updateOne({"username":username},updateObj);
    if (updated.nModified === 1) return res.json( updateObj )
    else return res.json({ error: "ACCOUNT_NOT_UPDATED"})
});


module.exports = router;