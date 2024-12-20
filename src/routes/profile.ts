import express, { Response, NextFunction } from 'express';
import authenticateToken from '../middlewares/authenticateToken';  // Correct path to authenticateToken middleware
import { CustomAuthRequest } from '../types';  // Correct path to CustomAuthRequest type

const router = express.Router();

// Profile route - Update profile information
router.put(
  '/profile',
  authenticateToken,  // Ensure user is authenticated with the token
  async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<Response> => {
    // Ensure user is authenticated and has a valid profile
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { id, email, username } = req.user; // Destructure the user information from the request

    // Validate if the necessary fields exist
    if (!id || !email || !username) {
      return res.status(400).json({ message: 'Invalid user data' });
    }

    // Optionally, validate the data coming in the request body (to update user profile)
    const { newEmail, newUsername } = req.body;  // Assuming these fields can be used for updates

    if (!newEmail && !newUsername) {
      return res.status(400).json({ message: 'No data to update' });
    }

    try {
      // Logic to update the user profile (e.g., save changes to the database)
      // Example: You'd want to interact with your database here (e.g., using Sequelize, Prisma, etc.)

      // Let's assume we update the user data in the database (This is just an example)
      // For now, let's return the updated values
      const updatedUser = {
        id,
        email: newEmail || email,  // Use newEmail if provided, else keep current email
        username: newUsername || username,  // Use newUsername if provided, else keep current username
      };

      // Return response with updated user details
      return res.status(200).json({
        message: 'Profile updated successfully',
        user: updatedUser,  // Send back the updated user data
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
    // Ensure user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { id, email, username } = req.user;  // Destructure the user information from the request

    return res.status(200).json({
      id,
      email,
      username,
    });
  }
);

export default router;
