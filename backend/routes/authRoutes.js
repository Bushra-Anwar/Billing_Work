import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Shop from '../models/Shop.js';
import { getDefaultShop } from '../middleware/authMiddleware.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_123';

// 1. Register Shop
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, companyName, email, password, phone, gstin, address } = req.body;

    const existingShop = await Shop.findOne({ email });
    if (existingShop) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newShop = new Shop({
      firstName,
      lastName,
      companyName,
      email,
      password: hashedPassword,
      phone: phone || '+91 98765 43210',
      gstin: gstin || '27AABCU9603R1ZX',
      address: address || '101, Tech Park, Corporate Boulevard',
      subscriptionStatus: 'active',
      plan: 'Enterprise Pro'
    });

    await newShop.save();

    const token = jwt.sign({ id: newShop._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Shop registered successfully',
      token,
      shop: {
        id: newShop._id,
        firstName: newShop.firstName,
        lastName: newShop.lastName,
        companyName: newShop.companyName,
        email: newShop.email,
        phone: newShop.phone,
        gstin: newShop.gstin,
        address: newShop.address,
        subscriptionStatus: newShop.subscriptionStatus,
        plan: newShop.plan
      }
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// 2. Login Shop
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const shop = await Shop.findOne({ email });
    if (!shop) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, shop.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: shop._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      token,
      shop: {
        id: shop._id,
        firstName: shop.firstName,
        lastName: shop.lastName,
        companyName: shop.companyName,
        email: shop.email,
        phone: shop.phone,
        gstin: shop.gstin,
        address: shop.address,
        subscriptionStatus: shop.subscriptionStatus,
        plan: shop.plan
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// 3. Get Current Profile (with fallback to default shop context)
router.get('/me', async (req, res) => {
  try {
    let shop = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      if (token && token !== 'null' && token !== 'undefined') {
        try {
          const decoded = jwt.verify(token, JWT_SECRET);
          shop = await Shop.findById(decoded.id).select('-password');
        } catch (e) {
          // Token signature mismatch or expired
        }
      }
    }

    if (!shop) {
      shop = await getDefaultShop();
    }

    const validToken = jwt.sign({ id: shop._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      id: shop._id,
      _id: shop._id,
      firstName: shop.firstName,
      lastName: shop.lastName,
      companyName: shop.companyName,
      email: shop.email,
      phone: shop.phone,
      gstin: shop.gstin,
      pan: shop.pan,
      address: shop.address,
      city: shop.city,
      state: shop.state,
      pincode: shop.pincode,
      currency: shop.currency || '₹',
      subscriptionStatus: shop.subscriptionStatus,
      plan: shop.plan,
      token: validToken
    });
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(500).json({ message: 'Failed to retrieve profile' });
  }
});

// 4. Update Profile
router.put('/profile', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    let shopId = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        shopId = decoded.id;
      } catch (e) {}
    }

    if (!shopId) {
      const defaultShop = await getDefaultShop();
      shopId = defaultShop._id;
    }

    const updated = await Shop.findByIdAndUpdate(shopId, req.body, { new: true }).select('-password');
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
