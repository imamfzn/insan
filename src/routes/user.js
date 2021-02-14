const { Router } = require('express');
const UserController = require('../controllers/user');
const { authorizeAdmin, authorizeLogin } = require('../middlewares');
const { createUserValidation, updateUserValidation } = require('../middlewares/validations');

const route = Router();

route.get('/', authorizeAdmin, UserController.all);
route.put('/', authorizeAdmin, createUserValidation, UserController.create);
route.get('/me', authorizeLogin, UserController.current);
route.get('/:id', authorizeAdmin, UserController.get);
route.delete('/:id', authorizeAdmin, UserController.delete);
route.patch('/:id', authorizeAdmin, updateUserValidation, UserController.update);

module.exports = route;
