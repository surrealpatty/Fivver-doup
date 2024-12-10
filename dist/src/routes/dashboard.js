// src/routes/dashboard.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = require("express");
const _authMiddleware = require("../middlewares/authMiddleware");
const router = (0, _express.Router)();
// GET route for the dashboard
router.get('/dashboard', _authMiddleware.authenticateToken, async (req, res, next)=>{
    try {
        if (req.user) {
            // Logic to fetch dashboard data (e.g., user services, ratings, etc.)
            res.status(200).json({
                message: 'Dashboard data fetched successfully.'
            });
        } else {
            res.status(400).json({
                message: 'User not authenticated.'
            });
        }
    } catch (err) {
        next(err); // Pass errors to the error handler
    }
});
const _default = router;

//# sourceMappingURL=dashboard.js.map