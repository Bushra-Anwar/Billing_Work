import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  name: String,
  code: String,
  contact: String,
  email: String,
  creditLimit: Number,
  performance: String,
  status: { type: String, default: 'Active' }
}, { timestamps: true });

const poSchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  poNumber: String,
  date: String,
  supplier: String,
  amount: Number,
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

const warehouseSchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  name: String,
  code: String,
  totalItems: Number,
  manager: String
}, { timestamps: true });

const stockMovementSchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  date: String,
  type: String, // Sale, Purchase, Return, Transfer
  source: String,
  qtyIn: Number,
  qtyOut: Number,
  balance: Number
}, { timestamps: true });

const batchSchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  batchNo: String,
  product: String,
  qty: Number,
  mfgDate: String,
  expiryDate: String,
  status: { type: String, default: 'Good' }
}, { timestamps: true });

export const Supplier = mongoose.model('Supplier', supplierSchema);
export const PurchaseOrder = mongoose.model('PurchaseOrder', poSchema);
export const Warehouse = mongoose.model('Warehouse', warehouseSchema);
export const StockMovement = mongoose.model('StockMovement', stockMovementSchema);
export const BatchTracking = mongoose.model('BatchTracking', batchSchema);
