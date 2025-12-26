import { useEffect, useState } from "react";
import api from "../api";

function Dashboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/inventory").then((res) => {
      setItems(res.data);
    });
  }, []);

  const totalItems = items.length;
  const totalStock = items.reduce((sum, item) => sum + parseInt(item.quantity) || 0, 0);
  const lowStockCount = items.filter(
    (item) => parseInt(item.quantity) < parseInt(item.minStock)
  ).length;

  return (
    <div className="dashboard-section">
      <h2 className="dashboard-title">Dashboard Overview</h2>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="card-label">Total Materials</div>
          <div className="card-value normal">{totalItems}</div>
          <div className="card-description">
            Number of different materials in inventory
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-label">Total Stock Quantity</div>
          <div className="card-value normal">{totalStock.toLocaleString()}</div>
          <div className="card-description">
            Sum of all material quantities available
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-label">Low Stock Items</div>
          <div className={`card-value ${lowStockCount > 0 ? "low-stock" : "normal"}`}>
            {lowStockCount}
          </div>
          <div className="card-description">
            Materials that need reordering soon
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
