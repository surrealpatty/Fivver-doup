// src/routes/user.ts

import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';  // Import User model
import { body, validationResult } from 'express-validator';  // For validation

// Define UserAttributes if not already defined in your project
interface UserAttributes {
    id?: number;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: string;
    subscriptionStatus?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface RegisterBody {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

const router = Router();

router.post(
    '/register',
    body('username').isString().notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('firstName').isString().notEmpty().withMessage('First name is required'),
    body('lastName').isString().notEmpty().withMessage('Last name is required'),
    async (req: Request<{}, {}, RegisterBody>, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password, firstName, lastName } = req.body;

        try {
            const existingUser = await User.findOne({ where: { username } });
            if (existingUser) {
                return res.status(400).json({ message: 'Username already taken' });
            }

            const existingEmail = await User.findOne({ where: { email } });
            if (existingEmail) {
                return res.status(400).json({ message: 'Email is already taken' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                username,
                email,
                password: hashedPassword,
                firstName,
                lastName,
                role: 'Free',
                subscriptionStatus: 'Inactive',
            });

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
            console.error('Error during registration:', (error as Error).message);
            res.status(500).json({ message: 'Server error during registration' });
        }
    }
);

export default router;
