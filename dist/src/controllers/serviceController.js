"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createService", {
    enumerable: true,
    get: function() {
        return createService;
    }
});
const _services = /*#__PURE__*/ _interop_require_default(require("../models/services"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const createService = async (req, res)=>{
    try {
        const { title, description, price } = req.body;
        // Validate request body
        if (!title || !description || price === undefined) {
            return res.status(400).json({
                message: 'All fields (title, description, price) are required.'
            });
        }
        // Retrieve the user ID from the authenticated token (assumed to be in req.user)
        const userId = parseInt(req.user?.id || '', 10);
        if (isNaN(userId)) {
            return res.status(400).json({
                message: 'Invalid user ID.'
            });
        }
        // Create the new service using Sequelize ORM
        const newService = await _services.default.create({
            title,
            description,
            price,
            userId
        });
        // Respond with the created service
        return res.status(201).json({
            message: 'Service created successfully.',
            service: newService
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error creating service',
            error
        });
    }
};

//# sourceMappingURL=serviceController.js.map