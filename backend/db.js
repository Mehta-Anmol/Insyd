const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./inventory.db", (err) => {
  if (err) {
    console.error("DB Error:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    sku TEXT,
    quantity INTEGER,
    minStock INTEGER
  )
`);

module.exports = db;
