"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getServiceById: function() {
        return getServiceById;
    },
    updateService: function() {
        return updateService;
    }
});
const _services = /*#__PURE__*/ _interop_require_default(require("../models/services"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const getServiceById = async (req, res)=>{
    try {
        const { serviceId } = req.params;
        if (!serviceId) {
            return res.status(400).json({
                message: 'Service ID is required'
            });
        }
        // Fetch service by ID
        const service = await _services.default.findByPk(serviceId);
        // Check if service exists
        if (!service) {
            return res.status(404).json({
                message: 'Service not found'
            });
        }
        // Return the found service data
        return res.status(200).json(service);
    } catch (error) {
        // Log and return a server error if something goes wrong
        console.error('Error fetching service:', error);
        return res.status(500).json({
            message: 'Internal server error while fetching service.'
        });
    }
};
const updateService = async (req, res)=>{
    try {
        const { serviceId } = req.params;
        const userId = req.user?.id;
        if (!serviceId) {
            res.status(400).json({
                message: 'Service ID is required'
            });
            return;
        }
        // Fetch the service by ID
        const service = await _services.default.findByPk(serviceId);
        // Check if service exists
        if (!service) {
            res.status(404).json({
                message: 'Service not found'
            });
            return;
        }
        // Ensure that the user updating the service is the owner
        if (String(service.userId) !== String(userId)) {
            res.status(403).json({
                message: 'You can only update your own services'
            });
            return;
        }
        // Prepare updated data with explicit type
        const updatedData = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price
        };
        // Add the image if provided
        if (req.file) {
            updatedData.image = req.file.path;
        }
        // Update the service with the new data
        const updatedService = await service.update(updatedData);
        // Return the updated service
        res.status(200).json({
            message: 'Service updated successfully',
            service: updatedService
        });
    } catch (err) {
        // Log and return a server error if something goes wrong
        console.error('Error updating service:', err);
        res.status(500).json({
            message: 'Error updating service'
        });
    }
};

//# sourceMappingURL=serviceController.js.map