"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateToken_1 = require("../middlewares/authenticateToken");
const serviceController_1 = require("../controllers/serviceController"); // Correct path
const router = (0, express_1.Router)();
// Example route with authentication middleware
router.get('/services', authenticateToken_1.authenticateToken, async (req, res) => {
    try {
        // Call the controller method and pass the request and response objects
        await serviceController_1.ServiceController.getServices(req, res); // Ensure that this method does not return a Response object
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching services' });
    }
});
// Example route without authentication
router.get('/some-route', (req, res) => {
    res.status(200).send('Success');
});
// Export the router using default export so it can be imported correctly in src/index.ts
exports.default = router;
