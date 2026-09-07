/**
 * Sathya Bio - High Performance Structured Database Engine
 * Persistent, ACID-atomic JSON relational store with indexing and schema validation
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Default Seed Data
const INITIAL_DB = {
  users: [
    {
      id: 'USR-1001',
      name: 'Rameshwar Patel',
      phone: '9876543210',
      email: 'rameshwar@farm.in',
      password: 'password123',
      role: 'farmer',
      crop: 'Paddy / Rice',
      acreage: 5,
      village: 'Karur',
      district: 'Coimbatore',
      state: 'Tamil Nadu',
      status: 'active',
      createdBy: 'admin',
      createdAt: '2026-08-01T08:00:00.000Z',
      lastLogin: '2026-09-05T14:30:00.000Z'
    },
    {
      id: 'USR-1002',
      name: 'Sathya Admin',
      phone: '9123456789',
      email: 'admin@sathyambio.com',
      password: 'admin',
      role: 'admin',
      crop: 'All Crops',
      acreage: 0,
      village: 'Headquarters',
      district: 'Coimbatore',
      state: 'Tamil Nadu',
      status: 'active',
      createdBy: 'system',
      createdAt: '2026-01-01T00:00:00.000Z',
      lastLogin: '2026-09-06T10:00:00.000Z'
    },
    {
      id: 'USR-1003',
      name: 'Muthuvel K. (QC)',
      phone: '9234567890',
      email: 'muthuvel@sathyambio.com',
      password: 'password123',
      role: 'employee',
      crop: 'Cotton',
      acreage: 12,
      village: 'Tiruppur',
      district: 'Tiruppur',
      state: 'Tamil Nadu',
      department: 'Quality Control',
      status: 'active',
      createdBy: 'admin',
      createdAt: '2026-06-15T09:00:00.000Z',
      lastLogin: '2026-09-04T16:20:00.000Z'
    },
    {
      id: 'USR-1004',
      name: 'Karthik Raja',
      phone: '9345678901',
      email: 'karthik@sathyambio.com',
      password: 'password123',
      role: 'delivery',
      crop: 'N/A',
      acreage: 0,
      village: 'Erode Central',
      district: 'Erode',
      state: 'Tamil Nadu',
      status: 'active',
      createdBy: 'admin',
      createdAt: '2026-07-10T11:00:00.000Z',
      lastLogin: '2026-09-06T08:15:00.000Z'
    },
    {
      id: 'USR-1005',
      name: 'Billing Operator #04',
      phone: '9456789012',
      email: 'billing@sathyambio.com',
      password: 'password123',
      role: 'billing',
      crop: 'N/A',
      acreage: 0,
      village: 'Coimbatore Hub',
      district: 'Coimbatore',
      state: 'Tamil Nadu',
      status: 'active',
      createdBy: 'admin',
      createdAt: '2026-07-20T12:00:00.000Z',
      lastLogin: '2026-09-05T18:00:00.000Z'
    },
    {
      id: 'USR-1006',
      name: 'Suresh Reddy',
      phone: '9884255667',
      email: 'suresh@farm.in',
      password: 'password123',
      role: 'farmer',
      crop: 'Sugarcane',
      acreage: 8,
      village: 'Nandyal',
      district: 'Kurnool',
      state: 'Andhra Pradesh',
      status: 'active',
      createdBy: 'self-registered',
      createdAt: '2026-08-15T10:00:00.000Z',
      lastLogin: '2026-09-02T11:00:00.000Z'
    },
    {
      id: 'USR-1007',
      name: 'Gurpreet Singh',
      phone: '9814077889',
      email: 'gurpreet@punjabfarm.in',
      password: 'password123',
      role: 'farmer',
      crop: 'Wheat',
      acreage: 15,
      village: 'Karnal Suburbs',
      district: 'Karnal',
      state: 'Haryana',
      status: 'active',
      createdBy: 'admin',
      createdAt: '2026-08-20T14:00:00.000Z',
      lastLogin: '2026-09-01T09:45:00.000Z'
    }
  ],
  products: [
    {
      id: 'sb-01',
      name: 'Sathya Bio BlastShield 75 WP',
      tagline: 'Systemic Bio-Fungicide for Paddy Blast & Neck Rot',
      category: 'Fungicide',
      price: 680,
      originalPrice: 850,
      discount: '20% OFF',
      stock: 420,
      crops: ['Paddy/Rice', 'Wheat', 'Corn'],
      diseases: ['Blast', 'Rust', 'Downy Mildew'],
      activeIngredient: 'Tricyclazole 75% WP + Bio-Enzyme Fortifier',
      dosage: '120g - 150g per Acre',
      packSizes: ['250g', '500g', '1kg'],
      selectedPack: '500g',
      badge: 'Best Seller',
      rating: 4.9,
      reviewsCount: 142,
      image: './assets/p1.png',
      description: 'Advanced systemic bio-fortified fungicide providing protective and curative control against Blast disease in Paddy, Leaf Rust in Wheat, and Neck Blast.',
      detailedDescription: 'Sathya Bio BlastShield 75 WP rapidly penetrates plant tissue, establishing a protective barrier that stops fungal spore germination.',
      targetUserId: 'USR-1001',
      targetUserName: 'Rameshwar Patel (Paddy / Rice)',
      sortOrder: 1,
      createdAt: '2026-08-01T10:00:00.000Z',
      updatedAt: '2026-08-01T10:00:00.000Z'
    },
    {
      id: 'sb-02',
      name: 'Sathya Bio FlyKill Ultra',
      tagline: 'Multi-Action Insecticide for Whitefly & Aphids',
      category: 'Insecticide',
      price: 840,
      originalPrice: 1050,
      discount: '20% OFF',
      stock: 185,
      crops: ['Cotton', 'Tomato', 'Citrus', 'Potato'],
      diseases: ['Whitefly', 'Aphids', 'Caterpillars'],
      activeIngredient: 'Diafenthiuron 50% WP + Botanical Neem Extract',
      dosage: '250g per Acre',
      packSizes: ['250g', '500g'],
      selectedPack: '250g',
      badge: 'Top Rated',
      rating: 4.8,
      reviewsCount: 98,
      image: './assets/p2.png',
      description: 'Penetrates leaf cuticle rapidly to paralyze sucking pests like Whiteflies, Aphids, and Thrips. Prevents leaf curl virus spread.',
      detailedDescription: 'FlyKill Ultra combines the fast knock-down power of modern chemistry with sustained botanical repellency.',
      targetUserId: 'USR-1003',
      targetUserName: 'Muthuvel K. (Cotton)',
      sortOrder: 2,
      createdAt: '2026-08-02T10:00:00.000Z',
      updatedAt: '2026-08-02T10:00:00.000Z'
    },
    {
      id: 'sb-03',
      name: 'Sathya Bio BlightStop Pro',
      tagline: 'Dual Action Systemic Fungicide for Blight Control',
      category: 'Fungicide',
      price: 750,
      originalPrice: 900,
      discount: '17% OFF',
      stock: 65,
      crops: ['Tomato', 'Potato', 'Grapes', 'Citrus'],
      diseases: ['Blight', 'Downy Mildew'],
      activeIngredient: 'Mancozeb 64% + Metalaxyl 8% WP',
      dosage: '500g per Acre',
      packSizes: ['500g', '1kg', '5kg'],
      selectedPack: '1kg',
      badge: 'Expert Choice',
      rating: 4.9,
      reviewsCount: 215,
      image: './assets/p1.png',
      description: 'Gold standard dual-action fungicide specifically formulated for Late Blight in Potato/Tomato and Downy Mildew in Grapevines.',
      detailedDescription: 'Forms a protective film on plant surface while systemically inhibiting protein synthesis in pathogens.',
      targetUserId: 'all',
      targetUserName: 'All Users (General Catalog)',
      sortOrder: 3,
      createdAt: '2026-08-03T10:00:00.000Z',
      updatedAt: '2026-08-03T10:00:00.000Z'
    },
    {
      id: 'sb-04',
      name: 'Sathya Bio RootVigor Gold',
      tagline: '100% Organic Bio-Stimulant & Root Enhancer',
      category: 'Bio-Stimulant',
      price: 990,
      originalPrice: 1250,
      discount: '21% OFF',
      stock: 310,
      crops: ['Paddy/Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Corn', 'Tomato', 'Grapes'],
      diseases: [],
      activeIngredient: 'Humic Acid 18% + Seaweed Extract (Ascophyllum nodosum)',
      dosage: '500ml per Acre',
      packSizes: ['500ml', '1 Litre', '5 Litres'],
      selectedPack: '1 Litre',
      badge: '100% Organic',
      rating: 4.9,
      reviewsCount: 310,
      image: './assets/p3.png',
      description: 'Accelerates root branching, enhances micro-nutrient absorption, and restores degraded soils. Boosts drought resilience.',
      detailedDescription: 'Stimulates root cell division and chelates bound soil nutrients into plant-absorbable forms.',
      targetUserId: 'USR-1006',
      targetUserName: 'Suresh Reddy (Sugarcane)',
      sortOrder: 4,
      createdAt: '2026-08-04T10:00:00.000Z',
      updatedAt: '2026-08-04T10:00:00.000Z'
    },
    {
      id: 'sb-26',
      name: 'Sathya Bio WeedClear 24-D',
      tagline: 'Systemic Broadleaf Herbicide',
      category: 'Herbicide',
      price: 340,
      originalPrice: 400,
      discount: '15% OFF',
      stock: 150,
      crops: ['Wheat', 'Corn', 'Sugarcane'],
      diseases: ['Weeds'],
      activeIngredient: '2,4-D Amine Salt 58% SL',
      dosage: '400ml per Acre',
      packSizes: ['400ml', '1 Litre', '5 Litres'],
      selectedPack: '1 Litre',
      badge: 'Broadleaf Killer',
      rating: 4.6,
      reviewsCount: 156,
      image: './assets/p4.png',
      description: 'Effective and economical post-emergence herbicide for control of broadleaf weeds in cereals and sugarcane.',
      detailedDescription: 'Acts as a synthetic auxin, causing rapid, uncontrolled cell division and growth in susceptible weeds.',
      targetUserId: 'USR-1007',
      targetUserName: 'Gurpreet Singh (Wheat)',
      sortOrder: 5,
      createdAt: '2026-08-05T10:00:00.000Z',
      updatedAt: '2026-08-05T10:00:00.000Z'
    },
    {
      id: 'sb-27',
      name: 'Sathya Bio AminoBoost Liquid',
      tagline: 'Advanced Amino Acid Bio-Stimulant',
      category: 'Bio-Stimulant',
      price: 460,
      originalPrice: 550,
      discount: '16% OFF',
      stock: 240,
      crops: ['Tomato', 'Cotton', 'Grapes', 'Citrus', 'Paddy/Rice'],
      diseases: [],
      activeIngredient: 'L-Amino Acids 20% + Seaweed Extract',
      dosage: '250ml per Acre',
      packSizes: ['250ml', '500ml', '1 Litre'],
      selectedPack: '500ml',
      badge: 'Stress Reliever',
      rating: 4.9,
      reviewsCount: 212,
      image: './assets/p3.png',
      description: 'A powerful anti-stress bio-stimulant that helps crops recover from weather, transplant, and chemical stress.',
      detailedDescription: 'Provides plants with ready-made L-amino acids, redirecting plant energy towards growth and flowering.',
      targetUserId: 'all',
      targetUserName: 'All Users (General Catalog)',
      sortOrder: 6,
      createdAt: '2026-08-06T10:00:00.000Z',
      updatedAt: '2026-08-06T10:00:00.000Z'
    }
  ],
  orders: [
    {
      id: "SB-ORD-8821",
      userId: "USR-1001",
      customerName: "Rameshwar Patel",
      customerPhone: "9876543210",
      address: "Plot 42, Green Valley Farm, Karur, Tamil Nadu - 613001",
      items: [
        { id: "sb-01", name: "Sathya Bio BlastShield 75 WP", qty: 2, price: 680, packSize: "500g" },
        { id: "sb-04", name: "Sathya Bio RootVigor Gold", qty: 1, price: 990, packSize: "1 Litre" }
      ],
      subtotal: 2350,
      gst: 423,
      total: 2773,
      paymentMethod: "Razorpay (UPI)",
      paymentStatus: "Paid",
      deliveryStatus: "Out for Delivery",
      assignedDeliveryBoy: "Karthik Raja",
      deliveryBoyPhone: "9345678901",
      otp: "4829",
      createdAt: "2026-08-30T10:00:00.000Z"
    },
    {
      id: "SB-ORD-8822",
      userId: "USR-1007",
      customerName: "Gurpreet Singh",
      customerPhone: "9814077889",
      address: "Khasra 104, GT Road, Karnal, Haryana - 132001",
      items: [
        { id: "sb-02", name: "Sathya Bio FlyKill Ultra", qty: 3, price: 840, packSize: "250g" }
      ],
      subtotal: 2520,
      gst: 453.6,
      total: 2973.6,
      paymentMethod: "Cash on Delivery",
      paymentStatus: "Pending",
      deliveryStatus: "Dispatched",
      assignedDeliveryBoy: "Karthik Raja",
      deliveryBoyPhone: "9345678901",
      otp: "9152",
      createdAt: "2026-08-30T12:30:00.000Z"
    }
  ],
  cms: {
    heroTitle: "SATHYA BIO-PESTICIDES & CROP CARE",
    heroSubtitle: "Government & 100% Bio-Certified Solutions for High Yield & Zero Chemical Residue Farming",
    bannerAnnouncement: "🎉 KHARIF SPECIAL: Flat 20% OFF on Bio-Fungicides + Free Agronomist Hotline 1800-425-8899",
    advisoryTitle: "Get Weekly Crop & Pesticide Recommendations",
    advisorySubtitle: "Join 15,000+ farmers receiving our free seasonal advisory newsletter. Kharif & Rabi crop schedules, disease alerts, and exclusive offers every week.",
    contactPhone: "+91 94432 10987",
    contactEmail: "care@sathyambio.in",
    razorpayKeyId: "rzp_test_sathyaBioLiveKey102",
    razorpaySecret: "rzp_secret_mock_live_9988",
    razorpayMode: "test"
  },
  advisorySubscribers: [
    {
      id: "adv-101",
      name: "Rameshwar Patel",
      phone: "9876543210",
      crop: "Paddy/Rice",
      season: "Kharif",
      acreage: 5,
      subscribedAt: "2026-08-25T10:30:00.000Z",
      status: "Active",
      lastAdvisorySent: "BlastShield Dosage Schedule (Week 4)"
    }
  ],
  inventory: [
    { id: "INV-01", sku: "SB-BLAST-75", name: "BlastShield 75 WP (500g)", batchNo: "BATCH-2026-08A", warehouse: "Warehouse 1 (Coimbatore)", stockQty: 420, minThreshold: 100, expiryDate: "2028-08-01", costPrice: 420, sellingPrice: 680 },
    { id: "INV-02", sku: "SB-FLY-50", name: "FlyKill Ultra (250g)", batchNo: "BATCH-2026-07B", warehouse: "Warehouse 1 (Coimbatore)", stockQty: 185, minThreshold: 50, expiryDate: "2028-07-15", costPrice: 530, sellingPrice: 840 }
  ],
  staffTasks: [
    { id: "TSK-301", title: "Batch 2026-08A Quality Audit", assignedTo: "Dr. K. Senthil (Agronomist)", priority: "High", status: "In Progress", dueDate: "2026-08-31" }
  ],
  tickets: [
    { id: "TCK-901", farmerName: "Rameshwar Patel", phone: "9876543210", crop: "Paddy/Rice", subject: "Leaf yellowing and blast patches in 25-day old paddy", category: "Field Advisory", priority: "High", status: "In Progress", assignedTo: "Dr. K. Senthil", createdAt: "2026-08-29T11:00:00.000Z", replies: [{ from: "Farmer", text: "Leaves showing spindle shaped brown spots near tips.", time: "11:00 AM" }, { from: "Dr. K. Senthil", text: "Apply Sathya Bio BlastShield 75 WP @ 120g/acre mixed in 150L water immediately.", time: "11:45 AM" }] }
  ],
  chatRecords: [
    {
      sessionId: "CHAT-SESS-01",
      farmerName: "Muthuvel K.",
      farmerPhone: "9234567890",
      channel: "Web Live Chat",
      status: "Active",
      updatedAt: "2026-08-30T14:40:00.000Z",
      messages: [
        { sender: "Farmer", text: "Hello, what is the best biological insecticide for cotton whitefly?", timestamp: "02:30 PM" },
        { sender: "Sathya Bio Bot", text: "Hello Muthuvel ji! We recommend Sathya Bio FlyKill Ultra @ 250g per acre.", timestamp: "02:30 PM" }
      ]
    }
  ]
};

const EMPTY_DB = {
  users: [],
  products: [],
  orders: [],
  catalogOptions: {
    categories: ['Fungicide', 'Insecticide', 'Herbicide', 'Bio-Stimulant', 'Fertilizer', 'Nematicide', 'Adjuvant'],
    crops: ['Paddy / Rice', 'Wheat', 'Cotton', 'Tomato', 'Corn / Maize', 'Sugarcane', 'Citrus / Fruits', 'Grapes / Fruits', 'Potato'],
    storageBatches: ['250g', '500g', '1kg', '250ml', '500ml', '1 Litre', '5 Litres']
  },
  cms: {},
  advisorySubscribers: [],
  inventory: [],
  staffTasks: [],
  tickets: [],
  chatRecords: [],
  profileFields: [
    { id: 'name', title: 'Full name', type: 'text', required: true, editable: true },
    { id: 'email', title: 'Email address', type: 'email', required: false, editable: true },
    { id: 'phone', title: 'Mobile number', type: 'tel', required: true, editable: false },
    { id: 'village', title: 'Village / town', type: 'text', required: false, editable: true },
    { id: 'district', title: 'District', type: 'text', required: false, editable: true },
    { id: 'state', title: 'State', type: 'text', required: false, editable: true },
    { id: 'crop', title: 'Primary crop', type: 'text', required: false, editable: true },
    { id: 'acreage', title: 'Farm size (acres)', type: 'number', required: false, editable: true }
  ]
};

class DatabaseManager {
  constructor() {
    this.db = this.load();
  }

  load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        // Ensure all top-level keys exist
        return {
          ...EMPTY_DB,
          ...parsed,
          users: Array.isArray(parsed.users) ? parsed.users : EMPTY_DB.users,
          products: Array.isArray(parsed.products) ? parsed.products.map(product => {
            const reviews = Array.isArray(product.reviews) ? product.reviews : [];
            return {
              ...product,
              images: Array.isArray(product.images) && product.images.length ? product.images : (product.image ? [product.image] : []),
              howToUse: product.howToUse || '',
              whenToUse: product.whenToUse || '',
              relatedBlogs: Array.isArray(product.relatedBlogs) ? product.relatedBlogs : [],
              relatedProductIds: Array.isArray(product.relatedProductIds) ? product.relatedProductIds : [],
              reviewsEnabled: product.reviewsEnabled === true,
              reviews,
              rating: reviews.length ? reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / reviews.length : null,
              reviewsCount: reviews.length
            };
          }) : EMPTY_DB.products,
          orders: Array.isArray(parsed.orders) ? parsed.orders : EMPTY_DB.orders,
          profileFields: Array.isArray(parsed.profileFields) ? parsed.profileFields : EMPTY_DB.profileFields,
        };
      }
    } catch (err) {
      console.error('Failed to load database file, using defaults:', err);
    }
    this.saveImmediate(EMPTY_DB);
    return JSON.parse(JSON.stringify(EMPTY_DB));
  }

  save() {
    try {
      const tempPath = `${DB_FILE}.tmp.${Date.now()}`;
      fs.writeFileSync(tempPath, JSON.stringify(this.db, null, 2), 'utf-8');
      fs.renameSync(tempPath, DB_FILE);
    } catch (err) {
      console.error('Database write error:', err);
    }
  }

  saveImmediate(data) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Database immediate save error:', err);
    }
  }

  // ================= USERS TABLE =================
  getUsers(filters = {}) {
    let result = [...this.db.users];

    if (filters.role && filters.role !== 'all') {
      result = result.filter(u => u.role.toLowerCase() === filters.role.toLowerCase());
    }

    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(u =>
        u.name?.toLowerCase().includes(q) ||
        u.phone?.includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.village?.toLowerCase().includes(q) ||
        u.crop?.toLowerCase().includes(q)
      );
    }

    if (filters.sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filters.sortBy === 'recent') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      // Default: recent first
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    // Attach target product counts
    return result.map(user => {
      const userProducts = this.db.products.filter(p => p.targetUserId === user.id);
      return {
        ...user,
        targetProductCount: userProducts.length
      };
    });
  }

  getUserById(id) {
    return this.db.users.find(u => u.id === id);
  }

  getUserByIdentifier(identifier) {
    if (!identifier) return null;
    const clean = identifier.trim().toLowerCase();
    return this.db.users.find(u =>
      u.phone === clean ||
      u.email?.toLowerCase() === clean
    );
  }

  getProfileFields() {
    return this.db.profileFields || EMPTY_DB.profileFields;
  }

  saveProfileFields(fields) {
    this.db.profileFields = fields.map((field, index) => ({
      id: field.id || `profile-field-${Date.now()}-${index}`,
      title: String(field.title || '').trim(),
      type: ['text', 'email', 'tel', 'number', 'date', 'textarea', 'select'].includes(field.type) ? field.type : 'text',
      required: field.required === true,
      editable: field.editable !== false,
      options: Array.isArray(field.options) ? field.options.map(String).filter(Boolean) : []
    })).filter(field => field.title);
    this.save();
    return this.db.profileFields;
  }

  updateUserProfile(id, profileUpdates) {
    const user = this.db.users.find(item => item.id === id);
    if (!user) return null;
    const editableFields = new Set(this.getProfileFields().filter(field => field.editable).map(field => field.id));
    const allowed = {};
    for (const [key, value] of Object.entries(profileUpdates || {})) {
      if (editableFields.has(key)) allowed[key] = value;
    }
    Object.assign(user, allowed, { profile: { ...(user.profile || {}), ...allowed }, updatedAt: new Date().toISOString() });
    this.save();
    return user;
  }

  createUser(userData) {
    const id = `USR-${Date.now().toString().slice(-4)}`;
    const newUser = {
      id,
      name: userData.name || 'New User',
      phone: userData.phone || '',
      email: userData.email || '',
      password: userData.password || 'password123',
      role: userData.role || 'farmer',
      crop: userData.crop || 'All Crops',
      acreage: Number(userData.acreage) || 0,
      village: userData.village || 'Farm Village',
      district: userData.district || 'Coimbatore',
      state: userData.state || 'Tamil Nadu',
      department: userData.department || '',
      status: userData.status || 'active',
      createdBy: userData.createdBy || 'admin',
      createdAt: new Date().toISOString(),
      lastLogin: null
    };

    this.db.users.unshift(newUser);
    this.save();
    return newUser;
  }

  updateUser(id, updates) {
    const idx = this.db.users.findIndex(u => u.id === id);
    if (idx === -1) return null;

    this.db.users[idx] = {
      ...this.db.users[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.save();
    return this.db.users[idx];
  }

  deleteUser(id) {
    const idx = this.db.users.findIndex(u => u.id === id);
    if (idx === -1) return false;

    // Unassign products that targeted this user
    this.db.products.forEach(p => {
      if (p.targetUserId === id) {
        p.targetUserId = 'all';
        p.targetUserName = 'All Users (General Catalog)';
      }
    });

    this.db.users.splice(idx, 1);
    this.save();
    return true;
  }

  // ================= PRODUCTS TABLE =================
  getProducts(options = {}) {
    const { userId, category, crop, disease, search, sortBy } = options;
    let list = [...this.db.products];

    // Filter by Category
    if (category && category !== 'All') {
      list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by Crop
    if (crop && crop !== 'all' && crop !== 'All Crops') {
      list = list.filter(p => p.crops && p.crops.some(c => c.toLowerCase().includes(crop.toLowerCase())));
    }

    // Filter by Disease
    if (disease && disease !== 'all') {
      list = list.filter(p => p.diseases && p.diseases.some(d => d.toLowerCase().includes(disease.toLowerCase())));
    }

    // Filter by Search Query
    if (search) {
      const q = search.toLowerCase().trim();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.activeIngredient?.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.targetUserName?.toLowerCase().includes(q)
      );
    }

    // User-based sorting & priority
    if (userId) {
      const targetUser = this.getUserById(userId);
      list.sort((a, b) => {
        // Priority 1: Specifically targeted to this user
        const aTarget = a.targetUserId === userId ? 1 : 0;
        const bTarget = b.targetUserId === userId ? 1 : 0;
        if (aTarget !== bTarget) return bTarget - aTarget;

        // Priority 2: Matches user's registered crop
        if (targetUser && targetUser.crop && targetUser.crop !== 'All Crops') {
          const userCrop = targetUser.crop.toLowerCase();
          const aCropMatch = a.crops?.some(c => userCrop.includes(c.toLowerCase()) || c.toLowerCase().includes(userCrop)) ? 1 : 0;
          const bCropMatch = b.crops?.some(c => userCrop.includes(c.toLowerCase()) || c.toLowerCase().includes(userCrop)) ? 1 : 0;
          if (aCropMatch !== bCropMatch) return bCropMatch - aCropMatch;
        }

        return (a.sortOrder || 99) - (b.sortOrder || 99);
      });
    } else if (sortBy === 'user') {
      // Admin sorting: Group by targeted user first, then general
      list.sort((a, b) => {
        const aIsUser = a.targetUserId && a.targetUserId !== 'all' ? 1 : 0;
        const bIsUser = b.targetUserId && b.targetUserId !== 'all' ? 1 : 0;
        if (aIsUser !== bIsUser) return bIsUser - aIsUser;
        return (a.targetUserName || '').localeCompare(b.targetUserName || '');
      });
    } else if (sortBy === 'price_asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'stock') {
      list.sort((a, b) => b.stock - a.stock);
    } else {
      // Default: sortOrder
      list.sort((a, b) => (a.sortOrder || 99) - (b.sortOrder || 99));
    }

    return list;
  }

  getProductById(id) {
    return this.db.products.find(p => p.id === id);
  }

  getCatalogOptions() {
    return this.db.catalogOptions || EMPTY_DB.catalogOptions;
  }

  registerCatalogOptions({ categories = [], crops = [], storageBatches = [] } = {}) {
    const current = this.getCatalogOptions();
    const merge = (base, additions) => [...new Set([...base, ...additions].map(value => String(value).trim()).filter(Boolean))];
    this.db.catalogOptions = {
      categories: merge(current.categories, categories),
      crops: merge(current.crops, crops),
      storageBatches: merge(current.storageBatches, storageBatches)
    };
    this.save();
    return this.db.catalogOptions;
  }

  createProduct(prodData) {
    const id = prodData.id || `sb-${Date.now().toString().slice(-4)}`;
    
    // Resolve target user name
    let targetUserName = 'All Users (General Catalog)';
    if (prodData.targetUserId && prodData.targetUserId !== 'all') {
      const targetUser = this.getUserById(prodData.targetUserId);
      if (targetUser) {
        targetUserName = `${targetUser.name} (${targetUser.crop || targetUser.role})`;
      }
    }

    const price = Number(prodData.price) || 0;
    const mrp = Number(prodData.originalPrice || prodData.mrp || price * 1.2);
    const discountPct = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

    const newProd = {
      id,
      name: prodData.name || 'New Bio Product',
      tagline: prodData.tagline || `${prodData.category || 'Agro'} Solution for High Yield`,
      category: prodData.category || 'Bio-Pesticide',
      price,
      originalPrice: mrp,
      discount: prodData.discount || `${discountPct}% OFF`,
      stock: Number(prodData.stock) || 0,
      crops: Array.isArray(prodData.crops) ? prodData.crops : (typeof prodData.crops === 'string' ? prodData.crops.split(',').map(s => s.trim()) : ['All Crops']),
      diseases: Array.isArray(prodData.diseases) ? prodData.diseases : (typeof prodData.diseases === 'string' ? prodData.diseases.split(',').map(s => s.trim()) : []),
      activeIngredient: prodData.activeIngredient || '100% Bio-Active Botanical Extract',
      dosage: prodData.dosage || '250g - 500g per Acre',
      packSizes: Array.isArray(prodData.packSizes) && prodData.packSizes.length ? prodData.packSizes : ['250g', '500g', '1kg'],
      selectedPack: prodData.selectedPack || '500g',
      badge: prodData.badge || (prodData.stock > 100 ? 'Best Seller' : 'New Launch'),
      images: Array.isArray(prodData.images) && prodData.images.length ? prodData.images : (prodData.image ? [prodData.image] : []),
      image: prodData.image || prodData.images?.[0] || './assets/p1.png',
      howToUse: prodData.howToUse || '',
      whenToUse: prodData.whenToUse || '',
      relatedBlogs: Array.isArray(prodData.relatedBlogs) ? prodData.relatedBlogs : [],
      relatedProductIds: Array.isArray(prodData.relatedProductIds) ? prodData.relatedProductIds : [],
      reviewsEnabled: prodData.reviewsEnabled === true,
      reviews: Array.isArray(prodData.reviews) ? prodData.reviews : [],
      rating: null,
      reviewsCount: 0,
      description: prodData.description || 'High-performance bio-crop protection product.',
      detailedDescription: prodData.detailedDescription || prodData.description || 'Scientifically formulated for modern organic and integrated pest management.',
      targetUserId: prodData.targetUserId || 'all',
      targetUserName,
      sortOrder: Number(prodData.sortOrder) || 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.registerCatalogOptions({
      categories: [newProd.category],
      crops: newProd.crops,
      storageBatches: newProd.packSizes
    });

    this.db.products.unshift(newProd);
    this.save();
    return newProd;
  }

  updateProduct(id, updates) {
    const idx = this.db.products.findIndex(p => p.id === id);
    if (idx === -1) return null;

    let targetUserName = this.db.products[idx].targetUserName;
    if (updates.targetUserId) {
      if (updates.targetUserId === 'all') {
        targetUserName = 'All Users (General Catalog)';
      } else {
        const targetUser = this.getUserById(updates.targetUserId);
        targetUserName = targetUser ? `${targetUser.name} (${targetUser.crop || targetUser.role})` : updates.targetUserId;
      }
    }

    const price = updates.price !== undefined ? Number(updates.price) : this.db.products[idx].price;
    const mrp = updates.originalPrice !== undefined || updates.mrp !== undefined 
      ? Number(updates.originalPrice || updates.mrp) 
      : this.db.products[idx].originalPrice;
    const discountPct = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

    this.db.products[idx] = {
      ...this.db.products[idx],
      ...updates,
      targetUserName,
      price,
      originalPrice: mrp,
      discount: updates.discount || `${discountPct}% OFF`,
      stock: updates.stock !== undefined ? Number(updates.stock) : this.db.products[idx].stock,
      crops: updates.crops ? (Array.isArray(updates.crops) ? updates.crops : updates.crops.split(',').map(s => s.trim())) : this.db.products[idx].crops,
      images: updates.images ? (Array.isArray(updates.images) ? updates.images : updates.images.split(',').map(s => s.trim())) : this.db.products[idx].images,
      image: updates.images?.[0] || updates.image || this.db.products[idx].image,
      howToUse: updates.howToUse !== undefined ? updates.howToUse : this.db.products[idx].howToUse,
      whenToUse: updates.whenToUse !== undefined ? updates.whenToUse : this.db.products[idx].whenToUse,
      relatedBlogs: updates.relatedBlogs !== undefined ? updates.relatedBlogs : this.db.products[idx].relatedBlogs,
      relatedProductIds: updates.relatedProductIds !== undefined ? updates.relatedProductIds : this.db.products[idx].relatedProductIds,
      reviewsEnabled: updates.reviewsEnabled !== undefined ? updates.reviewsEnabled === true : this.db.products[idx].reviewsEnabled,
      rating: null,
      reviewsCount: Array.isArray(this.db.products[idx].reviews) ? this.db.products[idx].reviews.length : 0,
      updatedAt: new Date().toISOString()
    };

    this.registerCatalogOptions({
      categories: [this.db.products[idx].category],
      crops: this.db.products[idx].crops,
      storageBatches: this.db.products[idx].packSizes
    });

    this.save();
    return this.db.products[idx];
  }

  deleteProduct(id) {
    const idx = this.db.products.findIndex(p => p.id === id);
    if (idx === -1) return false;

    this.db.products.splice(idx, 1);
    this.save();
    return true;
  }

  // User Product Summary for Admin Decision Making
  getUserProductSummary() {
    return this.db.users.map(u => {
      const assignedProducts = this.db.products.filter(p => p.targetUserId === u.id);
      const matchingCropProducts = this.db.products.filter(p => 
        u.crop && p.crops && p.crops.some(c => u.crop.toLowerCase().includes(c.toLowerCase()))
      );
      return {
        userId: u.id,
        userName: u.name,
        role: u.role,
        crop: u.crop,
        acreage: u.acreage,
        village: u.village,
        assignedCount: assignedProducts.length,
        assignedProducts: assignedProducts.map(p => ({ id: p.id, name: p.name, price: p.price })),
        cropMatchCount: matchingCropProducts.length
      };
    });
  }

  // ================= ORDERS TABLE =================
  getOrders() {
    return this.db.orders;
  }

  createOrder(orderData) {
    const newOrder = {
      id: `SB-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: orderData.userId || 'USR-WALKIN',
      customerName: orderData.customerName || 'Farmer Customer',
      customerPhone: orderData.customerPhone || '9876543210',
      address: orderData.address || 'Farm Delivery Address',
      items: orderData.items || [],
      subtotal: Number(orderData.subtotal) || 0,
      gst: Number(orderData.gst) || 0,
      total: Number(orderData.total) || 0,
      paymentMethod: orderData.paymentMethod || 'Cash on Delivery',
      paymentStatus: orderData.paymentStatus || 'Pending',
      paymentId: orderData.paymentId || null,
      razorpayOrderId: orderData.razorpayOrderId || null,
      deliveryStatus: orderData.deliveryStatus || 'Confirmed',
      assignedDeliveryBoy: orderData.assignedDeliveryBoy || 'Karthik Raja',
      deliveryBoyPhone: orderData.deliveryBoyPhone || '9345678901',
      otp: Math.floor(1000 + Math.random() * 9000).toString(),
      createdAt: new Date().toISOString()
    };

    this.db.orders.unshift(newOrder);
    this.save();
    return newOrder;
  }

  updateOrder(id, updates) {
    const order = this.db.orders.find(o => o.id === id);
    if (!order) return null;

    Object.assign(order, updates);
    this.save();
    return order;
  }

  // ================= CMS & ADVISORY =================
  getCMS() {
    return this.db.cms;
  }

  updateCMS(updates) {
    this.db.cms = { ...this.db.cms, ...updates };
    this.save();
    return this.db.cms;
  }

  getAdvisorySubscribers() {
    return this.db.advisorySubscribers;
  }

  addAdvisorySubscriber(sub) {
    this.db.advisorySubscribers.unshift(sub);
    this.save();
    return sub;
  }

  getInventory() {
    return this.db.inventory;
  }

  getStaffTasks() {
    return this.db.staffTasks;
  }

  getTickets() {
    return this.db.tickets;
  }

  addTicket(ticket) {
    this.db.tickets.unshift(ticket);
    this.save();
    return ticket;
  }

  getChatRecords() {
    return this.db.chatRecords;
  }
}

// Export singleton database instance
export const db = new DatabaseManager();
export default db;
