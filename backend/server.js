import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import invoiceRoutes from './routes/invoiceRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import productRoutes from './routes/productRoutes.js';
import quotationRoutes from './routes/quotationRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import authRoutes from './routes/authRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import accountingRoutes from './routes/accountingRoutes.js';
import taxRoutes from './routes/taxRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import { seedInitialData } from './seedData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/yourbill';

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected Successfully');
    // Seed initial demo data for immediate real-world usability
    await seedInitialData();
  })
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// API Routes
app.use('/api/invoices', invoiceRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/quotations', quotationRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/accounting', accountingRoutes);
app.use('/api/tax', taxRoutes);
app.use('/api/ai', aiRoutes);

// Health Route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    app: 'YourBill Enterprise SaaS Engine',
    version: '2.0.0',
    timestamp: new Date()
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 YourBill Enterprise Backend is running on http://localhost:${PORT}`);
});
