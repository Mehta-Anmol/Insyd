const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  name: String,
  sku: String,
  quantity: Number,
  minStock: Number,
});

module.exports = mongoose.model("Inventory", InventorySchema);
