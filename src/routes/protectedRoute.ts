import { Router, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken'; // Import the authenticateToken middleware
import { CustomAuthRequest } from '../types'; // Import CustomAuthRequest type

const router = Router();

// Protected route example
router.get(
  '/protected',
  authenticateToken, // Use the authenticateToken middleware
  async (
    req: CustomAuthRequest, // Ensure the correct typing for `req`
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { id, email, username } = req.user;

      return res.status(200).json({
        message: 'Protected route accessed',
        user: { id, email, username }, // Optionally return user data
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
