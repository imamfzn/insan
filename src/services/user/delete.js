const User = require('../../models/user');
const logger = require('../../lib/logger');
const Autan = require('../../connections/autan');

async function destroy(id) {
  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    logger.error(err);
    throw new Error('something wrong, can\'t delete user.');
  }

  if (!user) {
    const error = new Error('user not found.');
    error.statusCode = 404;
    throw error;
  }

  await user.remove();
  await Autan.delete(user.auth_id);
}

module.exports = destroy;
