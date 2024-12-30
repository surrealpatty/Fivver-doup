import { Router, Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken'; // Import the authenticateToken middleware
import { CustomAuthRequest } from '../types/customRequest'; // Import CustomAuthRequest type

const router = Router();

// Protected route example
router.get('/protected', authenticateToken, async (
  req: CustomAuthRequest,  // Ensure correct typing
  res: Response, 
  next: NextFunction
): Promise<Response> => {
  // Check if user is authenticated
  if (!req.user) {
    return res.status(401).send('User not authenticated');
  }

  // If user exists, proceed with the route logic
  return res.status(200).json({
    message: 'Protected route accessed',
    user: req.user,  // Optionally return user data
  });
});

export { router as userRoutes };
