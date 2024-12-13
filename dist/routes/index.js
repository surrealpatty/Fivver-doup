"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const user_1 = require("../models/user");
const registerUser = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        if (!email || !username || !password) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }
        // Check if user already exists
        const existingUser = await user_1.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the password before saving it
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Create a new user 
        const newUser = await user_1.User.create({
            id: (0, uuid_1.v4)(),
            email,
            username,
            password: hashedPassword,
            role: '',
            tier: '',
            isVerified: false,
        });
        return res.status(201).json({
            message: 'User created successfully',
            user: { id: newUser.id, email: newUser.email, username: newUser.username },
        });
    }
    catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json({ message: 'Server error during user registration' });
    }
};
exports.registerUser = registerUser;
// ... rest of your code ...
//# sourceMappingURL=index.js.map