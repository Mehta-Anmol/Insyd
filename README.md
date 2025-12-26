# Material Inventory Management System

A simple, user-friendly inventory management system designed specifically for Indian material businesses in the Architecture, Engineering, and Construction (AEC) industry.

##  Problem Statement

Most Indian material businesses struggle with poor visibility over their inventory levels. This leads to:
- **Low net margins** due to dead inventory, poor-performing SKUs, and damaged stock
- **Low confidence** in scaling operations
- **Inefficient stock management** causing operational delays

This system provides a simple solution to track, manage, and monitor construction materials and supplies in real-time.

##  Features

### Core Functionality
-  **Add Materials** - Register new materials with name, SKU, quantity, and minimum stock levels
-  **View Inventory** - See all materials in a clear, organized table format
-  **Adjust Stock** - Quickly add or reduce stock quantities (for restocking or usage)
-  **Edit Materials** - Update material details (name, SKU, quantity, minimum stock)
-  **Delete Materials** - Remove materials from inventory with confirmation
-  **Dashboard Overview** - Quick summary of total items, total stock, and low stock alerts
-  **Search & Filter** - Find materials quickly by name or SKU, filter by stock status
-  **Low Stock Alerts** - Visual indicators when materials fall below minimum stock levels

### User Experience
-  **Simple & Intuitive** - Designed for non-technical users
-  **Touch-Friendly** - Large buttons and clear labels for site environments
-  **Professional Design** - Clean, modern UI suitable for construction businesses
-  **Fast & Responsive** - Quick actions for busy site supervisors

## 🛠️ Tech Stack

### Frontend
- **React 19.2.3** - UI library
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling (no heavy frameworks)

### Backend
- **Node.js** - Runtime environment
- **Express 5.2.1** - Web framework
- **SQLite3** - Lightweight database
- **CORS** - Cross-origin resource sharing

##  Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) - Package manager
- A modern web browser (Chrome, Firefox, Edge, Safari)

##  Installation

### Step 1: Clone or Download the Project
```bash
# If using git
git clone <repository-url>
cd Insyd

# Or simply navigate to the project folder if you already have it
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

This will install all required packages:
- express
- cors
- sqlite3
- mongoose (not actively used, but in dependencies)

### Step 3: Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

This will install all required packages:
- react
- react-dom
- axios
- react-scripts

## Running the Project

The project consists of two separate servers that need to run simultaneously.

### Option 1: Run in Separate Terminals (Recommended)

#### Terminal 1 - Backend Server
```bash
cd backend
npm start
```

You should see:
```
Connected to SQLite database
Server running on port 5000
```

#### Terminal 2 - Frontend Server
```bash
cd frontend
npm start
```

The React app will automatically open in your browser at `http://localhost:3000`

### Option 2: Run Both in Background (Development)

You can run both servers in the background, but it's recommended to use separate terminals to see logs from both servers.

## Project Structure

```
Insyd/
├── backend/
│   ├── controllers/
│   │   └── inventoryController.js    # Business logic for inventory operations
│   ├── routes/
│   │   └── inventoryRoutes.js        # API route definitions
│   ├── models/
│   │   └── Inventory.js              # Data model (Mongoose schema - not actively used)
│   ├── db.js                         # SQLite database connection and setup
│   ├── server.js                     # Express server entry point
│   ├── inventory.db                  # SQLite database file (auto-created)
│   └── package.json                  # Backend dependencies
│
├── frontend/
│   ├── public/
│   │   └── index.html                # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx         # Dashboard overview component
│   │   │   ├── AddItem.jsx           # Add new material form
│   │   │   ├── InventoryList.jsx     # Main inventory table with search/filter
│   │   │   ├── AdjustQuantity.jsx    # Modal for adjusting stock
│   │   │   └── EditItem.jsx          # Modal for editing materials
│   │   ├── App.js                    # Main React component
│   │   ├── App.css                   # Application styles
│   │   ├── api.js                    # API configuration (axios setup)
│   │   ├── index.js                  # React entry point
│   │   └── index.css                 # Global styles
│   └── package.json                  # Frontend dependencies
│
└── README.md                         # This file
```

## 🔌 API Endpoints

All API endpoints are prefixed with `/api/inventory`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/inventory` | Get all inventory items | - |
| POST | `/api/inventory` | Add a new item | `{ name, sku, quantity, minStock }` |
| PUT | `/api/inventory/:id` | Update an item | `{ name, sku, quantity, minStock }` |
| DELETE | `/api/inventory/:id` | Delete an item | - |
| PATCH | `/api/inventory/:id/adjust` | Adjust quantity (add/subtract) | `{ adjustment: number }` |

### Example API Calls

**Add Item:**
```javascript
POST http://localhost:5000/api/inventory
Body: {
  "name": "Portland Cement",
  "sku": "CEM-001",
  "quantity": 100,
  "minStock": 20
}
```

**Adjust Quantity (Reduce by 10):**
```javascript
PATCH http://localhost:5000/api/inventory/1/adjust
Body: {
  "adjustment": -10
}
```

## Components Overview

### Dashboard Component
- Displays summary cards:
  - Total Materials count
  - Total Stock Quantity
  - Low Stock Items count
- Auto-refreshes when inventory changes

### AddItem Component
- Form to add new materials
- Fields: Material Name, SKU, Current Quantity, Minimum Stock
- Includes validation and helper text
- Success message on completion

### InventoryList Component
- Main inventory table with all materials
- Search functionality (by name or SKU)
- Filter by status (All, Low Stock, In Stock)
- Action buttons: Adjust, Edit, Delete
- Opens modals for Adjust and Edit operations

### AdjustQuantity Component (Modal)
- Quick stock adjustment interface
- Options: Add Stock (restock) or Reduce Stock (usage/sale)
- Shows preview of new quantity
- Validates against negative quantities

### EditItem Component (Modal)
- Edit material details
- All fields editable: name, SKU, quantity, minimum stock
- Form validation included

## Usage Guide

### Adding a New Material
1. Scroll to the "Add New Material" section
2. Fill in all required fields:
   - **Material Name**: e.g., "Portland Cement"
   - **Product Code (SKU)**: e.g., "CEM-001"
   - **Current Quantity**: Number of units available
   - **Minimum Stock**: Alert threshold (when to reorder)
3. Click "Add Material"
4. The material will appear in the inventory list

### Adjusting Stock Quantity
1. Find the material in the inventory table
2. Click the **"Adjust"** button
3. Choose action:
   - **Add Stock**: For restocking (enter positive number)
   - **Reduce Stock**: For usage/sales (enter positive number, system subtracts)
4. Enter the quantity
5. Review the preview showing new quantity
6. Click "Add Stock" or "Reduce Stock"

### Editing a Material
1. Find the material in the inventory table
2. Click the **"Edit"** button
3. Modify any fields (name, SKU, quantity, minimum stock)
4. Click "Save Changes"

### Deleting a Material
1. Find the material in the inventory table
2. Click the **"Delete"** button
3. Confirm deletion in the popup
4. Material will be removed from inventory

### Searching and Filtering
- **Search**: Type in the search box to filter by material name or SKU
- **Filter Buttons**: Click "All", "Low Stock", or "In Stock" to filter by status

## Design Philosophy

This system is designed with the following principles:
- **Simplicity First**: No complex interactions or hidden features
- **Clarity**: Large, readable fonts and clear labels
- **Accessibility**: Touch-friendly buttons for site environments
- **Non-Technical Friendly**: Plain language, no jargon
- **Professional**: Clean, modern UI suitable for business use

## Configuration

### Backend Port
Default: `5000`
- Change in `backend/server.js` (line 12)

### Frontend Port
Default: `3000`
- React will automatically use the next available port if 3000 is busy
- Change by setting `PORT` environment variable

### API Base URL
Default: `http://localhost:5000/api`
- Change in `frontend/src/api.js` (line 4)

## Troubleshooting

### Backend won't start
- Check if port 5000 is already in use
- Ensure all dependencies are installed (`npm install` in backend folder)
- Check Node.js version (should be v14+)

### Frontend won't start
- Check if port 3000 is already in use
- Ensure all dependencies are installed (`npm install` in frontend folder)
- Clear browser cache if seeing old version

### API calls failing
- Ensure backend server is running on port 5000
- Check browser console for CORS errors
- Verify API base URL in `frontend/src/api.js`

### Database issues
- The SQLite database (`inventory.db`) is auto-created
- If corrupted, delete `backend/inventory.db` and restart the server
- Database will be recreated automatically

## Notes

- The database file (`inventory.db`) is stored in the `backend` folder
- All data persists between server restarts
- The system uses SQLite, so no separate database server is needed
- The frontend auto-refreshes when you add items (page reload)

##  Future Enhancements

Potential features for future versions:
- Export inventory to Excel/CSV
- Transaction history/logs
- Barcode scanning support
- Multi-user authentication
- Multiple warehouse/location support
- Email alerts for low stock
- Reports and analytics


## Target Users

- Material vendors
- Site supervisors
- Procurement managers
- Construction business owners

---

**Built with Love for Indian material businesses**

