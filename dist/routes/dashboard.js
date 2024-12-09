"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/dashboard.ts
const express_1 = require("express");
const authenticateToken_1 = __importDefault(require("../middlewares/authenticateToken")); // Default import
const dashboardController_1 = require("../controllers/dashboardController"); // Named import
const router = (0, express_1.Router)();
// GET /dashboard route to fetch user dashboard data
router.get('/dashboard', authenticateToken_1.default, async (req, res, next) => {
    try {
        // Call the controller function to fetch the dashboard data
        await (0, dashboardController_1.getDashboardData)(req, res);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching dashboard data' });
    }
});
exports.default = router;
