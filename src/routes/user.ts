import { Request, Response } from 'express';
import { User } from '../models/user';  // Sequelize User model
import { UserPayload } from '../types';  // Import UserPayload type for type safety

// Controller for getting user by ID
export const getUser = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.params.id; // Extract user ID from request params

  try {
    // Check if the authenticated user matches the user ID in the request
    const userPayload = req.user as UserPayload;
    if (userPayload.id !== userId) {
      return res.status(403).json({ message: 'Unauthorized to access this profile' });
    }

    // Find the user by ID
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the user data (excluding sensitive information)
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        tier: user.tier,
        isVerified: user.isVerified,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
