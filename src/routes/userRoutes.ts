import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import User from '../models/user';
import { authenticateToken } from '../middlewares/authMiddleware';
import { Op } from 'sequelize';

// Initialize router
const router = express.Router();

// Interface for better type safety on the request body
interface RegisterRequestBody {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  subscriptionStatus?: string;
}

// Registration Route
router.post(
  '/register',
  // Input validation
  body('username').isString().notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  async (req: Request<{}, {}, RegisterRequestBody>, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, firstName, lastName, subscriptionStatus } = req.body;

    try {
      // Check if the username or email already exists
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });
      if (existingUser) {
        return res.status(400).json({ message: 'Username or email already taken' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      if (!hashedPassword) {
        return res.status(500).json({ message: 'Error hashing password' });
      }

      // Set subscription dates
      const subscriptionStartDate = new Date();
      const subscriptionEndDate = new Date();
      subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);  // Default to one month from now

      // Create the new user
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: 'Free',  // Default role is 'Free'
        subscriptionStatus: subscriptionStatus || 'Inactive',  // Default status is 'Inactive'
        subscriptionStartDate,
        subscriptionEndDate,
      });

      // Respond with the created user data (excluding the password)
      return res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      console.error('Error during registration:', error);
      return res.status(500).json({ message: 'Server error during registration', error: error.message });
    }
  }
);

// Other routes...

export default router;
