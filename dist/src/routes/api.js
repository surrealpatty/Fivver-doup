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
const _user = require("@models/user");
const _authMiddleware = require("../middlewares/authMiddleware");
const _services = /*#__PURE__*/ _interop_require_default(require("@models/services"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = (0, _express.Router)();
// POST route to create a service
router.post('/services', _authMiddleware.checkAuth, async (req, res)=>{
    try {
        // Type the request body using ServiceCreationAttributes for type safety
        const { userId, title, description, price } = req.body;
        // Validate required fields
        if (!userId || !title || !description || price === undefined) {
            res.status(400).json({
                message: 'Missing required fields: userId, title, description, and price are mandatory.',
                error: 'ValidationError'
            });
            return;
        }
        // Validate price
        if (typeof price !== 'number' || price <= 0 || isNaN(price)) {
            res.status(400).json({
                message: 'Invalid price: must be a positive number.',
                error: 'ValidationError'
            });
            return;
        }
        // Check if the user exists
        const user = await _user.User.findByPk(userId);
        if (!user) {
            res.status(404).json({
                message: `User with ID ${userId} not found.`,
                error: 'NotFoundError'
            });
            return;
        }
        // Create a new service for the user
        const service = await _services.default.create({
            userId,
            title,
            description,
            price
        });
        // Send success response
        res.status(201).json({
            message: 'Service created successfully.',
            serviceId: service.id,
            title: service.title
        });
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({
            message: 'Internal server error while creating the service.',
            error: error instanceof Error ? error.message : 'UnknownError'
        });
    }
});
const _default = router;

//# sourceMappingURL=api.js.map