module.exports = {
  ...require('./validations'),
  errorHandler: require('./error'),
  requestLog: require('./request-log'),
  authorizeAdmin: require('./authorize-admin'),
  authorizeLogin: require('./authorize-login'),
  authorizeRoles: require('./authorize-roles'),
};
