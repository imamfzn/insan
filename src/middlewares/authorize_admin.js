module.exports = [
  require('./authorize_login'),
  require('./authorize_roles')(['admin'])
];
