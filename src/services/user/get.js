const User = require('../../models/user');
const Autan = require('../../connections/autan');

async function get(id) {
  const user = await User.findById(id);
  if (!user) {
    throw 'User not found';
  }

  const auth = await Autan.get(user.authId);
  delete auth.id;

  return { ...auth, ...user.toJSON() };
}

module.exports = get;
