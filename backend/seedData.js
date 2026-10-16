import { getDefaultShop } from './middleware/authMiddleware.js';
import Product from './models/Product.js';
import Customer from './models/Customer.js';
import Invoice from './models/Invoice.js';
import Quotation from './models/Quotation.js';
import Payment from './models/Payment.js';
import Expense from './models/Expense.js';
import { Supplier, Warehouse, StockMovement, BatchTracking, PurchaseOrder } from './models/InventoryModels.js';

export async function seedInitialData() {
  try {
    const shop = await getDefaultShop();
    const shopId = shop._id;

    // Migrate any legacy documents missing shopId
    await Product.updateMany({ $or: [{ shopId: { $exists: false } }, { shopId: null }] }, { shopId }).catch(() => {});
    await Customer.updateMany({ $or: [{ shopId: { $exists: false } }, { shopId: null }] }, { shopId }).catch(() => {});
    await Invoice.updateMany({ $or: [{ shopId: { $exists: false } }, { shopId: null }] }, { shopId }).catch(() => {});
    await Quotation.updateMany({ $or: [{ shopId: { $exists: false } }, { shopId: null }] }, { shopId }).catch(() => {});
    await Expense.updateMany({ $or: [{ shopId: { $exists: false } }, { shopId: null }] }, { shopId }).catch(() => {});
    await Payment.updateMany({ $or: [{ shopId: { $exists: false } }, { shopId: null }] }, { shopId }).catch(() => {});

    // Check if products exist
    const totalProducts = await Product.countDocuments({});
    if (totalProducts < 3) {
      console.log('🌱 Seeding initial products...');
      const sampleProducts = [
        {
          shopId,
          productId: `PRD-${Date.now()}-1`,
          name: 'Dell Latitude 5540 Business Laptop (i7, 16GB, 512GB SSD)',
          type: 'Physical Product',
          category: 'Computers & Laptops',
          brand: 'Dell',
          hsnCode: '84713010',
          sku: 'DELL-LAT-5540',
          barcode: '8901234567890',
          price: 68000,
          costPrice: 55000,
          mrp: 75000,
          taxRate: '18%',
          stock: 24,
          minStock: 5,
          status: 'Active',
          image: '💻'
        },
        {
          shopId,
          productId: `PRD-${Date.now()}-2`,
          name: 'Logitech MX Master 3S Wireless Mouse',
          type: 'Physical Product',
          category: 'Computer Accessories',
          brand: 'Logitech',
          hsnCode: '84716060',
          sku: 'LOGI-MXM-3S',
          barcode: '8901234567891',
          price: 8999,
          costPrice: 6500,
          mrp: 9999,
          taxRate: '18%',
          stock: 35,
          minStock: 8,
          status: 'Active',
          image: '🖱️'
        },
        {
          shopId,
          productId: `PRD-${Date.now()}-3`,
          name: 'Samsung 27" 4K UHD IPS Monitor',
          type: 'Physical Product',
          category: 'Displays',
          brand: 'Samsung',
          hsnCode: '85285200',
          sku: 'SAMS-MON-27UHD',
          barcode: '8901234567892',
          price: 24999,
          costPrice: 19500,
          mrp: 29999,
          taxRate: '18%',
          stock: 14,
          minStock: 4,
          status: 'Active',
          image: '🖥️'
        },
        {
          shopId,
          productId: `PRD-${Date.now()}-4`,
          name: 'Thermal POS Billing Paper Rolls (Pack of 50 Rolls)',
          type: 'Physical Product',
          category: 'Consumables',
          brand: 'PaperLine',
          hsnCode: '48119090',
          sku: 'PPR-ROLL-50',
          barcode: '8901234567895',
          price: 1250,
          costPrice: 850,
          mrp: 1500,
          taxRate: '12%',
          stock: 6,
          minStock: 10,
          status: 'Low Stock',
          image: '📜'
        },
        {
          shopId,
          productId: `SRV-${Date.now()}-5`,
          name: 'Annual Software Maintenance & Cloud Backup Support (1 Year)',
          type: 'Service',
          category: 'IT Services',
          brand: 'YourBill Cloud',
          hsnCode: '998313',
          sku: 'SRV-AMC-YEAR',
          barcode: '8901234567896',
          price: 15000,
          costPrice: 3000,
          mrp: 18000,
          taxRate: '18%',
          stock: 999,
          minStock: 0,
          status: 'Active',
          image: '⚙️'
        }
      ];
      await Product.insertMany(sampleProducts);
    }

    // Check if customers exist globally
    const totalCustomers = await Customer.countDocuments({});
    if (totalCustomers < 2) {
      console.log('🌱 Seeding initial customers...');
      const sampleCustomers = [
        {
          shopId,
          customerId: `CUST-${Date.now()}-1`,
          name: 'Acme Corporation Pvt Ltd',
          phone: '+91 98201 12345',
          email: 'finance@acmecorp.in',
          gst: '27AAACA1234A1Z5',
          pan: 'AAACA1234A',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400051',
          addressLine1: 'Bandra Kurla Complex, Tower B',
          creditLimit: 200000,
          currentBalance: 12500,
          status: 'Active',
          type: 'B2B'
        },
        {
          shopId,
          customerId: `CUST-${Date.now()}-2`,
          name: 'Global Tech Innovations LLP',
          phone: '+91 98450 67890',
          email: 'accounts@globaltech.co',
          gst: '29BBBCB5678B1Z6',
          pan: 'BBBCB5678B',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560100',
          addressLine1: 'Electronic City, Phase 1',
          creditLimit: 150000,
          currentBalance: 45000,
          status: 'Active',
          type: 'B2B'
        },
        {
          shopId,
          customerId: `CUST-${Date.now()}-3`,
          name: 'Sharma & Sons Enterprises',
          phone: '+91 99112 33445',
          email: 'contact@sharmasons.com',
          gst: '07CCCC0987C1Z7',
          pan: 'CCCC0987C',
          city: 'New Delhi',
          state: 'Delhi',
          pincode: '110001',
          addressLine1: 'Connaught Place',
          creditLimit: 100000,
          currentBalance: 0,
          status: 'Active',
          type: 'B2B'
        }
      ];
      await Customer.insertMany(sampleCustomers);
    }

    // Expenses
    const totalExpenses = await Expense.countDocuments({ shopId });
    if (totalExpenses === 0) {
      await Expense.insertMany([
        { shopId, expenseNumber: 'EXP-2026-001', category: 'Software & Cloud', vendor: 'AWS Cloud Services', amount: 32500, taxAmount: 5850, status: 'Paid' },
        { shopId, expenseNumber: 'EXP-2026-002', category: 'Rent', vendor: 'Nexus Commercial Realty', amount: 85000, taxAmount: 0, status: 'Paid' },
        { shopId, expenseNumber: 'EXP-2026-003', category: 'Utilities', vendor: 'Tata Power Broadband', amount: 14200, taxAmount: 2556, status: 'Paid' },
        { shopId, expenseNumber: 'EXP-2026-004', category: 'Office Supplies', vendor: 'OfficeMart Solutions', amount: 6800, taxAmount: 1224, status: 'Paid' }
      ]);
    }

    // Quotations
    const totalQuotes = await Quotation.countDocuments({ shopId });
    if (totalQuotes === 0) {
      await Quotation.insertMany([
        {
          shopId,
          quoteNumber: 'QT-2026-001',
          customer: 'Acme Corporation Pvt Ltd',
          customerPhone: '+91 98201 12345',
          expiryDate: new Date(Date.now() + 15 * 86400000),
          items: [
            { name: 'Dell Latitude 5540 Laptop', qty: 2, rate: 68000, taxRate: 18, amount: 160480 }
          ],
          subtotal: 136000,
          totalTax: 24480,
          amount: 160480,
          status: 'Accepted'
        },
        {
          shopId,
          quoteNumber: 'QT-2026-002',
          customer: 'Sharma & Sons Enterprises',
          customerPhone: '+91 99112 33445',
          expiryDate: new Date(Date.now() + 30 * 86400000),
          items: [
            { name: 'Samsung 27" 4K Monitor', qty: 1, rate: 24999, taxRate: 18, amount: 29498.82 }
          ],
          subtotal: 24999,
          totalTax: 4499.82,
          amount: 29498.82,
          status: 'Sent'
        }
      ]);
    }

    // Inventory
    const supplierCount = await Supplier.countDocuments({ shopId });
    if (supplierCount === 0) {
      await Supplier.insertMany([
        { shopId, name: 'Dell Technologies India', code: 'SUP-01', contact: '+91 80 4123 4567', email: 'sales@dell.co.in', performance: 'Excellent', status: 'Active' },
        { shopId, name: 'Ingram Micro Distribution', code: 'SUP-02', contact: '+91 22 6789 0123', email: 'orders@ingrammicro.in', performance: 'Good', status: 'Active' }
      ]);
      await Warehouse.insertMany([
        { shopId, name: 'Central Distribution Hub', code: 'WH-01', totalItems: 1450, manager: 'Ramesh Verma' }
      ]);
      await StockMovement.insertMany([
        { shopId, date: '2026-03-01', type: 'Purchase', source: 'Ingram Micro', qtyIn: 50, qtyOut: 0, balance: 50 },
        { shopId, date: '2026-03-05', type: 'Sale', source: 'INV-2026-001', qtyIn: 0, qtyOut: 2, balance: 48 }
      ]);
      await BatchTracking.insertMany([
        { shopId, batchNo: 'BATCH-2026-A1', product: 'Dell Latitude 5540', qty: 24, mfgDate: '2026-01-10', expiryDate: '2029-01-10', status: 'Good' }
      ]);
    }

    console.log('✅ Enterprise business data verified and migrated successfully.');
  } catch (error) {
    console.error('Error during data seeding:', error);
  }
}
