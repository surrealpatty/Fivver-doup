import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user'; // Import User model and UserCreationAttributes
const router = Router();
// User Registration (Signup) Route
router.post('/signup', async (req, res) => {
    const { email, username, password } = req.body;
    // Validate input
    if (!email || !username || !password) {
        return res.status(400).json({ message: 'Email, username, and password are required.' });
    }
    try {
        // Check if user already exists
        const existingUser = await User.findOne({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use.' });
        }
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds = 10
        // Create the new user in the database (id is handled automatically)
        const newUser = {
            email,
            username,
            password: hashedPassword,
            role: 'user', // Default role (can be modified)
            tier: 'free', // Default tier should be "free"
            isVerified: false, // Assuming user isn't verified initially
        };
        const user = await User.create(newUser); // Pass newUser as the object to create
        // Generate JWT token
        const token = jwt.sign({ userId: user.id, email: user.email, username: user.username }, process.env.JWT_SECRET || 'your_jwt_secret', // Secret key for JWT (use environment variable)
        { expiresIn: '1h' } // Expiry time of the token
        );
        // Send back response with token
        res.status(201).json({
            message: 'User registered successfully',
            token, // Send the generated token
        });
    }
    catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Export the router to use in the main app
export default router;
//# sourceMappingURL=auth.js.map