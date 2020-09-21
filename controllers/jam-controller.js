const Jam = require('../models/Jam');

const jamsController = {
  index(req, res, next) {
    Jam.getAll()
      .then(jams => {
        res.json({
          message: 'ok',
          jams,
        });
      })
      .catch(next);
  },

  create(req, res, next) {
    new Jam({
      title: req.body.title,
      description: req.body.description,
      duration: req.body.duration,
      is_open: req.body.is_open,
      start_date: req.body.start_date,
    })
      .save()
      .then(jam => {
        res.status(201).json({
          message: 'Jam create successfully!',
          jam,
        });
      })
      .catch(next);
  },

  show(req, res, next) {
    Jam.getById(req.params.id)
      .then(jam => {
        res.json({
          message: 'ok',
          jam,
        });
      })
      .catch(next);
  },

  update(req, res, next) {
    Jam.getById(req.params.id)
      .then(jam => {
        jam.update({
          title: req.body.title,
          description: req.body.description,
        });
      })
      .then(jam => {
        res.json({
          message: 'Jam updated!',
          jam,
        });
      })
      .catch(next);
  },

  delete(req, res, next) {
    Jam.getById(req.params.id)
      .then(jam => jam.delete())
      .then(() => {
        res.json({
          message: 'Jam deleted!',
        });
      })
      .catch(next);
  },
};

module.exports = jamsController;
