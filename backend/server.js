// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/product.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();
const _dirname = path.resolve()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📁 Ensure uploads folder exists
const uploadPath = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Serve uploaded images
app.use("/uploads", express.static(uploadPath));

// Routes
app.use("/api/product", productRoutes);
app.use("/api/auth", authRoutes);

app.use(express.static(path.join(_dirname, "frontend", "dist")));
app.use((req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});


app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});