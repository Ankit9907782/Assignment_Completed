// routes/auth.js
import express from 'express';
import User from '../models/User.js';
import { generateOTP } from '../utils/otp.js';
import nodemailer from 'nodemailer';

const router = express.Router();

// Send OTP to Email
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  const otp = generateOTP();
  const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ email, otp, otpExpires });
  } else {
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();
  }

  // Send email (example with Gmail, use environment variables in production)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}`
  });

  res.json({ message: 'OTP sent to email' });
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });

  if (user.otp !== otp || user.otpExpires < new Date()) {
    return res.status(400).json({ error: 'Invalid or expired OTP' });
  }

  // OTP valid, clear it
  user.otp = null;
  user.otpExpires = null;
  await user.save();

  res.json({ message: 'OTP verified, login successful', userId: user._id });
});

export default router;