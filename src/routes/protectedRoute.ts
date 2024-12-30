// src/routes/protectedRoute.ts
import { Router, Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken'; // Import authenticateToken middleware
import { CustomAuthRequest } from '../types'; // Import CustomAuthRequest type

const router = Router();

// Protected route example
router.get(
  '/protected',
  authenticateToken, // Use the authenticateToken middleware
  async (
    req: CustomAuthRequest, // Ensure correct typing for `req` using CustomAuthRequest
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      // Ensure req.user is available, as it's injected by authenticateToken middleware
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { id, email, username } = req.user;

      // Return the protected route response with user data
      return res.status(200).json({
        message: 'Protected route accessed',
        user: { id, email, username }, // Optionally return user data
      });
    } catch (error) {
      next(error); // Pass errors to the error handler
    }
  }
);

export default router;
