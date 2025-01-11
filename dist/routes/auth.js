"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user")); // Import User model and UserCreationAttributes
const types_1 = require("../types"); // Import UserRole and UserTier enums
const router = express_1.default.Router();
// Log incoming request body to debug
const logRequestBody = (req, res, next) => {
    console.log(`${req.method} request to ${req.url}:`, req.body);
    next(); // Proceed to the next middleware or route handler
};
// User Registration (Signup) Route
router.post('/signup', logRequestBody, async (req, res) => {
    const { email, username, password, role, tier } = req.body;
    // Validate input
    if (!email || !username || !password) {
        res.status(400).json({ message: 'Email, username, and password are required.' });
        return;
    }
    try {
        // Check if user already exists
        const existingUser = await user_1.default.findOne({
            where: { email },
        });
        if (existingUser) {
            res.status(400).json({ message: 'Email is already in use.' });
            return;
        }
        // Hash the password using bcrypt
        const hashedPassword = await bcryptjs_1.default.hash(password, 10); // Salt rounds = 10
        // Default values for role and tier if not provided, casting to enums
        const userRole = (role || types_1.UserRole.User); // Default to 'User' role
        const userTier = (tier || types_1.UserTier.Free); // Default to 'Free' tier
        // Create the new user in the database (id is handled automatically)
        const newUser = {
            email,
            username,
            password: hashedPassword,
            role: userRole,
            tier: userTier,
            isVerified: false, // Assuming user isn't verified initially
        };
        const user = await user_1.default.create(newUser); // Pass newUser as the object to create
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, username: user.username }, process.env.JWT_SECRET || 'your_jwt_secret', // Secret key for JWT (use environment variable)
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
// User Login Route
router.post('/login', logRequestBody, async (req, res) => {
    const { email, password } = req.body;
    // Validate input
    if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required.' });
        return;
    }
    try {
        // Find user by email
        const user = await user_1.default.findOne({
            where: { email },
        });
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        // Compare the provided password with the stored hashed password
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, username: user.username }, process.env.JWT_SECRET || 'your_jwt_secret', // Secret key for JWT
        { expiresIn: '1h' } // Expiry time of the token
        );
        // Send back response with token
        res.status(200).json({
            message: 'Authentication successful',
            token, // Send the generated token
        });
    }
    catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Export the router to use in the main app
exports.default = router;
