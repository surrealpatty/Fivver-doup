import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user'; // Ensure User is correctly imported

// Login handler for user authentication
export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.status(500).json({ message: 'Server configuration error: Missing JWT_SECRET' });
        }

        const token = jwt.sign(
            { userId: user.id }, // Payload, including user ID
            jwtSecret, // Secret key
            { expiresIn: process.env.JWT_EXPIRE_TIME || '1h' } // Flexible expiration time from env
        );

        // Return the token to the client
        res.json({ message: 'Login successful', token });
    } catch (error) {
        // Log the error for debugging
        console.error('Login error:', error);
        next(error); // Pass error to the error handling middleware
    }
};

// Register handler for user creation
export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, username } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = await User.create({
            email,
            password: hashedPassword,
            username,
        });

        res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
    } catch (error) {
        // Log the error for debugging
        console.error('Registration error:', error);
        next(error); // Pass error to the error handling middleware
    }
};
