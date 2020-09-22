const db = require('../db/config');

class User {
  constructor({ id, username, email, password_digest }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password_digest = password_digest;
  }

  static findByUserName(username) {
    return db
      .oneOrNone('SELECT * FROM users WHERE username = $1', username)
      .then(user => {
        if (user) return new this(user);
        else throw new Error('User not found');
      });
  }

  save() {
    return db
      .one(
        `INSERT INTO users
        (username, email, password_digest)
        VALUES ($/username/, $/email/, $/password_digest/)
        RETURNING *`,
        this
      )
      .then(savedUser => Object.assign(this, savedUser));
  }

  findUserJams() {
    return db
      .manyOrNone(`SELECT * FROM jams WHERE creator_id = $1`, this.id)
      .then(jams => {
        return jams.map(jam => new Jam(jam));
      });
  }
}

module.exports = User;
