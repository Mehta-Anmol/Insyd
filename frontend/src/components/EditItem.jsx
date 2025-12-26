import api from "../api";
import { useState } from "react";

function EditItem({ item, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: item.name || "",
    sku: item.sku || "",
    quantity: item.quantity || "",
    minStock: item.minStock || "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Material name is required";
    }

    if (!formData.sku.trim()) {
      newErrors.sku = "Product code is required";
    }

    if (!formData.quantity || parseInt(formData.quantity) < 0) {
      newErrors.quantity = "Please enter a valid quantity (0 or more)";
    }

    if (!formData.minStock || parseInt(formData.minStock) < 0) {
      newErrors.minStock = "Please enter a valid minimum stock level (0 or more)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      await api.put(`/inventory/${item.id || item._id}`, {
        name: formData.name.trim(),
        sku: formData.sku.trim(),
        quantity: parseInt(formData.quantity),
        minStock: parseInt(formData.minStock),
      });
      onSuccess();
    } catch (error) {
      alert("Error updating material. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Edit Material</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Material Name *</label>
              <input
                className={`form-input ${errors.name ? "error" : ""}`}
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                autoFocus
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Product Code (SKU) *</label>
              <input
                className={`form-input ${errors.sku ? "error" : ""}`}
                type="text"
                value={formData.sku}
                onChange={(e) => handleChange("sku", e.target.value)}
              />
              {errors.sku && <div className="error-message">{errors.sku}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Current Quantity *</label>
              <input
                className={`form-input ${errors.quantity ? "error" : ""}`}
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e) => handleChange("quantity", e.target.value)}
              />
              {errors.quantity && <div className="error-message">{errors.quantity}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Minimum Stock Level *</label>
              <input
                className={`form-input ${errors.minStock ? "error" : ""}`}
                type="number"
                min="0"
                value={formData.minStock}
                onChange={(e) => handleChange("minStock", e.target.value)}
              />
              {errors.minStock && <div className="error-message">{errors.minStock}</div>}
            </div>

            <div className="modal-actions">
              <button type="button" className="form-button secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="form-button" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditItem;

