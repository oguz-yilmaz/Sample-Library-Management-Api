const express = require('express');
const { body } = require('express-validator');
const { validateRequest } = require('../middlewares/validate-request');

const bookController = require('../controllers/book');

const router = express.Router();

router.get('/books', bookController.getBooks);
router.get('/books/:id', bookController.getBook);

router.post(
  '/books',
  [body('name').not().isEmpty().withMessage('Name is required')],
  validateRequest,
  bookController.createBook
);

module.exports = router;
