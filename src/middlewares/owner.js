const User = require('../models/user');

async function owner(req, res, next) {
  if (req.user.role != 'admin') {
    const user = await User.findOne({ auth_id: req.user.id });
    if (!user || user.id != req.params.id) {
      return res.status(401).json({ message: 'You aren\'t authorize to access this' });
    }
  }

  next();
}

module.exports = owner;
