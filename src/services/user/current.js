const User = require('../../models/user');
const Autan = require('../../connections/autan');

async function current(authId) {
  const user = await User.findOne({ auth_id: authId });
  if (!user) {
    throw 'User not found';
  }

  const auth = await Autan.get(authId);
  delete auth.id;

  return { ...user.toJSON(), ...auth };
}

module.exports = current;
