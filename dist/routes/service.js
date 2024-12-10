"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const services_1 = __importDefault(require("../models/services"));
const authenticateToken_1 = require("../middlewares/authenticateToken");
const router = express_1.default.Router();
// Service route to get the user's services
router.get('/services', authenticateToken_1.authenticateToken, async (req, res, next) => {
    const userId = req.user?.id; // Get user ID from the authenticated token
    if (!userId) {
        res.status(400).json({ message: 'User ID not found in token' });
        return;
    }
    try {
        // Fetch the services for the authenticated user
        const services = await services_1.default.findAll({ where: { userId } });
        res.status(200).json({
            message: 'User services retrieved successfully',
            services, // Return the user's services
        });
    }
    catch (err) {
        console.error(err);
        next(err); // Pass error to the next middleware (error handler)
    }
});
exports.default = router;
//# sourceMappingURL=service.js.map