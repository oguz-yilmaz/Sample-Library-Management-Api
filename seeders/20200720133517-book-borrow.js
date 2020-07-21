'use strict';
const faker = require('faker');
const rand = require('../utils/random');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const bookBorrows = [],
      idPairs = rand.generateUniqueIdPairs();

    for (const ids of idPairs) {
      bookBorrows.push({
        isReturned: faker.random.boolean(),
        rating: faker.random.number({
          min: 1,
          max: 10,
        }),
        BookId: ids[0],
        UserId: ids[1],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('BookBorrows', bookBorrows, {});
  },

  down: async (queryInterface, Sequelize) => {},
};
