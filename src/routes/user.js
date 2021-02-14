const { Router } = require('express');
const UserController = require('../controllers/user');
const { validation, authorizeAdmin, authorizeLogin } = require('../middlewares');

const route = Router();

route.get('/', authorizeAdmin, UserController.all);
route.put('/', authorizeAdmin, validation.createUser, UserController.create);
route.get('/me', authorizeLogin, UserController.current);
route.get('/:id', authorizeAdmin, UserController.get);
route.delete('/:id', authorizeAdmin, UserController.delete);

module.exports = route;
