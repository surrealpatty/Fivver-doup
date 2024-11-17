// src/routes/userRoutes.ts

import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import { Op } from 'sequelize';  // Import Op for Sequelize operators
import User from '../models/user'; // Ensure this import matches your model file
import { authenticateToken } from '../middlewares/authMiddleware';  // If you use token authentication

const router = express.Router();

// Registration Route
router.post(
  '/register', 
  // Validation checks
  body('username').isString().notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('firstName').isString().notEmpty().withMessage('First name is required'),
  body('lastName').isString().notEmpty().withMessage('Last name is required'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);  // Check validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });  // Send error response if validation fails
    }

    const { username, email, password, firstName, lastName, subscriptionStatus } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ 
        where: { 
          [Op.or]: [{ username }, { email }] 
        }
      });
      if (existingUser) {
        return res.status(400).json({ message: 'Username or email already taken' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Set subscriptionStartDate and subscriptionEndDate
      const subscriptionStartDate = new Date();
      const subscriptionEndDate = new Date();
      subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);  // Default subscription for 1 month

      // Create the user in the database
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: 'Free', // Default role
        subscriptionStatus: subscriptionStatus || 'Inactive',  // Default to 'Inactive' if not provided
        subscriptionStartDate,
        subscriptionEndDate
      });

      // Return success response
      return res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      });
    } catch (error: unknown) {
      // Proper error handling with type assertion
      if (error instanceof Error) {
        return res.status(500).json({ message: 'Server error during registration', error: error.message });
      } else {
        return res.status(500).json({ message: 'Server error during registration', error: 'Unknown error' });
      }
    }
  }
);

// Export the router
export default router;
