"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/service.ts
const express_1 = __importDefault(require("express"));
const services_1 = __importDefault(require("../models/services"));
const authenticateToken_1 = require("../middlewares/authenticateToken");
const router = express_1.default.Router();
router.get('/services', authenticateToken_1.authenticateToken, async (req, res, next) => {
    if (!req.user) {
        res.status(401).json({ message: 'User not authenticated' });
        return; // Explicitly return after sending the response
    }
    const userId = req.user.id; // Now it's safe to access `req.user.id`
    const userTier = req.user.tier; // Now it's safe to access `req.user.tier`
    try {
        const services = await services_1.default.findAll({ where: { userId } });
        res.status(200).json({
            message: 'User services retrieved successfully',
            services,
        });
    }
    catch (err) {
        console.error(err);
        next(err); // Pass error to the next middleware (error handler)
    }
});
exports.default = router;
//# sourceMappingURL=service.js.map