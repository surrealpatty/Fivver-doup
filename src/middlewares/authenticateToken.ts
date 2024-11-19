import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'; // Corrected import for jsonwebtoken

// Middleware to authenticate token
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization'];

    if (!token) {
        res.sendStatus(403); // Removed 'return' to match expected type
    }
    try {
        if (!token) {
            import { Request, Response, NextFunction } from 'express';

// Middleware to authenticate token
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  // Token validation logic
  next();
};

        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string); // Ensure token is defined
        

        // Assuming you have a user ID in the token, you can attach it to the request object
        req.user = decoded; // Attach the decoded user information to the request object

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Invalid token:', error);
        res.status(403).json({ message: 'Invalid token.' }); // Removed 'return'
    }
}; // <-- Closing brace for the function (added)

