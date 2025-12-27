const db = require("../db");

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { method } = req;
  const { id } = req.query;

  try {
    // PUT /api/inventory/:id - Update item
    if (method === "PUT") {
      const { name, sku, quantity, minStock } = req.body;
      
      return new Promise((resolve, reject) => {
        db.run(
          "UPDATE inventory SET name=?, sku=?, quantity=?, minStock=? WHERE id=?",
          [name, sku, quantity, minStock, id],
          function (err) {
            if (err) {
              res.status(500).json({ error: err.message });
              return reject(err);
            }
            res.json({ updated: this.changes });
            resolve();
          }
        );
      });
    }

    // DELETE /api/inventory/:id - Delete item
    if (method === "DELETE") {
      return new Promise((resolve, reject) => {
        db.run(
          "DELETE FROM inventory WHERE id=?",
          [id],
          function (err) {
            if (err) {
              res.status(500).json({ error: err.message });
              return reject(err);
            }
            res.json({ deleted: this.changes });
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

