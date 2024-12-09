// src/controllers/profileController.ts
import { Request, Response } from 'express';
import { User } from '@models/user';  // Assuming you have a User model

// Get the user's profile information
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract the user ID from the JWT (authenticated user)
    const userId = req.user?.id;  // Assuming `req.user` was set by your JWT middleware

    // If no userId exists, return a 401 Unauthorized error
    if (!userId) {
      res.status(401).json({ message: 'User not authenticated.' });
      return; // Early return to avoid further execution
    }

    // Fetch the user profile from the database
    const user = await User.findByPk(userId);  // Fetch user by primary key (ID)

    // If the user is not found, return a 404 Not Found error
    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return; // Early return to avoid further execution
    }

    // Return the user profile data
    res.status(200).json(user);  // Return the user object
  } catch (err) {
    // Catch any other errors and return a 500 Internal Server Error
    console.error(err);
    res.status(500).json({ message: 'An error occurred while fetching profile.' });
  }
};

// Update the user's profile information
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract the user ID from the JWT (authenticated user)
    const userId = req.user?.id;  // Assuming `req.user` was set by your JWT middleware

    // If no userId exists, return a 401 Unauthorized error
    if (!userId) {
      res.status(401).json({ message: 'User not authenticated.' });
      return; // Early return to avoid further execution
    }

    // Destructure the new profile data from the request body
    const { email, username } = req.body;

    // Fetch the user from the database using the user ID
    const user = await User.findByPk(userId);

    // If the user is not found, return a 404 Not Found error
    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return; // Early return to avoid further execution
    }

    // Update the user's profile fields
    user.email = email || user.email;  // If email is provided, update; otherwise, keep the existing one
    user.username = username || user.username;  // If username is provided, update; otherwise, keep the existing one

    // Save the updated user profile to the database
    await user.save();

    // Respond with the updated user profile
    res.status(200).json({ message: 'Profile updated successfully.', user });
  } catch (err) {
    // Catch any other errors and return a 500 Internal Server Error
    console.error(err);
    res.status(500).json({ message: 'An error occurred while updating profile.' });
  }
};
