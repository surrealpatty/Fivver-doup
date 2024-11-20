import { Router, Request, Response } from 'express'; // Correct import statement
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import User from '../models/user'; // Ensure User model is correctly imported
import { authenticateToken } from '../middlewares/authMiddleware'; // Middleware for token authentication

const router = Router();

// Utility function to generate JWT token
const generateAuthToken = (userId: string): string => {  // Changed userId to string to match UUID type
    const secret = process.env.JWT_SECRET || 'your_jwt_secret'; // JWT secret from env
    const expiresIn = '1h'; // Token expiration time
    return jwt.sign({ userId }, secret, { expiresIn }); // Generate token
};

// User Registration Route (POST /register)
router.post(
    '/register',
    [
        // Validation checks
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
        check('username', 'Username is required').notEmpty(), // Added username validation
    ],
    async (req: Request, res: Response): Promise<Response> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, isPaid = false, username, role = 'user' } = req.body;

        try {
            // Check if the user already exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(409).json({ message: 'User already exists' });
            }

            // Hash the password securely
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user in the database
            const newUser = await User.create({
                email,
                password: hashedPassword,
                isPaid,
                username,
                role,
            });

            // Generate JWT token
            const token = generateAuthToken(newUser.id.toString());  // Make sure to pass user ID as string

            return res.status(201).json({
                message: 'User registered successfully',
                user: {
                    email: newUser.email,
                    username: newUser.username,
                    isPaid: newUser.isPaid,
                    role: newUser.role,
                },
                token,
            });
        } catch (error) {
            console.error('Error registering user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
);

// Get User Profile Route (GET /profile)
router.get('/profile', authenticateToken, async (req: Request, res: Response): Promise<Response> => {
    try {
        // Access userId from the decoded token
        const userId = req.userId; // Ensure `req.userId` is populated by `authenticateToken`

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Fetch user details from the database
        const user = await User.findOne({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            email: user.email,
            username: user.username,
            isPaid: user.isPaid,
            role: user.role,
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
