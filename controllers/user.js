const { User } = require('../models');
const { Op } = require('sequelize');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');

exports.getUsers = async (req, res, next) => {
  const users = await User.findAll();
  res.status(200).send({
    message: 'OK',
    data: users,
  });
};

exports.getUser = async (req, res, next) => {
  const userId = req.params.id;
  let returnedBooks = [],
    currentBorrowedBooks = [];

  const user = await User.findByPk(userId);
  const borrowedBooks = await user.getBooks();
  borrowedBooks.forEach((book) => {
    let bObject = {
      name: book.name,
      rating: book.BookBorrow.rating,
    };

    if (book.BookBorrow && book.BookBorrow.isReturned) {
      returnedBooks.push(bObject);
    } else {
      currentBorrowedBooks.push(bObject);
    }
  });

  if (!user) {
    throw new NotFoundError('User is not found!');
  }

  res.status(200).send({
    message: 'OK',
    data: { user, returnedBooks, currentBorrowedBooks },
  });
};

exports.createUser = async (req, res, next) => {
  const userName = req.body.name;

  let user = await User.findOne({
    where: {
      name: {
        [Op.eq]: userName,
      },
    },
  });

  if (user) {
    throw new BadRequestError('User already exists!!');
  }

  user = await User.create({ name: userName });

  res.status(201).send({
    message: 'OK',
    data: user,
  });
};
