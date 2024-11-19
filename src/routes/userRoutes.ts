import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Ensure this is installed
import authMiddleware from '../middlewares/authMiddleware';
import User from '../models/user'; // Update path if necessary

const router = Router();

// Utility function to generate JWT token
const generateAuthToken = (userId: number) => {
  const secret = process.env.JWT_SECRET || 'your_jwt_secret'; // Use a secret from your env
  const expiresIn = '1h'; // Token expiration
  return jwt.sign({ id: userId }, secret, { expiresIn });
};

// 1. User Registration Route (POST /register)
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('username').isString().withMessage('Username must be a string'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, username, isPaid = false } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = await User.create({
        email,
        password: hashedPassword,
        username,
        isPaid,
      });

      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,
          isPaid: newUser.isPaid,
        },
      });
    } catch (error: any) {
      console.error('Error registering user:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// 2. User Login Route (POST /login)
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password is required'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = generateAuthToken(user.id);

      res.json({
        message: 'Login successful',
        token,
      });
    } catch (error: any) {
      console.error('Error logging in user:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// 3. Get User Profile Route (GET /profile)
router.get('/profile', authMiddleware, async (req: Request & { user?: { id: number } }, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      email: user.email,
      username: user.username,
      isPaid: user.isPaid,
      role: user.role,
    });
  } catch (error: any) {
    console.error('Error fetching user profile:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 4. Update User Profile Route (PUT /profile)
router.put(
  '/profile',
  authMiddleware,
  [
    body('username').optional().isString().withMessage('Username must be a string'),
    body('email').optional().isEmail().withMessage('Please include a valid email'),
    body('isPaid').optional().isBoolean().withMessage('isPaid must be a boolean'),
  ],
  async (req: Request & { user?: { id: number } }, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const { username, email, isPaid } = req.body;

      // Update only fields provided in the request
      if (username) user.username = username;
      if (email) user.email = email;
      if (isPaid !== undefined) user.isPaid = isPaid;

      await user.save();

      res.json({
        message: 'User profile updated successfully',
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          isPaid: user.isPaid,
        },
      });
    } catch (error: any) {
      console.error('Error updating user profile:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

export default router;
