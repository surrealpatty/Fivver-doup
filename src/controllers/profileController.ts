import { User } from '../models/user'; // Named import
import bcrypt from 'bcryptjs'; // Add bcrypt for password comparison
import { Request, Response } from 'express'; // Express types for request and response
import { Optional } from 'sequelize/types'; // Import Optional type from Sequelize

// Register user function
export const registerUser = async ({ username, email, password }: { username: string; email: string; password: string }) => {
  try {
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Define the type for the user being created (use Optional<User>), set role as "free"
    const userData: Optional<User, 'id' | 'createdAt' | 'updatedAt'> = {
      username,
      email,
      password: hashedPassword,
      role: 'free', // Set the default role to "free"
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
