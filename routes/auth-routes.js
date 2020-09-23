const express = require('express');
const authRouter = express.Router();

const passport = require('../utils/auth/local');

authRouter.post('/login', passport.authenticate('local'), (req, res) => {
  res.send({
    user: {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
    },
  });
});

authRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('back');
});

module.exports = authRouter;
