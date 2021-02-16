module.exports = {
  ...require('./validations'),
  errorHandler: require('./error'),
  requestLog: require('./request-log'),
  authorize: require('./authorize'),
  owner: require('./owner'),
};
