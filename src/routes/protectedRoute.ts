import { Router, Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import { CustomAuthRequest } from '../types'; // Ensure proper typing for req.user

const router = Router();

// Define the protected route with authentication
router.get(
  '/protected-route',
  authenticateToken, // Use the authenticateToken middleware
  async (
    req: Request, // Default to the generic Request type here
    res: Response,
    next: NextFunction
  ): Promise<void> => { // Explicitly return Promise<void>
    try {
      // Type assertion to CustomAuthRequest to access req.user
      const customReq = req as CustomAuthRequest;

      // Ensure req.user is available, as it's injected by authenticateToken middleware
      if (!customReq.user) {
        // Return early if user is not present
        res.status(401).json({ error: 'Unauthorized' });
        return; // Prevent further code execution
      }

      const { id, email, username } = customReq.user;

      // Send the response without returning the Response object
      res.status(200).json({
        message: 'Protected route accessed',
        user: { id, email, username },
      });

      // No need to return the response object from here
    } catch (error: any) {  // Explicitly type the error as 'any' or 'Error'
      // Return error response instead of calling next(error)
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
);

export default router;
