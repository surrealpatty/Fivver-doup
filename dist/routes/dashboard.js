"use strict";
// src/routes/dashboard.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboardController_1 = require("../controllers/dashboardController");
const router = (0, express_1.Router)();
// GET /dashboard route to fetch user dashboard data
router.get('/dashboard', authenticateToken, async (req, res, next) => {
    try {
        // Call the controller function to fetch the dashboard data
        await (0, dashboardController_1.getDashboardData)(req, res);
    }
    catch (err) {
        console.error(err);
        next(err);
    }
});
exports.default = router;
