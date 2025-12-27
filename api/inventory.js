const db = require("./db");

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { method } = req;

  try {
    // GET /api/inventory - Get all items
    if (method === "GET") {
      return new Promise((resolve, reject) => {
        db.all("SELECT * FROM inventory", [], (err, rows) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return reject(err);
          }
          res.json(rows);
          resolve();
        });
      });
    }

    // POST /api/inventory - Add new item
    if (method === "POST") {
      const { name, sku, quantity, minStock } = req.body;
      
      return new Promise((resolve, reject) => {
        db.run(
          "INSERT INTO inventory (name, sku, quantity, minStock) VALUES (?, ?, ?, ?)",
          [name, sku, quantity, minStock],
          function (err) {
            if (err) {
              res.status(500).json({ error: err.message });
              return reject(err);
            }
            res.json({ id: this.lastID });
            resolve();
          }
        );
      });
    }

    // Method not allowed
    res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

