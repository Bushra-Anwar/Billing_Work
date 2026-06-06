import React, { useState, useEffect } from 'react';
import './index.css';
import CustomerManagement from './components/CustomerManagement';
import ProductServiceManagement from './components/ProductServiceManagement';
import InvoiceManagement from './components/InvoiceManagement';
import QuotationManagement from './components/QuotationManagement';
import PaymentManagement from './components/PaymentManagement';
import PaymentTracking from './components/PaymentTracking';
import TaxManagement from './components/TaxManagement';
import InventoryManagement from './components/InventoryManagement';
import ReportsAnalytics from './components/ReportsAnalytics';
import UserManagement from './components/UserManagement';
import NotificationsManagement from './components/NotificationsManagement';
import DocumentManagement from './components/DocumentManagement';
import AccountingManagement from './components/AccountingManagement';
import SubscriptionManagement from './components/SubscriptionManagement';
import EcommerceIntegration from './components/EcommerceIntegration';
import AdminPanel from './components/AdminPanel';
import AdvancedFeatures from './components/AdvancedFeatures';
import AIFeatures from './components/AIFeatures';
const featuresData = [
  {
    category: "Customer Management",
    icon: "👥",
    items: ["Add/Edit/Delete customers", "Customer profiles", "GST/VAT information", "Customer address book", "Customer transaction history", "Customer credit limits", "Customer notes"]
  },
  {
    category: "Product & Service Management",
    icon: "📦",
    items: ["Product catalog", "Categories", "SKU management", "Barcode support", "Stock tracking", "Service items", "Product pricing", "Bulk import/export"]
  },
  {
    category: "Invoice Management",
    icon: "📄",
    items: ["Create invoices", "Draft invoices", "Recurring invoices", "Proforma invoices", "Tax invoices", "Credit notes", "Debit notes", "Invoice templates", "Custom invoice numbering", "Invoice status tracking"]
  },
  {
    category: "Quotation & Estimates",
    icon: "📝",
    items: ["Create quotations", "Convert quotation to invoice", "Approval workflow", "Quote expiry dates"]
  },
  {
    category: "Payment Features",
    icon: "💳",
    items: ["Cash payments", "Bank transfer", "UPI payments", "Credit/Debit cards", "Wallet payments", "Partial payments", "Advance payments", "Outstanding balances", "Payment reminders", "Due date alerts", "Late payment tracking", "Auto-reconciliation"]
  },
  {
    category: "Tax Features",
    icon: "🏛️",
    items: ["GST support", "CGST/SGST/IGST calculations", "VAT support", "Multiple tax rates", "Tax reports", "HSN/SAC codes", "Reverse charge support", "Tax exemption handling"]
  },
  {
    category: "Inventory Features",
    icon: "🏢",
    items: ["Stock in/out", "Purchase management", "Supplier management", "Low stock alerts", "Inventory valuation", "Batch tracking", "Serial number tracking", "Warehouse management"]
  },
  {
    category: "Reports & Analytics",
    icon: "📊",
    items: ["Daily sales", "Weekly sales", "Monthly sales", "Yearly sales", "Product-wise sales", "Customer-wise sales", "Profit & loss", "Balance sheet", "Cash flow", "Tax summary", "Expense reports", "Revenue overview", "Pending invoices", "Top customers", "Best-selling products", "Real-time charts"]
  },
  {
    category: "User Management",
    icon: "🔐",
    items: ["Multi-user accounts", "Role-based permissions", "Admin", "Manager", "Accountant", "Salesperson", "Audit logs", "Activity tracking"]
  },
  {
    category: "Notifications",
    icon: "🔔",
    items: ["Email invoices", "WhatsApp invoice sharing", "SMS reminders", "Payment confirmation notifications", "Due invoice alerts"]
  },
  {
    category: "Document Features",
    icon: "📑",
    items: ["PDF generation", "Invoice printing", "Custom branding", "Company logo", "Digital signatures", "QR codes", "Barcode generation"]
  },
  {
    category: "Accounting Features",
    icon: "📘",
    items: ["Chart of accounts", "Journal entries", "Ledger management", "Expense tracking", "Bank reconciliation", "Trial balance"]
  },
  {
    category: "Subscription Billing (SaaS)",
    icon: "🔄",
    items: ["Monthly subscriptions", "Annual subscriptions", "Automatic renewals", "Proration", "Coupons", "Free trials", "Subscription analytics"]
  },
  {
    category: "E-commerce Integration",
    icon: "🛒",
    items: ["Order management", "Cart integration", "Payment gateway integration", "Shipping management", "Refund handling"]
  },
  {
    category: "Admin Panel",
    icon: "⚙️",
    items: ["System settings", "Tax configuration", "Invoice templates", "Currency settings", "Backup management", "User permissions"]
  },
  {
    category: "Advanced Features",
    icon: "🚀",
    items: ["Multi-company support", "Multi-currency support", "Multi-language support", "Dark mode", "API access", "Webhooks", "Data export/import", "Mobile responsive design", "Offline support (PWA)"]
  },
  {
    category: "AI Features (Modern)",
    icon: "✨",
    items: ["AI invoice generation", "Expense categorization", "Revenue forecasting", "Smart payment reminders", "Fraud detection", "Business insights chatbot"]
  }
];

function App() {
  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-brand">
          <span className="rainbow-text logo">NexusBill</span>
        </div>
        <div className="nav-links">
          <button className={`nav-link ${activeTab === 'Home' ? 'active' : ''}`} onClick={() => setActiveTab('Home')}>Main</button>
          <button className={`nav-link ${activeTab === 'Login' ? 'active' : ''}`} onClick={() => setActiveTab('Login')}>Login</button>
          <button className={`nav-link ${activeTab === 'Registration' ? 'active' : ''}`} onClick={() => setActiveTab('Registration')}>Registration</button>
        </div>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </nav>

      <main className="main-content">
        {activeTab === 'Home' && (
          <div className="home-view fade-in">
            <header className="hero">
              <h1 className="hero-title">
                The Ultimate <span className="rainbow-text">Billing Ecosystem</span>
              </h1>
              <p className="hero-subtitle">
                Everything you need to manage your business, from invoicing and inventory to AI-powered insights, in one seamless platform.
              </p>
              <div className="hero-actions">
                <button className="btn-primary rainbow-bg" onClick={() => setActiveTab('Registration')}>Get Started Free</button>
                <button className="btn-secondary">Explore Features</button>
              </div>
            </header>

            <section className="features-section">
              <div className="section-header">
                <h2>Powerful Capabilities</h2>
                <p>Designed for scale, built for speed.</p>
              </div>
              <div className="features-grid">
                {featuresData.map((feature, index) => (
                  <div 
                    key={index} 
                    className="feature-card" 
                    style={{animationDelay: `${index * 0.05}s`, cursor: 'pointer'}}
                    onClick={() => {
                      const categoryMap = {
                        "Customer Management": "CustomerManagement",
                        "Product & Service Management": "ProductServiceManagement",
                        "Invoice Management": "InvoiceManagement",
                        "Quotation & Estimates": "QuotationManagement",
                        "Payment Features": "PaymentManagement",
                        "Payment Tracking": "PaymentTracking",
                        "Tax Features": "TaxManagement",
                        "Inventory Features": "InventoryManagement",
                        "Reports & Analytics": "ReportsAnalytics",
                        "User Management": "UserManagement",
                        "Notifications": "NotificationsManagement",
                        "Document Features": "DocumentManagement",
                        "Accounting Features": "AccountingManagement",
                        "Subscription Billing (SaaS)": "SubscriptionManagement",
                        "E-commerce Integration": "EcommerceIntegration",
                        "Admin Panel": "AdminPanel",
                        "Advanced Features": "AdvancedFeatures",
                        "AI Features (Modern)": "AIFeatures"
                      };
                      if (categoryMap[feature.category]) {
                        setActiveTab(categoryMap[feature.category]);
                      }
                    }}
                  >
                    <div className="feature-icon">{feature.icon}</div>
                    <h3 className="feature-title">{feature.category}</h3>
                    <ul className="feature-list">
                      {feature.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'CustomerManagement' && (
          <CustomerManagement onBack={() => setActiveTab('Home')} />
        )}

        {activeTab === 'ProductServiceManagement' && (
          <ProductServiceManagement onBack={() => setActiveTab('Home')} />
        )}

        {activeTab === 'InvoiceManagement' && (
          <InvoiceManagement onBack={() => setActiveTab('Home')} />
        )}

        {activeTab === 'QuotationManagement' && (
          <QuotationManagement onBack={() => setActiveTab('Home')} />
        )}

        {activeTab === 'PaymentManagement' && (
          <PaymentManagement onBack={() => setActiveTab('Home')} />
        )}

        {activeTab === 'PaymentTracking' && (
          <PaymentTracking onBack={() => setActiveTab('Home')} />
        )}

        {activeTab === 'TaxManagement' && (
          <TaxManagement onBack={() => setActiveTab('Home')} />
        )}

        {activeTab === 'InventoryManagement' && (
          <InventoryManagement onBack={() => setActiveTab('Home')} />
        )}

        {activeTab === 'ReportsAnalytics' && (
          <ReportsAnalytics onBack={() => setActiveTab('Home')} />
        )}

        {activeTab === 'UserManagement' && (
          <UserManagement onBack={() => setActiveTab('Home')} />
        )}

        {activeTab === 'NotificationsManagement' && (
          <NotificationsManagement onBack={() => setActiveTab('Home')} />
        )}

        {activeTab === 'DocumentManagement' && (
          <DocumentManagement onBack={() => setActiveTab('Home')} />
        )}

        {activeTab === 'AccountingManagement' && (
          <AccountingManagement onBack={() => setActiveTab('Home')} />
        )}

        {activeTab === 'SubscriptionManagement' && (
          <SubscriptionManagement onBack={() => setActiveTab('Home')} />
        )}

        {activeTab === 'EcommerceIntegration' && (
          <EcommerceIntegration onBack={() => setActiveTab('Home')} />
        )}

        {activeTab === 'AdminPanel' && (
          <AdminPanel onBack={() => setActiveTab('Home')} />
        )}

        {activeTab === 'AdvancedFeatures' && (
          <AdvancedFeatures onBack={() => setActiveTab('Home')} />
        )}

        {activeTab === 'AIFeatures' && (
          <AIFeatures onBack={() => setActiveTab('Home')} />
        )}

        {activeTab === 'Login' && (
          <div className="auth-view fade-in">
            <div className="auth-card">
              <div className="auth-header">
                <h2>Welcome Back</h2>
                <p>Login to your <span className="rainbow-text">NexusBill</span> account</p>
              </div>
              <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                <div className="input-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="name@company.com" required />
                </div>
                <div className="input-group">
                  <label>Password</label>
                  <input type="password" placeholder="••••••••" required />
                </div>
                <div className="auth-options">
                  <label className="checkbox-label">
                    <input type="checkbox" /> Remember me
                  </label>
                  <a href="#" className="forgot-link">Forgot password?</a>
                </div>
                <button className="btn-primary rainbow-bg full-width" type="submit">Sign In</button>
              </form>
              <p className="auth-footer">
                Don't have an account? <a href="#" onClick={() => setActiveTab('Registration')} className="rainbow-text">Register here</a>
              </p>
            </div>
          </div>
        )}

        {activeTab === 'Registration' && (
          <div className="auth-view fade-in">
            <div className="auth-card">
              <div className="auth-header">
                <h2>Create Account</h2>
                <p>Join <span className="rainbow-text">NexusBill</span> today</p>
              </div>
              <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <div className="input-group">
                    <label>First Name</label>
                    <input type="text" placeholder="John" required />
                  </div>
                  <div className="input-group">
                    <label>Last Name</label>
                    <input type="text" placeholder="Doe" required />
                  </div>
                </div>
                <div className="input-group">
                  <label>Company Name</label>
                  <input type="text" placeholder="Acme Inc." required />
                </div>
                <div className="input-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="name@company.com" required />
                </div>
                <div className="input-group">
                  <label>Password</label>
                  <input type="password" placeholder="Create a strong password" required />
                </div>
                <button className="btn-primary rainbow-bg full-width" type="submit">Start Free Trial</button>
              </form>
              <p className="auth-footer">
                Already have an account? <a href="#" onClick={() => setActiveTab('Login')} className="rainbow-text">Login here</a>
              </p>
            </div>
          </div>
        )}
      </main>
      
      <footer className="footer">
        <p>&copy; 2026 NexusBill. Crafted with <span className="rainbow-text">innovation</span>.</p>
      </footer>
    </div>
  );
}

export default App;
