'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.belongsToMany(models.User, { through: models.BookBorrow });
    }
  }
  Book.init(
    {
      name: DataTypes.STRING,
      author: DataTypes.STRING,
      isBorrowed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Book',
      tableName: 'books',
    }
  );
  return Book;
};
