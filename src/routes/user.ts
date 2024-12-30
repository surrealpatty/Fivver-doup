import { Router, Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken'; // Import the authenticateToken middleware
import { CustomAuthRequest } from '../types/index'; // Import CustomAuthRequest type

const router = Router();

// Protected route example
router.get(
  '/protected',
  authenticateToken,
  async (
    req: CustomAuthRequest, // Ensure correct typing
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      // Check if user is authenticated
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // If user exists, proceed with the route logic
      const { id, email, username } = req.user;

      return res.status(200).json({
        message: 'Protected route accessed',
        user: { id, email, username }, // Optionally return user data
      });
    } catch (error) {
      next(error); // Pass errors to the error-handling middleware
    }
  }
);

export default router;
