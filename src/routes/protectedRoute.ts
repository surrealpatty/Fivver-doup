import express, { Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';  // Import the middleware
import { UserPayload } from '../types';  // Import the UserPayload type for user typing

const router = express.Router();

// A protected route
router.get('/protected', authenticateToken, (req: Request, res: Response) => {
  // Type the req.user as UserPayload
  const user = req.user as UserPayload; // Ensure req.user is typed correctly

  // This route is now protected
  res.status(200).json({ 
    message: 'You have access to this protected route.',
    user: { id: user.id, email: user.email, username: user.username } // Ensure correct user structure
  });
});

export default router;
