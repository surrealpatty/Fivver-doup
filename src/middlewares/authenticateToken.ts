import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { config } from '../config/config'; // Assuming you're using the config file for JWT_SECRET

// Middleware to authenticate the token
const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  // Extract the token from the Authorization header (Bearer <token>)
  const token = req.headers['authorization']?.split(' ')[1];

  // If no token is provided, return a 403 Forbidden error
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  // Verify the token using the secret key (JWT_SECRET)
  jwt.verify(token, config.JWT_SECRET as string, (err: VerifyErrors | null, decoded: JwtPayload | undefined) => {
    if (err) {
      // If the token is invalid or expired, return a 401 Unauthorized error
      return res.status(401).json({ message: 'Unauthorized', error: err?.message });
    }

    // Attach the decoded user information to the request object
    req.user = decoded; // You can store the user object or just user ID here depending on your needs

    // Call the next middleware or route handler
    next();
  });
};

export default authenticateToken;
