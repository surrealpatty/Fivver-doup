import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid'; 
import { User } from '../models/user';

export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, username, password } = req.body;

  try {
    if (!email || !username || !password) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10); 

    // Create a new user 
    const newUser = await User.create({
      id: uuidv4(), 
      email,
      username,
      password: hashedPassword, 
      role: '',
      tier: '',
      isVerified: false, 
    });

    return res.status(201).json({
      message: 'User created successfully',
      user: { id: newUser.id, email: newUser.email, username: newUser.username },
    }); 

  } catch (error) {
    console.error('Error during user registration:', error);
    return res.status(500).json({ message: 'Server error during user registration' }); 
  }
};

// ... rest of your code ...