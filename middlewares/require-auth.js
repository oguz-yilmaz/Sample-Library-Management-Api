const { NotAuthorizedError } = require('../errors/not-authorized-error');

exports.requireAuth = (req, res, next) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};
