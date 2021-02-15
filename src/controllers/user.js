const humps = require('humps');
const User = require('../models/user');
const UserService = require('../services/user');

function sendResponse(res, status = 200) {
  return function (payload) {
    return res.status(status).json(
      humps.decamelizeKeys(payload),
    );
  };
}

function create(req, res, next) {
  UserService.create(req.body).then(sendResponse(res, 201)).catch(next);
}

function get(req, res, next) {
  UserService.get(req.params.id).then(sendResponse(res)).catch(next);
}

function current(req, res, next) {
  UserService.current(req.user.id).then(sendResponse(res)).catch(next);
}

function remove(req, res, next) {
  UserService.remove(req.params.id)
    .then(() => res.json({ message: 'User has been deleted.' }))
    .catch(next);
}

function all(req, res, next) {
  UserService.all().then(sendResponse(res)).catch(next);
}

function update(req, res, next) {
  UserService.update(req.params.id, req.body).then(sendResponse(res)).catch(next);
}

module.exports = {
  get,
  create,
  all,
  remove,
  update,
  current,
};
