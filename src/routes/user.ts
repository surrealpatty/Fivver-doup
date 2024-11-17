// src/routes/user.ts
import { Router, Request, Response } from 'express';
import User from '../models/user';  // Ensure your User model is being imported correctly
import bcrypt from 'bcryptjs';  // To hash passwords securely

const router = Router();

// User Registration Route (POST /register)
router.post('/register', async (req: Request, res: Response) => {
    const { email, password, isPaid } = req.body;

    // Check for missing fields
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            email,
            password: hashedPassword,
            isPaid  // Ensure this is a valid field in your User model
        });

        return res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Get User Profile Route (GET /profile)
router.get('/profile', async (req: Request, res: Response) => {
    try {
        const userId = req.userId; // Assuming req.userId is set earlier (e.g., via a middleware)

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const user = await User.findOne({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            email: user.email,
            username: user.username,  // Ensure these fields exist on the User model
            role: user.role           // Ensure these fields exist on the User model
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
