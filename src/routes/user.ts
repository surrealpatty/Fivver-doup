import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import { body, validationResult } from 'express-validator';
import { Op } from 'sequelize';

const router = Router();

// User registration route
router.post(
  '/register',
  // Validation middleware
  body('username').isString().notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('firstName').isString().notEmpty().withMessage('First name is required'),
  body('lastName').isString().notEmpty().withMessage('Last name is required'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, firstName, lastName } = req.body;

    try {
      // Check if username or email already exists
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }]
        }
      });

      if (existingUser) {
        if (existingUser.username === username) {
          return res.status(400).json({ message: 'Username already taken' });
        }
        if (existingUser.email === email) {
          return res.status(400).json({ message: 'Email is already taken' });
        }
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: 'Free', // Default role for a new user
        subscriptionStatus: 'Inactive', // Default subscription status
      });

      // Respond with the created user data (excluding password)
      res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        subscriptionStatus: user.subscriptionStatus,
      });
    } catch (error) {
      console.error('Error during registration:', (error as Error).message);
      res.status(500).json({ message: 'Server error during registration' });
    }
  }
);

export default router;
