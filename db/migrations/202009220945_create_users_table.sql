CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255),
  password_digest TEXT
);

ALTER TABLE jams ADD COLUMN creator_id INTEGER REFERENCES users(id);