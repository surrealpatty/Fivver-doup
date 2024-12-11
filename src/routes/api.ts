import { Router, Request, Response, NextFunction } from 'express';  // Import Router from express
import { AuthRequest } from '../types/index'; // Import the correct path for AuthRequest
import jwt from 'jsonwebtoken';  // JWT for verifying tokens
import { UserPayload } from '../types/index'; // Import the correct path for UserPayload

// Secret key for JWT verification, you should store it in an environment variable for security
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Replace with your actual secret key

// Create an instance of the Router
const router = Router();

router.get('/some-route', (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.get('authorization'); // Get the authorization header
  
  // Check if authorization header is a string
  if (typeof authHeader === 'string') {
    const token = authHeader.split(' ')[1];  // Now safe to call split on a string

    // If there's no token, send an error
    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, SECRET_KEY) as UserPayload;

      // Handle the case where email is optional and may be undefined
      if (decoded.email === undefined) {
        console.warn('User payload is missing email');
      }

      // Attach the decoded user information to the request object
      req.user = decoded;

      // Continue to the next middleware or route handler
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  } else {
    // Handle case where authorization is not a string (string[] or undefined)
    return res.status(400).json({ message: 'Authorization header is not a valid string' });
  }
});

// Export the router to be used in the app
export default router;
