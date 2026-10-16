import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  customerId: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  gst: { type: String },
  pan: { type: String },
  website: { type: String },
  creditLimit: { type: Number, default: 0 },
  currentBalance: { type: Number, default: 0 },
  creditPeriod: { type: Number, default: 30 },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  type: { type: String, enum: ['B2B', 'B2C'], default: 'B2B' },
  city: { type: String },
  addressLine1: { type: String },
  addressLine2: { type: String },
  state: { type: String },
  pincode: { type: String },
  notes: { type: String }
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;
