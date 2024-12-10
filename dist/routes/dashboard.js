"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); // Importing necessary types
const authenticateToken_1 = require("../middlewares/authenticateToken"); // Correct import
const dashboardController_1 = require("../controllers/dashboardController"); // Named import for controller
const router = (0, express_1.Router)();
// GET /dashboard route to fetch user dashboard data
router.get('/dashboard', authenticateToken_1.authenticateJWT, async (req, res, next) => {
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
