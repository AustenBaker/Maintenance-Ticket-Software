'use strict';

const Promise = require('bluebird');

const router = require('express').Router();
const { User, Ticket } = require('./database');


// Create ticket
router.post('/create', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json({ error: 'NO_SUCH_USER_TICKET_SUBMIT_FAILED' });
    
    let ticketID = Date.now()
    const body = { id: ticketID, ...req.body };
    const newTicket = new Ticket(body);
    const data = await newTicket.save();

    if (data) return res.json({ sucess: true, id: ticketID });
    else return res.status(400).json({ error: 'CREATE_TICKET_FAILED' });
});

// GET /id/:id
router.get('/id/:id', async (req, res) => {
    const { id } = req.params;
    const ticket = await Ticket.findOne({ id:id });
    if (!ticket) res.status(404).json({ error: 'NO_SUCH_TICKET' });
    else res.status(200).json(ticket);
});

// GET /email/:userEmail
router.get('/email/:email', async (req, res) => {
    const { email } = req.params;
    const tickets = await Ticket.find({ email });
    if (!tickets) res.status(404).json({ error: 'NO_SUCH_TICKET' });
    else res.status(200).json(tickets);
});

// POST /update
router.put('/update', async (req, res) => {
    const updateObj = {};
    const { ticketID } = req.body;

    const currTicket = await Ticket.findOne({ id:ticketID });
    if (!currTicket) return res.json({ error: "NO_TICKET_WITH_ID"})

    for (let prop in req.body) if (req.body[prop]) updateObj[prop] = req.body[prop];
    const updated = await Ticket.updateOne({"id":ticketID},updateObj);
    
    if (updated.nModified === 1) return res.json( updateObj )
    else return res.json({ error: "TICKET_NOT_UPDATED"})
    // Stores updated info in session
    // Returns updated info as a responses
});

// DELETE /delete
router.delete('/delete', async (req, res) => {
    const ticketDeleted = await Ticket.findOneAndDelete({ id: req.body.id });
    if (ticketDeleted) return res.status(200).json({ success: "TICKET_DELETED" });
    else return res.status(404).json({ error: 'NO_SUCH_TICKET'} );
});

module.exports = router;
