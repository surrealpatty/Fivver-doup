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
        const { serviceId } = req.params;
        const userId = req.user?.id;
        if (!serviceId) {
            res.status(400).json({
                message: 'Service ID is required'
            });
            return;
        }
        const service = await _services.default.findByPk(serviceId);
        if (!service) {
            res.status(404).json({
                message: 'Service not found'
            });
            return;
        }
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
        const updatedService = await service.update(updatedData);
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