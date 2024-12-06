"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const services_1 = __importDefault(require("@models/services")); // Use the alias '@models/services'
const router = (0, express_1.Router)();
exports.router = router;
// GET route for retrieving user profile and services
router.get('/profile', authMiddleware_1.authenticateJWT, async (req, res, next) => {
    try {
        const user = req.user; // req.user comes from the authenticateJWT middleware
        // Check if the user exists
        if (!user) {
            res.status(403).json({ message: 'User not authenticated' });
            return;
        }
        // Fetch the services associated with the user from the database
        const services = await services_1.default.findAll({ where: { userId: user.id } });
        // Respond with the user data and the user's services
        res.status(200).json({ user, services });
    }
    catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Error fetching profile' });
    }
});
//# sourceMappingURL=profile.js.map