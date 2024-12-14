import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user'; 
import { sendPasswordResetEmail } from '../utils/email'; // Import the function here

const router = Router();

// POST /api/users - Create a new user
router.post('/', async (req: Request, res: Response) => {
  const { email, username, password, role, tier, isVerified } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
      role: role || 'user',  // Default role is 'user'
      tier: tier || 'free',  // Default tier is 'free'
      isVerified: isVerified || false,  // Default isVerified is false
    });

    return res.status(201).json({
      message: 'User created successfully',
      user: newUser,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
});

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
    await sendPasswordResetEmail(email, resetLink);

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

// POST /api/users/login - Login Route
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET as string, // Ensure JWT_SECRET is defined in .env
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Send the token as the response
    return res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
