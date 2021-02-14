const User = require('../../models/user');
const Autan = require('../../connections/autan');

async function current(authId) {
  let user;
  try {
    user = await User.findOne({ auth_id: authId });
  } catch (err) {
    console.error(err);
    throw new Error("something wrong, can't get user.");
  }

  if (!user) {
    const error = new Error('user not found.');
    error.statusCode = 404;
    throw error;
  }

  const userAuth = await Autan.get(authId);

  return { ...userAuth, ...user.toObject() };
}

module.exports = current;
