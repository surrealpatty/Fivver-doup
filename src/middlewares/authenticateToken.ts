// src/middlewares/authenticateToken.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomAuthRequest } from '../types/index';  // Import the CustomAuthRequest type

const authenticateToken = (req: CustomAuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from header

  if (!token) {
    return res.status(401).json({ message: 'Access denied, token missing.' });
  }

  try {
    // Decode the token to get the user data, assuming the token has the necessary fields
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      email: string;
      username: string;
      tier: string;  // `tier` is initially a string (could be 'free' or 'paid')
      role?: string;  // Optional role (you can add more fields if necessary)
    };

    // Ensure `tier` is explicitly cast to the correct type
    req.user = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
      tier: decoded.tier === 'free' || decoded.tier === 'paid' ? decoded.tier : 'free',  // Default to 'free' if `tier` is not correctly set
      role: decoded.role === 'admin' || decoded.role === 'user' ? decoded.role : 'user', // Default to 'user' if role is invalid or missing
    };

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

export { authenticateToken };
