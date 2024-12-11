"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardData = void 0;
const services_1 = __importDefault(require("../models/services")); // Assuming this model exists
const order_1 = require("../models/order"); // Assuming this model exists
const getDashboardData = async (req, res) => {
    try {
        // Ensure that req.user is defined before using it
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated.' });
        }
        const userId = req.user.id; // Extract user ID from the authenticated user
        // Fetch user services and orders (no ratings since there's no ratings model)
        const services = await services_1.default.findAll({ where: { userId } });
        const orders = await order_1.Order.findAll({ where: { userId } });
        // Return the fetched data
        res.json({ services, orders });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching dashboard data' });
    }
};
exports.getDashboardData = getDashboardData;
//# sourceMappingURL=dashboardController.js.map