"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/orderRoutes.ts
const express_1 = __importDefault(require("express"));
const authenticateToken_1 = require("../middlewares/authenticateToken");
const types_1 = require("../types");
const orderController_1 = require("../controllers/orderController");
const router = express_1.default.Router();
// Route to create an order
router.post('/', authenticateToken_1.authenticateToken, async (req, res, next) => {
    // Ensure that req.user is defined and is of the correct type
    if (!req.user || !(0, types_1.isUser)(req.user)) {
        return res.status(400).json({ message: 'User not authenticated or invalid user data' });
    }
    try {
        const { tier } = req.user;
        if (!tier) {
            return res.status(400).json({ error: 'User does not have a valid tier' });
        }
        await (0, orderController_1.createOrder)(req, res);
        return res.status(201).json({ message: 'Order created successfully' });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map