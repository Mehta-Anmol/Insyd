const db = require("../db");

// Get all items
const getAllItems = (req, res) => {
  db.all("SELECT * FROM inventory", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

// Add item
const addItem = (req, res) => {
  const { name, sku, quantity, minStock } = req.body;

  db.run(
    "INSERT INTO inventory (name, sku, quantity, minStock) VALUES (?, ?, ?, ?)",
    [name, sku, quantity, minStock],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    }
  );
};

// Update item
const updateItem = (req, res) => {
  const { name, sku, quantity, minStock } = req.body;

  db.run(
    "UPDATE inventory SET name=?, sku=?, quantity=?, minStock=? WHERE id=?",
    [name, sku, quantity, minStock, req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ updated: this.changes });
    }
  );
};

// Delete item
const deleteItem = (req, res) => {
  db.run(
    "DELETE FROM inventory WHERE id=?",
    [req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ deleted: this.changes });
    }
  );
};

// Adjust quantity (add or subtract from current quantity)
const adjustQuantity = (req, res) => {
  const { adjustment } = req.body; // positive to add, negative to subtract

  // First get current quantity
  db.get("SELECT quantity FROM inventory WHERE id=?", [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: "Item not found" });
    }

    const newQuantity = parseInt(row.quantity) + parseInt(adjustment);
    
    if (newQuantity < 0) {
      return res.status(400).json({ error: "Quantity cannot be negative" });
    }

    db.run(
      "UPDATE inventory SET quantity=? WHERE id=?",
      [newQuantity, req.params.id],
      function (updateErr) {
        if (updateErr) {
          return res.status(500).json({ error: updateErr.message });
        }
        res.json({ 
          updated: this.changes,
          newQuantity: newQuantity 
        });
      }
    );
  });
};

module.exports = {
  getAllItems,
  addItem,
  updateItem,
  deleteItem,
  adjustQuantity,
};
