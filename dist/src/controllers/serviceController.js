// src/controllers/serviceController.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "updateService", {
    enumerable: true,
    get: function() {
        return updateService;
    }
});
const _services = /*#__PURE__*/ _interop_require_default(require("@models/services"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const updateService = async (req, res)=>{
    const { id } = req.params; // Extract service ID from the URL params
    const { name, description, price } = req.body; // Extract data from the request body
    try {
        // Attempt to find the service by primary key (ID)
        const service = await _services.default.findByPk(id);
        // If the service is not found, respond with a 404 error
        if (!service) {
            res.status(404).json({
                message: 'Service not found'
            });
            return;
        }
        // Update the service fields if new values are provided
        service.name = name ?? service.name; // Use nullish coalescing to only update if value is not null or undefined
        service.description = description ?? service.description;
        service.price = price ?? service.price;
        // Save the updated service object to the database
        await service.save();
        // Respond with success message and the updated service data
        res.status(200).json({
            message: 'Service updated successfully',
            service
        });
    } catch (error) {
        // Check if the error is an instance of Error
        if (error instanceof Error) {
            res.status(500).json({
                message: 'Error updating service',
                error: error.message
            });
        } else {
            // Fallback for unknown error types
            res.status(500).json({
                message: 'Unknown error occurred'
            });
        }
    }
};

//# sourceMappingURL=serviceController.js.map