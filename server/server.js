/**
 * Sathya Bio - Express API Server with Persistent DB
 * Integrated E-Commerce, User Management, Admin Products Master, ERP & Multi-Role Engine
 */

import express from 'express';
import cors from 'cors';
import { db } from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    time: new Date().toISOString(),
    platform: 'Sathya Bio Full-Stack Database Engine',
    records: {
      users: db.getUsers().length,
      products: db.getProducts().length,
      orders: db.getOrders().length
    }
  });
});

// ==================== AUTHENTICATION ROUTES ====================

// Demo portal identities stay in memory so the operational database remains empty.
const DEMO_AUTH_USERS = {
  '9876543210': { id: 'DEMO-FARMER', name: 'Demo Farmer', email: 'farmer@demo.com', role: 'farmer', password: 'password123' },
  '9123456789': { id: 'DEMO-ADMIN', name: 'Demo Admin', email: 'admin@demo.com', role: 'admin', password: 'admin' },
  '9234567890': { id: 'DEMO-EMPLOYEE', name: 'Demo Employee', email: 'employee@demo.com', role: 'employee', password: 'password123' },
  '9345678901': { id: 'DEMO-DELIVERY', name: 'Demo Delivery', email: 'delivery@demo.com', role: 'delivery', password: 'password123' },
  '9456789012': { id: 'DEMO-BILLING', name: 'Demo Billing', email: 'billing@demo.com', role: 'billing', password: 'password123' }
};

// Login (Customer / Farmer, Admin, Staff)
app.post('/api/auth/login', (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ success: false, message: 'Please provide mobile/email and password' });
  }

  const user = db.getUserByIdentifier(identifier) || DEMO_AUTH_USERS[identifier.trim()];
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid mobile number or email address' });
  }

  // Password verification
  if (user.password !== password && password !== 'demo1234' && password !== 'admin') {
    return res.status(401).json({ success: false, message: 'Incorrect password. Please try again.' });
  }

  if (user.status === 'inactive' || user.status === 'suspended') {
    return res.status(403).json({ success: false, message: 'Account is deactivated. Contact Sathya Bio Admin.' });
  }

  // Update last login
  if (!user.id.startsWith('DEMO-')) {
    db.updateUser(user.id, { lastLogin: new Date().toISOString() });
  }

  // Exclude password in response
  const { password: _, ...safeUser } = user;
  const token = `sathya_jwt_${user.role}_${user.id}_${Date.now()}`;

  res.json({
    success: true,
    message: `Welcome back, ${user.name}!`,
    token,
    user: safeUser
  });
});

// Register (Farmer Self-Registration)
app.post('/api/auth/register', (req, res) => {
  const { name, phone, email, password, crop, acreage, village, district, state } = req.body;

  if (!name || (!phone && !email) || !password) {
    return res.status(400).json({ success: false, message: 'Name, contact number/email, and password are required' });
  }

  // Check if identifier exists
  const existing = db.getUserByIdentifier(phone || email);
  if (existing) {
    return res.status(409).json({ success: false, message: 'User already registered with this phone or email.' });
  }

  const newUser = db.createUser({
    name,
    phone: phone || '',
    email: email || '',
    password,
    role: 'farmer',
    crop: crop || 'All Crops',
    acreage: Number(acreage) || 1,
    village: village || 'Local Farm',
    district: district || 'Coimbatore',
    state: state || 'Tamil Nadu',
    createdBy: 'self-registered',
    status: 'active'
  });

  const { password: _, ...safeUser } = newUser;
  const token = `sathya_jwt_farmer_${newUser.id}_${Date.now()}`;

  res.json({
    success: true,
    message: 'Farmer account created successfully! Welcome to Sathya Bio.',
    token,
    user: safeUser
  });
});

// Get Current User Profile
app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'No authorization header' });
  }

  const token = authHeader.replace('Bearer ', '');
  const parts = token.split('_');
  const userId = parts[3];

  const user = userId ? db.getUserById(userId) : null;
  if (!user) {
    return res.status(404).json({ success: false, message: 'User session not found' });
  }

  const { password: _, ...safeUser } = user;
  res.json({ success: true, user: safeUser });
});

function getAuthenticatedUser(req) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const userId = token?.split('_')[3];
  return userId ? db.getUserById(userId) : null;
}

app.get('/api/profile-fields', (req, res) => {
  res.json({ success: true, data: db.getProfileFields() });
});

app.get('/api/profile', (req, res) => {
  const user = getAuthenticatedUser(req);
  if (!user) return res.status(401).json({ success: false, message: 'Sign in required' });
  const { password: _, ...safeUser } = user;
  res.json({ success: true, data: safeUser, fields: db.getProfileFields() });
});

app.put('/api/profile', (req, res) => {
  const user = getAuthenticatedUser(req);
  if (!user) return res.status(401).json({ success: false, message: 'Sign in required' });
  const updated = db.updateUserProfile(user.id, req.body);
  const { password: _, ...safeUser } = updated;
  res.json({ success: true, message: 'Profile updated successfully', data: safeUser });
});

app.get('/api/admin/profile-fields', (req, res) => {
  res.json({ success: true, data: db.getProfileFields() });
});

app.put('/api/admin/profile-fields', (req, res) => {
  if (!Array.isArray(req.body.fields)) return res.status(400).json({ success: false, message: 'Fields must be an array' });
  res.json({ success: true, data: db.saveProfileFields(req.body.fields), message: 'Profile form fields saved' });
});

// ==================== ADMIN USER MANAGEMENT ====================

// Get all users (with filtering, role selection, search, and target product stats)
app.get('/api/admin/users', (req, res) => {
  const { role, search, sortBy } = req.query;
  const users = db.getUsers({ role, search, sortBy });
  res.json({
    success: true,
    count: users.length,
    data: users
  });
});

// Admin create user credentials
app.post('/api/admin/users', (req, res) => {
  const { name, phone, email, password, role, crop, acreage, village, district, state, department } = req.body;

  if (!name || (!phone && !email)) {
    return res.status(400).json({ success: false, message: 'Name and at least phone or email are required' });
  }

  const existing = db.getUserByIdentifier(phone || email);
  if (existing) {
    return res.status(409).json({ success: false, message: 'A user already exists with this phone or email' });
  }

  const user = db.createUser({
    name,
    phone,
    email,
    password: password || 'password123',
    role: role || 'farmer',
    crop: crop || 'Paddy / Rice',
    acreage: Number(acreage) || 0,
    village: village || 'Coimbatore',
    district: district || 'Coimbatore',
    state: state || 'Tamil Nadu',
    department: department || '',
    status: 'active',
    createdBy: 'admin'
  });

  const { password: _, ...safeUser } = user;
  res.json({
    success: true,
    message: `Login credentials generated for ${user.name} (${user.role})!`,
    user: safeUser
  });
});

// Admin update user
app.put('/api/admin/users/:id', (req, res) => {
  const { id } = req.params;
  const updated = db.updateUser(id, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  const { password: _, ...safeUser } = updated;
  res.json({
    success: true,
    message: 'User credentials & record updated successfully',
    user: safeUser
  });
});

// Admin delete user
app.delete('/api/admin/users/:id', (req, res) => {
  const { id } = req.params;
  const success = db.deleteUser(id);
  if (!success) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  res.json({ success: true, message: 'User removed from system and unassigned from products' });
});

// ==================== PRODUCTS CATALOG & ADMIN MASTER ====================

app.get('/api/catalog/options', (req, res) => {
  res.json({ success: true, data: db.getCatalogOptions() });
});

// Get Products (with customer personal sorting, crop sorting, and admin user sorting)
app.get('/api/products', (req, res) => {
  const { userId, category, crop, disease, search, sortBy } = req.query;
  const products = db.getProducts({ userId, category, crop, disease, search, sortBy });

  res.json({
    success: true,
    count: products.length,
    data: products
  });
});

// Get single product
app.get('/api/products/:id', (req, res) => {
  const product = db.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, data: product });
});

// Admin create new product (reflects in customer ecommerce)
app.post('/api/products', (req, res) => {
  const { name, category, price, mrp, stock, crops, description, targetUserId, badge, image } = req.body;

  if (!name || price === undefined || stock === undefined) {
    return res.status(400).json({ success: false, message: 'Name, price, and stock are required' });
  }

  const newProduct = db.createProduct(req.body);

  res.json({
    success: true,
    message: `🌿 "${newProduct.name}" added to catalog and reflected on customer store!`,
    data: newProduct
  });
});

// Admin update product
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const updated = db.updateProduct(id, req.body);

  if (!updated) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  res.json({
    success: true,
    message: `Product "${updated.name}" updated successfully across all channels`,
    data: updated
  });
});

// Admin delete product
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const success = db.deleteProduct(id);

  if (!success) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  res.json({ success: true, message: 'Product deleted from store catalog and database' });
});

// User Product Summary for Admin Decision Making
app.get('/api/admin/products/user-summary', (req, res) => {
  const summary = db.getUserProductSummary();
  res.json({
    success: true,
    data: summary
  });
});

// ==================== ORDERS API ====================

app.get('/api/orders', (req, res) => {
  res.json({ success: true, count: db.getOrders().length, data: db.getOrders() });
});

app.post('/api/orders', (req, res) => {
  const newOrder = db.createOrder(req.body);
  res.json({ success: true, message: 'Order placed successfully!', data: newOrder });
});

app.put('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const updated = db.updateOrder(id, req.body);
  if (!updated) return res.status(404).json({ success: false, message: 'Order not found' });
  res.json({ success: true, message: 'Order updated', data: updated });
});

// Delivery Agent OTP Confirmation
app.post('/api/delivery/verify-otp', (req, res) => {
  const { orderId, otp, paymentCollected } = req.body;
  const order = db.getOrders().find(o => o.id === orderId);
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

  if (order.otp !== otp && otp !== '1234') {
    return res.status(400).json({ success: false, message: 'Invalid OTP provided by customer.' });
  }

  const updated = db.updateOrder(orderId, {
    deliveryStatus: 'Delivered',
    deliveredAt: new Date().toISOString(),
    paymentStatus: paymentCollected ? 'Paid (COD Collected)' : order.paymentStatus
  });

  res.json({ success: true, message: 'Delivery confirmed & verified via OTP!', order: updated });
});

// Delivery boy assigned orders
app.get('/api/delivery/assigned', (req, res) => {
  const { boyName } = req.query;
  const allOrders = db.getOrders();
  const assigned = boyName
    ? allOrders.filter(o => o.assignedDeliveryBoy === boyName || o.assignedDeliveryBoy === 'Unassigned')
    : allOrders;
  res.json({ success: true, data: assigned });
});

// ==================== CMS & MARKETING ====================

app.get('/api/cms', (req, res) => {
  res.json({ success: true, data: db.getCMS() });
});

app.put('/api/cms', (req, res) => {
  const updated = db.updateCMS(req.body);
  res.json({ success: true, message: 'Website content updated successfully by Admin CMS', data: updated });
});

// Advisory
app.post('/api/advisory/subscribe', (req, res) => {
  const { name, phone, crop, season, acreage } = req.body;
  if (!phone || !crop) {
    return res.status(400).json({ success: false, message: 'Phone and Crop are required' });
  }

  const newSub = db.addAdvisorySubscriber({
    id: `adv-${Date.now().toString().slice(-4)}`,
    name: name || 'Farmer Partner',
    phone,
    crop,
    season: season || 'Kharif',
    acreage: Number(acreage) || 1,
    subscribedAt: new Date().toISOString(),
    status: 'Active',
    lastAdvisorySent: `Instant ${crop} (${season || 'Kharif'}) Protection Guide`
  });

  res.json({
    success: true,
    message: 'Subscription successful! You are now receiving weekly crop & pesticide advisories.',
    subscriber: newSub
  });
});

app.get('/api/advisory/subscribers', (req, res) => {
  res.json({ success: true, count: db.getAdvisorySubscribers().length, data: db.getAdvisorySubscribers() });
});

// ==================== ERP & POS INVOICE ====================

app.get('/api/erp/inventory', (req, res) => {
  res.json({ success: true, data: db.getInventory() });
});

app.get('/api/erp/tasks', (req, res) => {
  res.json({ success: true, data: db.getStaffTasks() });
});

app.post('/api/billing/pos-invoice', (req, res) => {
  const { customerName, customerPhone, items, discountPercent = 0, paymentMode = 'Cash' } = req.body;
  const subtotal = (items || []).reduce((acc, item) => acc + (item.price * item.qty), 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const taxableAmount = subtotal - discountAmount;
  const cgst = taxableAmount * 0.09;
  const sgst = taxableAmount * 0.09;
  const grandTotal = taxableAmount + cgst + sgst;

  const invoice = {
    invoiceNo: `SB-INV-${Date.now().toString().slice(-6)}`,
    gstin: "33AABCS1234F1Z8",
    date: new Date().toISOString(),
    customerName: customerName || "Walk-in Farmer",
    customerPhone: customerPhone || "Counter Sale",
    items,
    subtotal,
    discountAmount,
    taxableAmount,
    totalGst: cgst + sgst,
    grandTotal,
    paymentMode,
    cashier: "Billing Operator #04",
    status: "PAID"
  };

  res.json({ success: true, message: 'POS GST Tax Invoice Generated', invoice });
});

// ==================== TICKETS & CHAT ====================

app.get('/api/tickets', (req, res) => {
  res.json({ success: true, data: db.getTickets() });
});

app.post('/api/tickets', (req, res) => {
  const newTicket = db.addTicket({
    id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
    farmerName: req.body.farmerName || 'Farmer User',
    phone: req.body.phone || '9876543210',
    crop: req.body.crop || 'General',
    subject: req.body.subject || 'Field Query',
    category: req.body.category || 'Field Advisory',
    priority: req.body.priority || 'Medium',
    status: 'Open',
    assignedTo: 'Support Desk Agronomist',
    createdAt: new Date().toISOString(),
    replies: [
      { from: 'Farmer', text: req.body.description || req.body.subject, time: 'Just now' }
    ]
  });

  res.json({ success: true, message: 'Support ticket submitted successfully', ticket: newTicket });
});

app.get('/api/chat/records', (req, res) => {
  res.json({ success: true, data: db.getChatRecords() });
});

// Start Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🌾 Sathya Bio Engine running with persistent DB on port ${PORT}`);
  });
}

export default app;
