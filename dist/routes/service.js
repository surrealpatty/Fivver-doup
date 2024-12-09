"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware"); // JWT middleware
const tierMiddleware_1 = require("../middlewares/tierMiddleware"); // Tier middleware
const serviceController_1 = require("../controllers/serviceController"); // Controller function
const router = (0, express_1.Router)();
// PUT route for updating an existing service
router.put('/services/:id', authMiddleware_1.authenticateJWT, tierMiddleware_1.checkPaidTier, async (req, res, next) => {
    try {
        // Call the updateService controller function and wait for it to complete
        await (0, serviceController_1.updateService)(req, res, next); // The controller function will handle the request and response
    }
    catch (err) {
        next(err); // Pass any errors to the error handling middleware
    }
});
exports.default = router;
