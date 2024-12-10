// src/routes/user.ts

import { Router, Request, Response } from 'express'; // Import necessary types
import { User } from '@models/user';  // Correct import for User model
import { ValidationError } from 'sequelize'; // Import ValidationError for handling Sequelize errors
import { body, validationResult } from 'express-validator'; // Express validation middleware
import { Op } from 'sequelize';  // Import Sequelize 'Op' for the OR condition
import { authenticateToken } from '@middlewares/authenticateToken';  // Correct import for authenticateToken
import { AuthRequest } from '../types/authMiddleware';  // Correctly typed AuthRequest if needed
const router = Router();

// Route for user registration
router.post(
  '/register',
  // Validation middleware for email, username, and password
  body('email').isEmail().withMessage('Invalid email address'),
  body('username')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  // Handle user registration logic
  async (req: Request, res: Response): Promise<void> => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return; // Ensure we stop further processing if validation fails
    }

    const { email, username, password } = req.body;

    try {
      // Check if user already exists by email or username
      const existingUser = await User.findOne({
        where: { [Op.or]: [{ email }, { username }] }, // Use Sequelize's 'Op' to check both fields
      });

      if (existingUser) {
        res.status(400).json({ message: 'Email or Username already in use' });
        return; // Ensure we stop further processing if the user already exists
      }

      // Hash password before saving
      const hashedPassword = await User.hashPassword(password);

      // Create a new user
      const newUser = await User.create({
        email,
        username,
        password: hashedPassword,
        role: 'free',  // Default to free tier if needed
        tier: 'free',  // Default tier (can be updated later if paid)
      });

      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,
          role: newUser.role,
          tier: newUser.tier,
        },
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({ errors: error.errors });
      } else {
        res.status(500).json({ message: 'Server error' });
      }
    }
  }
);

// Route for accessing premium content (tier-based restrictions)
router.get('/premium-content', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user?.id;  // Ensure the user is retrieved from the token

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Check if the user is on the 'paid' tier
    if (user.tier !== 'paid') {
      res.status(403).json({ message: 'Access restricted to paid users only' });
      return;
    }

    res.status(200).json({ message: 'Welcome to premium content' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
