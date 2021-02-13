const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');
const UserController = require('../controllers/user');
const middlewares = require('../middlewares');

const route = Router();

const adminAuthorize = [
  middlewares.auth,
  middlewares.authorize(['admin'])
];

route.put(
  '/',
  adminAuthorize,
  celebrate({
    body: Joi.object({
      name: Joi.string().required(),
      username: Joi.string().required().min(4),
      password: Joi.string().required().min(8),
      email: Joi.string().email(),
      address: Joi.string(),
      phone: Joi.string(),
    })
  }),
  UserController.create
);

route.get('/', adminAuthorize, UserController.all);
route.get('/:id', adminAuthorize, UserController.get);
route.delete('/:id', adminAuthorize, UserController.delete);


module.exports = route;
