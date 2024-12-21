import { Router, Request, Response, NextFunction } from 'express';
import authenticateToken from '../middlewares/authenticateToken'; // Default import for authentication middleware
import { CustomAuthRequest } from 'types';  // Make sure you're using the correct type
import { AuthRequest } from 'types/';  // Import the AuthRequest correctly
const router = Router();

// Profile route - Get profile information
router.get(
  '/profile',
  authenticateToken,  // Ensure user is authenticated with the token
  async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<Response> => {
    // Ensure user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Destructure user data from the authenticated request
    const { id, email, username, tier } = req.user; // Added 'tier' to match the UserPayload type

    // Return the user's profile data
    return res.status(200).json({
      id,
      email,
      username,
      tier, // Returning tier as part of user profile
    });
  }
);

// Profile route - Update profile information
router.put(
  '/profile',
  authenticateToken,  // Ensure user is authenticated with the token
  async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<Response> => {
    // Ensure user is authenticated and has valid profile
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { id, email, username, tier } = req.user; // Destructure user data

    // Validate if the necessary fields exist
    if (!id || !email || !username) {
      return res.status(400).json({ message: 'Invalid user data' });
    }

    // Optionally validate the incoming data to update the user profile
    const { newEmail, newUsername, newTier } = req.body;  // Assuming these fields can be used for updates

    if (!newEmail && !newUsername && !newTier) {
      return res.status(400).json({ message: 'No data to update' });
    }

    try {
      // Logic to update the user profile (e.g., save changes to the database)
      // Example: interact with your database (e.g., using Sequelize, Prisma, etc.)

      // Assuming we update the user data in the database (this is just an example)
      const updatedUser = {
        id,
        email: newEmail || email,  // Use newEmail if provided, else keep current email
        username: newUsername || username,  // Use newUsername if provided, else keep current username
        tier: newTier || tier,  // Use newTier if provided, else keep current tier
      };

      // Return response with updated user details
      return res.status(200).json({
        message: 'Profile updated successfully',
        user: updatedUser,  // Return the updated user data
      });
    } catch (err: unknown) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
);

export default router;
