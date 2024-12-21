import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types'; 
import { CustomAuthRequest } from 'types/'; 

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token is invalid or expired' });
    }

    if (decoded) {
      (req as CustomAuthRequest).user = decoded as UserPayload; 
      return next(); 
    }

    return res.status(400).json({ message: 'Missing user information in token' });
  });
};

export default authenticateToken;