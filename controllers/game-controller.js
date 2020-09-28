const Game = require('../models/Game');

const gamesController = {
  index(req, res, next) {
    Game.getAll(req.params.id)
      .then(games => {
        res.json({
          message: 'ok',
          games,
        });
      })
      .catch(next);
  },

  create(req, res, next) {
    console.log(req.body);
    new Game({
      title: req.body.title,
      description: req.body.description,
      genre: req.body.genre,
      creator_id: req.user.id,
      jam_id: req.params.id,
    })
      .save()
      .then(game => {
        res.status(201).json({
          message: 'game create successfully!',
          game,
        });
      })
      .catch(next);
  },

  show(req, res, next) {
    Game.getById(req.params.id)
      .then(game => {
        res.json({
          message: 'ok',
          game,
        });
      })
      .catch(next);
  },

  update(req, res, next) {
    Game.getById(req.params.id)
      .then(game => {
        game.update({
          title: req.body.title,
          description: req.body.description,
        });
      })
      .then(game => {
        res.json({
          message: 'game updated!',
          game,
        });
      })
      .catch(next);
  },

  delete(req, res, next) {
    Game.getById(req.params.id)
      .then(game => game.delete())
      .then(() => {
        res.json({
          message: 'game deleted!',
        });
      })
      .catch(next);
  },
};

module.exports = gamesController;
