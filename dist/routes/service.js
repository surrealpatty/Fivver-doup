"use strict";
// src/routes/service.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const services_1 = __importDefault(require("../models/services"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const types_1 = require("../types"); // Import isUser function and AuthRequest
const router = express_1.default.Router();
router.get('/services', authMiddleware_1.authenticateToken, async (req, res, next) => {
    // Use the type guard to ensure req.user is defined
    if (!(0, types_1.isUser)(req)) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
    }
    // Now `req.user` is properly typed and we can safely access its properties
    const userId = req.user.id; // Access `id` safely
    const userTier = req.user.tier; // Access `tier` safely
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