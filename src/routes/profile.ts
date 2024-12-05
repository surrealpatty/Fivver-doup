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
      return res.status(401).json({ message: 'User not authenticated.' }); // Returning response if user not authenticated
    }

    // Optionally, you can access the user's tier here
    const userTier = req.user.tier;  // Access the tier property from the user object

    // Fetch user profile using the authenticated user's ID
    const profileData = await getUserProfile(req.user.id); // Pass the user ID to the controller function

    // Send the profile data as a response
    res.status(200).json({
      profile: profileData,   // Include the profile data
      tier: userTier          // Include the user's tier in the response (optional)
    });
  } catch (error) {
    // Pass any error to the next middleware (typically an error handler)
    next(error); // Pass the error to next middleware
  }
});

export default router;
