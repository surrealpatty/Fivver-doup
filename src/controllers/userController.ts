import  User  from '../models/user'; // Named import for User model
import bcrypt from 'bcryptjs'; // bcrypt for password hashing and comparison
import { Optional } from 'sequelize/types'; // Import Optional type from Sequelize

// Define the user data type for creating a user, excluding methods like $add, $set
type UserCreationAttributes = {
  username: string;
  email: string;
  password: string;
  role: 'free' | 'paid'; // Define role as 'free' | 'paid'
};

// Register user function
const registerUser = async ({ username, email, password }: { username: string; email: string; password: string }) => {
  try {
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Define the type for the user being created (use the refined UserCreationAttributes type)
    const userData: UserCreationAttributes = {
      username,
      email,
      password: hashedPassword,
      role: 'free', // Set the default role to "free"
    };

    // Create the user with hashed password
    const user = await User.create(userData);

    return user; // Return the created user object
  } catch (error: unknown) {
    // Check if error is an instance of Error
    if (error instanceof Error) {
      throw new Error('Error registering user: ' + error.message); // Return specific error message
    }
    throw new Error('Unknown error occurred during user registration'); // Fallback error message
  }
};

// Login user function
const loginUser = async (email: string, password: string) => {
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
    // Check if error is an instance of Error
    if (error instanceof Error) {
      throw new Error('Error logging in: ' + error.message); // Return specific error message
    }
    throw new Error('Unknown error occurred during login'); // Fallback error message
  }
};

// Export the functions
export { registerUser, loginUser };
