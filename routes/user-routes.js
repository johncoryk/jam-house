const usersController = require('../controllers/user-controller');
const usersRouter = require('express').Router();

const authHelpers = require('../utils/auth/auth-helpers');

usersRouter.get('/new', authHelpers.loginRedirect, (req, res) => {
  res.render('auth/register');
});

usersRouter.post('/', usersController.create);
usersRouter.get('/', authHelpers.loginRequired, usersController.index);

module.exports = usersRouter;
