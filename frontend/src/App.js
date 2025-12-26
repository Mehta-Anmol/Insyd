import Dashboard from "./components/Dashboard";
import AddItem from "./components/AddItem";
import InventoryList from "./components/InventoryList";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Material Inventory Management</h1>
        <p className="app-description">
          Track and manage construction materials, supplies, and stock levels
        </p>
      </header>

      <Dashboard />
      <AddItem />
      <InventoryList />
    </div>
  );
}

export default App;
