"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/dashboard.ts
const express_1 = require("express");
const authenticateToken_1 = __importDefault(require("../middlewares/authenticateToken"));
const router = (0, express_1.Router)();
// Update the route handler to handle 'user' being possibly undefined
router.get('/dashboard', authenticateToken_1.default, async (req, res, next) => {
    const user = req.user; // The user property could be undefined
    if (!user) {
        // Handle the case where the user is not authenticated
        res.status(401).json({ message: 'User not authenticated' });
        return;
    }
    try {
        // Proceed with logic assuming 'user' is defined
        res.status(200).json({ message: 'Welcome to your dashboard!', user });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=dashboard.js.map