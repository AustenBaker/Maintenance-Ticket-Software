'use strict';

const Promise = require('bluebird');

const router = require('express').Router();
const { Ticket } = require('./database');


// Create ticket
router.post('/create', (req, res) => {
    const body = { id: Date.now(), ...req.body };
    const newTicket = new Ticket(body);
    newTicket.save().then(() => res
        .writeHead(200, body)
        .end('Success - create ticket')
    ).catch(err => res.status(400).json({ error: err }));
});

// GET /id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const ticket = await Ticket.findOne({ id });
    if (!ticket) res.status(404).json({ error: 'NO_SUCH_TICKET' });
    else res.status(200).json(ticket);
});

// GET /userEmail
router.get('/:email', async (req, res) => {
    const { email } = req.params;
    const ticket = await Ticket.find({ email });
    if (!ticket) res.status(404).json({ error: 'NO_SUCH_TICKET' });
    else res.status(200).json(ticket);
});

// PUT /update
router.put('/update', (req, res) => {

});

// DELETE /delete
router.delete('/delete', async (req, res) => {
    const ticketDeleted = await Ticket.findOneAndDelete({ id: req.body.id });
    if (ticketDeleted) return res.status(200).json({ success: "TICKET_DELETED" });
    else return res.status(404).json({ error: 'NO_SUCH_TICKET'} );
});

module.exports = router;
