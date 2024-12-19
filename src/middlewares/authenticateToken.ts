// src/middlewares/authenticateToken.ts
import { Response, NextFunction } from 'express';
import { CustomAuthRequest } from '../types';  // Correct import

export const authenticateToken = (req: CustomAuthRequest, res: Response, next: NextFunction) => {
  // Example logic to extract token and populate req.user
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(403).send('Token is required');
  }

  try {
    // Assuming you're using JWT, replace this with your actual token verification logic
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { user: UserPayload };
    req.user = decoded.user;  // This sets the user on the request object
    next();
  } catch (error) {
    return res.status(403).send('Invalid token');
  }
};
