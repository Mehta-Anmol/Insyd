const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

require("./db"); // initialize database

app.use("/api/inventory", require("./routes/inventoryRoutes"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
