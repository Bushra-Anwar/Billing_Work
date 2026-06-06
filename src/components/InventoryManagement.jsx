import React, { useState } from 'react';
import { 
  Box, TrendingUp, AlertTriangle, Package, ShoppingCart, 
  Users, MapPin, Activity, Calendar, Hash, Truck, ArrowRight, ArrowLeft
} from 'lucide-react';
import './InventoryManagement.css';

export default function InventoryManagement({ onBack }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderDashboard = () => (
    <div className="im-view fade-in">
      <div className="im-header">
        <div>
          <button className="back-btn" onClick={onBack}>← Back to Home</button>
          <h2 className="im-title">Inventory Dashboard</h2>
          <p className="im-subtitle">Overview of stock, valuation, and alerts</p>
        </div>
      </div>
      
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon bg-blue"><Box size={24} /></div>
          <div className="metric-info">
            <h4>Total Products</h4>
            <div className="metric-value">1,245</div>
            <div className="metric-trend positive">Across 3 categories</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-green"><TrendingUp size={24} /></div>
          <div className="metric-info">
            <h4>Inventory Value</h4>
            <div className="metric-value">₹24.5M</div>
            <div className="metric-trend positive">FIFO Method</div>
          </div>
        </div>
        <div className="metric-card alert-card">
          <div className="metric-icon"><AlertTriangle size={24} /></div>
          <div className="metric-info">
            <h4>Low Stock Alerts</h4>
            <div className="metric-value text-orange">12 Items</div>
            <div className="metric-trend negative">Requires reorder</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-purple"><ShoppingCart size={24} /></div>
          <div className="metric-info">
            <h4>Pending Purchases</h4>
            <div className="metric-value">5 Orders</div>
            <div className="metric-trend">Expected this week</div>
          </div>
        </div>
      </div>

      <div className="grid-3">
        <div className="im-section" style={{ gridColumn: 'span 2' }}>
          <h3>Low Stock Alerts</h3>
          <p className="sub-text">Products below minimum reorder point</p>
          <table className="im-table" style={{ marginTop: '1rem' }}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Current Stock</th>
                <th>Min Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Wireless Earbuds X1</strong></td>
                <td className="text-orange"><strong>8</strong></td>
                <td>20</td>
                <td><button className="btn-secondary" style={{padding:'0.2rem 0.5rem'}}>Reorder</button></td>
              </tr>
              <tr>
                <td><strong>USB-C Cable 2m</strong></td>
                <td className="text-orange"><strong>12</strong></td>
                <td>50</td>
                <td><button className="btn-secondary" style={{padding:'0.2rem 0.5rem'}}>Reorder</button></td>
              </tr>
              <tr>
                <td><strong>Gaming Mouse Pro</strong></td>
                <td style={{color: '#ef4444'}}><strong>0</strong> (Out)</td>
                <td>15</td>
                <td><button className="btn-secondary" style={{padding:'0.2rem 0.5rem'}}>Reorder</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="im-section">
          <h3>Inventory Valuation</h3>
          <p className="sub-text">By Warehouse</p>
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
              <span>Main Warehouse</span>
              <strong>₹15.2M</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
              <span>Retail Store 1</span>
              <strong>₹5.8M</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
              <span>Transit</span>
              <strong>₹3.5M</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStockMovement = () => (
    <div className="im-view fade-in">
      <div className="im-header">
        <div>
          <h2 className="im-title">Stock Movement</h2>
          <p className="im-subtitle">Track Stock In, Stock Out, and complete inventory ledger</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary"><ArrowRight size={16}/> Stock Out</button>
          <button className="btn-primary rainbow-bg"><ArrowLeft size={16}/> Stock In</button>
        </div>
      </div>

      <div className="stock-movement-flow">
        <div className="flow-step">
          <div className="flow-icon"><ShoppingCart size={24} /></div>
          <strong>Stock In</strong>
          <span className="sub-text">Purchases, Returns</span>
        </div>
        <div className="flow-arrow">→</div>
        <div className="flow-step active">
          <div className="flow-icon"><Box size={24} /></div>
          <strong>Available Inventory</strong>
          <span className="sub-text">Ready for Sale/Use</span>
        </div>
        <div className="flow-arrow">→</div>
        <div className="flow-step">
          <div className="flow-icon"><Package size={24} /></div>
          <strong>Stock Out</strong>
          <span className="sub-text">Sales, Damage</span>
        </div>
      </div>

      <div className="im-section">
        <h3>Inventory Ledger</h3>
        <table className="im-table" style={{ marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Source</th>
              <th>Qty In</th>
              <th>Qty Out</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>03-Jan-2026</td>
              <td><span className="status-badge approved">Return</span></td>
              <td>Customer Return (INV-001)</td>
              <td style={{color:'#10b981'}}>+5</td>
              <td>0</td>
              <td><strong>85</strong></td>
            </tr>
            <tr>
              <td>02-Jan-2026</td>
              <td><span className="status-badge cancelled">Sale</span></td>
              <td>Sales (INV-001)</td>
              <td>0</td>
              <td style={{color:'#ef4444'}}>-20</td>
              <td><strong>80</strong></td>
            </tr>
            <tr>
              <td>01-Jan-2026</td>
              <td><span className="status-badge approved">Purchase</span></td>
              <td>Purchase Order (PO-999)</td>
              <td style={{color:'#10b981'}}>+100</td>
              <td>0</td>
              <td><strong>100</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPurchases = () => (
    <div className="im-view fade-in">
      <div className="im-header">
        <div>
          <h2 className="im-title">Purchase Management</h2>
          <p className="im-subtitle">Manage POs, goods receipt, and supplier invoices</p>
        </div>
        <button className="btn-primary rainbow-bg">Create PO</button>
      </div>

      <div className="im-section">
        <table className="im-table">
          <thead>
            <tr>
              <th>PO Number</th>
              <th>Date</th>
              <th>Supplier</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>PO-2026-001</strong></td>
              <td>02-Jan-2026</td>
              <td>Techtronics Inc.</td>
              <td>₹45,000</td>
              <td><span className="status-badge pending">Pending Approval</span></td>
              <td><button className="btn-secondary" style={{padding:'0.2rem 0.5rem'}}>Review</button></td>
            </tr>
            <tr>
              <td><strong>PO-2025-142</strong></td>
              <td>28-Dec-2025</td>
              <td>Global Supply Co.</td>
              <td>₹120,500</td>
              <td><span className="status-badge approved">Partially Received</span></td>
              <td><button className="btn-secondary" style={{padding:'0.2rem 0.5rem'}}>Receive</button></td>
            </tr>
            <tr>
              <td><strong>PO-2025-140</strong></td>
              <td>20-Dec-2025</td>
              <td>Office Essentials</td>
              <td>₹12,400</td>
              <td><span className="status-badge approved">Closed</span></td>
              <td><button className="btn-secondary" style={{padding:'0.2rem 0.5rem'}}>View</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSuppliers = () => (
    <div className="im-view fade-in">
       <div className="im-header">
        <div>
          <h2 className="im-title">Supplier Management</h2>
          <p className="im-subtitle">Maintain supplier profiles and procurement history</p>
        </div>
        <button className="btn-primary rainbow-bg">Add Supplier</button>
      </div>
      
      <div className="grid-3">
        <div className="im-section">
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'1rem'}}>
            <h3>Techtronics Inc.</h3>
            <span className="status-badge approved">Active</span>
          </div>
          <p className="sub-text">Code: SUP-001</p>
          <div style={{marginTop:'1rem', fontSize:'0.9rem', display:'flex', flexDirection:'column', gap:'0.5rem'}}>
            <div><strong>Contact:</strong> John Smith</div>
            <div><strong>Email:</strong> john@techtronics.com</div>
            <div><strong>Credit Limit:</strong> ₹500,000</div>
            <div><strong>Performance:</strong> 98% On-Time</div>
          </div>
        </div>
        <div className="im-section">
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'1rem'}}>
            <h3>Global Supply Co.</h3>
            <span className="status-badge approved">Active</span>
          </div>
          <p className="sub-text">Code: SUP-002</p>
          <div style={{marginTop:'1rem', fontSize:'0.9rem', display:'flex', flexDirection:'column', gap:'0.5rem'}}>
            <div><strong>Contact:</strong> Sarah Lee</div>
            <div><strong>Email:</strong> sales@globalsupply.com</div>
            <div><strong>Credit Limit:</strong> ₹1,000,000</div>
            <div><strong>Performance:</strong> 92% On-Time</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWarehouse = () => (
    <div className="im-view fade-in">
      <div className="im-header">
        <div>
          <h2 className="im-title">Warehouse Management</h2>
          <p className="im-subtitle">Manage inventory across multiple locations and transfers</p>
        </div>
        <button className="btn-primary rainbow-bg">Transfer Stock</button>
      </div>

      <div className="grid-3">
        <div className="im-section">
          <h3>Main Warehouse</h3>
          <p className="sub-text">Code: WH-MAIN</p>
          <div style={{marginTop:'1rem'}}>
            <div style={{display:'flex', justifyContent:'space-between', padding:'0.5rem 0'}}>
              <span>Total Items:</span>
              <strong>12,450</strong>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', padding:'0.5rem 0'}}>
              <span>Manager:</span>
              <strong>David Chen</strong>
            </div>
            <button className="btn-secondary" style={{width:'100%', marginTop:'1rem'}}>View Stock</button>
          </div>
        </div>
        <div className="im-section">
          <h3>Retail Store 1</h3>
          <p className="sub-text">Code: WH-RET-1</p>
          <div style={{marginTop:'1rem'}}>
            <div style={{display:'flex', justifyContent:'space-between', padding:'0.5rem 0'}}>
              <span>Total Items:</span>
              <strong>3,200</strong>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', padding:'0.5rem 0'}}>
              <span>Manager:</span>
              <strong>Emily White</strong>
            </div>
            <button className="btn-secondary" style={{width:'100%', marginTop:'1rem'}}>View Stock</button>
          </div>
        </div>
      </div>

      <div className="im-section">
        <h3>Recent Transfers</h3>
        <table className="im-table" style={{marginTop:'1rem'}}>
          <thead>
            <tr>
              <th>ID</th>
              <th>From</th>
              <th>To</th>
              <th>Items</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>TRF-102</td>
              <td>Main Warehouse</td>
              <td>Retail Store 1</td>
              <td>50 (Product X)</td>
              <td><span className="status-badge pending">In Transit</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTracking = () => (
    <div className="im-view fade-in">
      <div className="im-header">
        <div>
          <h2 className="im-title">Batch & Serial Tracking</h2>
          <p className="im-subtitle">Trace products by batch expiry or unique serial numbers</p>
        </div>
      </div>

      <div className="grid-3">
        <div className="im-section" style={{gridColumn: 'span 2'}}>
          <h3>Batch Expiry Tracking</h3>
          <table className="im-table" style={{marginTop:'1rem'}}>
            <thead>
              <tr>
                <th>Batch No.</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Mfg Date</th>
                <th>Expiry Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>MED240101</strong></td>
                <td>Paracetamol 500mg</td>
                <td>5000</td>
                <td>01-Jan-2024</td>
                <td>01-Jan-2027</td>
                <td><span className="status-badge approved">Good</span></td>
              </tr>
              <tr>
                <td><strong>COS230501</strong></td>
                <td>Skin Cream X</td>
                <td>200</td>
                <td>01-May-2023</td>
                <td>01-May-2025</td>
                <td><span className="status-badge pending">Near Expiry</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="im-section">
          <h3>Serial Lookup</h3>
          <div style={{marginTop:'1rem'}}>
            <input type="text" placeholder="Scan or enter SN..." style={{width:'100%', padding:'0.8rem', borderRadius:'8px', border:'1px solid var(--border-color)', background:'var(--bg-color)', color:'var(--text-primary)', marginBottom:'1rem'}} />
            <div style={{padding:'1rem', background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div style={{fontSize:'0.8rem', color:'var(--text-secondary)'}}>Result for: LAP202600001</div>
              <h4 style={{margin:'0.5rem 0'}}>ThinkPad T14 Gen 3</h4>
              <div style={{fontSize:'0.9rem'}}><strong>Status:</strong> Sold</div>
              <div style={{fontSize:'0.9rem'}}><strong>Warranty:</strong> Active (till 2027)</div>
              <div style={{fontSize:'0.9rem'}}><strong>Customer:</strong> Acme Corp</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="inventory-management-wrapper">
      {activeTab === 'dashboard' && (
        <div className="im-header" style={{paddingBottom:0, borderBottom:'none', marginBottom:'1rem'}}>
          <button className="back-btn" onClick={onBack}>← Back to Home</button>
        </div>
      )}
      
      <div className="tabs-simple">
        <button className={`tab-simple ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>Dashboard</button>
        <button className={`tab-simple ${activeTab === 'stock' ? 'active' : ''}`} onClick={() => setActiveTab('stock')}>Stock Movement</button>
        <button className={`tab-simple ${activeTab === 'purchases' ? 'active' : ''}`} onClick={() => setActiveTab('purchases')}>Purchases</button>
        <button className={`tab-simple ${activeTab === 'suppliers' ? 'active' : ''}`} onClick={() => setActiveTab('suppliers')}>Suppliers</button>
        <button className={`tab-simple ${activeTab === 'warehouse' ? 'active' : ''}`} onClick={() => setActiveTab('warehouse')}>Warehouses</button>
        <button className={`tab-simple ${activeTab === 'tracking' ? 'active' : ''}`} onClick={() => setActiveTab('tracking')}>Batch & Serial</button>
      </div>

      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'stock' && renderStockMovement()}
      {activeTab === 'purchases' && renderPurchases()}
      {activeTab === 'suppliers' && renderSuppliers()}
      {activeTab === 'warehouse' && renderWarehouse()}
      {activeTab === 'tracking' && renderTracking()}
    </div>
  );
}
