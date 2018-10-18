'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        const date = new Date().toISOString();

        return queryInterface.bulkInsert('records',
            [
                {
                    name: 'Hector',
                    favoriteColor: 'Magenta',
                    createdAt: date,
                    updatedAt: date,
                },
                {
                    name: 'Juan',
                    favoriteColor: 'Brown',
                    createdAt: date,
                    updatedAt: date,
                },
                {
                    name: 'Jose',
                    favoriteColor: 'Pink',
                    createdAt: date,
                    updatedAt: date,
                },
                {
                    name: 'Roberto',
                    favoriteColor: 'White',
                    createdAt: date,
                    updatedAt: date,
                },
                {
                    name: 'Fausto',
                    favoriteColor: 'Black',
                    createdAt: date,
                    updatedAt: date,
                },
                {
                    name: 'Julio',
                    favoriteColor: 'Gray',
                    createdAt: date,
                    updatedAt: date,
                },
                {
                    name: 'Eduardo',
                    favoriteColor: 'Orange',
                    createdAt: date,
                    updatedAt: date,
                },
                {
                    name: 'Manuel',
                    favoriteColor: 'White',
                    createdAt: date,
                    updatedAt: date,
                },
                {
                    name: 'Hugo',
                    favoriteColor: 'Yellow',
                    createdAt: date,
                    updatedAt: date,
                },
                {
                    name: 'Paco',
                    favoriteColor: 'Green',
                    createdAt: date,
                    updatedAt: date,
                },
                {
                    name: 'Daniel',
                    favoriteColor: 'Blue',
                    createdAt: date,
                    updatedAt: date,
                },
                {
                    name: 'Fernando',
                    favoriteColor: 'Red',
                    createdAt: date,
                    updatedAt: date,
                },

            ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('records', null, {});
    }
};
