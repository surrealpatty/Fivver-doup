import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Define UserPayload to type the decoded token
interface UserPayload extends JwtPayload {
  id: string;
  email: string;
  username: string;
}

// Middleware to authenticate the token and attach user information to req.user
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {  // Returning void, no value from this function
  // Extract token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    // If no token is provided, send a response and return early
    res.status(401).json({ message: 'No token provided.' });
    return;
  }

  try {
    // Verify the token and decode the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;
    
    // Attach the decoded user payload to req.user
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails, send a response and return early
    res.status(403).json({ message: 'Invalid token.' });
    return;
  }
};
