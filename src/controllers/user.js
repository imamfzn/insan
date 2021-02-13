const User = require('../models/user');
const UserService = require('../services/user');

async function create(req, res, next){
  try {
    const user = await UserService.create(req.body);

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
