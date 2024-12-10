const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL
        )
      `);

    db.run(`
    CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mood TEXT,
      anxiety INTEGER,
      sleep TEXT,
      activity TEXT,
      social TEXT,
      stress TEXT,
      symptoms TEXT,
      date TEXT,
      email TEXT
    )
  `);
});

module.exports = db;
