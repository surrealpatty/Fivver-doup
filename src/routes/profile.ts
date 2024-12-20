import express, { Response, NextFunction } from 'express';
import authenticateToken from '../middlewares/authenticateToken';  // Correct path to authenticateToken middleware
import { CustomAuthRequest } from '../types';  // Correct path to CustomAuthRequest type

const router = express.Router();

// Profile route - Update profile information
router.put(
  '/profile',
  authenticateToken,  // Ensure user is authenticated with the token
  async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<Response> => {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { id, email, username } = req.user;

    // If any of the fields are missing, return a bad request response
    if (!id || !email || !username) {
      return res.status(400).json({ message: 'Invalid user data' });
    }

    try {
      // Logic to update the user profile (e.g., save changes to the database)

      return res.status(200).json({
        message: 'Profile updated successfully',
        user: { id, email, username }  // Return updated user data
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Profile route - Get profile information
router.get(
  '/profile',
  authenticateToken,  // Ensure user is authenticated with the token
  async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<Response> => {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { id, email, username } = req.user;

    return res.status(200).json({
      id,
      email,
      username,
    });
  }
);

export default router;
