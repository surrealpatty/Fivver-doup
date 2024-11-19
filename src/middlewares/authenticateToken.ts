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
 const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization'];

  if (!token) {
    export const authenticateToken = (req: Request, res: Response, next: NextFunction): Response => {
        // logic
        return res.status(401).send('Unauthorized');
      };
      
  }

  // Token validation logic
  next();
};

        }
        if (!token) {
            return res.status(401).send('Unauthorized');
          }
          const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
          
        

        
        req.user = decoded as { id: string; email: string; username: string };


        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Invalid token:', error);
        res.status(403).json({ message: 'Invalid token.' }); // Removed 'return'
    }
}; // <-- Closing brace for the function (added)

