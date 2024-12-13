import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import crypto from 'crypto'; // For generating a secure token
import { User } from '../models/user'; // Correct import for User model
import { Op } from 'sequelize'; // Add this import for Sequelize operators
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Or another service like SendGrid, Mailgun, etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or an app password
  },
});

// Request Password Reset Route
router.post('/reset-password/request', async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a password reset token
    const resetToken = crypto.randomBytes(20).toString('hex'); // Generate a token
    const resetTokenExpiration = new Date(Date.now() + 3600000); // 1 hour expiration

    // Store the token and expiration in the database
    user.resetToken = resetToken;
    user.resetTokenExpiration = resetTokenExpiration;
    await user.save();

    // Send the password reset email with the reset token
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

// Handle Password Reset
router.post('/reset-password/:token', async (req: Request, res: Response) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Find user by reset token
    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpiration: { [Op.gte]: new Date() }, // Check if token is expired
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and clear the reset token
    user.password = hashedPassword;
    user.resetToken = null as string | null;  // Cast null to string | null
    user.resetTokenExpiration = null as Date | null;  // Cast null to Date | null
    

    await user.save();

    res.status(200).json({ message: 'Password successfully reset' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while resetting password' });
  }
});

export default router;
