import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

// Define the expected structure of the decoded JWT payload
interface UserPayload {
  id: string;
  email?: string;
  username?: string;
}

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

// Extend Request to include a user field with the appropriate structure
interface AuthRequest extends Request {
  user?: UserPayload; // Add user field with the custom UserPayload type
}

// The authenticateToken middleware function
const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Response | void => {
  // Extract the token from the Authorization header
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from 'Bearer <token>'

  if (!token) {
    // Return an error if the token is missing
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  // Token verification options
  const options = {
    algorithms: ['HS256'], // Specify accepted algorithms
  };

  // Verify the JWT token
  jwt.verify(token, SECRET_KEY, options, (err: Error | null, decoded: UserPayload | string | undefined) => {
    if (err) {
      // Return an error if the token is invalid or expired
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    if (decoded) {
      // If the token is valid, attach the decoded user data to the request object
      req.user = decoded as UserPayload;
    } else {
      // Return an error if the token structure is invalid
      return res.status(401).json({ message: 'Invalid token structure' });
    }

    // Proceed to the next middleware
    next();
  });
};

export default authenticateToken;
