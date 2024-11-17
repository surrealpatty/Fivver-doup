// src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { Op } from 'sequelize';

export const register = async (req: Request, res: Response) => {
  const { username, email, password, firstName, lastName, subscriptionStatus } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }]
      }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already taken' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Set subscriptionStartDate to current date and subscriptionEndDate to one month later
    const subscriptionStartDate = new Date();
    const subscriptionEndDate = new Date();
    subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);  // Default to one month

    // Create user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: 'Free',
      subscriptionStatus: subscriptionStatus || 'Inactive',  // Set default subscriptionStatus if not provided
      subscriptionStartDate,
      subscriptionEndDate
    });

    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};
