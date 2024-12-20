import express, { Request, Response, NextFunction } from 'express';
import authenticateToken from '../middlewares/authenticateToken'; // Corrected import for default export
import { CustomAuthRequest, UserPayload } from '../types';  // Correct path to CustomAuthRequest type and UserPayload

const router = express.Router();

// Profile route - Update profile information
router.put(
  '/profile',
  authenticateToken,  // Ensure the user is authenticated with the token
  async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<Response> => {
    // Check if the user is authenticated and ensure that req.user is not undefined
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Now we can safely destructure since we know req.user is not undefined
    const { id, email, username }: UserPayload = req.user;  // Deconstruct user data

    // If any of the fields are missing, return a bad request response
    if (!id || !email || !username) {
      return res.status(400).json({ message: 'Invalid user data' });
    }

    try {
      // Logic to update the user profile goes here
      // Example: You can make database calls to update the user's information.

      // Example response (replace with actual update logic)
      return res.status(200).json({ 
        message: 'Profile updated successfully', 
        user: { id, email, username }  // Return the updated user data
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
);

export default router;
