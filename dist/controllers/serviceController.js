"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateService = void 0;
const services_1 = __importDefault(require("@models/services")); // Correct alias import
const updateService = async (req, res) => {
    try {
        const { serviceId } = req.params;
        const userId = req.user?.id; // Ensure user is set after authentication middleware
        // Find the service by primary key
        const service = await services_1.default.findByPk(serviceId);
        if (!service) {
            res.status(404).json({ message: 'Service not found' });
            return;
        }
        // Ensure the logged-in user owns the service
        // Convert userId to string for comparison
        if (service.userId !== String(userId)) {
            res.status(403).json({ message: 'You can only update your own services' });
            return;
        }
        // Prepare updated data (handle image upload if available)
        const updatedData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
        };
        // Add image path if a new image was uploaded
        if (req.file) {
            updatedData.image = req.file.path; // Add image path to the update
        }
        // Update the service with new data
        const updatedService = await service.update(updatedData);
        // Respond with the updated service
        res.status(200).json({
            message: 'Service updated successfully',
            service: updatedService,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating service' });
    }
};
exports.updateService = updateService;
//# sourceMappingURL=serviceController.js.map