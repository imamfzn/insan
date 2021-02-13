const User = require('../../models/user');
const Autan = require('../../connections/autan');

async function destroy(id){
  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    console.error(err);
    throw new Error("something wrong, can't delete user.");
  }

  if (!user){
    const error = new Error('user not found.');
    error.statusCode = 404;
    throw error;
  }

  const authId = user.auth_id;

  try {
    await user.remove();
    await Autan.delete(user.auth_id);
  } catch (err) {
    throw err;
  }
}

module.exports = destroy;
