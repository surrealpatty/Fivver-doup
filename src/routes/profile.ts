// src/routes/profile.ts
import { Router, Response, NextFunction, Request } from 'express';
import authenticateToken from '../middlewares/authenticateToken';  // Correctly import the token authentication middleware
import { CustomAuthRequest } from '../types';  // Correctly import CustomAuthRequest
import { UserPayload } from '../types';  // Correctly import UserPayload to ensure proper typing

const router = Router();

// Profile route - Get profile information
router.get('/profile', authenticateToken, async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<Response> => {
  // Ensure user is authenticated
  const user = req.user;

  // If user is not authenticated, return 401 Unauthorized
  if (!user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  // Destructure user data from the authenticated request (user is guaranteed to be of type UserPayload)
  const { id, email, username, tier } = user;  // Type assertion is not needed as CustomAuthRequest already provides the correct type

  // Return the user's profile data
  return res.status(200).json({
    id,
    email,
    username,
    tier, // Returning tier as part of user profile
  });
});

// Profile route - Update profile information
router.put('/profile', authenticateToken, async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<Response> => {
  // Ensure user is authenticated and has valid profile
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  const { id, email, username, tier } = user; // Type assertion to UserPayload is not needed now

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
});

export default router;
