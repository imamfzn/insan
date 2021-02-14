const User = require('../../models/user');
const Autan = require('../../connections/autan');

async function get(id) {
  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    console.error(err);
    throw new Error("something wrong, can't get user.");
  }

  if (!user) {
    const error = new Error('user not found.');
    error.statusCode = 404;
    throw error;
  }

  const userAuth = await Autan.get(user.auth_id);

  return { ...userAuth, ...user.toObject() };
}

module.exports = get;
