const { Book, User } = require('../models');
const NotFoundError = require('../errors/not-found-error');

exports.userAndBookExists = async (userId, bookId) => {
  const book = await Book.findByPk(bookId);
  const user = await User.findByPk(userId);

  if (!book) {
    throw new NotFoundError('Book is not found!');
  }
  if (!user) {
    throw new NotFoundError('User is not found!');
  }
  return [book, user];
};
