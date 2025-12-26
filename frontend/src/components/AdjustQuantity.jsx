import api from "../api";
import { useState } from "react";

function AdjustQuantity({ item, onClose, onSuccess }) {
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("reduce"); // "add" or "reduce"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!quantity || parseInt(quantity) <= 0) {
      setError("Please enter a valid quantity");
      return;
    }

    const adjustment = type === "reduce" ? -parseInt(quantity) : parseInt(quantity);
    const currentQty = parseInt(item.quantity || 0);
    
    if (type === "reduce" && adjustment + currentQty < 0) {
      setError(`Cannot reduce more than current quantity (${currentQty})`);
      return;
    }

    setLoading(true);
    try {
      await api.patch(`/inventory/${item.id || item._id}/adjust`, {
        adjustment: adjustment,
      });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || "Error adjusting quantity. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Adjust Quantity</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="item-info">
            <strong>{item.name}</strong>
            <span className="current-qty">Current: {parseInt(item.quantity || 0).toLocaleString()} units</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Action</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="type"
                    value="add"
                    checked={type === "add"}
                    onChange={(e) => setType(e.target.value)}
                  />
                  <span>Add Stock (Restock)</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="type"
                    value="reduce"
                    checked={type === "reduce"}
                    onChange={(e) => setType(e.target.value)}
                  />
                  <span>Reduce Stock (Use/Sell)</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Quantity *</label>
              <div className="form-helper">
                {type === "reduce"
                  ? "How many units are being used or sold?"
                  : "How many units are being added?"}
              </div>
              <input
                className={`form-input ${error ? "error" : ""}`}
                type="number"
                min="1"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                  setError("");
                }}
                autoFocus
              />
              {error && <div className="error-message">{error}</div>}
            </div>

            {type === "reduce" && quantity && (
              <div className="preview-info">
                New quantity will be:{" "}
                <strong>
                  {Math.max(0, parseInt(item.quantity || 0) - parseInt(quantity)).toLocaleString()} units
                </strong>
              </div>
            )}

            {type === "add" && quantity && (
              <div className="preview-info">
                New quantity will be:{" "}
                <strong>
                  {(parseInt(item.quantity || 0) + parseInt(quantity)).toLocaleString()} units
                </strong>
              </div>
            )}

            <div className="modal-actions">
              <button type="button" className="form-button secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="form-button" disabled={loading}>
                {loading ? "Processing..." : type === "reduce" ? "Reduce Stock" : "Add Stock"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdjustQuantity;

