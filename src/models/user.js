'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        timestamps: true,
    });

    User.hook('beforeCreate', user => {
        bcrypt.hash(user.password, 10).then(function(hash) {
            user.password = hash;
        });
    });

    User.associate = function (models) {
        // associations can be defined here
    };

    User.comparePassword = ({ password, hash }) => {
        return bcrypt.compare(password, hash).then(res => res);
    };

    return User;
};