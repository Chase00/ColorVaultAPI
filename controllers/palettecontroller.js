var express = require('express');
var router = express.Router();
const sequelize = require('../db');
const Palette = sequelize.import('../models/palette');
const Color = sequelize.import('../models/color');
const validateSession = require('../middleware/validate-session');

// GET /api/palette/ - get all folders for a user
router.get('/', validateSession, async (req, res) => {
    try {
        const palettes = await Palette.findAll({ where: { owner: req.user.id }, include: Color})
            res.status(200).json(palettes)
    } catch (err) {
        res.status(500).send(err);
    }
})

// POST /api/palette/ - Create a new blank empty folder
router.post('/', validateSession, (req, res) => {
    if (!req.errors) {
        const paletteFromRequest = {
            name: "Palette",
            owner: req.user.id,
        };

        Palette.create(paletteFromRequest)
        .then(newPalette => res.status(200).json(newPalette))
        .catch(err => res.json(err))
    } else {
    res.status(500).json(req.errors);
    }
});

// GET /api/palette/:id - Get a folder by id from a user
router.get('/:id', validateSession, (req, res) => {
    Palette.findOne({ where: { id: req.params.id }, include: Color})
        .then(palette => res.status(200).json(palette))
        .catch(err => res.status(500).json(err));
});

// PUT /api/palette/:id/add - Add a color to the folder
router.put('/:id/add', validateSession, (req, res) => {
    if (!req.errors) {
        Color.update({paletteId: req.params.id}, {where: { id: req.body.id }})
            .then(color => res.status(200).json(color))
            .catch(err => res.status(500).json(err));
    } else {
        res.status(500).json(req.errors);
    }
})


// PUT /api/palette/remove - Remove a color from the folder
router.put('/remove', validateSession, (req, res) => {
    if (!req.errors) {
        Color.update({paletteId: null}, {where: { id: req.body.id }})
            .then(color => res.status(200).json(color))
            .catch(err => res.status(500).json(err));
    } else {
        res.status(500).json(req.errors);
    }
})



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