// src/middlewares/authenticateToken.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomAuthRequest } from '../types/index';  // Import the CustomAuthRequest type

const authenticateToken = (req: CustomAuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied, token missing.' });
  }

  try {
    // Assuming you're decoding the token and attaching the user object to the request
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      email: string;
      username: string;
      tier: string;  // `tier` is initially a string
    };

    // Cast `tier` to be either 'free' or 'paid' to satisfy the type definition
    req.user = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
      tier: decoded.tier as 'free' | 'paid',  // Explicitly cast tier
    };

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

export { authenticateToken };
