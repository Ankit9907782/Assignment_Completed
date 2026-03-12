// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please enter product name"] },
  type: { 
    type: String, 
    enum: ['foods', 'electronics', 'cloth', 'beauty product', 'others'], 
    required: [true, "Please select product type"] 
  },
  mrp: { type: Number, required: [true, "Please enter MRP"] },
  sellingPrice: { type: Number, required: [true, "Please enter selling price"] },
  quantityStock: { type: Number, required: [true, "Please enter quantity in stock"] },
  brandName: { type: String, required: [true, "Please enter brand name"] },
  images: [{ type: String, required: [true, "Please upload at least one product image"] }],
  exchangeOrReturn: { type: String, enum: ['Yes', 'No'], required: [true, "Please select exchange/return eligibility"] },
    status: { type: String, enum: ['Published', 'Unpublished'], default: 'Unpublished' }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);