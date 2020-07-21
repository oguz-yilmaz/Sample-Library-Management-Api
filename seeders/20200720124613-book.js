'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let books = [];
    for (var i = 0; i < 20; i++) {
      books.push({
        name: faker.random.words(),
        author: faker.name.findName(),
        isBorrowed: faker.random.boolean(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('Books', books, {});
  },

  down: async (queryInterface, Sequelize) => {},
};
