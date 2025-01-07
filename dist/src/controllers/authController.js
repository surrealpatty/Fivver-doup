"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = require("../models/user");
const jwt_1 = require("../utils/jwt"); // Import the token generation function
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
        // Create the user payload for the token (exclude password)
        const userPayload = {
            id: user.id,
            email: user.email,
            username: user.username,
            tier: user.tier, // Add tier if available
            role: user.role, // Add role if available
        };
        // Generate the JWT token for the user
        const token = (0, jwt_1.generateToken)(userPayload);
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
