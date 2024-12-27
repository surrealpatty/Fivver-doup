import { User } from '../models'; // Adjust the import based on your models
import bcrypt from 'bcryptjs'; // bcrypt for password hashing and comparison

// Register a new user
export const registerUser = async ({ username, email, password }: { username: string; email: string; password: string }) => {
  try {
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user with hashed password
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword, // Use hashed password
      role: 'free', // Set default role to "free"
    });

    return newUser; // Return the created user
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Error registering user: ' + error.message); // Accessing message safely
    } else {
      throw new Error('Error registering user: An unknown error occurred');
    }
  }
};

// Login a user
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
      throw new Error('Error logging in: ' + error.message); // Accessing message safely
    } else {
      throw new Error('Error logging in: An unknown error occurred');
    }
  }
};

// Update user details
export const updateUser = async (
  id: string,
  updateData: { username?: string; email?: string; password?: string }
) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }

    // Hash the new password before updating if provided
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    // Update user with the provided data
    await user.update(updateData);
    return user; // Return updated user
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Error updating user: ' + error.message); // Accessing message safely
    } else {
      throw new Error('Error updating user: An unknown error occurred');
    }
  }
};

// Delete a user
export const deleteUser = async (id: string) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    await user.destroy(); // Delete the user from the database
    return { message: 'User deleted successfully' }; // Return success message
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Error deleting user: ' + error.message); // Accessing message safely
    } else {
      throw new Error('Error deleting user: An unknown error occurred');
    }
  }
};
