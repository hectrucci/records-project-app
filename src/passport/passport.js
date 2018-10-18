'use strict';

const JwtStrategy = require('passport-jwt').Strategy;
const opts = require('./passport_config');
const User = require('../models/index').user;

module.exports = passport => {
    // Jwt password strategy
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        // find the user with the jwt token
        User.findOne({ where: { username: jwt_payload.username } })
            .then(user => {
                // if exists, continue with the request
                if (user) {
                    return done(null, user);
                } else {
                    // if not, then stop
                    return done(new Error('Unauthorized'), false);
                }
            });
    }));
};
