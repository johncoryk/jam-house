const jamsController = require('../controllers/jam-controller');
const jamsRouter = require('express').Router();
const authHelpers = require('../utils/auth/auth-helpers');

jamsRouter.get('/', jamsController.index);
jamsRouter.post('/new', authHelpers.loginRequired, jamsController.create);

jamsRouter.get('/:id([0-9]+)', jamsController.show);

jamsRouter.put(
  '/:id([0-9]+)',
  authHelpers.loginRequired,
  jamsController.update
);

jamsRouter.delete(
  '/:id([0-9]+)',
  authHelpers.loginRequired,
  jamsController.delete
);

module.exports = jamsRouter;
