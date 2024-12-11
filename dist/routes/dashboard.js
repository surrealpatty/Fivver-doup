"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/dashboard.ts
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware")); // Corrected import path for authenticateToken
const router = (0, express_1.Router)();
// GET route for the dashboard
router.get('/dashboard', authMiddleware_1.default, async (req, res, next) => {
    try {
        // Ensure req.user is properly typed and available
        if (req.user) {
            // Logic to fetch dashboard data (e.g., user services, ratings, etc.)
            res.status(200).json({ message: 'Dashboard data fetched successfully.' });
        }
        else {
            res.status(400).json({ message: 'User not authenticated.' });
        }
    }
    catch (err) {
        next(err); // Pass errors to the error handler
    }
});
exports.default = router;
//# sourceMappingURL=dashboard.js.map