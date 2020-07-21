const { Book, User, BookBorrow } = require('../models');
const models = require('../models');
const dbUtils = require('../utils/db');
const NotAuthorizedError = require('../errors/not-authorized-error');
const QueryError = require('../errors/query-error');

exports.borrowBook = async (req, res, next) => {
  const userId = req.params.uid,
    bookId = req.params.bid;

  const [book] = await dbUtils.userAndBookExists(userId, bookId);

  if (book && book.isBorrowed) {
    throw new NotAuthorizedError('Book is already borrowed!');
  }

  const t = await models.sequelize.transaction();

  try {
    book.update({
      isBorrowed: true,
    });

    await BookBorrow.create({
      BookId: bookId,
      UserId: userId,
      isReturned: false,
    });

    await t.commit();
  } catch (error) {
    await t.rollback();
    throw new QueryError('Something went wrong!');
  }

  res.status(201).send({
    message: 'OK',
    data: {
      book,
    },
  });
};

exports.returnBook = async (req, res, next) => {
  const userId = req.params.uid,
    bookId = req.params.bid,
    rating = req.body.score;

  const [book] = await dbUtils.userAndBookExists(userId, bookId);

  const t = await models.sequelize.transaction();

  try {
    book.update({
      isBorrowed: false,
    });

    await BookBorrow.update(
      { isReturned: true, rating },
      {
        where: {
          BookId: bookId,
          UserId: userId,
          isReturned: false,
        },
      }
    );

    await t.commit();
  } catch (error) {
    console.log(error);
    await t.rollback();
    throw new QueryError('Something went wrong!');
  }

  res.status(200).send({
    message: 'OK',
    data: {
      book,
    },
  });
};
