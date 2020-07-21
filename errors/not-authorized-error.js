const CustomError = require('./custom-error');

module.exports = class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor(message) {
    super(message);

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message ? this.message : 'Not authorized' }];
  }
};
