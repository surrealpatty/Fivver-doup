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
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _authMiddleware = require("../middlewares/authMiddleware");
const _tierMiddleware = require("../middlewares/tierMiddleware");
const _services = /*#__PURE__*/ _interop_require_default(require("../models/services"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
// Create a service (only for paid users)
router.post('/post-service', _authMiddleware.authenticateToken, (0, _tierMiddleware.checkTier)('paid'), async (req, res)=>{
    try {
        const { title, description, price } = req.body;
        // Validate request body
        if (!title || !description || price === undefined) {
            res.status(400).json({
                message: 'All fields are required.'
            });
            return;
        }
        // Retrieve the user ID from the authenticated token
        const userId = parseInt(req.user?.id || '', 10);
        if (isNaN(userId)) {
            res.status(400).json({
                message: 'Invalid user ID.'
            });
            return;
        }
        // Create a new service entry
        const service = await _services.default.create({
            userId,
            title,
            description,
            price
        });
        // Respond with the created service
        res.status(201).json({
            message: 'Service created successfully.',
            service
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error.',
            error
        });
    }
});
const _default = router;

//# sourceMappingURL=service.js.map