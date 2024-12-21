import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomAuthRequest } from '../types'; // Import your CustomAuthRequest

const authenticateToken = (req: CustomAuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Assuming Bearer token

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token is not valid' });
    }

    req.user = decoded as UserPayload; // Attach the decoded user to the request object
    next();
  });
};

export default authenticateToken;
