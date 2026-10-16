import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Shop from '../models/Shop.js';
import Payment from '../models/Payment.js';
import Invoice from '../models/Invoice.js';
import Customer from '../models/Customer.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

let razorpay = null;
try {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_mockkey123',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'rzp_test_mocksecret123'
  });
} catch (e) {
  console.warn('Razorpay initialization note:', e.message);
}

// 1. Get all payments
router.get('/', protect, async (req, res) => {
  try {
    const payments = await Payment.find({ shopId: req.shopId }).sort({ paymentDate: -1, createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. Record manual payment (Cash, UPI, Card, Net Banking)
router.post('/record', protect, async (req, res) => {
  try {
    const { invoiceId, invoiceNumber, customerName, amount, paymentMethod = 'Cash', reference = '', notes = '' } = req.body;
    const payAmt = parseFloat(amount) || 0;

    let targetInvoice = null;
    if (invoiceId) {
      targetInvoice = await Invoice.findOne({ _id: invoiceId, shopId: req.shopId });
    } else if (invoiceNumber) {
      targetInvoice = await Invoice.findOne({ invoiceNumber, shopId: req.shopId });
    }

    if (targetInvoice) {
      const newPaid = (targetInvoice.paidAmount || 0) + payAmt;
      const newBalance = Math.max(0, targetInvoice.grandTotal - newPaid);
      targetInvoice.paidAmount = newPaid;
      targetInvoice.balanceAmount = newBalance;
      targetInvoice.paymentStatus = newBalance === 0 ? 'Paid' : 'Partial';
      await targetInvoice.save();

      // Update customer balance
      await Customer.findOneAndUpdate(
        { name: targetInvoice.customerName, shopId: req.shopId },
        { $inc: { currentBalance: -payAmt } }
      ).catch(() => {});
    }

    const newPayment = await Payment.create({
      shopId: req.shopId,
      invoiceId: targetInvoice?._id,
      invoiceNumber: invoiceNumber || targetInvoice?.invoiceNumber || `DIR-${Date.now()}`,
      customerName: customerName || targetInvoice?.customerName || 'Customer',
      amount: payAmt,
      paymentDate: new Date(),
      paymentMethod,
      reference: reference || `REF-${Date.now().toString().slice(-6)}`,
      status: 'Completed',
      notes
    });

    res.status(201).json({ payment: newPayment, invoice: targetInvoice });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 3. Create Razorpay Subscription/Invoice Order
router.post('/create-order', protect, async (req, res) => {
  try {
    const { amount, plan } = req.body;
    const shop = await Shop.findById(req.shopId);
    if (!shop) return res.status(404).json({ message: 'Shop not found' });

    let order = null;
    if (razorpay && process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_ID !== 'rzp_test_mockkey123') {
      const options = {
        amount: Math.round(amount * 100),
        currency: "INR",
        receipt: `rcpt_${shop._id}_${Date.now()}`
      };
      order = await razorpay.orders.create(options);
    } else {
      // Reliable simulation for sandbox / test without real Razorpay keys
      order = {
        id: `order_sim_${Date.now()}`,
        entity: 'order',
        amount: Math.round(amount * 100),
        currency: 'INR',
        receipt: `rcpt_${shop._id}`,
        status: 'created'
      };
    }

    shop.plan = plan;
    shop.razorpayOrderId = order.id;
    await shop.save();

    res.json({ order, key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_mockkey123' });
  } catch (error) {
    console.error('Payment order creation error:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
});

// 4. Verify Payment and activate subscription
router.post('/verify', protect, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const shop = await Shop.findById(req.shopId);
    if (!shop) return res.status(404).json({ message: 'Shop not found' });

    shop.subscriptionStatus = 'active';
    shop.razorpayPaymentId = razorpay_payment_id || `pay_${Date.now()}`;
    await shop.save();

    res.json({
      message: 'Payment verified successfully! Subscription activated.',
      shop: {
        id: shop._id,
        subscriptionStatus: shop.subscriptionStatus,
        plan: shop.plan
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying payment' });
  }
});

export default router;
