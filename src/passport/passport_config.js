'use strict';

const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports =  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: 'ultraSuperSecretPassw0rd',
    expiresIn: '10m'
};