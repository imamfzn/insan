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

async function get(req, res, next){
  try {
    const user = await UserService.get(req.params.id);

    res.json(user);
  } catch (e) {
    next(e);
  }
}

async function current(req, res, next){
  try {
    const user = await UserService.current(req.token.id);

    res.json(user);
  } catch (e) {
    next(e);
  }
}

async function destroy(req, res, next){
  try {
    await UserService.delete(req.params.id);

    res.json({ message: "user has been deleted." });
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

async function update(req, res, next){

}

module.exports = {
  get,
  create,
  all,
  destroy,
  delete: destroy,
  update,
  current,
};
