module.exports = [
  require('./authorize-login'),
  require('./authorize-roles')(['admin']),
];
