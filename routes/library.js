const express = require('express');
const { body } = require('express-validator');
const { validateRequest } = require('../middlewares/validate-request');

const libraryController = require('../controllers/library');

const router = express.Router();

router.post('/users/:uid/borrow/:bid', libraryController.borrowBook);
router.post(
  '/users/:uid/return/:bid',
  [
    body('score')
      .not()
      .isEmpty()
      .withMessage('Score is missing. Please rate this book!'),
  ],
  validateRequest,
  libraryController.returnBook
);

module.exports = router;
