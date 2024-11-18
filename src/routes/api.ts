import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import { User } from '../models/user'; 
import { Service } from '../models/service'; // Correct import style for TypeScript
import { authenticateToken } from '../middleware/authenticateToken'; // Ensure correct import if it's TypeScript

const router = express.Router();

// User Registration Route
router.post(
    '/register',
    [
        check('username', 'Username is required').notEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        try {
            // Check if user already exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const newUser = await User.create({
                username,
                email,
                password: hashedPassword, // Store hashed password
            });

            res.status(201).json({
                message: 'User created successfully',
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                },
            });
        } catch (error) {
            console.error('Error creating user:', error.message);
            res.status(500).json({ message: 'Server error' });
        }
    }
);

// User Login Route
router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
            expiresIn: '1h', // Token expiration time (1 hour)
        });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Protected Profile Route
router.get('/profile', authenticateToken, async (req: Request, res: Response) => {
    try {
        // Access userId from the typed request object
        const user = await User.findByPk(req.userId); // Ensure req.userId exists after authenticateToken
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ id: user.id, username: user.username, email: user.email });
    } catch (error) {
        console.error('Profile retrieval error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to create a new service (Protected)
router.post(
    '/services',
    authenticateToken,
    [
        check('title', 'Title is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),
        check('price', 'Price must be a valid number').isFloat({ min: 0 }), // Use isFloat for price
        check('category', 'Category is required').notEmpty(),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, price, category } = req.body;

        try {
            // Create new service
            const newService = await Service.create({
                title,
                description,
                price,
                category,
                userId: req.userId, // The authenticated user's ID
            });
            res.status(201).json(newService);
        } catch (error) {
            console.error('Error creating service:', error.message);
            res.status(500).json({ message: 'Failed to create service' });
        }
    }
);

export default router;
