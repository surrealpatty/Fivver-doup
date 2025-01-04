import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'; // Import only jwt here
import config from '../config/config'; // Ensure the path is correct and properly typed
import { Request } from 'express';

// Define the expected JWT Payload structure, extending JwtPayload from jsonwebtoken
interface JwtPayloadCustom {
  id: string; // User ID stored in the JWT payload
}

// Extend Express' Request interface to include userId
interface AuthRequest extends Request {
  userId?: string; // Store userId extracted from the JWT
}

// Middleware to verify the JWT
export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Response<any> | void => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract the token from the "Bearer token" format

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  // Ensure config.JWT_SECRET is typed as a string
  const jwtSecret = config[process.env.NODE_ENV || 'development'].JWT_SECRET; // Access JWT_SECRET from the correct environment config

  // Define the options for verification
  const verifyOptions = {  
    algorithms: ['HS256'], // Adjust algorithm as needed
  };

  // Verify the token using the secret from config and options
  jwt.verify(
    token,
    jwtSecret, // Use the correct string type here
    verifyOptions, // Pass the options here
    (err: Error | null, decoded: any) => {  // Use `any` here temporarily
      if (err) {
        return res.status(401).json({ message: 'Unauthorized', error: err.message });
      }

      // Ensure decoded payload is valid and contains an ID
      if (decoded && typeof decoded === 'object' && 'id' in decoded) {
        const decodedToken = decoded as JwtPayloadCustom;  // Now, we know the 'id' field exists in the decoded token
        req.userId = String(decodedToken.id); // Store the userId in the request object
        return next(); // Proceed to the next middleware
      } else {
        return res.status(401).json({ message: 'Invalid token' });
      }
    }
  );
};

// Function to generate a JWT for a user
export const generateToken = (userId: string): string => {
  const jwtSecret = config[process.env.NODE_ENV || 'development'].JWT_SECRET; // Access JWT_SECRET from the correct environment config

  return jwt.sign(
    { id: userId }, // Payload containing the user ID
    jwtSecret, // Use the correct secret string here
    {
      expiresIn: config[process.env.NODE_ENV || 'development'].JWT_EXPIRATION, // Ensure JWT_EXPIRATION is valid
    }
  );
};

// Middleware to authenticate the user based on the JWT
export const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Response<any> | void => {
  if (!req.userId) {
    return res.status(403).json({ message: 'No valid token or userId found.' });
  }
  next(); // User authenticated, proceed to the next middleware or route handler
};
