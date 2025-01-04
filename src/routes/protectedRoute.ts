import { Router, Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken'; // Correct path
import { CustomAuthRequest } from '../types'; // Ensure proper typing for req.user

const router = Router();

// Define the protected route with authentication
router.get(
  '/protected-route',
  authenticateToken, // Use the authenticateToken middleware
  async (
    req: CustomAuthRequest, // Ensure correct typing for req using CustomAuthRequest
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      // Ensure req.user is available, as it's injected by authenticateToken middleware
      if (!req.user) {
        // Return early if user is not present
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { id, email, username } = req.user;

      // Return a response with user data
      return res.status(200).json({
        message: 'Protected route accessed',
        user: { id, email, username },
      });
    } catch (error: any) {  // Explicitly type the error as 'any' or 'Error'
      // Return error response instead of calling next(error)
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }
);

export default router;
