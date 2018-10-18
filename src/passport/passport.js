'use strict';

const JwtStrategy = require('passport-jwt').Strategy;
const opts = require('./passport_config');
const User = require('../models/index').user;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({ where: { username: jwt_payload.username } })
            .then(user => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(new Error('fail!'), false);
                }
            });
    }));
};
