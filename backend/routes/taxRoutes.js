import express from 'express';
import Invoice from '../models/Invoice.js';
import Expense from '../models/Expense.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/summary', protect, async (req, res) => {
  try {
    const invoices = await Invoice.find({ shopId: req.shopId });
    const expenses = await Expense.find({ shopId: req.shopId });

    let outputCgst = 0;
    let outputSgst = 0;
    let outputIgst = 0;
    let totalTaxableValue = 0;

    let b2bCount = 0;
    let b2bTotal = 0;
    let b2bTax = 0;

    let b2cCount = 0;
    let b2cTotal = 0;
    let b2cTax = 0;

    const hsnMap = {};

    invoices.forEach(inv => {
      totalTaxableValue += (inv.subtotal || 0);
      outputCgst += (inv.cgstTotal || (inv.totalTax / 2) || 0);
      outputSgst += (inv.sgstTotal || (inv.totalTax / 2) || 0);
      outputIgst += (inv.igstTotal || 0);

      const hasGst = inv.customerGstin && inv.customerGstin.trim().length > 5;
      if (hasGst) {
        b2bCount++;
        b2bTotal += (inv.grandTotal || 0);
        b2bTax += (inv.totalTax || 0);
      } else {
        b2cCount++;
        b2cTotal += (inv.grandTotal || 0);
        b2cTax += (inv.totalTax || 0);
      }

      // HSN aggregation
      (inv.items || []).forEach(item => {
        const hsn = item.hsnCode || '998311';
        if (!hsnMap[hsn]) {
          hsnMap[hsn] = {
            code: hsn,
            description: item.name,
            totalQty: 0,
            taxableValue: 0,
            taxRate: item.taxRate || 18,
            totalTax: 0
          };
        }
        hsnMap[hsn].totalQty += (item.qty || 1);
        const taxable = (item.qty || 1) * (item.rate || 0);
        hsnMap[hsn].taxableValue += taxable;
        hsnMap[hsn].totalTax += (taxable * (item.taxRate || 18)) / 100;
      });
    });

    const totalOutputTax = outputCgst + outputSgst + outputIgst;
    const inputTaxCredit = expenses.reduce((s, e) => s + (e.taxAmount || 0), 0);
    const netTaxPayable = Math.max(0, totalOutputTax - inputTaxCredit);

    const hsnSummary = Object.values(hsnMap);

    res.json({
      totalTaxableValue,
      totalOutputTax,
      outputCgst,
      outputSgst,
      outputIgst,
      inputTaxCredit,
      netTaxPayable,
      b2b: { count: b2bCount, total: b2bTotal, tax: b2bTax },
      b2c: { count: b2cCount, total: b2cTotal, tax: b2cTax },
      hsnSummary,
      taxRates: [
        { id: 'TX-001', name: 'GST 18%', type: 'GST', rate: 18, breakdown: 'CGST 9% + SGST 9%', status: 'Active' },
        { id: 'TX-002', name: 'IGST 18%', type: 'IGST', rate: 18, breakdown: 'IGST 18%', status: 'Active' },
        { id: 'TX-003', name: 'GST 12%', type: 'GST', rate: 12, breakdown: 'CGST 6% + SGST 6%', status: 'Active' },
        { id: 'TX-004', name: 'GST 5%', type: 'GST', rate: 5, breakdown: 'CGST 2.5% + SGST 2.5%', status: 'Active' },
        { id: 'TX-005', name: 'Exempt 0%', type: 'Exempt', rate: 0, breakdown: '0%', status: 'Active' }
      ]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
