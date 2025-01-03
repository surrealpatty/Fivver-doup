"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateToken_1 = require("../middlewares/authenticateToken"); // Correct import of authenticateToken middleware
const serviceController_1 = require("../controllers/serviceController"); // Named import of ServiceController
const router = (0, express_1.Router)();
// Example route with middleware applied
router.get('/services', authenticateToken_1.authenticateToken, serviceController_1.ServiceController.getServices); // Apply authenticateToken middleware
// Example route without authentication
router.get('/some-route', (req, res) => {
    res.status(200).send('Success');
});
// Export the router
exports.default = router;
