// routes/product.js
import express from 'express';
import Product from '../models/Product.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = express.Router();

// Setup multer for image uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Create a product
router.post('/create', upload.array('images', 5), async (req, res) => {
  try {
    const {
      name, type, mrp, sellingPrice,
      quantityStock, brandName, exchangeOrReturn
    } = req.body;

    // Check if images uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "Please upload at least one product image" });
    }

    const imagePaths = req.files.map(f => `/uploads/${f.filename}`);

    const product = await Product.create({
      name, type, mrp, sellingPrice,
      quantityStock, brandName, exchangeOrReturn,
      images: imagePaths
    });

    res.status(201).json({ message: "Product created successfully", product });

  } catch (err) {
    // Validation errors from mongoose
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ errors });
    }
    res.status(500).json({ error: err.message });
  }
});

// Get all products
router.get('/all', async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

// routes/product.js (add this)
router.patch('/toggle-status/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    product.status = product.status === 'Published' ? 'Unpublished' : 'Published';
    await product.save();

    res.json({ message: `Product ${product.status.toLowerCase()} successfully`, product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product
router.put('/edit/:id', upload.array('images', 5), async (req, res) => {
  try {
    const { name, type, mrp, sellingPrice, quantityStock, brandName, exchangeOrReturn, status } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Update fields
    if (name) product.name = name;
    if (type) product.type = type;
    if (mrp) product.mrp = mrp;
    if (sellingPrice) product.sellingPrice = sellingPrice;
    if (quantityStock) product.quantityStock = quantityStock;
    if (brandName) product.brandName = brandName;
    if (exchangeOrReturn) product.exchangeOrReturn = exchangeOrReturn;
    if (status) product.status = status;

    // Update images if uploaded
    if (req.files && req.files.length > 0) {
      const imagePaths = req.files.map(f => `/uploads/${f.filename}`);
      product.images = imagePaths;
    }

    await product.save();
    res.json({ message: 'Product updated successfully', product });

  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ errors });
    }
    res.status(500).json({ error: err.message });
  }
});

// routes/product.js (add this route)
router.delete('/delete/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// routes/product.js (add this route)
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query; // ?q=searchTerm
    if (!q) return res.status(400).json({ error: 'Please provide a search term' });

    // Search by name, type, or brand (case-insensitive)
    const regex = new RegExp(q, 'i'); // i → case-insensitive
    const products = await Product.find({
      $or: [
        { name: regex },
        { type: regex },
        { brandName: regex }
      ]
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/all/status', async (req, res) => {
  try {
    const { status } = req.query; // ?status=Published or ?status=Unpublished
    let filter = {};
    if (status) filter.status = status;

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;