import mongoose from 'mongoose';

const quotationSchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  quoteNumber: { type: String, required: true },
  customer: { type: String, required: true },
  customerPhone: { type: String, default: '' },
  customerEmail: { type: String, default: '' },
  salesperson: { type: String, default: 'Admin' },
  date: { type: Date, default: Date.now },
  expiryDate: { type: Date },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: { type: String, required: true },
    qty: { type: Number, default: 1 },
    rate: { type: Number, default: 0 },
    taxRate: { type: Number, default: 18 },
    discountPercent: { type: Number, default: 0 },
    amount: { type: Number, default: 0 }
  }],
  subtotal: { type: Number, default: 0 },
  totalDiscount: { type: Number, default: 0 },
  totalTax: { type: Number, default: 0 },
  amount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Draft', 'Pending Approval', 'Sent', 'Accepted', 'Converted', 'Expired', 'Rejected'], 
    default: 'Draft' 
  },
  convertedInvoiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' },
  customerNotes: { type: String, default: '' },
  internalRemarks: { type: String, default: '' }
}, { timestamps: true });

const Quotation = mongoose.model('Quotation', quotationSchema);
export default Quotation;
