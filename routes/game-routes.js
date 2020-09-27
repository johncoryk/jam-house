const gamesController = require('../controllers/game-controller');
const gamesRouter = require('express').Router();
const authHelpers = require('../utils/auth/auth-helpers');

gamesRouter.get('/jam/:id', gamesController.index);
// gamesRouter.post('/new/:id', authHelpers.loginRequired, gamesController.create);
gamesRouter.post('/new/:id', gamesController.create);

gamesRouter.put(
  '/:id([0-9]+)',
  authHelpers.loginRequired,
  gamesController.update
);

gamesRouter.delete(
  '/:id([0-9]+)',
  authHelpers.loginRequired,
  gamesController.delete
);

module.exports = gamesRouter;
