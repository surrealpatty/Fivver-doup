// src/routes/user.ts
import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user'; // Ensure this is correctly imported
import { sendPasswordResetEmail } from '../utils/email'; // Import the email function

const router = Router();

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
