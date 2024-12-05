import express, { Request, Response } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware'; // Import JWT authentication middleware
import { User } from '../models/user'; // Import User model
import Service from '../models/services'; // Use default import for Service model
import { AuthRequest } from '../types/authMiddleware'; // Import AuthRequest for type safety

const router = express.Router();

// Route to view the user's profile and their services (GET /profile)
router.get('/', authenticateJWT, async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const userId = req.user?.id; // Get the user ID from the authenticated request

    // If the user ID is not available, return an unauthorized error
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }

    // Fetch user details from the database
    const user = await User.findByPk(userId);

    // Fetch all services that belong to the user
    const services = await Service.findAll({ where: { userId } });

    // If the user is not found, return a 404 error
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Return the user's profile along with their services
    return res.status(200).json({
      message: 'Profile data fetched successfully',
      profile: {
        id: user.id,
        username: user.username,
        email: user.email,
        tier: req.user?.tier, // Include the user's tier from the JWT
      },
      services, // Include the services related to the user
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

export default router;
