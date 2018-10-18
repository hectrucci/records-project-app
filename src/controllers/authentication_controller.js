'use strict';

const User = require('../models/').user;
const jwt = require('jsonwebtoken');
const jwtOptions = require('../passport/passport_config');

module.exports.controller = (app) => {
    // user authentication endpoint
    app.post('/authenticate', (req, res) => {
        if (!req.body.username || !req.body.password) {
            return res.status(401).json({ message: 'User/Password is incorrect!' });
        }

        let user;

        // Checks if the requested user exist
        User.findOne({ where: { username: req.body.username } })
            .then(result => {

                // returns no math
                if (!result) return false;

                user = result;

                // Compares the requested password with the hashed password in the db
                return User.comparePassword({ password: req.body.password, hash: result.password });
            })
            .then(isMatch => {
                // if the password matches, return the user
                if (isMatch) {
                    const payload = { username: user.username };
                    const { expiresIn } = jwtOptions;
                    const token = jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn });

                    // returns only the username in the response, without pass and other attrs
                    res.json({ message: 'ok', token, user: payload });
                } else {

                    // if there is no match, return 401
                    res.status(401).json({ message: 'User/Password is incorrect!' });
                }
            });
    });
};