// src/routes/profile.ts
import express, { Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware'; // Import JWT authentication middleware
import { getUserProfile } from '../controllers/profileController'; // Import getUserProfile function from the controller
import { AuthRequest } from '../types/authMiddleware';  // Ensure this is imported correctly

const router = express.Router();

// Route to view the user's profile (GET /profile)
router.get('/profile', authenticateJWT, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Check if the user is authenticated (the user ID should be available from JWT middleware)
    if (!req.user?.id) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }

    // Fetch user profile using the authenticated user's ID
    const profileData = await getUserProfile(req.user.id); // Pass the user ID to the controller function

    // Return the profile data in the response
    return res.status(200).json(profileData);
  } catch (error) {
    // Pass any error to the next middleware (typically an error handler)
    next(error);
  }
});

export default router;
