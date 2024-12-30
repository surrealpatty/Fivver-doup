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
const _services = /*#__PURE__*/ _interop_require_default(require("../models/services"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const updateService = async (req, res)=>{
    try {
        // Retrieve serviceId from the request parameters and userId from authenticated user
        const { serviceId } = req.params;
        const userId = req.user?.id; // Ensure user is set after authentication middleware
        // Check if serviceId is provided
        if (!serviceId) {
            res.status(400).json({
                message: 'Service ID is required'
            });
            return; // Exit early to avoid returning `Response<any, Record<string, any>>` type
        }
        // Find the service by primary key
        const service = await _services.default.findByPk(serviceId);
        if (!service) {
            res.status(404).json({
                message: 'Service not found'
            });
            return; // Exit early if service is not found
        }
        // Ensure the logged-in user owns the service
        if (String(service.userId) !== String(userId)) {
            res.status(403).json({
                message: 'You can only update your own services'
            });
            return; // Exit early if user does not own the service
        }
        // Prepare updated data (handle image upload if available)
        const updatedData = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price
        };
        // Add image path if a new image was uploaded
        if (req.file) {
            updatedData.image = req.file.path; // Add image path to the update
        }
        // Proceed with updating the service in the database
        const updatedService = await service.update(updatedData);
        // Respond with the updated service
        res.status(200).json({
            message: 'Service updated successfully',
            service: updatedService
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error updating service'
        });
    }
};

//# sourceMappingURL=serviceController.js.map