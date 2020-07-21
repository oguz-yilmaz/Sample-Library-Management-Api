const CustomError = require('./custom-error');

module.exports = class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(message) {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message ? this.message : 'Not Found' }];
  }
};
