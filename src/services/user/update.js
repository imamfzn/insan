const User = require('../../models/user');
const { UserNotFoundError } = require('../../lib/error');

async function update(id, payload) {
  const user = await User.findByIdAndUpdate(id, payload, { new: true });
  if (!user) {
    throw new UserNotFoundError();
  }

  return user.toJSON();
}

module.exports = update;
