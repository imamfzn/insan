const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');
const UserController = require('../controllers/user');
const middleware = require('../middlewares');

const route = Router();

const authorizeAdmin = [
  middleware.authorizeLogin,
  middleware.authorizeRoles(['admin'])
];

route.put(
  '/',
  authorizeAdmin,
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

route.get('/', authorizeAdmin, UserController.all);
route.get('/:id', authorizeAdmin, UserController.get);
route.delete('/:id', authorizeAdmin, UserController.delete);


module.exports = route;
