import { Router, Response } from 'express';
import  authenticateToken  from '../middlewares/authenticateToken';  // Import the middleware
import { CustomAuthRequest } from '../types';  // Import CustomAuthRequest for proper typing

const router = Router();

// A protected route
router.get('/protected', authenticateToken, (req: CustomAuthRequest, res: Response) => {
  const user = req.user;  // `user` is typed as `UserPayload | undefined`

  // Handle the case where `user` is undefined (invalid or missing token)
  if (!user) {
    return res.status(401).json({ message: 'User data not found' });
  }

  // If user exists, respond with their data
  res.status(200).json({
    message: 'You have access to this protected route.',
    user: {
      id: user.id,
      email: user.email || 'Email not provided',  // Fallback if email is undefined
      username: user.username || 'Username not provided',  // Fallback if username is undefined
      tier: user.tier,  // Ensure tier is present
      role: user.role || 'user'  // Fallback if role is undefined
    }
  });
});

export default router;
