module.exports = function (roles){
  return function (req, res, next){
    if (!roles.includes(req.token.role)){
      return res.status(403).json({ message: 'You aren\'t authorize to access this'});
    }

    next();
  }
}
