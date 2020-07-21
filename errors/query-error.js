const CustomError = require('./custom-error');

module.exports = class QueryError extends CustomError {
  statusCode = 500;
  reason = 'Error connecting to database';

  constructor(message) {
    super(message);

    Object.setPrototypeOf(this, QueryError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message ? this.message : 'Query Error!' }];
  }
};
