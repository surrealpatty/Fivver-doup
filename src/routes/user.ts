// src/routes/userRoutes.ts
import { Router, Request, Response } from 'express';
import User from '../models/user';  // Default import for User

const router = Router();

// Get User Profile Route
router.get('/profile', async (req: Request, res: Response) => {
    try {
        const userId = req.userId; // Assuming req.userId is set earlier (e.g., via a middleware)

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const user = await User.findOne({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            email: user.email,
            username: user.username,  // Ensure these fields exist on the User model
            role: user.role           // Ensure these fields exist on the User model
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
