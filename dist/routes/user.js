"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_1 = require("@models/user"); // Ensure the correct import path for your User model
const userRouter = (0, express_1.Router)(); // Correctly using Router()
exports.userRouter = userRouter;
// Example login route
const { email, password } = req.body;
try {
    // Find user by email
    const user = await user_1.User.findOne({ where: { email } });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }
    // Handle password validation and token generation logic here
    return res.json({ message: 'Login successful' });
}
catch (error) {
    console.error(error);
    next(error); // Pass the error to the global error handler
}
;
