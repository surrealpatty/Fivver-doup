"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ServiceController", {
    enumerable: true,
    get: function() {
        return ServiceController;
    }
});
const _services = require("../models/services");
class ServiceController {
    // Method to handle access to premium services for paid users
    static premiumServiceAccess(req, res) {
        const user = req.user; // user object is attached by authenticateToken middleware
        if (user?.role === 'paid') {
            return res.status(200).json({
                message: 'Premium service access granted.'
            });
        }
        return res.status(403).json({
            message: 'Access denied. Only paid users can access this service.'
        });
    }
    // Method to fetch all services (existing method)
    static async getServices(req, res) {
        try {
            const services = await _services.Service.findAll(); // Assuming you want to fetch all services
            return res.status(200).json(services); // Send the services as the response
        } catch (error) {
            console.error('Error fetching services:', error);
            return res.status(500).json({
                message: 'Internal server error while fetching services.'
            });
        }
    }
}
