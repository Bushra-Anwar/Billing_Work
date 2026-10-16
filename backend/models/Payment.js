import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' },
  invoiceNumber: { type: String, required: true },
  customerName: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  paymentMethod: { 
    type: String, 
    enum: ['Cash', 'UPI', 'Card', 'Net Banking', 'Cheque', 'Razorpay', 'Bank Transfer'], 
    default: 'Cash' 
  },
  reference: { type: String, default: '' },
  status: { type: String, enum: ['Completed', 'Pending', 'Failed'], default: 'Completed' },
  notes: { type: String, default: '' }
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
