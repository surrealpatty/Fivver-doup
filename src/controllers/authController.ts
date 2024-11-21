import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user'; // Ensure the User model is correctly imported

// Login handler for user authentication
export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
        // Ensure that the email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

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

        // Use a secure default expiration time if none is provided in the env
        const jwtExpireTime = process.env.JWT_EXPIRE_TIME || '1h';

        // Generate the JWT token
        const token = jwt.sign(
            { userId: user.id }, // Payload with user ID
            jwtSecret, // Secret key for signing the token
            { expiresIn: jwtExpireTime } // Token expiration
        );

        // Return the token to the client
        return res.json({ message: 'Login successful', token });
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Login error:', error);
        return next(error); // Pass the error to the error handling middleware
    }
};

// Register handler for user creation
export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, username } = req.body;

    try {
        // Ensure that the email, password, and username are provided
        if (!email || !password || !username) {
            return res.status(400).json({ message: 'Email, password, and username are required' });
        }

        // Check if the email already exists in the database
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the database
        const newUser = await User.create({
            email,
            password: hashedPassword, // Storing the hashed password
            username,
        });

        // Respond with success message and the new user's ID
        return res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Registration error:', error);
        return next(error); // Pass the error to the error handling middleware
    }
};
