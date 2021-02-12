const User = require('../models/user');

async function create(req, res, next){
  try {
    const user = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
    });

    await user.save();

    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
}

async function all (req, res, next){
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (e) {
    next(e);
  }
}

async function destroy(req, res, next){

}

async function update(req, res, next){

}

module.exports = {
  create,
  all,
  delete: destroy,
  update,
};
