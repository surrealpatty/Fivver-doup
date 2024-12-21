import { Router, Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken'; // Correct import for authenticateToken middleware
import { CustomAuthRequest } from '../types'; // Ensure this is imported correctly

const router = Router();

// Define the route for premium access
router.get('/premium', authenticateToken, (req: CustomAuthRequest, res: Response) => {
  // Ensure req.user is not undefined before using it
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Provide premium content
  res.json({ premiumContent: 'This is premium content' });
});

export default router;
