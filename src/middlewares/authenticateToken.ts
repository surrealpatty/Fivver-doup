import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from 'src/config/config'; // Correct import for default export

// Extend the Request type to include a 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // Adding 'user' property to request, which will hold decoded JWT payload
    }
  }
}

// Middleware to authenticate token
const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // Extract the token from the Authorization header (Bearer <token>)
  const token = req.headers['authorization']?.split(' ')[1]; // Token should be in the format "Bearer <token>"

  // If no token is provided, return a 403 Forbidden response
  if (!token) {
    res.status(403).json({ message: 'No token provided' });
    return; // Just stop further execution
  }

  try {
    // Use a Promise to wrap jwt.verify
    const decoded = await new Promise<JwtPayload | null>((resolve, reject) => {
      jwt.verify(token, config.JWT_SECRET as string, (err, decoded) => {
        if (err) {
          reject(new Error('Unauthorized'));
        } else {
          resolve(decoded as JwtPayload | null);
        }
      });
    });

    // Ensure that decoded is not null before assigning to req.user
    if (!decoded) {
      res.status(401).json({ message: 'Unauthorized' });
      return; // Just stop further execution
    }

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err: unknown) {
    // Handle error, check if it's an instance of Error
    if (err instanceof Error) {
      res.status(401).json({ message: 'Unauthorized', error: err.message });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
};

export default authenticateToken;
