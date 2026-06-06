import React, { useState } from 'react';
import { 
  FileText, Plus, Search, Filter, Download, MoreVertical, 
  Printer, Mail, Copy, Trash2, Edit, CheckCircle, Clock, AlertCircle
} from 'lucide-react';
import './InvoiceManagement.css';

const MOCK_INVOICES = [
  {
    id: 'INV-2026-001',
    customer: 'Acme Corp',
    date: '2026-01-15',
    dueDate: '2026-01-30',
    amount: 12500,
    status: 'Paid',
    type: 'Tax Invoice'
  },
  {
    id: 'INV-2026-002',
    customer: 'Global Tech',
    date: '2026-01-20',
    dueDate: '2026-02-04',
    amount: 45000,
    status: 'Overdue',
    type: 'Tax Invoice'
  },
  {
    id: 'INV-2026-003',
    customer: 'Sarah Jenkins',
    date: '2026-02-10',
    dueDate: '2026-02-25',
    amount: 8500,
    status: 'Sent',
    type: 'Proforma'
  },
  {
    id: 'DRAFT-004',
    customer: 'TechVision Ltd',
    date: '2026-02-12',
    dueDate: '2026-02-27',
    amount: 0,
    status: 'Draft',
    type: 'Tax Invoice'
  }
];

export default function InvoiceManagement({ onBack }) {
  const [activeView, setActiveView] = useState('dashboard'); // dashboard, create, view
  const [invoices] = useState(MOCK_INVOICES);

  const renderDashboard = () => (
    <div className="inv-dashboard fade-in">
      <div className="inv-header">
        <div>
          <button className="back-btn" onClick={onBack}>← Back to Home</button>
          <h2 className="inv-title">Invoice Management</h2>
          <p className="inv-subtitle">Create, track, and manage all your billing documents</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">Settings & Templates</button>
          <button className="btn-primary rainbow-bg" onClick={() => setActiveView('create')}>
            <Plus size={18} /> Create Invoice
          </button>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon bg-green"><CheckCircle size={24} /></div>
          <div className="metric-info">
            <h4>Paid This Month</h4>
            <div className="metric-value">₹2.4M</div>
            <div className="metric-trend positive">+15% vs last month</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-blue"><Clock size={24} /></div>
          <div className="metric-info">
            <h4>Outstanding</h4>
            <div className="metric-value">₹850K</div>
            <div className="metric-trend">Expected within 30 days</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-orange"><AlertCircle size={24} /></div>
          <div className="metric-info">
            <h4>Overdue Invoices</h4>
            <div className="metric-value text-orange">12</div>
            <div className="metric-trend negative">₹320K total value</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-purple"><FileText size={24} /></div>
          <div className="metric-info">
            <h4>Drafts / Pending</h4>
            <div className="metric-value">5</div>
            <div className="metric-trend">Needs approval</div>
          </div>
        </div>
      </div>

      <div className="inv-section">
        <div className="section-header-row">
          <div className="tabs-simple">
            <button className="tab-simple active">All Invoices</button>
            <button className="tab-simple">Recurring</button>
            <button className="tab-simple">Credit Notes</button>
            <button className="tab-simple">Debit Notes</button>
          </div>
          <div className="search-filter">
            <div className="search-box">
              <Search size={18} />
              <input type="text" placeholder="Search by invoice # or customer..." />
            </div>
            <button className="btn-secondary"><Filter size={18} /> Filter</button>
            <button className="btn-secondary"><Download size={18} /></button>
          </div>
        </div>
        
        <div className="table-container">
          <table className="inv-table">
            <thead>
              <tr>
                <th>Invoice Details</th>
                <th>Customer</th>
                <th>Date / Due Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => (
                <tr key={inv.id} className="clickable-row" onClick={() => setActiveView('view')}>
                  <td>
                    <div className="invoice-cell">
                      <strong>{inv.id}</strong>
                      <span className="type-badge">{inv.type}</span>
                    </div>
                  </td>
                  <td>
                    <div className="customer-cell">
                      <div className="avatar small">{inv.customer.charAt(0)}</div>
                      <span>{inv.customer}</span>
                    </div>
                  </td>
                  <td>
                    <div className="date-cell">
                      <span>{inv.date}</span>
                      <span className="sub-text text-orange">Due: {inv.dueDate}</span>
                    </div>
                  </td>
                  <td>
                    <strong>₹{inv.amount.toLocaleString()}</strong>
                  </td>
                  <td>
                    <span className={`status-badge ${inv.status.toLowerCase()}`}>{inv.status}</span>
                  </td>
                  <td>
                    <div className="action-group">
                      <button className="action-btn" onClick={(e) => e.stopPropagation()} title="Print"><Printer size={16} /></button>
                      <button className="action-btn" onClick={(e) => e.stopPropagation()} title="Email"><Mail size={16} /></button>
                      <button className="action-btn" onClick={(e) => e.stopPropagation()}><MoreVertical size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCreateInvoice = () => (
    <div className="inv-create-view fade-in">
      <div className="inv-header">
        <div>
          <button className="back-btn" onClick={() => setActiveView('dashboard')}>← Back to Invoices</button>
          <h2 className="inv-title">Create Invoice</h2>
          <p className="inv-subtitle">Draft a new tax invoice, proforma, or recurring bill</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => setActiveView('dashboard')}>Save as Draft</button>
          <button className="btn-primary rainbow-bg" onClick={() => setActiveView('dashboard')}>Save & Send</button>
        </div>
      </div>

      <div className="invoice-form-card">
        {/* Invoice Header Details */}
        <div className="inv-form-header">
          <div className="customer-selection">
            <label>Customer *</label>
            <select className="large-select">
              <option>Select Customer...</option>
              <option>Acme Corp</option>
              <option>Global Tech</option>
              <option>Sarah Jenkins</option>
              <option>+ Add New Customer</option>
            </select>
          </div>
          
          <div className="inv-meta-grid">
            <div className="input-group">
              <label>Invoice Number</label>
              <input type="text" defaultValue="INV-2026-005" />
            </div>
            <div className="input-group">
              <label>Invoice Type</label>
              <select>
                <option>Tax Invoice</option>
                <option>Proforma Invoice</option>
                <option>Recurring Invoice</option>
              </select>
            </div>
            <div className="input-group">
              <label>Invoice Date</label>
              <input type="date" defaultValue="2026-02-15" />
            </div>
            <div className="input-group">
              <label>Due Date</label>
              <input type="date" defaultValue="2026-03-02" />
            </div>
          </div>
        </div>

        {/* Invoice Items Table */}
        <div className="inv-items-section">
          <table className="inv-items-table">
            <thead>
              <tr>
                <th width="45%">Item Details</th>
                <th width="15%">Qty</th>
                <th width="15%">Rate (₹)</th>
                <th width="15%">Tax (%)</th>
                <th width="10%">Amount</th>
                <th width="5%"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="text" placeholder="Select or type item name..." className="item-input" defaultValue="Premium Cloud Hosting (1 Yr)" />
                  <input type="text" placeholder="HSN/SAC Code" className="item-sub-input" defaultValue="998311" />
                </td>
                <td><input type="number" defaultValue="1" className="num-input" /></td>
                <td><input type="number" defaultValue="12000" className="num-input" /></td>
                <td>
                  <select className="tax-select">
                    <option>GST 18%</option>
                    <option>GST 12%</option>
                    <option>Exempt</option>
                  </select>
                </td>
                <td className="item-amount">₹14,160</td>
                <td><button className="action-btn text-orange"><Trash2 size={16} /></button></td>
              </tr>
              <tr>
                <td>
                  <input type="text" placeholder="Select or type item name..." className="item-input" />
                  <input type="text" placeholder="Description (Optional)" className="item-sub-input" />
                </td>
                <td><input type="number" placeholder="1" className="num-input" /></td>
                <td><input type="number" placeholder="0.00" className="num-input" /></td>
                <td>
                  <select className="tax-select">
                    <option>Select Tax</option>
                    <option>GST 18%</option>
                  </select>
                </td>
                <td className="item-amount">₹0.00</td>
                <td><button className="action-btn text-orange"><Trash2 size={16} /></button></td>
              </tr>
            </tbody>
          </table>
          <button className="add-row-btn"><Plus size={16} /> Add New Row</button>
        </div>

        {/* Invoice Footer / Totals */}
        <div className="inv-form-footer">
          <div className="inv-notes">
            <div className="input-group">
              <label>Customer Notes</label>
              <textarea rows="3" placeholder="Thanks for your business."></textarea>
            </div>
            <div className="input-group">
              <label>Terms & Conditions</label>
              <textarea rows="3" placeholder="Payment due within 15 days..."></textarea>
            </div>
          </div>
          
          <div className="inv-totals">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>₹12,000.00</span>
            </div>
            <div className="total-row">
              <span>Discount:</span>
              <div className="discount-input">
                <input type="number" placeholder="0" />
                <select><option>%</option><option>₹</option></select>
              </div>
            </div>
            <div className="total-row">
              <span>CGST (9%):</span>
              <span>₹1,080.00</span>
            </div>
            <div className="total-row">
              <span>SGST (9%):</span>
              <span>₹1,080.00</span>
            </div>
            <div className="total-row grand-total">
              <span>Total Amount:</span>
              <span className="rainbow-text">₹14,160.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInvoicePreview = () => (
    <div className="inv-preview-view fade-in">
      <div className="inv-header">
        <div>
          <button className="back-btn" onClick={() => setActiveView('dashboard')}>← Back to Invoices</button>
          <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
            <h2 className="inv-title">INV-2026-001</h2>
            <span className="status-badge paid">Paid</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-secondary"><Edit size={16} /> Edit</button>
          <button className="btn-secondary"><Copy size={16} /> Duplicate</button>
          <button className="btn-secondary"><Download size={16} /> PDF</button>
          <button className="btn-primary rainbow-bg"><Mail size={16} /> Send Email</button>
        </div>
      </div>

      <div className="invoice-paper">
        <div className="paper-header">
          <div className="company-details">
            <h1 className="rainbow-text logo">NexusBill</h1>
            <p>123 Business Avenue, Tech Park</p>
            <p>Mumbai, Maharashtra, 400001</p>
            <p>GSTIN: 27AADCB2230M1Z5</p>
          </div>
          <div className="invoice-title-area">
            <h2>TAX INVOICE</h2>
            <div className="meta-info">
              <div><strong>Invoice #:</strong> INV-2026-001</div>
              <div><strong>Date:</strong> 15 Jan 2026</div>
              <div><strong>Due Date:</strong> 30 Jan 2026</div>
            </div>
          </div>
        </div>

        <div className="billing-details">
          <div className="bill-to">
            <h3>Bill To:</h3>
            <strong>Acme Corp</strong>
            <p>456 Enterprise Street, Block B</p>
            <p>Pune, Maharashtra, 411001</p>
            <p>GSTIN: 27ABCDE1234F1Z5</p>
          </div>
          <div className="payment-status-stamp paid-stamp">
            PAID
          </div>
        </div>

        <table className="paper-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Item & Description</th>
              <th>HSN/SAC</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Tax</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <strong>Website Redesign</strong>
                <p className="item-desc">Corporate website redesign with e-commerce</p>
              </td>
              <td>998311</td>
              <td>1</td>
              <td>₹10,593.22</td>
              <td>18%</td>
              <td>₹12,500.00</td>
            </tr>
          </tbody>
        </table>

        <div className="paper-footer">
          <div className="bank-details">
            <h3>Bank Details</h3>
            <p><strong>Bank:</strong> HDFC Bank</p>
            <p><strong>Account Name:</strong> NexusBill Technologies</p>
            <p><strong>Account No:</strong> 50200012345678</p>
            <p><strong>IFSC Code:</strong> HDFC0001234</p>
          </div>
          
          <div className="paper-totals">
            <div className="p-total-row">
              <span>Subtotal:</span>
              <span>₹10,593.22</span>
            </div>
            <div className="p-total-row">
              <span>CGST (9%):</span>
              <span>₹953.39</span>
            </div>
            <div className="p-total-row">
              <span>SGST (9%):</span>
              <span>₹953.39</span>
            </div>
            <div className="p-total-row p-grand-total">
              <span>Total:</span>
              <span>₹12,500.00</span>
            </div>
            <p className="amount-words">Amount in words: Twelve Thousand Five Hundred Rupees Only</p>
          </div>
        </div>

        <div className="terms-area">
          <h3>Terms & Conditions</h3>
          <p>1. Please quote invoice number when remitting funds.</p>
          <p>2. Subject to Mumbai jurisdiction.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="invoice-management-wrapper">
      {activeView === 'dashboard' && renderDashboard()}
      {activeView === 'create' && renderCreateInvoice()}
      {activeView === 'view' && renderInvoicePreview()}
    </div>
  );
}
