import { User } from '../models/user'; // Named import
import bcrypt from 'bcryptjs'; // Add bcrypt for password comparison
import { Request, Response } from 'express'; // Express types for request and response
import { Optional } from 'sequelize/types'; // Import Optional type from Sequelize

// Register user function
export const registerUser = async ({ username, email, password }: { username: string; email: string; password: string }) => {
  try {
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Define the type for the user being created (use Optional<User>)
    const userData: Optional<User, 'id' | 'createdAt' | 'updatedAt'> = {
      username,
      email,
      password: hashedPassword,
      role: 'user', // Set a default role (if not provided in the request)
    };

    // Create the user with hashed password
    const user = await User.create(userData);

    return user; // Return the created user object
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Error registering user: ' + error.message); // Return specific error message
    }
    throw new Error('Unknown error occurred during user registration'); // Fallback error message
  }
};

// Login user function (for testing purposes)
export const loginUser = async (email: string, password: string) => {
  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });

    // If user does not exist, throw error
    if (!user) {
      throw new Error('User not found');
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password is invalid, throw error
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    return user; // Return the user if login is successful
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Error logging in: ' + error.message); // Return specific error message
    }
    throw new Error('Unknown error occurred during login'); // Fallback error message
  }
};
