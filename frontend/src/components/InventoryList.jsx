import api from "../api";
import { useEffect, useState } from "react";
import AdjustQuantity from "./AdjustQuantity";
import EditItem from "./EditItem";

function InventoryList() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all, low-stock, in-stock
  const [adjustingItem, setAdjustingItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const loadItems = () => {
    api.get("/inventory").then((res) => setItems(res.data));
  };

  useEffect(() => {
    loadItems();
  }, []);

  const isLowStock = (quantity, minStock) => {
    return parseInt(quantity) < parseInt(minStock);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this material?")) {
      try {
        await api.delete(`/inventory/${id}`);
        loadItems();
      } catch (error) {
        alert("Error deleting item. Please try again.");
      }
    }
  };

  const handleAdjustSuccess = () => {
    setAdjustingItem(null);
    loadItems();
  };

  const handleEditSuccess = () => {
    setEditingItem(null);
    loadItems();
  };

  // Filter items based on search and status
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const lowStock = isLowStock(item.quantity, item.minStock);
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "low-stock" && lowStock) ||
      (filterStatus === "in-stock" && !lowStock);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="inventory-section">
      <h2 className="inventory-title">All Materials</h2>

      {/* Search and Filter */}
      <div className="inventory-controls">
        <div className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder="Search by material name or product code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filterStatus === "all" ? "active" : ""}`}
            onClick={() => setFilterStatus("all")}
          >
            All
          </button>
          <button
            className={`filter-btn ${filterStatus === "low-stock" ? "active" : ""}`}
            onClick={() => setFilterStatus("low-stock")}
          >
            Low Stock
          </button>
          <button
            className={`filter-btn ${filterStatus === "in-stock" ? "active" : ""}`}
            onClick={() => setFilterStatus("in-stock")}
          >
            In Stock
          </button>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="empty-state">
          {items.length === 0
            ? "No materials in inventory yet. Add your first material using the form above."
            : "No materials match your search or filter criteria."}
        </div>
      ) : (
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Material Name</th>
              <th>Product Code (SKU)</th>
              <th>Current Quantity</th>
              <th>Minimum Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => {
              const lowStock = isLowStock(item.quantity, item.minStock);
              const itemId = item.id || item._id;
              return (
                <tr key={itemId}>
                  <td>
                    <strong>{item.name || "N/A"}</strong>
                  </td>
                  <td>{item.sku || "N/A"}</td>
                  <td>{parseInt(item.quantity || 0).toLocaleString()}</td>
                  <td>{parseInt(item.minStock || 0).toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${lowStock ? "low-stock" : "in-stock"}`}>
                      {lowStock ? "⚠ Low Stock" : "✓ In Stock"}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn adjust-btn"
                        onClick={() => setAdjustingItem(item)}
                        title="Adjust Quantity"
                      >
                        Adjust
                      </button>
                      <button
                        className="action-btn edit-btn"
                        onClick={() => setEditingItem(item)}
                        title="Edit Material"
                      >
                        Edit
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(itemId)}
                        title="Delete Material"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Adjust Quantity Modal */}
      {adjustingItem && (
        <AdjustQuantity
          item={adjustingItem}
          onClose={() => setAdjustingItem(null)}
          onSuccess={handleAdjustSuccess}
        />
      )}

      {/* Edit Item Modal */}
      {editingItem && (
        <EditItem
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
}

export default InventoryList;
