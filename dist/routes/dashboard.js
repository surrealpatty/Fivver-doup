"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/dashboard.ts
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Correct path
const router = (0, express_1.Router)();
// GET route for the dashboard
router.get('/dashboard', authMiddleware_1.authenticateToken, async (req, res, next) => {
    try {
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
