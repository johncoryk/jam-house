const bcrypt = require('bcryptjs');
const User = require('../models/User');

const usersController = {
  index(req, res, next) {
    req.user
      .findUserJams()
      .then(jams => {
        res.json({
          message: 'Put a user profile on this route',
          data: {
            user: req.user,
            jams,
          },
        });
      })
      .catch(next);
  },

  create(req, res, next) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);
    new User({
      username: req.body.username,
      email: req.body.email,
      password_digest: hash,
    })
      .save()
      .then(user => {
        req.login(user, err => {
          if (err) return next(err);
          res.json({
            message: 'User was created!',
            user,
          });
        });
      })
      .catch(next);
  },

  delete(req, res, next) {
    User.findById(req.params.id)
      .then(user => user.delete())
      .then(() => {
        res.json({
          message: 'User deleted!',
        });
      })
      .catch(next);
  },
};

module.exports = usersController;
