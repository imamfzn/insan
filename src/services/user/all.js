const User = require('../../models/user');

async function all() {
 const users = await User.find();

 return users.map(user => user.toJSON());
}

module.exports = all;
