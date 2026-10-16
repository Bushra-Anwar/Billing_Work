// ============================================================
// LOCAL STORAGE BASED DATA LAYER — No backend needed!
// All data persists in the browser (localStorage)
// ============================================================

const generateId = () => {
  return Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 5).toUpperCase();
};

const DB = {
  get: (key) => {
    try { return JSON.parse(localStorage.getItem(key) || '[]'); }
    catch { return []; }
  },
  set: (key, data) => localStorage.setItem(key, JSON.stringify(data)),
  getObj: (key, def = {}) => {
    try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(def)); }
    catch { return def; }
  },
  setObj: (key, data) => localStorage.setItem(key, JSON.stringify(data))
};

// ============================================================
// PRODUCTS API
// ============================================================
export const productApi = {
  getAll: async () => {
    return DB.get('products');
  },
  create: async (data) => {
    const products = DB.get('products');
    const newProduct = {
      ...data,
      _id: generateId(),
      productId: 'PRD-' + generateId().slice(0, 6),
      status: 'Active',
      createdAt: new Date().toISOString()
    };
    products.push(newProduct);
    DB.set('products', products);
    return newProduct;
  },
  update: async (id, data) => {
    const products = DB.get('products');
    const idx = products.findIndex(p => p._id === id);
    if (idx !== -1) {
      products[idx] = { ...products[idx], ...data };
      DB.set('products', products);
      return products[idx];
    }
    throw new Error('Product not found');
  },
  delete: async (id) => {
    const products = DB.get('products').filter(p => p._id !== id);
    DB.set('products', products);
    return { success: true };
  }
};

// ============================================================
// CUSTOMERS API
// ============================================================
export const customerApi = {
  getAll: async () => {
    return DB.get('customers');
  },
  create: async (data) => {
    const customers = DB.get('customers');
    const newCustomer = {
      ...data,
      _id: generateId(),
      customerId: 'CUS-' + generateId().slice(0, 6),
      totalSpent: 0,
      invoicesCount: 0,
      status: 'Active',
      createdAt: new Date().toISOString()
    };
    customers.push(newCustomer);
    DB.set('customers', customers);
    return newCustomer;
  },
  update: async (id, data) => {
    const customers = DB.get('customers');
    const idx = customers.findIndex(c => c._id === id);
    if (idx !== -1) {
      customers[idx] = { ...customers[idx], ...data };
      DB.set('customers', customers);
      return customers[idx];
    }
    throw new Error('Customer not found');
  },
  delete: async (id) => {
    const customers = DB.get('customers').filter(c => c._id !== id);
    DB.set('customers', customers);
    return { success: true };
  }
};

// ============================================================
// INVOICES API
// ============================================================
export const invoiceApi = {
  getStats: async () => {
    const invoices = DB.get('invoices');
    const total = invoices.reduce((s, i) => s + (i.totalAmount || 0), 0);
    const paid = invoices.filter(i => i.status === 'Paid').reduce((s, i) => s + (i.totalAmount || 0), 0);
    const unpaid = invoices.filter(i => i.status === 'Unpaid').reduce((s, i) => s + (i.totalAmount || 0), 0);
    return {
      totalInvoices: invoices.length,
      totalRevenue: total,
      paidAmount: paid,
      unpaidAmount: unpaid,
      overdueCount: invoices.filter(i => i.status === 'Overdue').length
    };
  },
  getAll: async (params = {}) => {
    let invoices = DB.get('invoices');
    if (params.status) invoices = invoices.filter(i => i.status === params.status);
    if (params.search) {
      const s = params.search.toLowerCase();
      invoices = invoices.filter(i =>
        (i.invoiceNumber || '').toLowerCase().includes(s) ||
        (i.customerName || '').toLowerCase().includes(s)
      );
    }
    return invoices.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  getById: async (id) => {
    const invoices = DB.get('invoices');
    const inv = invoices.find(i => i._id === id);
    if (!inv) throw new Error('Invoice not found');
    return inv;
  },
  create: async (data) => {
    const invoices = DB.get('invoices');
    const invNum = 'INV-' + new Date().getFullYear() + '-' + String(invoices.length + 1).padStart(4, '0');
    const newInvoice = {
      ...data,
      _id: generateId(),
      invoiceNumber: invNum,
      status: data.status || 'Unpaid',
      payments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    invoices.push(newInvoice);
    DB.set('invoices', invoices);

    // Update customer stats
    if (data.customerId) {
      const customers = DB.get('customers');
      const cidx = customers.findIndex(c => c._id === data.customerId);
      if (cidx !== -1) {
        customers[cidx].totalSpent = (customers[cidx].totalSpent || 0) + (data.totalAmount || 0);
        customers[cidx].invoicesCount = (customers[cidx].invoicesCount || 0) + 1;
        DB.set('customers', customers);
      }
    }
    // Reduce stock for products
    if (data.items && data.items.length > 0) {
      const products = DB.get('products');
      data.items.forEach(item => {
        if (item.productId) {
          const pidx = products.findIndex(p => p._id === item.productId);
          if (pidx !== -1 && products[pidx].type === 'Physical Product') {
            products[pidx].stock = Math.max(0, (products[pidx].stock || 0) - (item.quantity || 1));
          }
        }
      });
      DB.set('products', products);
    }
    return newInvoice;
  },
  update: async (id, data) => {
    const invoices = DB.get('invoices');
    const idx = invoices.findIndex(i => i._id === id);
    if (idx !== -1) {
      invoices[idx] = { ...invoices[idx], ...data, updatedAt: new Date().toISOString() };
      DB.set('invoices', invoices);
      return invoices[idx];
    }
    throw new Error('Invoice not found');
  },
  recordPayment: async (id, paymentData) => {
    const invoices = DB.get('invoices');
    const idx = invoices.findIndex(i => i._id === id);
    if (idx !== -1) {
      const payment = { ...paymentData, _id: generateId(), date: new Date().toISOString() };
      invoices[idx].payments = [...(invoices[idx].payments || []), payment];
      const totalPaid = invoices[idx].payments.reduce((s, p) => s + (p.amount || 0), 0);
      invoices[idx].paidAmount = totalPaid;
      if (totalPaid >= invoices[idx].totalAmount) invoices[idx].status = 'Paid';
      else if (totalPaid > 0) invoices[idx].status = 'Partial';
      invoices[idx].updatedAt = new Date().toISOString();
      DB.set('invoices', invoices);
      return invoices[idx];
    }
    throw new Error('Invoice not found');
  },
  delete: async (id) => {
    const invoices = DB.get('invoices').filter(i => i._id !== id);
    DB.set('invoices', invoices);
    return { success: true };
  }
};

// ============================================================
// QUOTATIONS API
// ============================================================
export const quotationApi = {
  getAll: async () => {
    return DB.get('quotations').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  create: async (data) => {
    const quotations = DB.get('quotations');
    const newQ = {
      ...data,
      _id: generateId(),
      quotationNumber: 'QUO-' + new Date().getFullYear() + '-' + String(quotations.length + 1).padStart(4, '0'),
      status: 'Draft',
      createdAt: new Date().toISOString()
    };
    quotations.push(newQ);
    DB.set('quotations', quotations);
    return newQ;
  },
  updateStatus: async (id, status) => {
    const quotations = DB.get('quotations');
    const idx = quotations.findIndex(q => q._id === id);
    if (idx !== -1) {
      quotations[idx].status = status;
      DB.set('quotations', quotations);
      return quotations[idx];
    }
    throw new Error('Quotation not found');
  },
  convertToInvoice: async (id) => {
    const quotations = DB.get('quotations');
    const q = quotations.find(q => q._id === id);
    if (!q) throw new Error('Quotation not found');
    const invoice = await invoiceApi.create({
      customerId: q.customerId,
      customerName: q.customerName,
      items: q.items,
      subtotal: q.subtotal,
      taxAmount: q.taxAmount,
      discount: q.discount,
      totalAmount: q.totalAmount,
      notes: q.notes,
      quotationRef: q.quotationNumber
    });
    await quotationApi.updateStatus(id, 'Converted');
    return invoice;
  },
  delete: async (id) => {
    const quotations = DB.get('quotations').filter(q => q._id !== id);
    DB.set('quotations', quotations);
    return { success: true };
  }
};

// ============================================================
// PAYMENTS API
// ============================================================
export const paymentApi = {
  getAll: async () => {
    const invoices = DB.get('invoices');
    const payments = [];
    invoices.forEach(inv => {
      (inv.payments || []).forEach(p => {
        payments.push({ ...p, invoiceNumber: inv.invoiceNumber, customerName: inv.customerName });
      });
    });
    return payments.sort((a, b) => new Date(b.date) - new Date(a.date));
  },
  record: async (data) => {
    return invoiceApi.recordPayment(data.invoiceId, data);
  },
  createOrder: async (data) => {
    return { orderId: 'ORD-' + generateId(), amount: data.amount };
  },
  verify: async (data) => {
    return { success: true };
  }
};

// ============================================================
// ACCOUNTING API
// ============================================================
export const accountingApi = {
  getFinancialOverview: async () => {
    const invoices = DB.get('invoices');
    const expenses = DB.get('expenses');
    const totalRevenue = invoices.filter(i => i.status === 'Paid').reduce((s, i) => s + (i.totalAmount || 0), 0);
    const totalExpenses = expenses.reduce((s, e) => s + (e.amount || 0), 0);
    return {
      totalRevenue,
      totalExpenses,
      netProfit: totalRevenue - totalExpenses,
      grossProfit: totalRevenue,
      invoiceCount: invoices.length,
      expenseCount: expenses.length
    };
  },
  getExpenses: async () => {
    return DB.get('expenses');
  },
  createExpense: async (data) => {
    const expenses = DB.get('expenses');
    const newExp = {
      ...data,
      _id: generateId(),
      expenseId: 'EXP-' + generateId().slice(0, 6),
      createdAt: new Date().toISOString()
    };
    expenses.push(newExp);
    DB.set('expenses', expenses);
    return newExp;
  },
  deleteExpense: async (id) => {
    const expenses = DB.get('expenses').filter(e => e._id !== id);
    DB.set('expenses', expenses);
    return { success: true };
  }
};

// ============================================================
// TAX API
// ============================================================
export const taxApi = {
  getSummary: async () => {
    const invoices = DB.get('invoices');
    const totalTax = invoices.reduce((s, i) => s + (i.taxAmount || 0), 0);
    const cgst = totalTax / 2;
    const sgst = totalTax / 2;
    return { totalTax, cgst, sgst, igst: 0, invoiceCount: invoices.length };
  }
};

// ============================================================
// AUTH API (localStorage-based)
// ============================================================
export const authApi = {
  login: async (data) => {
    const users = DB.get('users');
    // Default admin if no users exist
    if (users.length === 0) {
      const defaultUser = { _id: 'admin1', name: 'Admin', email: 'admin@billing.com', role: 'Admin', shopName: 'My Business' };
      DB.set('users', [{ ...defaultUser, password: 'admin123' }]);
      if (data.email === 'admin@billing.com' && data.password === 'admin123') {
        const token = 'local-token-' + generateId();
        localStorage.setItem('token', token);
        localStorage.setItem('currentUser', JSON.stringify(defaultUser));
        return { token, user: defaultUser };
      }
    }
    const user = users.find(u => u.email === data.email && u.password === data.password);
    if (!user) throw new Error('Invalid email or password');
    const token = 'local-token-' + generateId();
    localStorage.setItem('token', token);
    const { password, ...safeUser } = user;
    localStorage.setItem('currentUser', JSON.stringify(safeUser));
    return { token, user: safeUser };
  },
  register: async (data) => {
    const users = DB.get('users');
    if (users.find(u => u.email === data.email)) throw new Error('Email already registered');
    const newUser = {
      ...data,
      _id: generateId(),
      role: users.length === 0 ? 'Admin' : 'Staff',
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    DB.set('users', users);
    const token = 'local-token-' + generateId();
    localStorage.setItem('token', token);
    const { password, ...safeUser } = newUser;
    localStorage.setItem('currentUser', JSON.stringify(safeUser));
    return { token, user: safeUser };
  },
  getMe: async () => {
    const user = localStorage.getItem('currentUser');
    if (!user) throw new Error('Not authenticated');
    return JSON.parse(user);
  },
  updateProfile: async (data) => {
    const current = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const updated = { ...current, ...data };
    localStorage.setItem('currentUser', JSON.stringify(updated));
    return updated;
  }
};

// ============================================================
// INVENTORY API
// ============================================================
export const inventoryApi = {
  getSuppliers: async () => DB.get('suppliers'),
  getWarehouses: async () => DB.get('warehouses'),
  getMovements: async () => DB.get('movements'),
  getBatches: async () => DB.get('batches'),
  getPurchases: async () => DB.get('purchases'),
  createItem: async (type, data) => {
    const items = DB.get(type);
    const newItem = { ...data, _id: generateId(), createdAt: new Date().toISOString() };
    items.push(newItem);
    DB.set(type, items);
    return newItem;
  },
  deleteItem: async (type, id) => {
    const items = DB.get(type).filter(i => i._id !== id);
    DB.set(type, items);
    return { success: true };
  }
};

// ============================================================
// AI API (mock responses)
// ============================================================
export const aiApi = {
  parseInvoice: async (prompt) => {
    return { message: 'AI parsing available in cloud version.', items: [] };
  },
  copilotChat: async (query) => {
    const invoices = DB.get('invoices');
    const customers = DB.get('customers');
    const products = DB.get('products');
    return {
      reply: `You have ${invoices.length} invoices, ${customers.length} customers, and ${products.length} products in your system.`
    };
  },
  getForecast: async () => {
    return { forecast: [] };
  }
};

export default {
  invoice: invoiceApi,
  product: productApi,
  customer: customerApi,
  quotation: quotationApi,
  inventory: inventoryApi,
  accounting: accountingApi,
  tax: taxApi,
  ai: aiApi,
  payment: paymentApi,
  auth: authApi
};
