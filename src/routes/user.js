const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');
const UserController = require('../controllers/user');

const route = Router();

route.put(
  '/',
  celebrate({
    body: Joi.object({
      name: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string().email(),
    })
  }),
  UserController.create
);

route.get('/', UserController.all);

module.exports = route;
