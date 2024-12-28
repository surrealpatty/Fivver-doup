import { User, UserCreationAttributes } from '../models';
import bcrypt from 'bcryptjs';

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
      username: username,
      email: email,
      password: hashedPassword,
      role: 'free', // Default role
      isPaid: false, // Ensure the 'isPaid' field is provided
    };

    // Create the user with hashed password
    const user = await User.create(userData);

    return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Error registering user: ' + error.message);
    }
    throw new Error('Unknown error occurred during user registration');
  }
};
