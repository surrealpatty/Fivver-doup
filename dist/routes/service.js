"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const services_1 = __importDefault(require("../models/services"));
const router = express_1.default.Router();
// GET route to fetch services for a user
router.get('/services', authMiddleware_1.authenticateToken, async (req, res, next) => {
    // Ensure that req.user is defined and contains necessary properties like 'id' and 'tier'
    if (!req.user || !req.user.id || !req.user.tier) {
        return res.status(401).json({ message: 'User not authenticated or missing tier information' });
    }
    const userId = req.user.id; // Safely access the user ID
    const userTier = req.user.tier; // Safely access the user tier
    try {
        // Fetch services associated with the user
        const services = await services_1.default.findAll({ where: { userId } });
        // Return the services associated with the authenticated user
        return res.status(200).json({
            message: 'User services retrieved successfully',
            services,
        });
    }
    catch (err) { // Explicitly type the error as 'unknown'
        console.error(err);
        // Type guard to check if 'err' is an instance of Error
        if (err instanceof Error) {
            // If the error is an instance of Error, safely access the message property
            return res.status(500).json({ message: 'Internal server error', error: err.message });
        }
        else {
            // If 'err' is not an instance of Error, return a generic error message
            return res.status(500).json({ message: 'Internal server error', error: 'Unknown error occurred' });
        }
    }
});
exports.default = router;
//# sourceMappingURL=service.js.map