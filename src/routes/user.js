const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');
const UserController = require('../controllers/user');
const middlewares = require('../middlewares');

const route = Router();

route.put(
  '/',
  celebrate({
    body: Joi.object({
      name: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().email(),
    })
  }),
  UserController.create
);

route.get(
  '/',
  [
    middlewares.auth,
    middlewares.authorize(['admin'])
  ],
  UserController.all
);

module.exports = route;
