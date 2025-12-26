import api from "../api";
import { useState } from "react";

function AddItem() {
  const [item, setItem] = useState({
    name: "",
    sku: "",
    quantity: "",
    minStock: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    
    if (!item.name.trim()) {
      newErrors.name = "Material name is required";
    }
    
    if (!item.sku.trim()) {
      newErrors.sku = "Product code is required";
    }
    
    if (!item.quantity || parseInt(item.quantity) < 0) {
      newErrors.quantity = "Please enter a valid quantity (0 or more)";
    }
    
    if (!item.minStock || parseInt(item.minStock) < 0) {
      newErrors.minStock = "Please enter a valid minimum stock level (0 or more)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async () => {
    if (!validate()) {
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      await api.post("/inventory", {
        name: item.name.trim(),
        sku: item.sku.trim(),
        quantity: parseInt(item.quantity),
        minStock: parseInt(item.minStock),
      });

      // Reset form
      setItem({
        name: "",
        sku: "",
        quantity: "",
        minStock: "",
      });
      setErrors({});
      setSuccess(true);

      // Refresh page after 1 second to show updated inventory
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      alert("Error adding item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-section">
      <h2 className="form-title">Add New Material</h2>
      
      <div className="form-group">
        <label className="form-label">Material Name *</label>
        <input
          className={`form-input ${errors.name ? "error" : ""}`}
          type="text"
          placeholder="e.g., Cement, Steel Rods, Bricks"
          value={item.name}
          onChange={(e) => {
            setItem({ ...item, name: e.target.value });
            if (errors.name) setErrors({ ...errors, name: "" });
          }}
        />
        {errors.name && <div className="error-message">{errors.name}</div>}
      </div>

      <div className="form-group">
        <label className="form-label">Product Code (SKU) *</label>
        <div className="form-helper">
          SKU = Stock Keeping Unit - A unique code to identify this material
        </div>
        <input
          className={`form-input ${errors.sku ? "error" : ""}`}
          type="text"
          placeholder="e.g., CEM-001, STEEL-50MM"
          value={item.sku}
          onChange={(e) => {
            setItem({ ...item, sku: e.target.value });
            if (errors.sku) setErrors({ ...errors, sku: "" });
          }}
        />
        {errors.sku && <div className="error-message">{errors.sku}</div>}
      </div>

      <div className="form-group">
        <label className="form-label">Current Quantity *</label>
        <div className="form-helper">
          How many units of this material are available right now
        </div>
        <input
          className={`form-input ${errors.quantity ? "error" : ""}`}
          type="number"
          min="0"
          placeholder="e.g., 100"
          value={item.quantity}
          onChange={(e) => {
            setItem({ ...item, quantity: e.target.value });
            if (errors.quantity) setErrors({ ...errors, quantity: "" });
          }}
        />
        {errors.quantity && <div className="error-message">{errors.quantity}</div>}
      </div>

      <div className="form-group">
        <label className="form-label">Minimum Stock Level *</label>
        <div className="form-helper">
          When quantity falls below this number, you will be alerted to reorder
        </div>
        <input
          className={`form-input ${errors.minStock ? "error" : ""}`}
          type="number"
          min="0"
          placeholder="e.g., 20"
          value={item.minStock}
          onChange={(e) => {
            setItem({ ...item, minStock: e.target.value });
            if (errors.minStock) setErrors({ ...errors, minStock: "" });
          }}
        />
        {errors.minStock && <div className="error-message">{errors.minStock}</div>}
      </div>

      <button
        className="form-button"
        onClick={submit}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Material"}
      </button>

      {success && (
        <div className="success-message">
          ✓ Material added successfully! Page will refresh shortly.
        </div>
      )}
    </div>
  );
}

export default AddItem;
