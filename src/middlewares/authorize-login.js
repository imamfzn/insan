const jwt = require('express-jwt');

function getTokenFromHeader(req) {
  return req.headers['x-access-token'] || req.headers.authorization;
}

module.exports = jwt({
  algorithms: ['HS256'],
  secret: process.env.ACCESS_TOKEN_SECRET,
  userProperty: 'user',
  getToken: getTokenFromHeader,
});
