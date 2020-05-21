var express = require('express');
var router = express.Router();
const sequelize = require('../db');
const Palette = sequelize.import('../models/palette');
const validateSession = require('../middleware/validate-session');

// GET /api/palette/ - get all folders for a user
router.get('/', validateSession, (req, res) => {
    Palette.findAll({ where: { owner: req.user.id }})
        .then(palette => res.status(200).json(palette))
        .catch(err => res.status(500));
})

// POST /api/palette/ - Create a new blank empty folder
router.post('/', validateSession, (req, res) => {
    if (!req.errors) {
        const paletteFromRequest = {
            name: "Palette",
            colors: [],
            owner: req.user.id,
        };

        Palette.create(colorFromRequest)
        .then(newPalette => res.status(200).json(newPalette))
        .catch(err => res.json(err))
    } else {
    res.status(500).json(req.errors);
    }
});

// GET /api/palette/:id - Get a folder by id from a user
router.get('/:id', validateSession, (req, res) => {
    Palette.findOne({ where: { id: req.params.id }})
        .then(palette => res.status(200).json(palette))
        .catch(err => res.status(500).json(err));
});

// PUT /api/palette/:id - Add a color to the folder




// PUT /api/palette/:id - Remove a color from the folder




// DELETE /api/palette/:id - Delete a folder from a user
router.delete('/:id', validateSession, (req, res) => {
    if (!req.errors) {
        Palette.destroy({ where: { owner: req.user.id, id: req.params.id }})
            .then(palette => res.status(200).json(palette))
            .catch(err => res.status(500).json(err));
    } else {
        res.status(500).json(req.errors);
    }
})

module.exports = router;