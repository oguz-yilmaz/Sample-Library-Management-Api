'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('BookBorrows', 'BookId', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn('BookBorrows', 'UserId', {
        type: Sequelize.INTEGER,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
