import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  productId: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['Physical Product', 'Digital Product', 'Service', 'Subscription', 'Bundle/Combo'], default: 'Physical Product' },
  category: { type: String, default: 'Uncategorized' },
  brand: { type: String },
  hsnCode: { type: String },
  description: { type: String },
  price: { type: Number, required: true, default: 0 },
  costPrice: { type: Number, default: 0 },
  mrp: { type: Number, default: 0 },
  taxRate: { type: String, default: 'Tax Exempt' },
  sku: { type: String },
  barcode: { type: String },
  stock: { type: Number, default: 0 },
  minStock: { type: Number, default: 5 },
  status: { type: String, default: 'Active' },
  image: { type: String, default: '📦' }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
