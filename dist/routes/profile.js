"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Import JWT authentication middleware
const user_1 = require("../models/user"); // Import User model
const services_1 = require("../models/services"); // Import Service model
const router = express_1.default.Router();
// Route to view the user's profile and their services (GET /profile)
router.get('/', authMiddleware_1.authenticateJWT, async (req, res) => {
    try {
        const userId = req.user?.id; // Get the user ID from the authenticated request
        // If the user ID is not available, return an unauthorized error
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated.' });
        }
        // Fetch user details from the database
        const user = await user_1.User.findByPk(userId);
        // Fetch all services that belong to the user
        const services = await services_1.Service.findAll({ where: { userId } });
        // If the user is not found, return a 404 error
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        // Return the user's profile along with their services
        return res.status(200).json({
            message: 'Profile data fetched successfully',
            profile: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            services, // Include the services related to the user
        });
    }
    catch (error) {
        console.error('Error fetching profile:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});
exports.default = router;
//# sourceMappingURL=profile.js.map