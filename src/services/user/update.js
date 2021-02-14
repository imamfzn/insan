const User = require('../../models/user');

async function update(id, payload) {
  const user = await User.findByIdAndUpdate(id, payload, { new: true });
  if (!user) {
    const error = new Error('user not found.');
    error.statusCode = 404;
    throw error;
  }

  return user.toObject();
}

module.exports = update;
