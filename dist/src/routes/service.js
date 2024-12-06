"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = require("express");
const _authMiddleware = require("../middlewares/authMiddleware");
const _serviceController = require("../controllers/serviceController");
const router = (0, _express.Router)();
// PUT route for updating a service by ID
router.put('/services/:id', _authMiddleware.authenticateJWT, async (req, res, next)=>{
    try {
        // Call the updateService controller function and wait for it to complete
        await (0, _serviceController.updateService)(req, res); // The controller function will handle the request and response
    } catch (err) {
        next(err); // Pass any errors to the error handling middleware
    }
});
const _default = router;

//# sourceMappingURL=service.js.map