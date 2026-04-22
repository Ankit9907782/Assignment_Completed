// // routes/auth.js
// import express from 'express';
// import User from '../models/User.js';
// import { generateOTP } from '../utils/otp.js';
// import nodemailer from 'nodemailer';
// import { Resend } from "resend";
// import dotenv from 'dotenv';

// dotenv.config();
// const router = express.Router();
// const resend = new Resend(process.env.RESEND_API_KEY);

// // Send OTP to Email
// router.post('/send-otp', async (req, res) => {
//   const { email } = req.body;
//   if (!email) return res.status(400).json({ error: 'Email required' });

//   const otp = generateOTP();
//   const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

//   let user = await User.findOne({ email });
//   if (!user) {
//     user = await User.create({ email, otp, otpExpires });
//   } else {
//     user.otp = otp;
//     user.otpExpires = otpExpires;
//     await user.save();
//   }

//   // Send email (example with Gmail, use environment variables in production)
//  await resend.emails.send({
//       from: "The website <onboarding@resend.dev>", // your verified email
//       to: email,
//       subject: "Your OTP Code",
//       html: `<p>Your OTP is <strong>${otp}</strong>. It expires in 5 minutes.</p>`
//     });

//     res.json({ message: "OTP sent to email" });
// });

// // Verify OTP
// router.post('/verify-otp', async (req, res) => {
//   const { email, otp } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return res.status(404).json({ error: 'User not found' });

//   if (user.otp !== otp || user.otpExpires < new Date()) {
//     return res.status(400).json({ error: 'Invalid or expired OTP' });
//   }

//   // OTP valid, clear it
//   user.otp = null;
//   user.otpExpires = null;
//   await user.save();

//   res.json({ message: 'OTP verified, login successful', userId: user._id });
// });

// export default router;




// routes/auth.js
import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

import User from '../models/User.js';
import { generateOTP } from '../utils/otp.js';

dotenv.config();
const router = express.Router();

// ✅ Brevo SMTP transporter
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_LOGIN,
    pass: process.env.BREVO_PASS,
  },
});

// ✅ Send OTP to Email
router.post('/send-otp', async (req, res) => {
  try {
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

    // ✅ Send email via Brevo
    await transporter.sendMail({
      from: `"OTP Service <ankitghosh200416@gmail.com>",
      to: email,
      subject: "Your OTP Code",
      html: `<p>Your OTP is <strong>${otp}</strong>. It expires in 5 minutes.</p>`,
    });

    res.json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Failed to send OTP email" });
  }
});

// ✅ Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
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
  } catch (error) {
    console.error("OTP verify error:", error);
    res.status(500).json({ error: "OTP verification failed" });
  }
});

export default router;
