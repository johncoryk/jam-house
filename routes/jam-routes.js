const jamsController = require('../controllers/jam-controller');
const jamsRouter = require('express').Router();

jamsRouter.get('/', jamsController.index);
jamsRouter.post('/', jamsController.create);

jamsRouter.put('/:id([0-9]+)', jamsController.update);

jamsRouter.delete('/:id([0-9]+)', jamsController.delete);

module.exports = jamsRouter;
