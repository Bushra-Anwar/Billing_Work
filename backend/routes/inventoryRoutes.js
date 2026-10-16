import express from 'express';
import { Supplier, PurchaseOrder, Warehouse, StockMovement, BatchTracking } from '../models/InventoryModels.js';

const router = express.Router();

// Helper to create basic CRUD routes
const createRoutes = (Model, path) => {
  router.get(path, async (req, res) => {
    try {
      const data = await Model.find().sort({ createdAt: -1 });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post(path, async (req, res) => {
    try {
      const newData = new Model(req.body);
      const saved = await newData.save();
      res.status(201).json(saved);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.delete(`${path}/:id`, async (req, res) => {
    try {
      await Model.findByIdAndDelete(req.params.id);
      res.json({ message: 'Deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
};

createRoutes(Supplier, '/suppliers');
createRoutes(PurchaseOrder, '/purchases');
createRoutes(Warehouse, '/warehouses');
createRoutes(StockMovement, '/movements');
createRoutes(BatchTracking, '/batches');

export default router;
