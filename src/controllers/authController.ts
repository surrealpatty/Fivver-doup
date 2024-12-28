import { Request, Response } from 'express';
import { User } from '../models'; // Import the User model
import bcrypt from 'bcrypt';

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      isPaid: false, // Add the missing 'isPaid' property
    });

    // Send response back to the client
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        isPaid: user.isPaid, // Include 'isPaid' in the response
      },
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({
      message: 'Server error, please try again later.',
    });
  }
};
