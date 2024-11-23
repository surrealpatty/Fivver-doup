import { Request, Response } from 'express';
import User from '../models/user'; // Named import for User model
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

// Example function for registering a user
export const registerUser = async (userData: { username: string; email: string; password: string }) => {
  try {
    // Ensure the user data is valid and non-empty
    if (!userData.username || !userData.email || !userData.password) {
      throw new Error('All fields (username, email, password) are required');
    }

    // Create the user in the database
    const newUser = await User.create(userData);
    
    // Return the newly created user
    return newUser;
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error('User registration failed');
  }
};

// Example function for logging in a user
export const loginUser = async (email: string, password: string) => {
  try {
    // Fetch the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    // Compare the password (assuming you have a method to check passwords)
    const isPasswordValid = await user.checkPassword(password); // Assuming checkPassword method exists in User model

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // Return the user (you might want to return a token or other user info)
    return user;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw new Error('User login failed');
  }
};
