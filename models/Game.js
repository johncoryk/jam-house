const db = require('../db/config');

class Game {
  constructor(game) {
    this.id = game.id || null;
    this.title = game.title || 'na';
    this.description = game.description || 'na';
    this.genre = game.genre || 'na';
    this.creator_id = game.creator_id;
    this.jam_id = game.jam_id;
  }

  static getAll(id) {
    return db
      .manyOrNone(
        `SELECT * FROM games
        WHERE jam_id = $1
        ORDER BY id ASC`,
        id
      )
      .then(games => {
        return games.map(game => new this(game));
      });
  }

  static getById = id => {
    return db
      .oneOrNone(
        `SELECT * FROM games
        WHERE id = $1`,
        id
      )
      .then(game => {
        if (game) return new this(game);
        throw new Error(`game ${id} not found!`);
      });
  };

  save() {
    return db
      .one(
        `INSERT INTO games
        (title, description, genre, creator_id, jam_id)
        VALUES ($/title/, $/description/, $/genre/, $/creator_id/, $/jam_id/)
        RETURNING *`,
        this
      )
      .then(game => Object.assign(game));
  }

  delete() {
    return db.none(
      `DELETE FROM games
      WHERE id = $1`,
      this.id
    );
  }
}

module.exports = Game;
