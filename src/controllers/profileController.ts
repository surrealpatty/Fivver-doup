import { User, UserCreationAttributes } from '../models';
import bcrypt from 'bcryptjs'; // Add bcrypt for password comparison

// Register user function
export const registerUser = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData: UserCreationAttributes = {
      username: username, // Use the passed username
      email: email, // Use the passed email
      password: hashedPassword, // Use the hashed password
      role: 'free', // Default to 'free' role
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
