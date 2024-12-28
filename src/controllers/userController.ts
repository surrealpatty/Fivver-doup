// src/controllers/userController.ts

import { Request, Response } from 'express';
import { User } from '../models'; // Assuming the User model is correctly imported

// Register user
export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, email, password } = req.body; // Extract user details from the request body
    
    // Create new user in the database
    const newUser = await User.create({ username, email, password });
    
    // Respond with the newly created user
    return res.status(201).json(newUser); // Return the response directly
  } catch (error) {
    // Handle any errors that occur during user creation
    return res.status(500).json({
      message: error instanceof Error ? error.message : 'Error registering user',
    });
  }
};
