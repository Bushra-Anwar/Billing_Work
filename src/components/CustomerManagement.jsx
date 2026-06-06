import React, { useState } from 'react';
import { 
  Users, UserPlus, CreditCard, FileText, Activity, 
  MapPin, Phone, Mail, Building, Search, Filter, 
  MoreVertical, Edit, Trash2, ChevronRight, Download, Upload 
} from 'lucide-react';
import './CustomerManagement.css';

const MOCK_CUSTOMERS = [
  {
    id: 'CUST-001',
    name: 'Acme Corp',
    phone: '+91 9876543210',
    email: 'contact@acme.com',
    gst: '24ABCDE1234F1Z5',
    creditLimit: 100000,
    currentBalance: 45000,
    status: 'Active',
    type: 'B2B',
    city: 'Mumbai',
    createdAt: '2026-01-10'
  },
  {
    id: 'CUST-002',
    name: 'Global Tech',
    phone: '+91 9123456789',
    email: 'hello@globaltech.in',
    gst: '27AABCT1234F1Z5',
    creditLimit: 50000,
    currentBalance: 0,
    status: 'Active',
    type: 'B2B',
    city: 'Pune',
    createdAt: '2026-02-15'
  },
  {
    id: 'CUST-003',
    name: 'Sarah Jenkins',
    phone: '+91 9888877777',
    email: 'sarah.j@example.com',
    gst: 'N/A',
    creditLimit: 10000,
    currentBalance: 1200,
    status: 'Inactive',
    type: 'B2C',
    city: 'Bangalore',
    createdAt: '2026-03-20'
  }
];

export default function CustomerManagement({ onBack }) {
  const [activeView, setActiveView] = useState('dashboard'); // dashboard, list, add, profile
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);

  const renderDashboard = () => (
    <div className="cm-dashboard fade-in">
      <div className="cm-header">
        <div>
          <button className="back-btn" onClick={onBack}>← Back to Home</button>
          <h2 className="cm-title">Customer Intelligence</h2>
          <p className="cm-subtitle">Overview of your customer metrics and recent activities</p>
        </div>
        <button className="btn-primary rainbow-bg" onClick={() => setActiveView('add')}>
          <UserPlus size={18} /> Add New Customer
        </button>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon bg-blue"><Users size={24} /></div>
          <div className="metric-info">
            <h4>Total Customers</h4>
            <div className="metric-value">1,248</div>
            <div className="metric-trend positive">+12% this month</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-green"><Activity size={24} /></div>
          <div className="metric-info">
            <h4>Active Customers</h4>
            <div className="metric-value">982</div>
            <div className="metric-trend">78% of total</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-orange"><CreditCard size={24} /></div>
          <div className="metric-info">
            <h4>Outstanding Amount</h4>
            <div className="metric-value">₹4.2M</div>
            <div className="metric-trend negative">15% overdue</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-purple"><UserPlus size={24} /></div>
          <div className="metric-info">
            <h4>New Today</h4>
            <div className="metric-value">14</div>
            <div className="metric-trend positive">+4 from yesterday</div>
          </div>
        </div>
      </div>

      <div className="cm-section">
        <div className="section-header-row">
          <h3>Customer Directory</h3>
          <div className="search-filter">
            <div className="search-box">
              <Search size={18} />
              <input type="text" placeholder="Search customers..." />
            </div>
            <button className="btn-secondary"><Filter size={18} /> Filter</button>
          </div>
        </div>
        
        <div className="table-container">
          <table className="cm-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Contact Info</th>
                <th>Location</th>
                <th>Balance</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(cust => (
                <tr key={cust.id} onClick={() => { setSelectedCustomer(cust); setActiveView('profile'); }} className="clickable-row">
                  <td>
                    <div className="user-cell">
                      <div className="avatar">{cust.name.charAt(0)}</div>
                      <div>
                        <strong>{cust.name}</strong>
                        <span className="sub-text">{cust.id} • {cust.type}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="contact-cell">
                      <span><Phone size={14} /> {cust.phone}</span>
                      <span><Mail size={14} /> {cust.email}</span>
                    </div>
                  </td>
                  <td><MapPin size={14} /> {cust.city}</td>
                  <td>
                    <strong>₹{cust.currentBalance.toLocaleString()}</strong>
                    <div className="sub-text">Limit: ₹{cust.creditLimit.toLocaleString()}</div>
                  </td>
                  <td>
                    <span className={`status-badge ${cust.status.toLowerCase()}`}>{cust.status}</span>
                  </td>
                  <td>
                    <button className="action-btn" onClick={(e) => { e.stopPropagation(); }}><MoreVertical size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAddCustomer = () => (
    <div className="cm-form-view fade-in">
      <div className="cm-header">
        <div>
          <button className="back-btn" onClick={() => setActiveView('dashboard')}>← Back to Dashboard</button>
          <h2 className="cm-title">Add New Customer</h2>
          <p className="cm-subtitle">Fill in the details to create a new customer profile</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => setActiveView('dashboard')}>Cancel</button>
          <button className="btn-primary rainbow-bg" onClick={() => setActiveView('dashboard')}>Save Customer</button>
        </div>
      </div>

      <div className="form-layout">
        <div className="form-sidebar">
          <button className="form-tab active">Basic Info</button>
          <button className="form-tab">Business & GST</button>
          <button className="form-tab">Address Info</button>
          <button className="form-tab">Credit Limits</button>
          <button className="form-tab">Additional Notes</button>
        </div>

        <div className="form-content">
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="form-grid">
              <div className="input-group">
                <label>Customer Name *</label>
                <input type="text" placeholder="John Doe or Company Name" />
              </div>
              <div className="input-group">
                <label>Customer Type</label>
                <select>
                  <option>B2B (Business)</option>
                  <option>B2C (Consumer)</option>
                </select>
              </div>
              <div className="input-group">
                <label>Mobile Number *</label>
                <input type="tel" placeholder="+91 0000000000" />
              </div>
              <div className="input-group">
                <label>Email Address</label>
                <input type="email" placeholder="contact@example.com" />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Business Information</h3>
            <div className="form-grid">
              <div className="input-group">
                <label>GST Number</label>
                <input type="text" placeholder="22AAAAA0000A1Z5" />
              </div>
              <div className="input-group">
                <label>PAN Number</label>
                <input type="text" placeholder="AAAAA0000A" />
              </div>
              <div className="input-group">
                <label>Website</label>
                <input type="url" placeholder="https://..." />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Credit Information</h3>
            <div className="form-grid">
              <div className="input-group">
                <label>Credit Limit (₹)</label>
                <input type="number" placeholder="100000" />
              </div>
              <div className="input-group">
                <label>Credit Period (Days)</label>
                <input type="number" placeholder="30" />
              </div>
              <div className="input-group">
                <label>Opening Balance (₹)</label>
                <input type="number" placeholder="0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="cm-profile-view fade-in">
      <div className="cm-header">
        <div>
          <button className="back-btn" onClick={() => setActiveView('dashboard')}>← Back to Directory</button>
        </div>
        <div className="header-actions">
          <button className="btn-secondary"><Edit size={16} /> Edit Profile</button>
          <button className="btn-danger"><Trash2 size={16} /> Delete</button>
        </div>
      </div>

      <div className="profile-overview-card">
        <div className="profile-hero">
          <div className="avatar large">{selectedCustomer.name.charAt(0)}</div>
          <div className="profile-titles">
            <h2>{selectedCustomer.name}</h2>
            <p>{selectedCustomer.id} • {selectedCustomer.type}</p>
            <span className={`status-badge ${selectedCustomer.status.toLowerCase()}`}>{selectedCustomer.status}</span>
          </div>
        </div>
        
        <div className="profile-stats">
          <div className="stat-box">
            <span className="stat-label">Outstanding Balance</span>
            <span className="stat-value">₹{selectedCustomer.currentBalance.toLocaleString()}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Credit Limit</span>
            <span className="stat-value">₹{selectedCustomer.creditLimit.toLocaleString()}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Credit Available</span>
            <span className="stat-value text-green">₹{(selectedCustomer.creditLimit - selectedCustomer.currentBalance).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="profile-tabs-container">
        <div className="profile-tabs">
          <button className="tab active">Overview Details</button>
          <button className="tab">Transactions</button>
          <button className="tab">Addresses</button>
          <button className="tab">Notes & Docs</button>
        </div>
        
        <div className="tab-content">
          <div className="details-grid">
            <div className="detail-card">
              <h4>Contact Info</h4>
              <div className="detail-row"><Phone size={16}/> {selectedCustomer.phone}</div>
              <div className="detail-row"><Mail size={16}/> {selectedCustomer.email}</div>
              <div className="detail-row"><MapPin size={16}/> {selectedCustomer.city}, India</div>
            </div>
            <div className="detail-card">
              <h4>Business Info</h4>
              <div className="detail-row"><Building size={16}/> GST: {selectedCustomer.gst}</div>
              <div className="detail-row"><FileText size={16}/> Added: {selectedCustomer.createdAt}</div>
            </div>
            <div className="detail-card">
              <h4>Recent Activity</h4>
              <div className="activity-timeline">
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div>
                    <strong>Invoice INV-1002 generated</strong>
                    <div className="sub-text">2 days ago • ₹12,500</div>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div>
                    <strong>Payment received</strong>
                    <div className="sub-text">1 week ago • ₹5,000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="customer-management-wrapper">
      {activeView === 'dashboard' && renderDashboard()}
      {activeView === 'add' && renderAddCustomer()}
      {activeView === 'profile' && renderProfile()}
    </div>
  );
}
