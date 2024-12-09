"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const user_1 = require("@models/user"); // Import User model
const registerUser = async (req, res) => {
    const { email, username, password, role, tier } = req.body;
    try {
        // Hash password before saving user
        const hashedPassword = await user_1.User.hashPassword(password);
        const user = await user_1.User.create({
            email,
            username,
            password: hashedPassword,
            role,
            tier,
        });
        res.status(201).json({ message: 'User created successfully', user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
};
exports.registerUser = registerUser;
