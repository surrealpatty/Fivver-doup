// src/middlewares/authenticateJWT.ts
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types'; // Correct import path

export const authenticateJWT = (
  req: AuthRequest, 
  res: Response, 
  next: NextFunction
): void => {
  const token = req.headers['authorization']?.split(' ')[1];  // Extract token

  if (!token) {
    res.status(403).json({ message: 'No token provided.' });
    return;
  }

  // Verify the token with the correct options
  const options = { algorithms: ['HS256'] };  // Specify the algorithm correctly
  jwt.verify(token, process.env.JWT_SECRET!, options, (err: VerifyErrors | null, decoded: JwtPayload | undefined) => {
    if (err) {
      res.status(403).json({ message: 'Invalid token.' });
      return;
    }

    if (decoded) {
      req.user = {
        id: decoded.id,
        email: decoded.email,
        username: decoded.username,
        tier: decoded.tier,
        role: decoded.role,
      };
    }

    next();
  });
};
