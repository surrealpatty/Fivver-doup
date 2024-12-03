import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types/index'; // Ensure this is correctly imported from your types

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  console.error('JWT_SECRET is not set. Authentication will fail.');
}

/**
 * Middleware to authenticate the token provided in the Authorization header.
 * If the token is valid, the decoded payload is attached to `req.user`.
 */
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Extract token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : undefined;

    if (!token) {
      res.status(401).json({ message: 'Access denied, no token provided.' });
      return; // Explicit return to satisfy TypeScript's void requirement
    }

    // Verify the token
    jwt.verify(token, jwtSecret as string, (err, decoded) => {
      if (err) {
        res.status(403).json({ message: 'Invalid or expired token.' });
        return; // Explicit return to end execution
      }

      // Attach the decoded payload to req.user
      req.user = decoded as UserPayload;

      // Proceed to the next middleware or route handler
      next();
    });
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Internal server error during authentication.' });
    return; // Explicit return to end execution
  }
};

/**
 * Middleware to check if the user is authenticated.
 * It uses `authenticateToken` and adds additional checks if needed.
 */
export const checkAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  authenticateToken(req, res, () => {
    // Additional checks can be added here if needed (e.g., check if user is active)
    if (req.user) {
      next(); // If authenticated, proceed to the next route handler
    } else {
      res.status(401).json({ message: 'Authentication failed.' });
    }
  });
};

/**
 * Utility function to generate a JWT token for a user.
 * @param user The user object to generate a token for.
 * @returns A signed JWT token.
 */
export const generateToken = (user: { id: string; email: string; username: string }): string => {
  const payload: UserPayload = { 
    id: user.id, 
    email: user.email,
    username: user.username  // Include username in the token
  };

  return jwt.sign(payload, jwtSecret as string, { expiresIn: '1h' }); // You can modify expiration as needed
};

export default authenticateToken;
