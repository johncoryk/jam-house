const usersController = require('../controllers/user-controller');
const usersRouter = require('express').Router();

const authHelpers = require('../utils/auth/auth-helpers');

usersRouter.post('/', usersController.create);
usersRouter.get('/', authHelpers.loginRequired, usersController.index);

usersRouter.delete('/:id([0-9]+)', usersController.delete);

module.exports = usersRouter;
