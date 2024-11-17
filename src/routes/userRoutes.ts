// src/routes/userRoutes.ts
import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import User from '../models/user';
import { authenticateToken } from '../middlewares/authMiddleware';
import { Op } from 'sequelize';

const router = express.Router();

// Registration Route
router.post('/register', 
  body('username').isString().notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, firstName, lastName, subscriptionStatus } = req.body;

    try {
      const existingUser = await User.findOne({ where: { [Op.or]: [{ username }, { email }] } });
      if (existingUser) {
        return res.status(400).json({ message: 'Username or email already taken' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // Set subscriptionStartDate to the current date and subscriptionEndDate to one month later
      const subscriptionStartDate = new Date();
      const subscriptionEndDate = new Date();
      subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);  // Default to one month

      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        firstName,  // Add firstName
        lastName,   // Add lastName
        role: 'Free', // Set role to 'Free' by default
        subscriptionStatus: subscriptionStatus || 'Inactive', // Set default subscriptionStatus
        subscriptionStartDate,
        subscriptionEndDate
      });

      res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Server error during registration' });
    }
  }
);

// Other routes...
export default router;
