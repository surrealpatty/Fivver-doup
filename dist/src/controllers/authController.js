"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Importing jwt for token generation
// Function to generate JWT token
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, username: user.username }, process.env.JWT_SECRET || 'your_jwt_secret', // Secret key for JWT
    { expiresIn: '1h' } // Token expires in 1 hour
    );
};
// Authenticate User Function
const authenticateUser = async (req, res) => {
    // Log request body to help with debugging
    console.log('Authentication request data:', req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        console.log('Missing email or password');
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    try {
        // Check if the user exists in the database
        const user = await user_1.User.findOne({ where: { email } });
        if (!user) {
            console.log('User not found for email:', email);
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Check if the password matches
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            console.log('Password mismatch for user:', email);
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Generate a JWT token for the user
        const token = generateToken(user);
        // Return the success message and the generated token
        return res.status(200).json({
            message: 'Authentication successful',
            token, // Send back the generated token
        });
    }
    catch (error) {
        console.error('Error during authentication:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.authenticateUser = authenticateUser;
