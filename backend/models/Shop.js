import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, default: '+91 98765 43210' },
  gstin: { type: String, default: '27AABCU9603R1ZX' },
  pan: { type: String, default: 'AABCU9603R' },
  address: { type: String, default: '101, Tech Park, Corporate Boulevard' },
  city: { type: String, default: 'Mumbai' },
  state: { type: String, default: 'Maharashtra' },
  pincode: { type: String, default: '400001' },
  currency: { type: String, default: '₹' },
  logo: { type: String, default: '🏢' },
  invoicePrefix: { type: String, default: 'INV-' },
  subscriptionStatus: { 
    type: String, 
    enum: ['pending', 'active', 'expired'],
    default: 'active' 
  },
  plan: { type: String, default: 'Enterprise Pro' },
  razorpayOrderId: { type: String, default: null },
  razorpayPaymentId: { type: String, default: null },
}, { timestamps: true });

export default mongoose.model('Shop', shopSchema);
