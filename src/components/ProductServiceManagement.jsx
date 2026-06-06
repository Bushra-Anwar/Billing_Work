import React, { useState } from 'react';
import { 
  Package, Tags, Barcode, Layers, Box, Settings, DollarSign, 
  Upload, Download, Search, Filter, MoreVertical, Edit, Trash2, 
  ImageIcon, CheckCircle, AlertCircle, TrendingUp, Plus
} from 'lucide-react';
import './ProductServiceManagement.css';

const MOCK_PRODUCTS = [
  {
    id: 'PRD-1001',
    name: 'Samsung Galaxy S24 Ultra',
    sku: 'MOB-SAM-S24U-BLK',
    category: 'Mobile',
    type: 'Physical',
    stock: 45,
    minStock: 10,
    price: 129999,
    status: 'Active',
    image: '📱'
  },
  {
    id: 'PRD-1002',
    name: 'Website Development Package',
    sku: 'SRV-WEB-DEV-01',
    category: 'Software',
    type: 'Service',
    stock: null,
    minStock: null,
    price: 49999,
    status: 'Active',
    image: '💻'
  },
  {
    id: 'PRD-1003',
    name: 'Ergonomic Office Chair',
    sku: 'FUR-OFF-CHR-GRY',
    category: 'Furniture',
    type: 'Physical',
    stock: 2,
    minStock: 5,
    price: 8500,
    status: 'Low Stock',
    image: '💺'
  },
  {
    id: 'PRD-1004',
    name: 'Premium Cloud Hosting (1 Yr)',
    sku: 'SUB-CLD-HST-1Y',
    category: 'Hosting',
    type: 'Subscription',
    stock: null,
    minStock: null,
    price: 12000,
    status: 'Active',
    image: '☁️'
  }
];

export default function ProductServiceManagement({ onBack }) {
  const [activeView, setActiveView] = useState('dashboard'); // dashboard, catalog, add_product, categories, inventory
  const [products] = useState(MOCK_PRODUCTS);

  const renderDashboard = () => (
    <div className="psm-dashboard fade-in">
      <div className="psm-header">
        <div>
          <button className="back-btn" onClick={onBack}>← Back to Home</button>
          <h2 className="psm-title">Products & Services</h2>
          <p className="psm-subtitle">Manage your catalog, inventory, pricing, and services</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => setActiveView('categories')}>
            <Layers size={18} /> Categories
          </button>
          <button className="btn-primary rainbow-bg" onClick={() => setActiveView('add_product')}>
            <Plus size={18} /> Add Product/Service
          </button>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon bg-purple"><Package size={24} /></div>
          <div className="metric-info">
            <h4>Total Products/Services</h4>
            <div className="metric-value">4,821</div>
            <div className="metric-trend positive">+32 this week</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-orange"><AlertCircle size={24} /></div>
          <div className="metric-info">
            <h4>Low Stock Items</h4>
            <div className="metric-value">24</div>
            <div className="metric-trend negative">Requires attention</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-green"><DollarSign size={24} /></div>
          <div className="metric-info">
            <h4>Total Inventory Value</h4>
            <div className="metric-value">₹1.8M</div>
            <div className="metric-trend">Across 3 warehouses</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-blue"><TrendingUp size={24} /></div>
          <div className="metric-info">
            <h4>Top Selling Category</h4>
            <div className="metric-value text-medium">Electronics</div>
            <div className="metric-trend positive">42% of sales</div>
          </div>
        </div>
      </div>

      <div className="psm-section">
        <div className="section-header-row">
          <div className="tabs-simple">
            <button className={`tab-simple ${activeView === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveView('dashboard')}>All Items</button>
            <button className="tab-simple" onClick={() => setActiveView('inventory')}>Stock Tracking</button>
            <button className="tab-simple">Price Lists</button>
          </div>
          <div className="search-filter">
            <div className="search-box">
              <Search size={18} />
              <input type="text" placeholder="Search by name, SKU or barcode..." />
            </div>
            <button className="btn-secondary"><Filter size={18} /> Filter</button>
            <button className="btn-secondary" title="Import/Export"><Upload size={18} /></button>
            <button className="btn-secondary" title="Print Barcodes"><Barcode size={18} /></button>
          </div>
        </div>
        
        <div className="table-container">
          <table className="psm-table">
            <thead>
              <tr>
                <th>Product Info</th>
                <th>SKU / Type</th>
                <th>Category</th>
                <th>Pricing</th>
                <th>Stock Level</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(prod => (
                <tr key={prod.id} className="clickable-row">
                  <td>
                    <div className="product-cell">
                      <div className="product-thumb">{prod.image}</div>
                      <div>
                        <strong>{prod.name}</strong>
                        <span className="sub-text">{prod.id}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="code-cell">
                      <span className="sku-badge">{prod.sku}</span>
                      <span className="type-badge">{prod.type}</span>
                    </div>
                  </td>
                  <td>{prod.category}</td>
                  <td>
                    <strong>₹{prod.price.toLocaleString()}</strong>
                  </td>
                  <td>
                    {prod.type === 'Service' || prod.type === 'Subscription' ? (
                      <span className="sub-text">N/A (Non-inventory)</span>
                    ) : (
                      <div className="stock-cell">
                        <span className={`stock-count ${prod.stock <= prod.minStock ? 'text-orange' : 'text-green'}`}>
                          {prod.stock} in stock
                        </span>
                        {prod.stock <= prod.minStock && <span className="low-stock-warn">Low</span>}
                      </div>
                    )}
                  </td>
                  <td>
                    <span className={`status-badge ${prod.status.toLowerCase().replace(' ', '-')}`}>{prod.status}</span>
                  </td>
                  <td>
                    <button className="action-btn"><MoreVertical size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAddProduct = () => (
    <div className="psm-form-view fade-in">
      <div className="psm-header">
        <div>
          <button className="back-btn" onClick={() => setActiveView('dashboard')}>← Back to Catalog</button>
          <h2 className="psm-title">Add New Item</h2>
          <p className="psm-subtitle">Create a physical product, digital good, service, or bundle</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => setActiveView('dashboard')}>Cancel</button>
          <button className="btn-primary rainbow-bg" onClick={() => setActiveView('dashboard')}>Save Product</button>
        </div>
      </div>

      <div className="form-layout">
        <div className="form-sidebar">
          <button className="form-tab active"><Package size={16}/> Basic Details</button>
          <button className="form-tab"><DollarSign size={16}/> Pricing & Tax</button>
          <button className="form-tab"><Box size={16}/> Inventory & Barcodes</button>
          <button className="form-tab"><Layers size={16}/> Variants & SKUs</button>
          <button className="form-tab"><ImageIcon size={16}/> Images</button>
        </div>

        <div className="form-content">
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="form-grid">
              <div className="input-group full-span">
                <label>Product/Service Name *</label>
                <input type="text" placeholder="e.g. Wireless Noise Cancelling Headphones" />
              </div>
              <div className="input-group">
                <label>Product Type</label>
                <select>
                  <option>Physical Product</option>
                  <option>Digital Product</option>
                  <option>Service</option>
                  <option>Subscription</option>
                  <option>Bundle/Combo</option>
                </select>
              </div>
              <div className="input-group">
                <label>Category</label>
                <select>
                  <option>Select Category...</option>
                  <option>Electronics</option>
                  <option>Software</option>
                  <option>Services</option>
                </select>
              </div>
              <div className="input-group">
                <label>Brand</label>
                <input type="text" placeholder="e.g. Sony" />
              </div>
              <div className="input-group">
                <label>Product Code / HSN</label>
                <input type="text" placeholder="e.g. 85183000" />
              </div>
              <div className="input-group full-span">
                <label>Description</label>
                <textarea rows="4" placeholder="Detailed product description..."></textarea>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Pricing & Tax</h3>
            <div className="form-grid">
              <div className="input-group">
                <label>Selling Price (₹) *</label>
                <input type="number" placeholder="0.00" />
              </div>
              <div className="input-group">
                <label>Cost Price (₹)</label>
                <input type="number" placeholder="0.00" />
              </div>
              <div className="input-group">
                <label>MRP (₹)</label>
                <input type="number" placeholder="0.00" />
              </div>
              <div className="input-group">
                <label>Tax Rate (%)</label>
                <select>
                  <option>GST 18%</option>
                  <option>GST 12%</option>
                  <option>GST 5%</option>
                  <option>Tax Exempt</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Inventory & Barcodes</h3>
            <div className="form-grid">
              <div className="input-group">
                <label>SKU</label>
                <div className="input-with-action">
                  <input type="text" placeholder="Auto-generated if empty" />
                  <button className="inline-btn">Generate</button>
                </div>
              </div>
              <div className="input-group">
                <label>Barcode (EAN/UPC)</label>
                <div className="input-with-action">
                  <input type="text" placeholder="Scan or enter barcode" />
                  <button className="inline-btn"><Barcode size={16}/></button>
                </div>
              </div>
              <div className="input-group">
                <label>Opening Stock</label>
                <input type="number" placeholder="0" />
              </div>
              <div className="input-group">
                <label>Low Stock Alert Limit</label>
                <input type="number" placeholder="5" />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Variants & SKUs</h3>
            <div className="form-grid">
              <div className="input-group full-span">
                <label>Add Variants (e.g., Color, Size)</label>
                <div className="input-with-action">
                  <input type="text" placeholder="e.g., Size" />
                  <input type="text" placeholder="e.g., S, M, L, XL (comma separated)" />
                  <button className="inline-btn">Add Option</button>
                </div>
              </div>
              <div className="input-group full-span">
                <table className="psm-table">
                  <thead>
                    <tr>
                      <th>Variant</th>
                      <th>SKU</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Black / M</td>
                      <td><input type="text" defaultValue="TS-BLK-M" style={{width: '120px', padding: '0.4rem'}}/></td>
                      <td><input type="number" defaultValue="499" style={{width: '100px', padding: '0.4rem'}}/></td>
                      <td><input type="number" defaultValue="50" style={{width: '80px', padding: '0.4rem'}}/></td>
                      <td><button className="action-btn"><Trash2 size={16}/></button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Product Images</h3>
            <div className="form-grid">
              <div className="input-group full-span">
                <div className="image-upload-area">
                  <Upload size={32} />
                  <p>Drag and drop images here or click to browse</p>
                  <span className="sub-text">Supported formats: JPG, PNG, WEBP (Max 5MB)</span>
                  <button className="btn-secondary" style={{marginTop: '1rem'}}>Select Files</button>
                </div>
              </div>
              <div className="input-group full-span">
                <div className="image-gallery">
                  <div className="gallery-item primary">
                    <div className="img-placeholder">📱</div>
                    <span className="badge">Primary</span>
                    <button className="remove-img"><Trash2 size={14}/></button>
                  </div>
                  <div className="gallery-item">
                    <div className="img-placeholder">📱 (Side)</div>
                    <button className="remove-img"><Trash2 size={14}/></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCategories = () => (
    <div className="psm-categories-view fade-in">
       <div className="psm-header">
        <div>
          <button className="back-btn" onClick={() => setActiveView('dashboard')}>← Back to Catalog</button>
          <h2 className="psm-title">Categories</h2>
          <p className="psm-subtitle">Manage product hierarchy and grouping</p>
        </div>
        <button className="btn-primary rainbow-bg"><Plus size={18} /> Add Category</button>
      </div>
      
      <div className="categories-layout">
        <div className="category-tree">
          <h3>Category Hierarchy</h3>
          <ul className="tree-list">
            <li className="tree-item expanded">
              <div className="tree-node">
                <span className="toggle-icon">▼</span>
                <span className="folder-icon">📂</span> Electronics
              </div>
              <ul className="tree-sublist">
                <li className="tree-item">
                  <div className="tree-node selected">
                    <span className="folder-icon">📁</span> Mobile Phones
                  </div>
                </li>
                <li className="tree-item">
                  <div className="tree-node">
                    <span className="folder-icon">📁</span> Laptops
                  </div>
                </li>
              </ul>
            </li>
            <li className="tree-item">
              <div className="tree-node">
                <span className="toggle-icon">▶</span>
                <span className="folder-icon">📁</span> Clothing & Apparel
              </div>
            </li>
            <li className="tree-item">
              <div className="tree-node">
                <span className="toggle-icon">▶</span>
                <span className="folder-icon">📁</span> Software Services
              </div>
            </li>
          </ul>
        </div>
        
        <div className="category-details form-section">
          <div className="section-header-row">
            <h3>Edit Category: Mobile Phones</h3>
            <button className="btn-danger"><Trash2 size={14}/> Delete</button>
          </div>
          <div className="form-grid">
            <div className="input-group">
              <label>Category Name</label>
              <input type="text" defaultValue="Mobile Phones" />
            </div>
            <div className="input-group">
              <label>Category Code</label>
              <input type="text" defaultValue="CAT-ELEC-MOB" />
            </div>
            <div className="input-group">
              <label>Parent Category</label>
              <select defaultValue="Electronics">
                <option>None (Root)</option>
                <option>Electronics</option>
                <option>Clothing & Apparel</option>
              </select>
            </div>
            <div className="input-group">
              <label>Status</label>
              <select defaultValue="Active">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="input-group full-span">
              <button className="btn-primary">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInventory = () => (
    <div className="psm-inventory-view fade-in">
      <div className="psm-header">
        <div>
          <button className="back-btn" onClick={() => setActiveView('dashboard')}>← Back to Catalog</button>
          <h2 className="psm-title">Stock Tracking & Ledger</h2>
          <p className="psm-subtitle">Real-time inventory movements, adjustments, and audit logs</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">Warehouse Transfer</button>
          <button className="btn-primary rainbow-bg"><Plus size={18} /> Stock Adjustment</button>
        </div>
      </div>
      
      <div className="table-container">
        <table className="psm-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Product</th>
              <th>Transaction</th>
              <th>Qty In</th>
              <th>Qty Out</th>
              <th>Balance</th>
              <th>Reference</th>
            </tr>
          </thead>
          <tbody>
            <tr className="clickable-row">
              <td>Jan 03, 2026</td>
              <td>
                <strong>Samsung Galaxy S24 Ultra</strong>
                <span className="sub-text">MOB-SAM-S24U-BLK</span>
              </td>
              <td><span className="type-badge">Sale</span></td>
              <td>0</td>
              <td><span className="text-orange">2</span></td>
              <td><strong>45</strong></td>
              <td>INV-2026-001</td>
            </tr>
            <tr className="clickable-row">
              <td>Jan 01, 2026</td>
              <td>
                <strong>Samsung Galaxy S24 Ultra</strong>
                <span className="sub-text">MOB-SAM-S24U-BLK</span>
              </td>
              <td><span className="type-badge">Purchase</span></td>
              <td><span className="text-green">47</span></td>
              <td>0</td>
              <td><strong>47</strong></td>
              <td>PO-2025-099</td>
            </tr>
            <tr className="clickable-row">
              <td>Dec 28, 2025</td>
              <td>
                <strong>Ergonomic Office Chair</strong>
                <span className="sub-text">FUR-OFF-CHR-GRY</span>
              </td>
              <td><span className="type-badge" style={{background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444'}}>Damage</span></td>
              <td>0</td>
              <td><span className="text-orange">1</span></td>
              <td><strong>2</strong></td>
              <td>ADJ-2025-042</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="product-management-wrapper">
      {activeView === 'dashboard' && renderDashboard()}
      {activeView === 'add_product' && renderAddProduct()}
      {activeView === 'categories' && renderCategories()}
      {activeView === 'inventory' && renderInventory()}
    </div>
  );
}
