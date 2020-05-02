'use strict';

const Promise = require('bluebird');

const router = require('express').Router();
const { Property } = require('./database');


// POST /create
router.post('/create', async (req, res) => {
    const propExists = await Property.findOne( {name:req.body.name} )
    if (propExists) {
        return res.status(403).json({error: "PROPERTY_EXISTS"})
    } else {
        const newProp = new Property(req.body);
        const data = await newProp.save();
        const { id, name, location } = data
        return res.status(200).json( {
            id,
            name,
            location
        })
    }
});

router.get('/:name', async (req, res) => {
    const { name } = req.params;
    const property = await Property.findOne({ name:name });
    if (!property) res.status(404).json({ error: 'NO_SUCH_PROPERTY' });
    else res.status(200).json(property);
})

// PUT /update
router.put('/update', async (req, res) => {
    const updateObj = {};
    const { id } = req.body;
    console.log(id)
    const currProp = await Property.findOne({ id:id })
    console.log(currProp)
    if (!currProp) return res.json({ error: "NO_PROPERTY_FOUND"})
    
    for (let prop in req.body) if (req.body[prop]) updateObj[prop] = req.body[prop];

    const updated = await Property.updateOne({"id":id},updateObj);
    console.log(updated)
    if (updated.nModified === 1) return res.json( updateObj )
    else return res.json({ error: "PROPERTY_NOT_UPDATED"})
});

// DELETE /delete
router.delete('/delete', async (req, res) => {
    const propDeleted = await Property.findOneAndDelete({ id: req.body.id });
    if (propDeleted) {
        res.status(200).json({ success: "PROPERTY_DELETED"})
    } else {
        res.status(404).json({ error: "NO_SUCH_PROPERTY"})
    }
    return res
});

module.exports = router;