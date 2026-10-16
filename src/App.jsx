import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
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
import MainDashboard from './components/MainDashboard';
import POSBilling from './components/POSBilling';
import SubscriptionDemo from './components/SubscriptionDemo';
import Login from './components/Login';
import Registration from './components/Registration';

const categoryTabMap = {
  "Customer Management": "CustomerManagement",
  "E-commerce Integration": "EcommerceIntegration",
  "Invoice Management": "InvoiceManagement",
  "Quotation & Estimates": "QuotationManagement",
  "Payment Features": "PaymentManagement",
  "Notifications": "NotificationsManagement",
  "Document Features": "DocumentManagement",
  "Product & Service Management": "ProductServiceManagement",
  "Inventory Features": "InventoryManagement",
  "Accounting Features": "AccountingManagement",
  "Tax Features": "TaxManagement",
  "Reports & Analytics": "ReportsAnalytics",
  "AI Features (Modern)": "AIFeatures",
  "Admin Panel": "AdminPanel",
  "Subscription Billing (SaaS)": "SubscriptionManagement",
  "User Management": "UserManagement",
  "Advanced Features": "AdvancedFeatures"
};
const adminFeatures = [
  {
    category: "Admin Panel",
    icon: "⚙️",
    items: ["System settings", "Tax configuration", "Invoice templates", "Currency settings", "Backup management", "User permissions"]
  },
  {
    category: "Subscription Billing (SaaS)",
    icon: "🔄",
    items: ["Monthly subscriptions", "Annual subscriptions", "Automatic renewals", "Proration", "Coupons", "Free trials", "Subscription analytics"]
  },
  {
    category: "User Management",
    icon: "🔐",
    items: ["Multi-user accounts", "Role-based permissions", "Admin", "Manager", "Accountant", "Salesperson", "Audit logs", "Activity tracking"]
  },
  {
    category: "Advanced Features",
    icon: "🚀",
    items: ["Multi-company support", "Multi-currency support", "Multi-language support", "Dark mode", "API access", "Webhooks", "Data export/import", "Mobile responsive design"]
  }
];

const sellerFeatures = [
  {
    category: "Product & Service Management",
    icon: "📦",
    items: ["Product catalog", "Categories", "SKU management", "Barcode support", "Stock tracking", "Service items", "Product pricing"]
  },
  {
    category: "Inventory Features",
    icon: "🏢",
    items: ["Stock in/out", "Purchase management", "Supplier management", "Low stock alerts", "Inventory valuation", "Batch tracking"]
  },
  {
    category: "Accounting Features",
    icon: "📘",
    items: ["Chart of accounts", "Journal entries", "Ledger management", "Expense tracking", "Bank reconciliation", "Trial balance"]
  },
  {
    category: "Tax Features",
    icon: "🏛️",
    items: ["GST support", "CGST/SGST/IGST calculations", "VAT support", "Multiple tax rates", "Tax reports", "HSN/SAC codes"]
  },
  {
    category: "Reports & Analytics",
    icon: "📊",
    items: ["Daily sales", "Monthly sales", "Profit & loss", "Balance sheet", "Cash flow", "Tax summary", "Expense reports"]
  },
  {
    category: "AI Features (Modern)",
    icon: "✨",
    items: ["AI invoice generation", "Expense categorization", "Revenue forecasting", "Smart payment reminders", "Business insights"]
  }
];

const buyerFeatures = [
  { category: "Customer Management", icon: "👥" },
  { category: "E-commerce Integration", icon: "🛒" },
  { category: "Invoice Management", icon: "📄" },
  { category: "Quotation & Estimates", icon: "📝" },
  { category: "Payment Features", icon: "💳" },
  { category: "Notifications", icon: "🔔" },
  { category: "Document Features", icon: "📑" }
];

function App() {
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('Home');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const searchableFeatures = [
    { tab: 'AdminPanel', icon: '⚙️', name: 'Admin Panel & Settings', keywords: 'system tax invoice currency backup user permission settings' },
    { tab: 'SubscriptionManagement', icon: '🔄', name: 'Subscription Billing', keywords: 'monthly annual automatic renewals proration coupons free trials analytics' },
    { tab: 'UserManagement', icon: '🔐', name: 'User Management', keywords: 'multi user accounts role based permissions admin manager accountant salesperson audit logs tracking' },
    { tab: 'AdvancedFeatures', icon: '🚀', name: 'Advanced Features', keywords: 'multi company currency language dark mode api access webhooks data export import mobile responsive' },
    { tab: 'ProductServiceManagement', icon: '📦', name: 'Product & Service Management', keywords: 'catalog categories sku barcode stock tracking service items pricing' },
    { tab: 'InventoryManagement', icon: '🏢', name: 'Inventory & Stock', keywords: 'stock in out purchase supplier low alerts valuation batch' },
    { tab: 'AccountingManagement', icon: '📘', name: 'Accounting & Ledger', keywords: 'chart accounts journal entries ledger expense tracking bank reconciliation trial balance' },
    { tab: 'TaxManagement', icon: '🏛️', name: 'Tax & GST Features', keywords: 'gst cgst sgst igst calculations vat multiple rates reports hsn sac codes' },
    { tab: 'ReportsAnalytics', icon: '📊', name: 'Reports & Analytics', keywords: 'daily monthly sales profit loss balance sheet cash flow tax summary expense reports' },
    { tab: 'AIFeatures', icon: '✨', name: 'AI Features (Modern)', keywords: 'ai invoice generation expense categorization revenue forecasting smart payment reminders insights' },
    { tab: 'POSBilling', icon: '⚡', name: 'POS Fast Billing Register', keywords: 'pos point of sale barcode quick cash tender thermal print' },
    { tab: 'CustomerManagement', icon: '👥', name: 'Customer Management', keywords: 'buyers clients crm' },
    { tab: 'EcommerceIntegration', icon: '🛒', name: 'E-commerce Integration', keywords: 'online shop store sync' },
    { tab: 'InvoiceManagement', icon: '📄', name: 'Invoice Management', keywords: 'billing bills invoices create generate' },
    { tab: 'QuotationManagement', icon: '📝', name: 'Quotation & Estimates', keywords: 'quotes estimates proposals' },
    { tab: 'PaymentManagement', icon: '💳', name: 'Payment Features', keywords: 'collect pay payments gateway' },
    { tab: 'NotificationsManagement', icon: '🔔', name: 'Notifications', keywords: 'alerts emails sms' },
    { tab: 'DocumentManagement', icon: '📑', name: 'Document Features', keywords: 'print pdf export documents' }
  ];

  const { user, logout } = useContext(AuthContext);

  const filteredResults = searchQuery.trim() === '' ? [] : searchableFeatures.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.keywords.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      {activeTab === 'Dashboard' ? (
        <MainDashboard setActiveTab={setActiveTab} theme={theme} toggleTheme={toggleTheme} />
      ) : (
        <div className="app-container">
          <nav className="navbar">
            <div className="nav-brand">
              <span className="rainbow-text logo">YourBill</span>
            </div>
            <div className="nav-links">
              <button className={`nav-link ${activeTab === 'Home' ? 'active' : ''}`} onClick={() => setActiveTab('Home')}>Main</button>
              <button className={`nav-link ${activeTab === 'Dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('Dashboard')}>Dashboard</button>
              <button className={`nav-link ${activeTab === 'Explore' ? 'active' : ''}`} onClick={() => setActiveTab('Explore')}>Explore</button>
              <button className={`nav-link ${activeTab === 'Login' ? 'active' : ''}`} onClick={() => setActiveTab('Login')}>Login</button>
              <button className={`nav-link ${activeTab === 'Registration' ? 'active' : ''}`} onClick={() => setActiveTab('Registration')}>Registration</button>
            </div>
            <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="search-bar-container" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <span className="search-icon" style={{ position: 'absolute', left: '10px' }}>🔍</span>
                <input
                  type="text"
                  placeholder="Search features, tools (e.g. GST, AI)..."
                  className="universal-search"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setShowSearchDropdown(true); }}
                  onFocus={() => setShowSearchDropdown(true)}
                  onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
                  style={{ padding: '0.5rem 1rem 0.5rem 2.5rem', borderRadius: '20px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'var(--text-main)', width: '250px' }}
                />
                {showSearchDropdown && searchQuery.trim() !== '' && (
                  <div className="search-dropdown fade-in" style={{ position: 'absolute', top: '45px', left: 0, width: '350px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '0.5rem', zIndex: 1000, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
                    {filteredResults.length > 0 ? (
                      <div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.7, padding: '0.5rem', marginBottom: '0.2rem' }}>✨ AI Search Results for "{searchQuery}"</div>
                        {filteredResults.map((result, idx) => (
                          <div
                            key={idx}
                            onClick={() => { setActiveTab(result.tab); setSearchQuery(''); setShowSearchDropdown(false); }}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem', cursor: 'pointer', borderRadius: '8px', transition: '0.2s' }}
                            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                          >
                            <span style={{ fontSize: '1.5rem' }}>{result.icon}</span>
                            <div>
                              <div style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>{result.name}</div>
                              <div style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{result.keywords}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ padding: '1rem', textAlign: 'center', opacity: 0.7 }}>
                        No matches found. Try "Invoice" or "GST".
                      </div>
                    )}
                  </div>
                )}
              </div>
              <button className="upgrade-btn header-btn" onClick={() => setActiveTab('SubscriptionDemo')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'linear-gradient(45deg, #FFD700, #FDB931)', color: '#000', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>
                👑 Subscription
              </button>

              <div className="notification-wrapper" style={{ position: 'relative' }}>
                <div className="notification-bell header-btn" onClick={() => setShowNotifications(!showNotifications)} style={{ cursor: 'pointer', fontSize: '1.2rem', position: 'relative' }}>
                  🔔 <span className="badge" style={{ position: 'absolute', top: '-5px', right: '-10px', background: 'red', color: 'white', borderRadius: '50%', padding: '0.1rem 0.4rem', fontSize: '0.7rem' }}>3</span>
                </div>
                {showNotifications && (
                  <div className="dropdown-menu fade-in" style={{ position: 'absolute', right: 0, top: '40px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '1rem', width: '250px', zIndex: 100 }}>
                    <div className="dropdown-header" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Notifications</div>
                    <div className="dropdown-item"><strong>System:</strong> New update available</div>
                    <div className="dropdown-item"><strong>Billing:</strong> Payment received</div>
                  </div>
                )}
              </div>

              <div className="profile-wrapper" style={{ position: 'relative' }}>
                <div className="profile-avatar" onClick={() => setShowProfile(!showProfile)} style={{ cursor: 'pointer', fontSize: '1.5rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '50%', padding: '0.3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px' }}>
                  {user ? (user.name || user.firstName || 'U')[0].toUpperCase() : '👤'}
                </div>
                {showProfile && (
                  <div className="dropdown-menu fade-in" style={{ position: 'absolute', right: 0, top: '50px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '1rem', width: '150px', zIndex: 100 }}>
                    <div className="dropdown-header" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{user ? (user.name || user.firstName || 'My Profile') : 'My Profile'}</div>
                    <div className="dropdown-item">Settings</div>
                    {user ? (
                      <div className="dropdown-item" onClick={() => { logout(); setActiveTab('Home'); }}>Log Out</div>
                    ) : (
                      <div className="dropdown-item" onClick={() => setActiveTab('Login')}>Log In</div>
                    )}
                  </div>
                )}
              </div>
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
                    <button className="btn-secondary" onClick={() => setActiveTab('Explore')}>Explore Features</button>
                  </div>
                </header>
              </div>
            )}

            {(activeTab === 'Explore' || activeTab === 'Home') && (
              <div className="explore-view fade-in" style={{ marginTop: activeTab === 'Home' ? '8rem' : '0' }}>
                <section className="features-section">
                  <div className="section-header">
                    <h2>Multi-Tier Architecture</h2>
                    <p>Designed for scale across Admins, Sellers, and Buyers.</p>
                  </div>

                  <div className="tier-section">
                    <div className="tier-header">
                      <h3>1. Buyer Operations</h3>
                      <p>End-user interactions and sales tools</p>
                    </div>
                    <div className="bottom-cascade-wrapper">
                      <div className="curved-bg-top"></div>
                      <div className="buyer-cascade">
                        {buyerFeatures.map((feature, index) => (
                          <div key={index} className={`cascade-item cascade-${index + 1}`} onClick={() => setActiveTab(categoryTabMap[feature.category] || 'Login')}>
                            <div className="feature-icon">{feature.icon}</div>
                            <h4>{feature.category}</h4>
                          </div>
                        ))}
                      </div>
                      <div className="curved-bg-bottom"></div>
                    </div>
                  </div>

                  <div className="tier-section">
                    <div className="tier-header">
                      <h3>2. Client Workspace (Seller)</h3>
                      <p>Business operations for your subscribed sellers</p>
                    </div>
                    <div className="explore-bento-grid client-grid">
                      {sellerFeatures.map((feature, index) => {
                        const isLargeCard = index === 2 || index === 5;
                        return (
                          <div key={index} className={`bento-item bento-${index + 1} ${isLargeCard ? 'large-card' : ''}`} onClick={() => setActiveTab(categoryTabMap[feature.category] || 'Login')}>
                            <div className="feature-icon">{feature.icon}</div>
                            <div className="feature-content">
                              <h3 className="feature-title">{feature.category}</h3>
                              {isLargeCard ? (
                                <ul className="feature-list">
                                  {feature.items.slice(0, 6).map((item, i) => (
                                    <li key={i}>{item}</li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="bento-desc">{feature.items.length} powerful modules and tools included in this feature.</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="tier-section">
                    <div className="tier-header">
                      <h3>3. SaaS Administration</h3>
                      <p>Platform management tools for the main Admin</p>
                    </div>
                    <div className="admin-bento-grid">
                      {adminFeatures.map((feature, index) => (
                        <div key={index} className="bento-item admin-card" onClick={() => setActiveTab(categoryTabMap[feature.category] || 'Login')}>
                          <div className="feature-icon">{feature.icon}</div>
                          <div className="feature-content">
                            <h3 className="feature-title">{feature.category}</h3>
                            <ul className="feature-list">
                              {feature.items.slice(0, 6).map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </section>
              </div>
            )}

            {activeTab === 'CustomerManagement' && (
              <CustomerManagement onBack={() => setActiveTab('Dashboard')} />
            )}

            {activeTab === 'ProductServiceManagement' && (
              <ProductServiceManagement onBack={() => setActiveTab('Dashboard')} />
            )}

            {activeTab === 'InvoiceManagement' && (
              <InvoiceManagement onBack={() => setActiveTab('Dashboard')} />
            )}

            {activeTab === 'QuotationManagement' && (
              <QuotationManagement onBack={() => setActiveTab('Dashboard')} />
            )}

            {activeTab === 'PaymentManagement' && (
              <PaymentManagement onBack={() => setActiveTab('Dashboard')} />
            )}

            {activeTab === 'PaymentTracking' && (
              <PaymentTracking onBack={() => setActiveTab('Dashboard')} />
            )}

            {activeTab === 'TaxManagement' && (
              <TaxManagement onBack={() => setActiveTab('Dashboard')} />
            )}

            {activeTab === 'InventoryManagement' && (
              <InventoryManagement onBack={() => setActiveTab('Dashboard')} />
            )}

            {activeTab === 'ReportsAnalytics' && (
              <ReportsAnalytics onBack={() => setActiveTab('Dashboard')} />
            )}

            {activeTab === 'UserManagement' && (
              <UserManagement onBack={() => setActiveTab('Dashboard')} />
            )}

            {activeTab === 'NotificationsManagement' && (
              <NotificationsManagement onBack={() => setActiveTab('Dashboard')} />
            )}

            {activeTab === 'DocumentManagement' && (
              <DocumentManagement onBack={() => setActiveTab('Dashboard')} />
            )}

            {activeTab === 'AccountingManagement' && (
              <AccountingManagement onBack={() => setActiveTab('Dashboard')} />
            )}

            {activeTab === 'SubscriptionManagement' && (
              <SubscriptionManagement onBack={() => setActiveTab('Dashboard')} />
            )}

            {activeTab === 'EcommerceIntegration' && (
              <EcommerceIntegration onBack={() => setActiveTab('Dashboard')} />
            )}

            {activeTab === 'AdminPanel' && (
              <AdminPanel onBack={() => setActiveTab('Dashboard')} />
            )}

            {activeTab === 'AdvancedFeatures' && (
              <AdvancedFeatures onBack={() => setActiveTab('Dashboard')} />
            )}

            {activeTab === 'AIFeatures' && (
              <AIFeatures onBack={() => setActiveTab('Dashboard')} />
            )}

            {activeTab === 'POSBilling' && (
              <POSBilling onBack={() => setActiveTab('Dashboard')} onInvoiceGenerated={() => setActiveTab('InvoiceManagement')} />
            )}

            {activeTab === 'SubscriptionDemo' && (
              <SubscriptionDemo onBack={() => setActiveTab('Home')} />
            )}

            {activeTab === 'Login' && <Login setActiveTab={setActiveTab} />}

            {activeTab === 'Registration' && <Registration setActiveTab={setActiveTab} />}
          </main>

          <footer className="footer">
            <p>&copy; 2026 YourBill. Crafted with <span className="rainbow-text">innovation</span>.</p>
          </footer>
        </div>
      )}
    </>
  );
}

export default App;
