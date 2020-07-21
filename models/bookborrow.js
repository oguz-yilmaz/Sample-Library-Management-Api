'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookBorrow extends Model {
    static associate(models) {
      // define association here
    }
  }
  BookBorrow.init(
    {
      isReturned: DataTypes.BOOLEAN,
      rating: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'BookBorrow',
      tableName: 'bookborrows',
    }
  );
  return BookBorrow;
};
