module.exports = {
  ...require('./validations'),
  errorHandler: require('./error'),
  authorizeAdmin: require('./authorize_admin'),
  authorizeLogin: require('./authorize_login'),
  authorizeRoles: require('./authorize_roles'),
};
