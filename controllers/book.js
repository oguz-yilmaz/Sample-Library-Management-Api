const { Book, BookBorrow } = require('../models');
const { Op } = require('sequelize');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');

exports.getBooks = async (req, res, next) => {
  const books = await Book.findAll();
  res.status(200).send({
    message: 'OK',
    data: books,
  });
};

exports.getBook = async (req, res, next) => {
  const bookId = req.params.id;

  const book = await Book.findByPk(bookId);
  const where = {
    where: {
      BookId: {
        [Op.eq]: bookId,
      },
    },
  };

  const sum = await BookBorrow.sum('rating', where);
  const count = await BookBorrow.count(where);
  let avgRating;

  if (sum > 0 && count > 0) {
    avgRating = parseFloat(sum / count).toFixed(1);
  }

  if (!book) {
    throw new NotFoundError('Book is not found!');
  }

  res.status(200).send({
    message: 'OK',
    data: {
      book,
      avgRating,
    },
  });
};

exports.createBook = async (req, res, next) => {
  const bookName = req.body.name;

  let book = await Book.findOne({
    where: {
      name: {
        [Op.eq]: bookName,
      },
    },
  });

  if (book) {
    throw new BadRequestError('Book already exists!!');
  }

  book = await Book.create({ name: bookName, isBorrowed: false });

  res.status(201).send({
    message: 'OK',
    data: book,
  });
};
