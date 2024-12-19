// src/routes/user.ts
import { Router } from 'express';
import User from '../models/user';  // Use default import for User

const router = Router();

// Example route to get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();  // Fetch all users from the database
    res.status(200).json(users);         // Return users in the response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

// Example route to create a new user
router.post('/create', async (req, res) => {
  try {
    const { username, email, password, role, bio, tier, isVerified } = req.body;  // Expect these in the body

    // Provide default values for tier and isVerified if not provided
    const newUser = await User.create({
      username,
      email,
      password,
      role: role || 'user',  // Default to 'user' if no role is provided
      bio,  // Bio field should now be accepted
      tier: tier || 'free',  // Default to 'free' if no tier is provided
      isVerified: isVerified !== undefined ? isVerified : false,  // Default to false if no value is provided
    });

    res.status(201).json(newUser);  // Respond with the created user
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Export the router as a default export
export default router;
