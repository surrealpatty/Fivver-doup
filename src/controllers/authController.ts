import { Request, Response } from 'express';
import User from '../models/user'; // Assuming User model is correctly imported
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface RegisterRequestBody {
    email: string;
    password: string;
    username: string;
    role: string;
}

export const registerUser = async (req: Request<{}, {}, RegisterRequestBody>, res: Response) => {
    const { email, password, username, role } = req.body;

    try {
        // Hash password before storing in DB
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the database
        const newUser = await User.create({
            email,
            password: hashedPassword,
            username,
            role,
        });

        // Return success response
        return res.status(201).json({ username: newUser.username, role: newUser.role });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
