const error = require('../lib/error');
const logger = require('../lib/logger');

module.exports = function errorHandler(err, req, res, next) {
  if (err instanceof error.InsanError) {
    if (err.class == error.InsanError) {
      logger.error(error);
    }

    return res.status(err.httpStatus).json({ message: err.message });
  }

  logger.error(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'something wrong.';

  return res.status(statusCode).json({ message });
};
