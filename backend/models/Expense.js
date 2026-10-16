import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  expenseNumber: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Rent', 'Utilities', 'Salaries', 'Travel', 'Food & Meals', 'Marketing', 'Office Supplies', 'Software & Cloud', 'Maintenance', 'Miscellaneous'] 
  },
  vendor: { type: String, required: true },
  amount: { type: Number, required: true },
  taxAmount: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  paymentMethod: { type: String, default: 'Bank Transfer' },
  status: { type: String, enum: ['Paid', 'Pending'], default: 'Paid' },
  receiptUrl: { type: String, default: '' },
  notes: { type: String, default: '' }
}, { timestamps: true });

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;
