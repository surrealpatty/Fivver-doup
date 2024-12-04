"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const registerUser = async (req, res) => {
    const { email, username, password } = req.body;
    // Input validation
    if (!email || !username || !password) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }
    // Check if user already exists
    const existingUser = await user_1.User.findOne({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    // Hash the password
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    // Create the new user
    try {
        const user = await user_1.User.create({ email, username, password: hashedPassword });
        // Respond with user data (you can exclude the password for security)
        res.status(201).json({ id: user.id, email: user.email, username: user.username });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};
exports.registerUser = registerUser;
//# sourceMappingURL=authController.js.map