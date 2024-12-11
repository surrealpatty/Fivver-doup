// src/routes/auth.ts
import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs'; // Assuming bcrypt is used for password hashing
import jwt from 'jsonwebtoken';
import { User } from '../models/user';  // Correct path to the User model
import { authenticateToken } from '../middleware/authenticateJWT';  // Correct the name to 'authenticateToken'
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

const router = Router();

// Define a custom AuthRequest interface to include user
interface AuthRequest extends Request {
  user?: { id: string; email?: string; username?: string; role?: string; tier?: string };
}

// Login Route (for generating JWT)
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Compare password with hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT token if credentials are valid
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      tier: user.tier,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' }); // 1 hour expiration

    // Send the token to the client
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected Route Example: Access profile with JWT
router.get('/profile', authenticateToken, (req: AuthRequest, res: Response) => {
  // Access user info from the request
  const user = req.user;
  if (!user) {
    return res.status(403).json({ message: 'Access denied. No user found.' });
  }
  res.json({ message: 'Welcome to your profile', user });
});

// Export router to use in the main app
export default router;
