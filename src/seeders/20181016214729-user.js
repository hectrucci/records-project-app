'use strict';
const bcrypt = require('bcrypt');

module.exports = {
    up: (queryInterface, Sequelize) => {
        const date = new Date().toISOString();

        return queryInterface.bulkInsert('users',
            [
                {
                    username: 'test1@example.com',
                    password: bcrypt.hashSync('asdf1234', 10),
                    createdAt: date,
                    updatedAt: date,
                },
                {
                    username: 'test2@example.com',
                    password: bcrypt.hashSync('1234asdf', 10),
                    createdAt: date,
                    updatedAt: date,
                },
                {
                    username: 'test3@example.com',
                    password: bcrypt.hashSync('@123456!', 10),
                    createdAt: date,
                    updatedAt: date,
                },
                {
                    username: 'admin',
                    password: bcrypt.hashSync('admin', 10),
                    createdAt: date,
                    updatedAt: date,
                },
            ], {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
