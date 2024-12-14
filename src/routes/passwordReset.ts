import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { User } from '../models/user';
import { Op } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

// Create a nodemailer transporter using Gmail or another service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Request Password Reset Route
router.post('/reset-password/request', async (req: Request, res: Response) => {
  console.log('Password reset request route hit');  // Debug log

  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiration = new Date(Date.now() + 3600000); // 1 hour expiration

    user.resetToken = resetToken;
    user.resetTokenExpiration = resetTokenExpiration;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const mailOptions = {
      to: email,
      subject: 'Password Reset',
      text: `You requested a password reset. Please click the link below to reset your password:\n\n${resetUrl}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset link sent to your email.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while processing password reset request' });
  }
});

// Handle Password Reset with Token Route
router.post('/reset-password/:token', async (req: Request, res: Response) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpiration: { [Op.gte]: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Set resetToken and resetTokenExpiration to null instead of undefined
    user.resetToken = null;
    user.resetTokenExpiration = null;
    
    await user.save();

    res.status(200).json({ message: 'Password successfully reset' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while resetting password' });
  }
});

export default router;
