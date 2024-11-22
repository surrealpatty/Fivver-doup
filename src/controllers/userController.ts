import { Request, Response } from 'express';
import { User } from '../models/user';  // Named import
import { UserPayload } from '../types'; // Make sure UserPayload is correctly defined and exported

// Extend the Request interface to include the user object, which may be undefined
interface AuthRequest extends Request {
  user?: UserPayload; // user is optional
}

// Example function for getting a user profile
export const getUserProfile = async (req: AuthRequest, res: Response) => {
    try {
        // Check if the user object exists on the request
        const userId = req.user?.id;

        // Check if userId is valid and ensure it's a string (or handle appropriately if it's another type)
        if (!userId || typeof userId !== 'string') {
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
