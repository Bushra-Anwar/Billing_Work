import React, { useState } from 'react';
import { 
  FileText, Plus, Search, Filter, Download, MoreVertical, 
  Printer, Mail, Copy, Trash2, Edit, CheckCircle, Clock, AlertCircle,
  RefreshCw, Send, CheckSquare, XCircle, FilePlus
} from 'lucide-react';
import './QuotationManagement.css';

const MOCK_QUOTES = [
  {
    id: 'QT-2026-001',
    customer: 'Acme Corp',
    date: '2026-02-10',
    expiryDate: '2026-03-10',
    amount: 155000,
    status: 'Accepted',
    version: 'V2',
    approver: 'Admin'
  },
  {
    id: 'QT-2026-002',
    customer: 'Global Tech',
    date: '2026-02-15',
    expiryDate: '2026-03-15',
    amount: 450000,
    status: 'Pending Approval',
    version: 'V1',
    approver: 'Manager'
  },
  {
    id: 'QT-2026-003',
    customer: 'Sarah Jenkins',
    date: '2026-01-20',
    expiryDate: '2026-02-20',
    amount: 8500,
    status: 'Expired',
    version: 'V1',
    approver: 'Auto'
  },
  {
    id: 'QT-2026-004',
    customer: 'TechVision Ltd',
    date: '2026-02-28',
    expiryDate: '2026-03-28',
    amount: 72000,
    status: 'Converted',
    version: 'V3',
    approver: 'Auto'
  }
];

export default function QuotationManagement({ onBack }) {
  const [activeView, setActiveView] = useState('dashboard'); // dashboard, create, view, approve
  const [quotes] = useState(MOCK_QUOTES);
  const [selectedQuote, setSelectedQuote] = useState(null);

  const renderDashboard = () => (
    <div className="quote-dashboard fade-in">
      <div className="quote-header">
        <div>
          <button className="back-btn" onClick={onBack}>← Back to Home</button>
          <h2 className="quote-title">Quotations & Estimates</h2>
          <p className="quote-subtitle">Manage quotes, approvals, and convert them to invoices</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary"><FilePlus size={18} /> New Estimate</button>
          <button className="btn-primary rainbow-bg" onClick={() => setActiveView('create')}>
            <Plus size={18} /> Create Quotation
          </button>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon bg-blue"><FileText size={24} /></div>
          <div className="metric-info">
            <h4>Total Quotes Value</h4>
            <div className="metric-value">₹1.2M</div>
            <div className="metric-trend positive">45 active quotes</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-orange"><Clock size={24} /></div>
          <div className="metric-info">
            <h4>Pending Approval</h4>
            <div className="metric-value text-orange">8</div>
            <div className="metric-trend">Needs manager action</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-green"><CheckSquare size={24} /></div>
          <div className="metric-info">
            <h4>Conversion Rate</h4>
            <div className="metric-value">68%</div>
            <div className="metric-trend positive">+5% vs last month</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-red"><AlertCircle size={24} /></div>
          <div className="metric-info">
            <h4>Expiring Soon</h4>
            <div className="metric-value text-red">3</div>
            <div className="metric-trend negative">Expires in 7 days</div>
          </div>
        </div>
      </div>

      <div className="quote-section">
        <div className="section-header-row">
          <div className="tabs-simple">
            <button className="tab-simple active">All Quotes</button>
            <button className="tab-simple">Pending Approval</button>
            <button className="tab-simple">Accepted</button>
            <button className="tab-simple">Expired</button>
          </div>
          <div className="search-filter">
            <div className="search-box">
              <Search size={18} />
              <input type="text" placeholder="Search by quote # or customer..." />
            </div>
            <button className="btn-secondary"><Filter size={18} /> Filter</button>
          </div>
        </div>
        
        <div className="table-container">
          <table className="quote-table">
            <thead>
              <tr>
                <th>Quote Details</th>
                <th>Customer</th>
                <th>Dates</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map(quote => (
                <tr key={quote.id} className="clickable-row" onClick={() => { setSelectedQuote(quote); setActiveView('view'); }}>
                  <td>
                    <div className="quote-cell">
                      <strong>{quote.id}</strong>
                      <span className="version-badge">{quote.version}</span>
                    </div>
                  </td>
                  <td>
                    <div className="customer-cell">
                      <span>{quote.customer}</span>
                    </div>
                  </td>
                  <td>
                    <div className="date-cell">
                      <span>Created: {quote.date}</span>
                      <span className="sub-text text-orange">Expires: {quote.expiryDate}</span>
                    </div>
                  </td>
                  <td>
                    <strong>₹{quote.amount.toLocaleString()}</strong>
                  </td>
                  <td>
                    <span className={`status-badge ${quote.status.toLowerCase().replace(' ', '-')}`}>{quote.status}</span>
                  </td>
                  <td>
                    <div className="action-group">
                      <button className="action-btn" onClick={(e) => e.stopPropagation()} title="Email Quote"><Send size={16} /></button>
                      <button className="action-btn" onClick={(e) => { e.stopPropagation(); setActiveView('approve'); }} title="Convert to Invoice"><RefreshCw size={16} /></button>
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

  const renderCreateQuote = () => (
    <div className="quote-create-view fade-in">
      <div className="quote-header">
        <div>
          <button className="back-btn" onClick={() => setActiveView('dashboard')}>← Back to Quotes</button>
          <h2 className="quote-title">Create Quotation</h2>
          <p className="quote-subtitle">Draft a new proposal or estimate for your customer</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => setActiveView('dashboard')}>Save as Draft</button>
          <button className="btn-primary rainbow-bg" onClick={() => setActiveView('dashboard')}>Request Approval</button>
        </div>
      </div>

      <div className="quote-form-card">
        <div className="quote-form-header">
          <div className="customer-selection">
            <label>Customer *</label>
            <select className="large-select">
              <option>Select Customer...</option>
              <option>Acme Corp</option>
              <option>Global Tech</option>
            </select>
          </div>
          
          <div className="quote-meta-grid">
            <div className="input-group">
              <label>Quote Number</label>
              <input type="text" defaultValue="QT-2026-005" />
            </div>
            <div className="input-group">
              <label>Salesperson</label>
              <select>
                <option>John Doe</option>
                <option>Jane Smith</option>
              </select>
            </div>
            <div className="input-group">
              <label>Quote Date</label>
              <input type="date" defaultValue="2026-03-01" />
            </div>
            <div className="input-group">
              <label>Validity / Expiry</label>
              <select>
                <option>15 Days (15 Mar 2026)</option>
                <option>30 Days (30 Mar 2026)</option>
                <option>Custom Date</option>
              </select>
            </div>
          </div>
        </div>

        <div className="quote-items-section">
          <table className="quote-items-table">
            <thead>
              <tr>
                <th width="40%">Product / Service</th>
                <th width="15%">Qty</th>
                <th width="15%">Unit Price (₹)</th>
                <th width="15%">Discount (%)</th>
                <th width="10%">Amount</th>
                <th width="5%"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="text" placeholder="Select item..." className="item-input" defaultValue="Construction Material Bundle" />
                  <input type="text" placeholder="Additional description..." className="item-sub-input" />
                </td>
                <td><input type="number" defaultValue="5" className="num-input" /></td>
                <td><input type="number" defaultValue="25000" className="num-input" /></td>
                <td><input type="number" defaultValue="10" className="num-input text-orange" /></td>
                <td className="item-amount">₹112,500</td>
                <td><button className="action-btn text-red"><Trash2 size={16} /></button></td>
              </tr>
            </tbody>
          </table>
          <button className="add-row-btn"><Plus size={16} /> Add Item</button>
        </div>

        <div className="quote-form-footer">
          <div className="quote-notes">
            <div className="input-group">
              <label>Customer Notes (Visible on Quote)</label>
              <textarea rows="2" placeholder="Thank you for considering our proposal."></textarea>
            </div>
            <div className="input-group">
              <label>Internal Remarks (Hidden)</label>
              <textarea rows="2" placeholder="High priority client. Discount approved by Manager."></textarea>
            </div>
            <div className="input-group">
              <label>Approval Workflow Trigger</label>
              <div className="approval-warning">
                <AlertCircle size={16} /> Discount &gt; 5% requires Manager Approval before sending.
              </div>
            </div>
          </div>
          
          <div className="quote-totals">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>₹125,000.00</span>
            </div>
            <div className="total-row">
              <span>Item Discounts:</span>
              <span className="text-orange">-₹12,500.00</span>
            </div>
            <div className="total-row">
              <span>Tax (18%):</span>
              <span>₹20,250.00</span>
            </div>
            <div className="total-row grand-total">
              <span>Grand Total:</span>
              <span className="rainbow-text">₹132,750.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuotePreview = () => (
    <div className="quote-preview-view fade-in">
      <div className="quote-header">
        <div>
          <button className="back-btn" onClick={() => setActiveView('dashboard')}>← Back to Quotes</button>
          <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
            <h2 className="quote-title">{selectedQuote?.id || 'QT-2026-001'}</h2>
            <span className={`status-badge ${selectedQuote?.status?.toLowerCase().replace(' ', '-') || 'accepted'}`}>{selectedQuote?.status || 'Accepted'}</span>
            <span className="version-badge">{selectedQuote?.version || 'V2'}</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-secondary"><FilePlus size={16} /> New Version</button>
          <button className="btn-secondary"><Send size={16} /> Resend Portal Link</button>
          <button className="btn-primary rainbow-bg"><RefreshCw size={16} /> Convert to Invoice</button>
        </div>
      </div>

      <div className="quote-paper-container">
        <div className="quote-sidebar">
          <div className="sidebar-section">
            <h3>Approval Workflow</h3>
            <div className="workflow-timeline">
              <div className="timeline-step completed">
                <div className="step-icon"><CheckCircle size={14}/></div>
                <div>
                  <strong>Created</strong>
                  <span>John Doe • 10 Feb 2026</span>
                </div>
              </div>
              <div className="timeline-step completed">
                <div className="step-icon"><CheckCircle size={14}/></div>
                <div>
                  <strong>Manager Approved</strong>
                  <span>Sarah Mgr • 11 Feb 2026</span>
                </div>
              </div>
              <div className="timeline-step completed">
                <div className="step-icon"><CheckSquare size={14}/></div>
                <div>
                  <strong>Customer Accepted</strong>
                  <span>Via Portal • 12 Feb 2026</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h3>Customer Actions</h3>
            <div className="customer-portal-link">
              <p>Public Secure Link:</p>
              <code>https://nexusbill.com/q/X9Y2Z</code>
              <button className="copy-btn"><Copy size={14}/> Copy Link</button>
            </div>
            <div className="conversion-status success">
              <CheckCircle size={16} /> Ready for Invoicing
            </div>
          </div>
        </div>

        <div className="quote-paper">
          <div className="paper-header">
            <div className="company-details">
              <h1 className="rainbow-text logo">NexusBill</h1>
              <p>Quotation / Estimate</p>
            </div>
            <div className="quote-title-area">
              <h2>QUOTATION</h2>
              <div className="meta-info">
                <div><strong>Quote #:</strong> {selectedQuote?.id}</div>
                <div><strong>Date:</strong> {selectedQuote?.date}</div>
                <div><strong>Valid Until:</strong> <span className="text-red">{selectedQuote?.expiryDate}</span></div>
              </div>
            </div>
          </div>

          <div className="billing-details">
            <div className="bill-to">
              <h3>Prepared For:</h3>
              <strong>{selectedQuote?.customer}</strong>
              <p>Pune, Maharashtra</p>
            </div>
          </div>

          <table className="paper-table">
            <thead>
              <tr>
                <th>Item & Description</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Discount</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Enterprise Software License</strong>
                </td>
                <td>1</td>
                <td>₹155,000.00</td>
                <td>0%</td>
                <td>₹155,000.00</td>
              </tr>
            </tbody>
          </table>

          <div className="paper-footer">
            <div className="terms-area">
              <h3>Terms & Conditions</h3>
              <p>1. Quotation valid for 30 days.</p>
              <p>2. 50% advance payment required upon acceptance.</p>
            </div>
            
            <div className="paper-totals">
              <div className="p-total-row">
                <span>Subtotal:</span>
                <span>₹155,000.00</span>
              </div>
              <div className="p-total-row p-grand-total">
                <span>Total Estimate:</span>
                <span>₹155,000.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="quote-management-wrapper">
      {activeView === 'dashboard' && renderDashboard()}
      {activeView === 'create' && renderCreateQuote()}
      {activeView === 'view' && renderQuotePreview()}
      {activeView === 'approve' && renderQuotePreview()}
    </div>
  );
}
