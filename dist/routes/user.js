"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
// src/routes/user.ts
const express_1 = require("express");
const user_1 = require("../models/user"); // Import User model for handling user data
const passwordResetController_1 = require("controllers/passwordResetController"); // Import controller methods for password reset
const router = (0, express_1.Router)();
// Define routes for users
// Example route: Get all users (can be customized as needed)
router.get('/', async (req, res) => {
    try {
        const users = await user_1.User.findAll(); // Find all users
        res.json(users); // Return list of users
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Password reset route - Request password reset
router.post('/password-reset/request', passwordResetController_1.requestPasswordReset); // Using controller for password reset request
// Password reset route - Reset password with token
router.post('/password-reset/reset', passwordResetController_1.resetPassword); // Using controller for password reset
// Export the router with a name (userRoutes)
exports.userRoutes = router;
//# sourceMappingURL=user.js.map