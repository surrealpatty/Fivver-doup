import { Request, Response } from 'express';
import { User } from '../models/user'; // Named import for User model
import { UserPayload } from '../types'; // Ensure UserPayload is correctly defined

// Extend the Request interface to include the user object, which may be undefined
interface AuthRequest extends Request {
  user?: UserPayload; // user is optional, can be undefined
}

// Example function for getting a user profile
export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    // Check if the user object exists on the request
    const user = req.user;

    // If the user object is undefined or userId is not available, return an error
    if (!user || !user.id || typeof user.id !== 'string') {
      return res.status(400).json({ message: 'Invalid or missing User ID in request' });
    }

    // Extract userId from the user object
    const userId = user.id;

    // Fetch the user from the database using the userId
    const foundUser = await User.findByPk(userId);  // Use the Sequelize findByPk method

    // Check if the user exists
    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send back the user data (in case it's a user model instance, convert to plain object if necessary)
    return res.json(foundUser.toJSON()); // .toJSON() converts Sequelize instance to plain object
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error fetching user profile:', error);

    // Return a generic error message
    return res.status(500).json({ message: 'Internal server error' });
  }
};
