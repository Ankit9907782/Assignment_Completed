// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, sparse: true },
  phone: { type: String, unique: true, sparse: true },
  password: { type: String },
  otp: { type: String }, // store OTP temporarily
  otpExpires: { type: Date }
}, { timestamps: true });

export default mongoose.model('User', userSchema);