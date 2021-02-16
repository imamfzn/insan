const User = require('../../models/user');
const Autan = require('../../connections/autan');

async function create(user) {
  const { username, password, role } = user;
  const auth = await Autan.register({ username, password, role });
  const created = await User.create({
    authId: auth.id,
    name: user.name,
    email: user.email,
    address: user.address,
    phone: user.phone,
  })

  delete auth.id;

  return {
    ...created.toJSON(),
    ...auth,
  };
}

module.exports = create;
