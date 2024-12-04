"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/service.ts
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const tierMiddleware_1 = require("../middlewares/tierMiddleware");
const services_1 = __importDefault(require("../models/services")); // Correct import for Service model
const router = express_1.default.Router();
router.post('/', authMiddleware_1.authenticateToken, (0, tierMiddleware_1.checkTier)('paid'), // Ensure checkTier is a valid middleware function
async (req, res) => {
    try {
        const { title, description, price } = req.body;
        if (!title || !description || price === undefined) {
            res.status(400).json({ message: 'All fields are required.' });
            return; // End the function early if there are validation errors
        }
        const userId = parseInt(req.user?.id || '', 10);
        if (isNaN(userId)) {
            res.status(400).json({ message: 'Invalid user ID.' });
            return; // End the function early if user ID is invalid
        }
        const service = await services_1.default.create({
            userId,
            title,
            description,
            price,
        });
        res.status(201).json({ message: 'Service created successfully.', service });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.', error });
    }
});
exports.default = router;
//# sourceMappingURL=service.js.map