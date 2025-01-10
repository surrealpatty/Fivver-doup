"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, // Export the router using default export so it can be imported correctly in src/index.ts
"default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = require("express");
const _authenticateToken = require("../middlewares/authenticateToken");
const _serviceController = require("../controllers/serviceController");
const router = (0, _express.Router)();
// Example route with authentication middleware
router.get('/services', _authenticateToken.authenticateToken, async (req, res)=>{
    try {
        // Call the controller method and pass the request and response objects
        await _serviceController.ServiceController.getServices(req, res); // Ensure that this method does not return a Response object
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching services'
        });
    }
});
// Example route without authentication
router.get('/some-route', (req, res)=>{
    res.status(200).send('Success');
});
const _default = router;
