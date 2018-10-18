'use strict';

const Record = require('../models/').record;
const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports.controller = (app) => {
    // get records
    app.get('/records', passport.authenticate('jwt', { session: false }),(req, res) => {
        const size = req.query.size || 5;
        const page = req.query.page || 1;
        const offset = (page - 1) * size;

        Record.findAndCountAll({ offset, limit: size, order: [['createdAt', 'DESC']] })
            .then(result => {
                res.json(result);
            });
    });

    app.post('/records', passport.authenticate('jwt', { session: false }), (req, res) => {
        const { name, favoriteColor } = req.body;

        if (!name || !favoriteColor) {
            return res.status(401).json({message: 'Oops!, it seems you missed some info'});
        }

        const record = new Record({ name, favoriteColor });

        record.save().then(() => res.json({ message: 'ok' }));
    });

    app.delete('/records/:id',  passport.authenticate('jwt', { session: false }), (req, res) => {
        Record.findOne({ where: { id: req.params.id } })
            .then(record => {
                record.destroy();
                res.json({ message: 'ok' });
            });
    });
};