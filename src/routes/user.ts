import { Router, Request, Response } from 'express';
import { User } from '../models/user'; // Assuming you have the User model
import { sendPasswordResetEmail } from '../utils/email'; // Importing email utility to send password reset email
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken';
const router = Router();

// POST /api/users/request-password-reset - Request Password Reset Route
router.post('/request-password-reset', async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    // Validate required fields
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a reset token
    const resetToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET as string, // Ensure JWT_SECRET is defined in .env
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Generate the reset link
    const resetLink = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;

    // Send password reset email
    await sendPasswordResetEmail(email, resetToken);

    return res.status(200).json({
      message: 'Password reset email sent. Please check your inbox.',
    });
  } catch (error) {
    console.error('Error requesting password reset:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
});

// POST /api/users/reset-password - Reset Password Route
router.post('/reset-password', async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  try {
    // Validate required fields
    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Token and new password are required' });
    }

    // Verify the reset token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!decoded || typeof decoded === 'string') {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Find the user associated with the token
    const user = await User.findOne({ where: { id: (decoded as { id: string }).id } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
