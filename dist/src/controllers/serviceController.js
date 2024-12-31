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
    premiumServiceHandler: function() {
        return premiumServiceHandler;
    },
    updateService: function() {
        return updateService;
    }
});
const _services = require("../models/services");
const getServiceById = async (req, res)=>{
    try {
        const { serviceId } = req.params;
        // Validate serviceId parameter
        if (!serviceId) {
            return res.status(400).json({
                message: 'Service ID is required'
            });
        }
        // Fetch the service by ID
        const service = await _services.Service.findByPk(serviceId);
        // Check if the service exists
        if (!service) {
            return res.status(404).json({
                message: 'Service not found'
            });
        }
        // Return the service data
        return res.status(200).json(service);
    } catch (error) {
        // Log the error and return a server error message
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
        // Validate serviceId parameter
        if (!serviceId) {
            return res.status(400).json({
                message: 'Service ID is required'
            });
        }
        // Fetch the service by ID
        const service = await _services.Service.findByPk(serviceId);
        // Check if the service exists
        if (!service) {
            return res.status(404).json({
                message: 'Service not found'
            });
        }
        // Ensure the user is the owner of the service
        if (String(service.userId) !== String(userId)) {
            return res.status(403).json({
                message: 'You can only update your own services'
            });
        }
        // Prepare updated service data
        const updatedData = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price
        };
        // Add the image if provided
        if (req.file) {
            updatedData.image = req.file.path;
        }
        // Update the service in the database
        const updatedService = await service.update(updatedData);
        // Return the updated service
        return res.status(200).json({
            message: 'Service updated successfully',
            service: updatedService
        });
    } catch (err) {
        // Log the error and return a server error message
        console.error('Error updating service:', err);
        return res.status(500).json({
            message: 'Error updating service'
        });
    }
};
const premiumServiceHandler = (req, res)=>{
    // Just an example for premium service access
    return res.status(200).json({
        message: 'Premium service access granted.'
    });
};

//# sourceMappingURL=serviceController.js.map