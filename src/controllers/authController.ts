// src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user';

export const registerUser = async (req: Request, res: Response) => {
    const { email, username, password } = req.body;

    // Input validation
    if (!email || !username || !password) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    try {
        const user = await User.create({ email, username, password: hashedPassword });

        // Respond with user data (you can exclude the password for security)
        res.status(201).json({ id: user.id, email: user.email, username: user.username });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};
