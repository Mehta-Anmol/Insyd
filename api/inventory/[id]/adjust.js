const db = require("../../db");

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { method } = req;
  const { id } = req.query;

  try {
    // PATCH /api/inventory/:id/adjust - Adjust quantity
    if (method === "PATCH") {
      const { adjustment } = req.body;

      return new Promise((resolve, reject) => {
        // First get current quantity
        db.get("SELECT quantity FROM inventory WHERE id=?", [id], (err, row) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return reject(err);
          }
          if (!row) {
            res.status(404).json({ error: "Item not found" });
            return reject(new Error("Item not found"));
          }

          const newQuantity = parseInt(row.quantity) + parseInt(adjustment);
          
          if (newQuantity < 0) {
            res.status(400).json({ error: "Quantity cannot be negative" });
            return reject(new Error("Quantity cannot be negative"));
          }

          db.run(
            "UPDATE inventory SET quantity=? WHERE id=?",
            [newQuantity, id],
            function (updateErr) {
              if (updateErr) {
                res.status(500).json({ error: updateErr.message });
                return reject(updateErr);
              }
              res.json({ 
                updated: this.changes,
                newQuantity: newQuantity 
              });
              resolve();
            }
          );
        });
      });
    }

    // Method not allowed
    res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

