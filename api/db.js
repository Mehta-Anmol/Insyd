const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

// In serverless, use /tmp directory for SQLite database
const dbPath = path.join("/tmp", "inventory.db");

// Ensure /tmp directory exists (it should, but just in case)
if (!fs.existsSync("/tmp")) {
  fs.mkdirSync("/tmp", { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("DB Error:", err.message);
  } else {
    console.log("Connected to SQLite database at", dbPath);
  }
});

// Initialize table
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

