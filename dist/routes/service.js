"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const serviceController_1 = require("../controllers/serviceController"); // Import the controller
const router = (0, express_1.Router)();
// PUT route for updating a service by ID
router.put('/services/:id', authMiddleware_1.authenticateJWT, async (req, res, next) => {
    try {
        // Call the updateService controller function and wait for it to complete
        await (0, serviceController_1.updateService)(req, res); // Assuming the updateService function handles the request logic
    }
    catch (err) {
        next(err); // Pass any errors to the error handling middleware
    }
});
exports.default = router;
//# sourceMappingURL=service.js.map