import { Router, Request, Response } from 'express';  // Importing necessary types
import { body, validationResult } from 'express-validator';  // Validation middleware
import bcrypt from 'bcryptjs';  // For password hashing
import { User } from '../models/user';  // User model import
import { generateToken } from '../utils/jwt';  // JWT token generation utility
import { loginUser } from '../controllers/userController';  // Login controller
import { authenticateToken } from '../middlewares/authenticateToken';  // Authentication middleware
import { UserPayload } from '../types';  // Import UserPayload type for type safety

const router = Router();

// User registration route
router.post(
  '/register',
  [
    // Validation middleware
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('username').optional().isString().withMessage('Username must be a string'),  // Optional
    body('role').optional().isIn(['user', 'admin']).withMessage('Role must be either user or admin'),  // Optional
    body('tier').optional().isIn(['free', 'paid']).withMessage('Tier must be either free or paid'),  // Optional
    body('isVerified').optional().isBoolean().withMessage('isVerified must be a boolean value'),  // Optional
  ],
  async (req: Request, res: Response): Promise<Response> => {
    // Validate input fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract data from request body
    const { email, password, username, role, tier, isVerified } = req.body;

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const user = await User.create({
        email,
        password: hashedPassword,
        username: username || 'default_username', // Default username if not provided
        role: role || 'user', // Default role 'user'
        tier: tier || 'free', // Default tier 'free'
        isVerified: isVerified || false, // Default to false if not provided
      });

      // Generate JWT token
      const token = generateToken(user);

      // Respond with user info and token
      return res.status(201).json({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        token,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  }
);

// User login route
router.post(
  '/login',
  [
    // Validation middleware
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  async (req: Request, res: Response): Promise<Response> => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Call the login controller to handle login logic
    return loginUser(req, res);  // loginUser handles response sending
  }
);

// Protected route to get user profile
router.get(
  '/profile',
  authenticateToken,  // Protect this route with JWT authentication
  async (req: Request, res: Response): Promise<Response> => {
    try {
      // If user is not authenticated, return 401
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized, no user found in token' });
      }

      // Cast req.user to the correct type (UserPayload)
      const userPayload = req.user as UserPayload;

      // Find user from the database by ID (from token)
      const user = await User.findByPk(userPayload.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Respond with user profile data
      return res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          tier: user.tier,
          isVerified: user.isVerified,
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  }
);

// Update user profile route
router.put(
  '/profile',
  authenticateToken,  // Protect this route with JWT authentication
  [
    body('email').optional().isEmail().withMessage('Please provide a valid email address'),
    body('username').optional().isString().withMessage('Username must be a string'),
    body('role').optional().isIn(['user', 'admin']).withMessage('Role must be either user or admin'),
    body('tier').optional().isIn(['free', 'paid']).withMessage('Tier must be either free or paid'),
    body('isVerified').optional().isBoolean().withMessage('isVerified must be a boolean value'),
  ],
  async (req: Request, res: Response): Promise<Response> => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Ensure the user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userPayload = req.user as UserPayload;
    const { email, username, role, tier, isVerified } = req.body;

    try {
      // Find user by ID
      const user = await User.findByPk(userPayload.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update the user fields
      user.email = email || user.email;
      user.username = username || user.username;
      user.role = role || user.role;
      user.tier = tier || user.tier;
      user.isVerified = isVerified !== undefined ? isVerified : user.isVerified;

      await user.save();

      // Respond with updated user data
      return res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          tier: user.tier,
          isVerified: user.isVerified,
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;
