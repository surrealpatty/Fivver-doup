// src/routes/api.ts
import { Router, Response, NextFunction } from 'express';
import { checkAuth } from '../middlewares/checkAuth';  // Assuming checkAuth is in the middlewares folder
import { AuthRequest } from '../types/index';  // Import the correct path for AuthRequest

const router = Router();

// Example route that requires authentication
router.get('/some-endpoint', checkAuth, (req: AuthRequest, res: Response) => {
  // Now req.user should be available and correctly typed
  if (req.user) {
    // Respond with the user information
    res.status(200).json({ message: 'Authenticated', user: req.user });
  } else {
    // In case req.user is not available (which should not happen if the middleware works correctly)
    res.status(401).json({ message: 'Unauthorized' });
  }
});

export default router;
