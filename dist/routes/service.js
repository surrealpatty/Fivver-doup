"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const serviceController_1 = require("../controllers/serviceController"); // Import the controller
const router = (0, express_1.Router)();
// Add a PUT route for updating services
router.put('/services/:id', authMiddleware_1.authenticateJWT, async (req, res, next) => {
    try {
        await (0, serviceController_1.updateService)(req, res); // Wait for the async function to complete
    }
    catch (error) {
        next(error); // Pass any errors to Express's error handling middleware
    }
});
exports.default = router;
//# sourceMappingURL=service.js.map