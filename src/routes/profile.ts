// src/routes/profile.ts
import express, { Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken'; // Correct import for authenticateToken
import { AuthRequest } from '../types/authMiddleware'; // Correctly typed AuthRequest
import Service from '../models/services';
import { User } from '../models/user'; // Ensure correct import path for User model

const router = express.Router();

// GET profile route
router.get('/profile', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction) => {
  // Ensure that req.user exists and contains both 'id' and 'tier'
  if (!req.user || !req.user.id || !req.user.tier) {
    return res.status(401).json({ message: 'User not authenticated or missing tier information' });
  }

  const userId = req.user.id;  // Get user ID from the authenticated token

  try {
    // Fetch the user information and their services
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const services = await Service.findAll({ where: { userId } });

    return res.status(200).json({
      message: 'User profile retrieved successfully',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        tier: req.user.tier,  // Make sure to return 'tier' as well
      },
      services,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// PUT profile route
router.put('/profile', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction) => {
  // Ensure that req.user exists and contains both 'id' and 'tier'
  if (!req.user || !req.user.id || !req.user.tier) {
    return res.status(401).json({ message: 'User not authenticated or missing tier information' });
  }

  const userId = req.user.id;
  const { username, email } = req.body;

  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (username) user.username = username;
    if (email) user.email = email;

    await user.save();

    return res.status(200).json({
      message: 'User profile updated successfully',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        tier: req.user.tier,  // Include the updated 'tier' information
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
