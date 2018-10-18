'use strict';

module.exports = (sequelize, DataTypes) => {
    const record = sequelize.define('record', {
        name: DataTypes.STRING,
        favoriteColor: DataTypes.STRING
    }, {
        timestamps: true,
        paranoid: true,
    });
    
    record.associate = function (models) {
        // associations can be defined here
    };

    return record;
};