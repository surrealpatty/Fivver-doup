import { Request, Response } from 'express';
import User from '../models/user';  // Change to default import

// Example function for getting a user profile
export const getUserProfile = async (req: Request, res: Response) => {
    try {
        // req.userId should be a number now
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({ message: 'User ID not found in request' });
        }

        const user = await User.findByPk(userId);  // Fetch user by primary key (userId)
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
