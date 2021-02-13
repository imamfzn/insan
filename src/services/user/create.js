const User = require('../../models/user');
const Autan = require('../../connections/autan');

async function create(user){
	const { username, password, role } = user;

	try {
		const userAuth = await Autan.register({username, password, role});
		const userCreate = new User({
		  auth_id: userAuth._id,
		  name: user.name,
		  email: user.email,
		  address: user.address,
		  phone: user.phone,
		});

		await userCreate.save();

		return {...userAuth, ...userCreate.toObject() };
	} catch (error) {
		throw error;
	}
}

module.exports = create;
