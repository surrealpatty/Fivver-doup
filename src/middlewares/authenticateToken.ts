import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

// Extend Request to include a user field
interface AuthRequest extends Request {
  user?: JwtPayload | string; // Decoded token can be a JwtPayload or string (if a non-object is returned)
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Response | void => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  // Define token verification options
  const options = {
    algorithms: ['HS256'], // Specify accepted algorithms for verification
  };

  // Perform token verification
  jwt.verify(token, SECRET_KEY, options, (err: jwt.JsonWebTokenError | null, decoded: JwtPayload | string | undefined) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    if (decoded) {
      req.user = decoded; // Attach decoded token to the request object (it can be a JwtPayload or string)
    } else {
      return res.status(401).json({ message: 'Invalid token structure' });
    }

    next(); // Proceed to the next middleware
  });
};
