"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_1 = require("@models/user"); // Using alias to import the User model
const userRouter = (0, express_1.Router)(); // Ensure it's Router, not Application
exports.userRouter = userRouter;
// Example login route
userRouter.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await user_1.User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        // Handle password validation and token generation logic here
        return res.json({ message: 'Login successful' }); // Modify as needed for your logic
    }
    catch (error) {
        console.error(error);
        next(error); // Pass the error to the global error handler
    }
});
