const db = require('../db/config');

class Jam {
  constructor(jam) {
    this.id = jam.id || null;
    this.title = jam.title;
    this.description = jam.description;
    this.duration = jam.duration;
    this.is_open = jam.is_open;
    this.start_date = jam.start_date || new Date();
  }

  static getAll() {
    return db
      .manyOrNone(
        `SELECT * FROM jams
        ORDER BY start_date ASC`
      )
      .then(jams => {
        return jams.map(jam => new this(jam));
      });
  }

  static getById = id => {
    return db
      .oneOrNone(
        `SELECT * FROM jams
        WHERE id = $1`,
        id
      )
      .then(jam => {
        if (jam) return new this(jam);
        throw new Error(`Jam ${id} not found!`);
      });
  };

  save() {
    return db
      .one(
        `INSERT INTO jams
        (title, description, duration, is_open, start_date)
        VALUES ($/title/, $/description/, $/duration/, $/is_open/, $/start_date/)
        RETURNING *`,
        this
      )
      .then(jam => Object.assign(jam));
  }

  delete() {
    return db.none(
      `DELETE FROM jams
      WHERE id = $1`,
      this.id
    );
  }
}

module.exports = Jam;
