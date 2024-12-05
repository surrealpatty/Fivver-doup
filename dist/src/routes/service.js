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
const _services = /*#__PURE__*/ _interop_require_default(require("models/services"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = (0, _express.Router)();
// PUT route to update a service
router.put('/services/:id', _authMiddleware.authenticateJWT, async (req, res)=>{
    try {
        const serviceId = req.params.id;
        const { title, description, price } = req.body;
        const service = await _services.default.findByPk(serviceId);
        // Check if the service exists
        if (!service) {
            res.status(404).json({
                message: 'Service not found'
            });
            return; // Make sure to return after sending the response
        }
        // Check if the authenticated user is the owner of the service
        if (!req.user || service.userId.toString() !== req.user.id) {
            res.status(403).json({
                message: 'You can only edit your own services'
            });
            return; // Return after sending the response
        }
        // Update the service
        service.title = title;
        service.description = description;
        service.price = price;
        await service.save();
        // Return success response with updated service data
        res.status(200).json({
            message: 'Service updated successfully',
            service
        });
    } catch (error) {
        // Fix for the error type
        if (error instanceof Error) {
            res.status(500).json({
                message: 'Error updating service',
                error: error.message
            });
        } else {
            res.status(500).json({
                message: 'Error updating service',
                error: 'Unknown error'
            });
        }
    }
});
const _default = router;

//# sourceMappingURL=service.js.map