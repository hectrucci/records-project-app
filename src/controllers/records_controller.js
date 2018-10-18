'use strict';

const Record = require('../models/').record;
const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports.controller = (app) => {
    /**
     * get records list, returns a count of all the records and a list of records
     * delimited by req.body.size(limit) and req.body.page(offset)
     */
    app.get('/records', passport.authenticate('jwt', { session: false }),(req, res) => {
        const size = req.query.size || 5;
        const page = req.query.page || 1;
        const offset = (page - 1) * size;

        Record.findAndCountAll({ offset, limit: size, order: [['createdAt', 'DESC']] })
            .then(result => {
                res.json(result);
            });
    });

    // creates a new record
    app.post('/records', passport.authenticate('jwt', { session: false }), (req, res) => {
        // sanitize the inputs before storing them
        req.body.name = req.sanitize(req.body.name);
        req.body.favoriteColor = req.sanitize(req.body.favoriteColor);

        const { name, favoriteColor } = req.body;

        if (!name || !favoriteColor) {
            return res.status(400).json({message: 'Oops!, it seems you missed some info'});
        }

        const record = new Record({ name, favoriteColor });

        record.save().then(() => res.json({ message: 'ok' }));
    });

    // deletes a given record
    app.delete('/records/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
        if (!req.params.id) {
            return res.status(400).json({message: 'Bad Request'});
        }

        Record.findOne({ where: { id: req.params.id } })
            .then(record => {
                record.destroy();
                res.json({ message: 'ok' });
            });
    });
};