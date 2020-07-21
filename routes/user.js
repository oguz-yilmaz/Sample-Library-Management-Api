const express = require('express');
const { body } = require('express-validator');
const { validateRequest } = require('../middlewares/validate-request');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUser);

router.post(
  '/users',
  [body('name').not().isEmpty().withMessage('Name is required')],
  validateRequest,
  userController.createUser
);

module.exports = router;
