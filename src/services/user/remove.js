const User = require('../../models/user');
const Autan = require('../../connections/autan');

async function remove(id) {
  const user = await User.findById(id);
  if (!user) {
    throw 'User not found';
  }

  await user.remove();
  await Autan.remove(user.authId);
}

module.exports = remove;