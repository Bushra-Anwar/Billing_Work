const API_BASE = 'http://localhost:5000/api';

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(errorBody.message || `API error: ${response.status}`);
  }

  return response.json();
}

export const invoiceApi = {
  getStats: () => apiFetch('/invoices/stats/summary'),
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/invoices${query ? `?${query}` : ''}`);
  },
  getById: (id) => apiFetch(`/invoices/${id}`),
  create: (data) => apiFetch('/invoices', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiFetch(`/invoices/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  recordPayment: (id, data) => apiFetch(`/invoices/${id}/payments`, { method: 'POST', body: JSON.stringify(data) }),
  delete: (id) => apiFetch(`/invoices/${id}`, { method: 'DELETE' })
};

export const productApi = {
  getAll: () => apiFetch('/products'),
  create: (data) => apiFetch('/products', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiFetch(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiFetch(`/products/${id}`, { method: 'DELETE' })
};

export const customerApi = {
  getAll: () => apiFetch('/customers'),
  create: (data) => apiFetch('/customers', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiFetch(`/customers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiFetch(`/customers/${id}`, { method: 'DELETE' })
};

export const quotationApi = {
  getAll: () => apiFetch('/quotations'),
  create: (data) => apiFetch('/quotations', { method: 'POST', body: JSON.stringify(data) }),
  updateStatus: (id, status) => apiFetch(`/quotations/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  convertToInvoice: (id) => apiFetch(`/quotations/${id}/convert-to-invoice`, { method: 'POST' }),
  delete: (id) => apiFetch(`/quotations/${id}`, { method: 'DELETE' })
};

export const inventoryApi = {
  getSuppliers: () => apiFetch('/inventory/suppliers'),
  getWarehouses: () => apiFetch('/inventory/warehouses'),
  getMovements: () => apiFetch('/inventory/movements'),
  getBatches: () => apiFetch('/inventory/batches'),
  getPurchases: () => apiFetch('/inventory/purchases'),
  createItem: (type, data) => apiFetch(`/inventory/${type}`, { method: 'POST', body: JSON.stringify(data) }),
  deleteItem: (type, id) => apiFetch(`/inventory/${type}/${id}`, { method: 'DELETE' })
};

export const accountingApi = {
  getFinancialOverview: () => apiFetch('/accounting/financial-overview'),
  getExpenses: () => apiFetch('/accounting/expenses'),
  createExpense: (data) => apiFetch('/accounting/expenses', { method: 'POST', body: JSON.stringify(data) }),
  deleteExpense: (id) => apiFetch(`/accounting/expenses/${id}`, { method: 'DELETE' })
};

export const taxApi = {
  getSummary: () => apiFetch('/tax/summary')
};

export const aiApi = {
  parseInvoice: (prompt, saveToDb = false) => apiFetch('/ai/parse-invoice', { method: 'POST', body: JSON.stringify({ prompt, saveToDb }) }),
  copilotChat: (query) => apiFetch('/ai/copilot-chat', { method: 'POST', body: JSON.stringify({ query }) }),
  getForecast: () => apiFetch('/ai/forecast')
};

export const paymentApi = {
  getAll: () => apiFetch('/payment'),
  record: (data) => apiFetch('/payment/record', { method: 'POST', body: JSON.stringify(data) }),
  createOrder: (data) => apiFetch('/payment/create-order', { method: 'POST', body: JSON.stringify(data) }),
  verify: (data) => apiFetch('/payment/verify', { method: 'POST', body: JSON.stringify(data) })
};

export const authApi = {
  getMe: () => apiFetch('/auth/me'),
  login: (data) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  register: (data) => apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  updateProfile: (data) => apiFetch('/auth/profile', { method: 'PUT', body: JSON.stringify(data) })
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
