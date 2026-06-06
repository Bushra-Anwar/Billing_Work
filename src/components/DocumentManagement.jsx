import React, { useState } from 'react';
import { 
  FileText, Printer, PenTool, QrCode, Download, Settings, 
  Image as ImageIcon, Edit, Shield, CheckCircle, Barcode, 
  Lock, Copy, FilePlus, Zap, Monitor
} from 'lucide-react';
import './DocumentManagement.css';

export default function DocumentManagement({ onBack }) {
  const [activeTab, setActiveTab] = useState('dashboard'); 

  const renderDashboard = () => (
    <div className="dm-view fade-in">
      <div className="dm-header">
        <div>
          <button className="back-btn" onClick={onBack}>← Back to Home</button>
          <h2 className="dm-title">Document Features</h2>
          <p className="dm-subtitle">Manage PDF generation, printing, branding, and digital signatures</p>
        </div>
        <div style={{display:'flex', gap:'1rem'}}>
          <button className="btn-secondary"><Printer size={16}/> Bulk Print</button>
          <button className="btn-primary rainbow-bg"><FilePlus size={16} /> New Template</button>
        </div>
      </div>

      <div className="grid-4">
        <div className="metric-card">
          <div className="metric-icon bg-blue"><FileText size={24}/></div>
          <div className="metric-info">
            <h4>PDFs Generated</h4>
            <div className="metric-value">4,520</div>
            <div className="metric-trend positive">This Month</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-green"><Printer size={24}/></div>
          <div className="metric-info">
            <h4>Invoices Printed</h4>
            <div className="metric-value">1,250</div>
            <div className="metric-trend positive">Thermal & A4</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-purple"><PenTool size={24}/></div>
          <div className="metric-info">
            <h4>Digitally Signed</h4>
            <div className="metric-value">845</div>
            <div className="metric-trend">Verified Documents</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-orange"><QrCode size={24}/></div>
          <div className="metric-info">
            <h4>QR & Barcodes</h4>
            <div className="metric-value">3,100</div>
            <div className="metric-trend positive">Generated</div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="dm-section">
          <h3>Recent Document History</h3>
          <table className="dm-table" style={{marginTop:'1rem'}}>
            <thead>
              <tr>
                <th>Document</th>
                <th>Action</th>
                <th>User</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>INV-2026-001</strong><br/><span className="sub-text">Invoice</span></td>
                <td><span className="status-badge success">Signed & Emailed</span></td>
                <td>Admin</td>
                <td>10 mins ago</td>
              </tr>
              <tr>
                <td><strong>PO-2025-142</strong><br/><span className="sub-text">Purchase Order</span></td>
                <td><span className="status-badge info">PDF Downloaded</span></td>
                <td>Manager</td>
                <td>1 hour ago</td>
              </tr>
              <tr>
                <td><strong>Product Label</strong><br/><span className="sub-text">Barcode EAN13</span></td>
                <td><span className="status-badge warning">Bulk Printed (x50)</span></td>
                <td>Inventory Staff</td>
                <td>Today, 09:30 AM</td>
              </tr>
            </tbody>
          </table>
          <button className="btn-secondary" style={{width:'100%', marginTop:'1rem'}}>View Full History</button>
        </div>

        <div className="dm-section">
          <h3>Quick Actions & Settings</h3>
          <div style={{marginTop:'1.5rem', display:'flex', flexDirection:'column', gap:'1rem'}}>
            <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
                <div className="metric-icon bg-blue" style={{width:'40px', height:'40px'}}><FileText size={20}/></div>
                <div>
                  <strong>Default PDF Size</strong>
                  <div className="sub-text">Current: A4 (Portrait)</div>
                </div>
              </div>
              <button className="btn-secondary" style={{padding:'0.4rem 0.8rem'}}>Change</button>
            </div>
            
            <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
                <div className="metric-icon bg-green" style={{width:'40px', height:'40px'}}><Printer size={20}/></div>
                <div>
                  <strong>Thermal Printer</strong>
                  <div className="sub-text">Status: Connected (USB)</div>
                </div>
              </div>
              <button className="btn-secondary" style={{padding:'0.4rem 0.8rem'}}>Configure</button>
            </div>

            <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
                <div className="metric-icon bg-purple" style={{width:'40px', height:'40px'}}><ImageIcon size={20}/></div>
                <div>
                  <strong>Company Logo</strong>
                  <div className="sub-text">Visible on all templates</div>
                </div>
              </div>
              <button className="btn-secondary" style={{padding:'0.4rem 0.8rem'}}>Update Logo</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBranding = () => (
    <div className="dm-view fade-in">
       <div className="dm-header">
        <div>
          <h2 className="dm-title">Branding & Templates</h2>
          <p className="dm-subtitle">Manage company logos, colors, and document layouts</p>
        </div>
        <button className="btn-primary rainbow-bg"><FilePlus size={16}/> Create Template</button>
      </div>

      <div className="grid-3">
        <div className="dm-section">
          <h3>Company Logo</h3>
          <div className="upload-area" style={{marginTop:'1.5rem'}}>
            <ImageIcon size={32} />
            <p>Upload new logo (PNG, JPG, SVG)</p>
            <span className="sub-text">Recommended: 400x150px</span>
          </div>
          <div style={{marginTop:'1rem', padding:'1rem', background:'var(--bg-color)', border:'1px solid var(--border-color)', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <h2 style={{color:'var(--text-primary)', fontFamily:'sans-serif', fontStyle:'italic'}}>NexusBill<span className="rainbow-text">.</span></h2>
          </div>
          <div className="setting-row" style={{padding:'1rem 0'}}>
            <span>Show on Invoices</span>
            <div className="toggle-switch on"></div>
          </div>
        </div>

        <div className="dm-section">
          <h3>Brand Colors & Fonts</h3>
          <div style={{marginTop:'1.5rem'}}>
            <div className="form-group">
              <label>Primary Brand Color</label>
              <input type="color" defaultValue="#8b5cf6" />
            </div>
            <div className="form-group">
              <label>Secondary Brand Color</label>
              <input type="color" defaultValue="#d946ef" />
            </div>
            <div className="form-group">
              <label>Document Font</label>
              <select>
                <option>Inter (Modern)</option>
                <option>Roboto (Standard)</option>
                <option>Merriweather (Serif)</option>
                <option>Courier (Monospace)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Default Watermark</label>
              <input type="text" placeholder="e.g. DRAFT or CONFIDENTIAL" />
            </div>
            <button className="btn-primary rainbow-bg" style={{width:'100%', marginTop:'0.5rem'}}>Save Branding</button>
          </div>
        </div>

        <div className="dm-section">
          <h3>Active Templates</h3>
          <div style={{marginTop:'1.5rem', display:'flex', flexDirection:'column', gap:'1rem'}}>
            <div className="template-card" style={{padding:'1rem'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div>
                  <h4 style={{marginBottom:'0.2rem'}}>Modern Invoice</h4>
                  <span className="sub-text">Default for B2B</span>
                </div>
                <button className="btn-secondary" style={{padding:'0.3rem'}}><Edit size={16}/></button>
              </div>
            </div>
            <div className="template-card" style={{padding:'1rem'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div>
                  <h4 style={{marginBottom:'0.2rem'}}>Thermal Receipt POS</h4>
                  <span className="sub-text">Default for Retail</span>
                </div>
                <button className="btn-secondary" style={{padding:'0.3rem'}}><Edit size={16}/></button>
              </div>
            </div>
            <div className="template-card" style={{padding:'1rem'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div>
                  <h4 style={{marginBottom:'0.2rem'}}>Standard Quotation</h4>
                  <span className="sub-text">Default</span>
                </div>
                <button className="btn-secondary" style={{padding:'0.3rem'}}><Edit size={16}/></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPdfPrint = () => (
    <div className="dm-view fade-in">
       <div className="dm-header">
        <div>
          <h2 className="dm-title">PDF Generation & Printing</h2>
          <p className="dm-subtitle">Configure PDF layouts and hardware printer integrations</p>
        </div>
        <button className="btn-primary rainbow-bg"><Zap size={16}/> Bulk Export PDF</button>
      </div>

      <div className="grid-2">
        <div className="dm-section">
          <h3>PDF Settings</h3>
          <div style={{marginTop:'1.5rem'}}>
            <div className="setting-row">
              <div>
                <strong>Page Size</strong>
                <div className="sub-text">Standard document size</div>
              </div>
              <select style={{padding:'0.5rem', borderRadius:'6px', border:'1px solid var(--border-color)', background:'var(--bg-color)', color:'var(--text-primary)'}}>
                <option>A4</option>
                <option>Letter</option>
                <option>Legal</option>
              </select>
            </div>
            <div className="setting-row">
              <div>
                <strong>Orientation</strong>
                <div className="sub-text">Portrait or Landscape</div>
              </div>
              <select style={{padding:'0.5rem', borderRadius:'6px', border:'1px solid var(--border-color)', background:'var(--bg-color)', color:'var(--text-primary)'}}>
                <option>Portrait</option>
                <option>Landscape</option>
              </select>
            </div>
            <div className="setting-row">
              <div>
                <strong>Auto PDF Generation</strong>
                <div className="sub-text">Create PDF on invoice approval</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
            <div className="setting-row">
              <div>
                <strong>Attach PDF to Emails</strong>
                <div className="sub-text">Include automatically</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
          </div>
        </div>

        <div className="dm-section">
          <h3>Hardware & Printing</h3>
          <div style={{marginTop:'1.5rem'}}>
            <div className="setting-row">
              <div>
                <strong>A4 / Desk Printer</strong>
                <div className="sub-text">Network: 192.168.1.50</div>
              </div>
              <button className="btn-secondary" style={{padding:'0.4rem 0.8rem'}}>Test Print</button>
            </div>
            <div className="setting-row">
              <div>
                <strong>Thermal Receipt Printer (POS)</strong>
                <div className="sub-text">Width: 80mm</div>
              </div>
              <button className="btn-secondary" style={{padding:'0.4rem 0.8rem'}}>Test Print</button>
            </div>
            <div className="setting-row">
              <div>
                <strong>Barcode Label Printer</strong>
                <div className="sub-text">Not Connected</div>
              </div>
              <button className="btn-secondary" style={{padding:'0.4rem 0.8rem'}}>Setup</button>
            </div>
            <div className="setting-row">
              <div>
                <strong>Silent Printing (No Dialog)</strong>
                <div className="sub-text">Requires browser extension</div>
              </div>
              <div className="toggle-switch"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSignaturesSecurity = () => (
    <div className="dm-view fade-in">
       <div className="dm-header">
        <div>
          <h2 className="dm-title">Signatures & Security</h2>
          <p className="dm-subtitle">Digital signing, password protection, and tamper detection</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="dm-section">
          <h3>Digital Signatures</h3>
          <div style={{marginTop:'1.5rem'}}>
            <div className="upload-area" style={{padding:'1rem'}}>
              <PenTool size={24}/>
              <p>Upload PNG Signature or Draw</p>
            </div>
            <div style={{marginTop:'1rem', padding:'1rem', background:'white', borderRadius:'8px', display:'flex', justifyContent:'center'}}>
              {/* Mock signature drawing */}
              <svg width="200" height="50" viewBox="0 0 200 50">
                <path d="M10,40 Q30,10 60,30 T120,20 T180,35" fill="none" stroke="#000" strokeWidth="2"/>
                <path d="M40,45 L160,45" fill="none" stroke="#999" strokeWidth="1" strokeDasharray="4 4"/>
              </svg>
            </div>
            <div className="setting-row" style={{padding:'1rem 0'}}>
              <span>Auto-Apply to Invoices</span>
              <div className="toggle-switch on"></div>
            </div>
            <div className="setting-row" style={{padding:'1rem 0'}}>
              <span>Auto-Apply to Purchase Orders</span>
              <div className="toggle-switch on"></div>
            </div>
            <div style={{background:'var(--bg-color)', padding:'1rem', borderRadius:'8px', border:'1px solid var(--border-color)', marginTop:'1rem', display:'flex', alignItems:'center', gap:'0.5rem', color:'#10b981'}}>
              <Shield size={16}/> <span>PKI Certificate Active (Exp: 2027)</span>
            </div>
          </div>
        </div>

        <div className="dm-section">
          <h3>Document Security (PDF)</h3>
          <div style={{marginTop:'1.5rem'}}>
            <div className="setting-row">
              <div>
                <strong>Password Protection</strong>
                <div className="sub-text">Require password to open PDF</div>
              </div>
              <div className="toggle-switch"></div>
            </div>
            <div className="setting-row" style={{opacity: 0.5}}>
              <div>
                <strong>Default Password Format</strong>
                <div className="sub-text">e.g. Customer PAN + Phone</div>
              </div>
              <select disabled style={{padding:'0.4rem', borderRadius:'6px', border:'1px solid var(--border-color)'}}>
                <option>Custom Rule</option>
              </select>
            </div>
            <div className="setting-row">
              <div>
                <strong>Lock After Generation (Read-Only)</strong>
                <div className="sub-text">Prevent editing of generated PDFs</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
            <div className="setting-row">
              <div>
                <strong>Disable Copy/Print</strong>
                <div className="sub-text">Set PDF DRM permissions</div>
              </div>
              <div className="toggle-switch"></div>
            </div>
            <div className="setting-row">
              <div>
                <strong>Tamper Detection Hash</strong>
                <div className="sub-text">Store SHA-256 hash in DB</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQrBarcodes = () => (
    <div className="dm-view fade-in">
       <div className="dm-header">
        <div>
          <h2 className="dm-title">QR & Barcodes</h2>
          <p className="dm-subtitle">Generate payment QRs, invoice verification codes, and product barcodes</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="dm-section">
          <h3>QR Code Generation</h3>
          <div style={{marginTop:'1.5rem', display:'flex', gap:'1.5rem'}}>
            <div className="qr-preview">
              <QrCode size={100} color="#000"/>
              <span style={{fontSize:'0.8rem', fontWeight:'bold'}}>UPI Payment</span>
            </div>
            <div style={{flex:1, display:'flex', flexDirection:'column', gap:'1rem'}}>
              <div className="setting-row" style={{padding:'0.5rem 0'}}>
                <span>Append Payment QR to Invoices</span>
                <div className="toggle-switch on"></div>
              </div>
              <div className="setting-row" style={{padding:'0.5rem 0'}}>
                <span>Invoice Verification QR</span>
                <div className="toggle-switch on"></div>
              </div>
              <div className="setting-row" style={{padding:'0.5rem 0'}}>
                <span>QR Code Logo Overlay</span>
                <div className="toggle-switch"></div>
              </div>
              <button className="btn-secondary" style={{marginTop:'auto'}}>Generate Custom QR</button>
            </div>
          </div>
        </div>

        <div className="dm-section">
          <h3>Product Barcodes</h3>
          <div style={{marginTop:'1.5rem', display:'flex', gap:'1.5rem'}}>
            <div style={{display:'flex', flexDirection:'column', gap:'1rem', flex:1}}>
              <div className="form-group">
                <label>Barcode Format</label>
                <select>
                  <option>Code128 (Standard)</option>
                  <option>EAN13 (Retail)</option>
                  <option>UPC</option>
                  <option>Code39</option>
                </select>
              </div>
              <div className="setting-row" style={{padding:'0.5rem 0'}}>
                <span>Auto-generate for new products</span>
                <div className="toggle-switch on"></div>
              </div>
              <button className="btn-secondary" style={{marginTop:'auto'}}><Printer size={16}/> Print Labels</button>
            </div>
            <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
              <div className="barcode-preview">
                <div style={{width:'150px', height:'60px', background:'repeating-linear-gradient(90deg, #000 0px, #000 2px, #fff 2px, #fff 4px, #000 4px, #000 7px, #fff 7px, #fff 9px, #000 9px, #000 12px, #fff 12px, #fff 13px)', marginBottom:'5px'}}></div>
                <span style={{letterSpacing:'2px'}}>PRD1002495</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


  return (
    <div className="document-management-wrapper">
      {activeTab === 'dashboard' && (
        <div className="dm-header" style={{paddingBottom:0, borderBottom:'none', marginBottom:'1rem'}}>
          <button className="back-btn" onClick={onBack}>← Back to Home</button>
        </div>
      )}
      
      <div className="tabs-simple">
        <button className={`tab-simple ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>Overview</button>
        <button className={`tab-simple ${activeTab === 'branding' ? 'active' : ''}`} onClick={() => setActiveTab('branding')}>Branding & Templates</button>
        <button className={`tab-simple ${activeTab === 'print' ? 'active' : ''}`} onClick={() => setActiveTab('print')}>PDF & Print</button>
        <button className={`tab-simple ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>Signatures & Security</button>
        <button className={`tab-simple ${activeTab === 'qr' ? 'active' : ''}`} onClick={() => setActiveTab('qr')}>QR & Barcodes</button>
      </div>

      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'branding' && renderBranding()}
      {activeTab === 'print' && renderPdfPrint()}
      {activeTab === 'security' && renderSignaturesSecurity()}
      {activeTab === 'qr' && renderQrBarcodes()}
    </div>
  );
}
