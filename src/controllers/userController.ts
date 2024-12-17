import { Request, Response } from 'express';
import { User } from '../models/user';
import bcrypt from 'bcrypt';

// Controller for registering a user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password, username, role = 'user', tier = 'free', isVerified = false } = req.body;

    try {
        // Validate input fields
        if (!email || !password || !username) {
            res.status(400).json({ message: 'Email, username, and password are required.' });
            return;
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            res.status(409).json({ message: 'Email is already in use.' });
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const newUser = await User.create({
            email,
            username,
            password: hashedPassword,
            role,
            tier,
            isVerified,
        });

        // Exclude sensitive fields like password from the response
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                email: newUser.email,
                username: newUser.username,
                role: newUser.role,
                tier: newUser.tier,
                isVerified: newUser.isVerified,
                createdAt: newUser.createdAt,
            },
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};
