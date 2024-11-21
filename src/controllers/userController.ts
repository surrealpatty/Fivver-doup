import { Request, Response } from 'express';
import User from '../models/user'; // Default import

// Example function for getting a user profile
export const getUserProfile = async (req: Request, res: Response) => {
    try {
        // req.userId should be a number now, ensure it's set before
        const userId = req.userId;

        // Check if userId is valid and ensure it's a number
        if (typeof userId !== 'number') {
            return res.status(400).json({ message: 'Invalid or missing User ID in request' });
        }

        // Fetch user by primary key (userId)
        const user = await User.findByPk(userId);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send back the user data
        return res.json(user);
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error fetching user profile:', error);

        // Return a generic error message
        return res.status(500).json({ message: 'Internal server error' });
    }
};
