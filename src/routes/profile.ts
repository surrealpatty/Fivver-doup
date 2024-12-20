// src/routes/profile.ts
import { Router, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import User from '../models/user'; // Import the User model
import { CustomAuthRequest } from '../types'; // Import the CustomAuthRequest type

const router = Router();

// Route to get user profile (requires authentication)
router.get('/profile', authenticateToken, async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<Response> => {
    try {
        // Ensure the user ID exists on the request object
        if (!req.user?.id) {
            return res.status(400).json({ message: 'User not authenticated or invalid token' });
        }

        // Fetch user profile from the database
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with the user profile
        return res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching profile:', error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
});

// Route to update user profile (requires authentication)
router.put('/profile', authenticateToken, async (req: CustomAuthRequest, res: Response, next: NextFunction): Promise<Response> => {
    try {
        // Ensure the user ID exists on the request object
        if (!req.user?.id) {
            return res.status(400).json({ message: 'User not authenticated or invalid token' });
        }

        // Extract fields to update from the request body
        const { username, email } = req.body; // Add fields as needed
        if (!username && !email) {
            return res.status(400).json({ message: 'No data provided for update' });
        }

        // Update user profile in the database
        const [updatedRows] = await User.update(
            { username, email },
            { where: { id: req.user.id } }
        );

        // Check if the update was successful
        if (updatedRows === 0) {
            return res.status(404).json({ message: 'User not found or no changes made' });
        }

        // Respond with a success message
        return res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
});

export default router;
