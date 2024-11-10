// src/routes/user.ts
import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User, { UserAttributes } from '../models/user';  // Import User model
import { body, validationResult } from 'express-validator';  // For validation

// Interface for the registration body
interface RegisterBody {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

const router = Router();

// Route for user registration
router.post(
    '/register',
    // Validate and sanitize inputs using express-validator
    body('username').isString().notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('firstName').isString().notEmpty().withMessage('First name is required'),
    body('lastName').isString().notEmpty().withMessage('Last name is required'),
    async (req: Request<{}, {}, RegisterBody>, res: Response) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password, firstName, lastName } = req.body;

        try {
            // Check if the user already exists by username or email
            const existingUser = await User.findOne({ where: { username } });
            if (existingUser) {
                return res.status(400).json({ message: 'Username already taken' });
            }

            const existingEmail = await User.findOne({ where: { email } });
            if (existingEmail) {
                return res.status(400).json({ message: 'Email is already taken' });
            }

            // Hash the password before saving it to the database
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create the new user with default role and subscription status
            const user = await User.create({
                username,
                email,
                password: hashedPassword,  // Store hashed password
                firstName,
                lastName,
                role: 'Free',  // Default role
                subscriptionStatus: 'Inactive',  // Default subscription status
            } as Partial<UserAttributes>);  // Use Partial to indicate optional fields

            // Respond with the created user details, excluding password
            res.status(201).json({
                id: user.id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                subscriptionStatus: user.subscriptionStatus,
            });
        } catch (error) {
            // Cast error as Error to access message property
            console.error('Error during registration:', (error as Error).message);
            res.status(500).json({ message: 'Server error during registration' });
        }
    }
);

export default router;
