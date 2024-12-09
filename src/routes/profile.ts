// src/routes/profile.ts
import { Router, Request, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware'; // JWT middleware
import { User } from '../models/user'; // User model
import  Service  from '../models/services'; // Service model

const profileRouter = Router();

// GET route for retrieving user profile and associated services
profileRouter.get('/', authenticateJWT, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.user; // The authenticated user added by authenticateJWT middleware

    if (!user || !user.id) {
      return res.status(403).json({ message: 'User not authenticated' });
    }

    // Find the user and include their services
    const userProfile = await User.findByPk(user.id, {
      include: [Service], // Eagerly load services associated with the user
    });

    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    // Respond with user details and associated services
    res.status(200).json({ user: userProfile });
  } catch (error) {
    console.error('Error fetching profile:', error);
    next(error); // Pass errors to the error-handling middleware
  }
});

export default profileRouter;
