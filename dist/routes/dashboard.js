"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateToken_1 = require("@middlewares/authenticateToken"); // Named import for middleware
const dashboardController_1 = require("../controllers/dashboardController"); // Named import for controller
const router = (0, express_1.Router)();
// GET /dashboard route to fetch user dashboard data
router.get('/dashboard', authenticateToken_1.authenticateToken, async (req, res, next) => {
    try {
        // Call the controller function to fetch the dashboard data
        await (0, dashboardController_1.getDashboardData)(req, res);
    }
    catch (err) {
        console.error(err);
        // Pass the error to the next middleware or handler
        next(err);
    }
});
exports.default = router;
