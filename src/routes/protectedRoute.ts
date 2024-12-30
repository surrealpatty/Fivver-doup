import express, { Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken'; // Import the middleware
import { CustomAuthRequest } from '../types/customRequest'; // Import the CustomAuthRequest type for proper typing
import { UserPayload } from '../types'; // Ensure UserPayload is correctly imported

const router = express.Router();

// Define a protected route
router.get('/protected', authenticateToken, async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<Response> => {
  try {
    // Ensure req.user is available before proceeding
    const user: UserPayload | undefined = req.user; // Explicitly typing user as UserPayload or undefined

    if (!user) {
      return res.status(403).json({ message: 'User not authenticated.' });
    }

    // Destructure user data with fallbacks for undefined properties
    const { id, email = 'Email not provided', username = 'Username not provided', tier = 'Tier not provided', role = 'User' } = user;

    // Return the user data in the response
    return res.status(200).json({
      message: 'You have access to this protected route.',
      user: {
        id,
        email,
        username,
        tier,
        role
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
