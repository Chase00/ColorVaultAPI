var express = require('express');
var router = express.Router();
const sequelize = require('../db');
const Color = sequelize.import('../models/color');
const validateSession = require('../middleware/validate-session');

// GET /api/color/ - get all colors for a user
router.get('/', validateSession, (req, res) => {
    Color.findAll({ where: { owner: req.user.id, id: req.params.id }})
        .then(color => res.status(200).json(color))
        .catch(err => res.status(500));
});

// POST /api/color/ - Create a new color
router.post('/', validateSession, (req, res) => {
    if (!req.errors) {
        const colorFromRequest = {
            name: req.body.name,
            hex: req.body.hex,
            owner: req.user.id,
        };

        Color.create(colorFromRequest)
        .then(newColor => res.status(200).json(newColor))
        .catch(err => res.json(err))
    } else {
    res.status(500).json(req.errors);
    }
});

// GET /api/color/:id - get a color by an id for a user
router.get('/:id', validateSession, (req, res) => {
    Color.findOne({ where: { owner: req.user.id, id: req.params.id }})
        .then(color => res.status(200).json(color))
        .catch(err => res.status(500).json(err));
});

// PUT /api/color/:id - update a color for a user
router.put('/:id', validateSession, (req, res) => {
    if (!req.errors) {
        Color.update(req.body, { where: { owner: req.user.id, id: req.params.id }})
            .then(color => res.status(200).json(color))
            .catch(err => res.status(500).json(err));
    } else {
        res.status(500).json(req.errors);
    }
});

// DELTE /api/color/:id - delete a color for a user
router.delete('/:id', validateSession, (req, res) => {
    if (!req.errors) {
        Color.destroy({ color: { owner: req.user.id, id: req.params.id }})
            .then(color => res.status(200).json(color))
            .catch(err => res.status(500).json(err));
    } else {
        res.status(500).json(req.errors);
    }
})

module.exports = router;