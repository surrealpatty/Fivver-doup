"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const tierMiddleware_1 = require("../middlewares/tierMiddleware");
const services_1 = __importDefault(require("../models/services"));
const router = express_1.default.Router();
// POST /services route to create a new service (only for paid users)
router.post('/', authMiddleware_1.authenticateToken, (0, tierMiddleware_1.checkTier)('paid'), async (req, res) => {
    try {
        const { title, description, price } = req.body;
        if (!title || !description || price === undefined) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const userId = parseInt(req.user?.id || '', 10);
        if (isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid user ID.' });
        }
        const service = await services_1.default.create({
            userId,
            title,
            description,
            price,
        });
        return res.status(201).json({ message: 'Service created successfully.', service });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.', error });
    }
});
exports.default = router;
//# sourceMappingURL=service.js.map