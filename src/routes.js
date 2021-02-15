const { Router } = require('express');
const UserController = require('./controllers/user');
const { authorizeAdmin, authorizeLogin } = require('./middlewares');
const validation = require('./middlewares/validations');

const route = Router();

route.get('/', authorizeAdmin, UserController.all);
route.post('/', authorizeAdmin, validation.createUserValidation, UserController.create);
route.get('/me', authorizeLogin, UserController.current);
route.get('/:id', authorizeAdmin, validation.userIdValidation, UserController.get);
route.delete('/:id', authorizeAdmin, validation.userIdValidation, UserController.remove);
route.patch('/:id', authorizeAdmin, validation.updateUserValidation, UserController.update);

module.exports = route;
