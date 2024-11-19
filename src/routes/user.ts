// src/routes/user.ts
import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import User from '../models/user'; // Ensure your User model is being imported correctly
import { authMiddleware } from 'src/middleware/authMiddleware'; // Assuming authMiddleware handles JWT validation

const router = Router();

// Utility function to generate JWT token
const generateAuthToken = (userId: number) => {
    const secret = process.env.JWT_SECRET || 'your_jwt_secret'; // Use a secret from your env
    const expiresIn = '1h'; // Token expiration
    return jwt.sign({ id: userId }, secret, { expiresIn });
};

// User Registration Route (POST /register)
router.post('/register', [
    // Validation checks
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, isPaid = false } = req.body; // Set default value for isPaid

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
            isPaid, // Ensure this field exists in your User model
        });

        // Generate JWT token
        const token = generateAuthToken(newUser.id);

        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                email: newUser.email,
                isPaid: newUser.isPaid, // Return the isPaid status if required
            },
            token, // Include the generated token
        });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Get User Profile Route (GET /profile)
router.get('/profile', authMiddleware, async (req: Request, res: Response) => {
    try {
        const userId = req.userId; // Assuming req.userId is set earlier via authMiddleware

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
            isPaid: user.isPaid,      // Include isPaid status if needed
            role: user.role           // Ensure these fields exist on the User model
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
