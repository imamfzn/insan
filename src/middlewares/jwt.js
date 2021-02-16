const jwt = require('express-jwt');

function getToken(req) {
  return req.headers['x-access-token'] || req.headers.authorization;
}

module.exports = jwt({
  secret: process.env.ACCESS_TOKEN_SECRET,
  algorithms: ['HS256'],
  getToken,
});
