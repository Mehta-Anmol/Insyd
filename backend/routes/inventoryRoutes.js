const express = require("express");
const router = express.Router();
const {
  getAllItems,
  addItem,
  updateItem,
  deleteItem,
  adjustQuantity,
} = require("../controllers/inventoryController");

router.get("/", getAllItems);
router.post("/", addItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);
router.patch("/:id/adjust", adjustQuantity);

module.exports = router;
