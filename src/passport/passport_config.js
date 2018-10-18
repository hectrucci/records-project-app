const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports =  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: 'thisisthesecretkey',
    expiresIn: '10m'
};