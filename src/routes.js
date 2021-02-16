const { Router } = require('express');
const UserController = require('./controllers/user');
const { authorize, owner } = require('./middlewares');
const validation = require('./middlewares/validations');

const route = Router();

route.get('/', authorize("admin"), UserController.all);
route.post('/', authorize("admin"), validation.createUserValidation, UserController.create);
route.get('/me', authorize(), UserController.current);
route.get('/:id', authorize(), owner, validation.userIdValidation, UserController.get);
route.delete('/:id', authorize("admin"), validation.userIdValidation, UserController.remove);
route.patch('/:id', authorize("admin"), validation.updateUserValidation, UserController.update);

module.exports = route;
