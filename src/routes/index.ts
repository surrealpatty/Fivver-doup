import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 from 'uuid'
import { User } from '../models/user';

// ... rest of the code ...

export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, username, password } = req.body;

  try {
    // ... rest of the code ...

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10); 

    // Create a new user 
    const newUser = await User.create({
      id: uuidv4(), // Add the 'id' property
      email,
      username,
      password: hashedPassword, 
      role: '',
      tier: '',
      isVerified: false, 
    });

    // ... rest of the code ...
  } catch (error) {
    // ... rest of the code ...
  }
};

// ... rest of the code ...