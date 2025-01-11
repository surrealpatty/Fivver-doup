"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const jwt_1 = require("../utils/jwt"); // Import the token generation function
// Authenticate User Function
const authenticateUser = async (req, res) => {
    const { email, password } = (req.body || {});
    // Ensure email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    try {
        // Check if the user exists in the database
        const user = await user_1.default.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Check if the password matches
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Create the user payload for the token (exclude password)
        const userPayload = {
            id: String(user.id), // Convert id to string
            email: user.email,
            username: user.username,
            tier: user.tier, // Ensure tier is of type UserTier
            role: user.role, // Ensure role is of type UserRole
        };
        // Generate the JWT token for the user
        const token = (0, jwt_1.generateToken)(userPayload);
        // Return the success message and the generated token with a 200 status code
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
