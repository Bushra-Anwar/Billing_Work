import jwt from 'jsonwebtoken';
import Shop from '../models/Shop.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_123';

// Cache the default shop ID to minimize DB queries
let cachedDefaultShopId = null;

export const getDefaultShop = async () => {
  if (cachedDefaultShopId) {
    const shop = await Shop.findById(cachedDefaultShopId);
    if (shop) return shop;
  }

  let defaultShop = await Shop.findOne({ email: 'admin@yourbill.com' });
  if (!defaultShop) {
    defaultShop = await Shop.findOne({});
  }

  if (!defaultShop) {
    defaultShop = await Shop.create({
      firstName: 'Admin',
      lastName: 'Nexus',
      companyName: 'Nexus Business Solutions Pvt Ltd',
      email: 'admin@yourbill.com',
      password: '$2a$10$abcdefghijklmnopqrstuvwxyz1234567890', // placeholder hashed
      phone: '+91 98765 43210',
      gstin: '27AABCU9603R1ZX',
      address: '101, Tech Park, Corporate Boulevard',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      subscriptionStatus: 'active',
      plan: 'Enterprise Pro'
    });
  }

  cachedDefaultShopId = defaultShop._id;
  return defaultShop;
};

// Resilient auth middleware: attaches shopId whether authenticated or working in workspace demo session
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      if (token && token !== 'null' && token !== 'undefined') {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.shopId = decoded.id;
        return next();
      }
    } catch (error) {
      console.warn('Token verification failed, falling back to default shop context:', error.message);
    }
  }

  try {
    const defaultShop = await getDefaultShop();
    req.shopId = defaultShop._id;
    req.shop = defaultShop;
    next();
  } catch (error) {
    console.error('Error in protect middleware fallback:', error);
    res.status(500).json({ message: 'Authentication workspace initialization failed' });
  }
};

export const strictProtect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      req.shopId = decoded.id;
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  return res.status(401).json({ message: 'Not authorized, token required' });
};
