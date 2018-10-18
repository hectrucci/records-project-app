'use strict';

const User = require('../models/').user;
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const jwtOptions = require('../passport/passport_config');

module.exports.controller = (app) => {
    // get records
    app.post('/authenticate', (req, res) => {
        if (!req.body.username || !req.body.password) {
            return res.status(401).json({ message: 'User/Password is incorrect!' });
        }

        let user;

        User.findOne({ where: { username: req.body.username } })
            .then(result => {
                if (!result) return false;

                user = result;

                return User.comparePassword({ password: req.body.password, hash: result.password });
            })
            .then(isMatch => {
                if (isMatch) {
                    const payload = { username: user.username };
                    const { expiresIn } = jwtOptions;
                    const token = jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn });
                    res.json({ message: 'ok', token, user: user });
                } else {
                    res.status(401).json({ message: 'User/Password is incorrect!' });
                }
            });
    });
};