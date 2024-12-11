import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs'; // For password hashing
import jwt from 'jsonwebtoken';
import { User } from '../models/user'; // Correct path to the User model
import { authenticateToken } from '../middlewares/authenticateToken'; // Correct middleware
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

const router = Router();

// Define a custom AuthRequest interface to include user
interface AuthRequest extends Request {
  user?: { id: string; email?: string; username?: string; role?: string; tier?: string };
}

// Register Route
router.post('/register', async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with default values for role, tier, and isVerified
    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
      role: 'user',        // Default role
      tier: 'free',        // Default tier
      isVerified: false,   // Default verification status
    });

    // Respond with success
    res.status(201).json({ message: 'User registered successfully.', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

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
