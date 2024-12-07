import { Request, Response, NextFunction } from 'express';

export const authenticateJWT = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    // Replace this with your actual authentication logic (e.g., verifying a JWT token)
    const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is in the Authorization header
    
    if (token) {
      // Example token validation logic:
      // Verify the JWT token (you can use a library like jsonwebtoken for this)
      const decoded = await someJWTVerificationFunction(token);

      // Attach the decoded user information to the request object
      req.user = decoded; // Add the decoded user info to `req.user` for later use in routes
      next(); // Continue to the next middleware or route handler
    } else {
      res.status(401).json({ message: 'Unauthorized, no token provided' });
    }
  } catch (error) {
    next(error); // Pass the error to the next error handler
  }
};
