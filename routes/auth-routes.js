const authRouter = require('express').Router();
const passport = require('../utils/auth/local');
const usersController = require('../controllers/user-controller');

authRouter.post('/register', usersController.create);
authRouter.post('/login', passport.authenticate('local'), (req, res) => {
  res.send({
    user: {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
    },
  });
});

authRouter.get('/verify', (req, res) => {
  if (req.user) {
    res.status(200).send({
      user: {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
      },
    });
  } else {
    res.status(401);
  }
});

authRouter.get('/logout', (req, res) => {
  req.logout();
  res.send({
    message: 'Logout success!',
  });
});

module.exports = authRouter;
