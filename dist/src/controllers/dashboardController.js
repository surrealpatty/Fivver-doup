// src/controllers/dashboardController.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getDashboardData", {
    enumerable: true,
    get: function() {
        return getDashboardData;
    }
});
const _order = require("../models/order");
const _services = require("../models/services");
const getDashboardData = async (req, res)=>{
    try {
        // Ensure that req.user is defined before using it
        if (!req.user) {
            return res.status(401).json({
                message: 'User not authenticated.'
            });
        }
        const userId = req.user.id; // Extract user ID from the authenticated user
        // Fetch user services and orders (no ratings since there's no ratings model)
        const services = await _services.Service.findAll({
            where: {
                userId
            }
        });
        const orders = await _order.Order.findAll({
            where: {
                userId
            }
        });
        // Return the fetched data
        res.json({
            services,
            orders
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error fetching dashboard data'
        });
    }
};
