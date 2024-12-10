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
const _multer = /*#__PURE__*/ _interop_require_default(require("multer"));
const _services = /*#__PURE__*/ _interop_require_default(require("@models/services"));
const _expressvalidator = require("express-validator");
const _authenticateToken = require("../middlewares/authenticateToken");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
// Multer setup for image uploads
const storage = _multer.default.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads/'); // Set upload directory
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + '-' + file.originalname); // Set unique file name
    }
});
// Define file type and size validation
const fileFilter = (req, file, cb)=>{
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Accept image files
    } else {
        // Reject non-image files
        cb(new Error('Invalid file type. Only images are allowed.'), false);
    }
};
const upload = (0, _multer.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});
// Update service route (with image upload)
router.put('/update/:serviceId', _authenticateToken.authenticateToken, upload.single('image'), [
    (0, _expressvalidator.body)('name').isLength({
        min: 3
    }).withMessage('Service name is required'),
    (0, _expressvalidator.body)('description').isLength({
        min: 5
    }).withMessage('Description is required'),
    (0, _expressvalidator.body)('price').isNumeric().withMessage('Price must be a valid number')
], async (req, res, next)=>{
    const errors = (0, _expressvalidator.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }); // Return validation errors
        return;
    }
    const { name, description, price } = req.body;
    const { serviceId } = req.params;
    const userId = req.user?.id; // Extract user id from the token
    try {
        // Find the service by ID and check if it belongs to the user
        const service = await _services.default.findOne({
            where: {
                id: serviceId
            }
        });
        if (!service) {
            res.status(404).json({
                message: 'Service not found'
            });
            return;
        }
        // Ensure the logged-in user owns the service (convert userId to string for comparison)
        if (service.userId !== String(userId)) {
            res.status(403).json({
                message: 'You are not authorized to update this service'
            });
            return;
        }
        // Update the service details
        service.name = name;
        service.description = description;
        service.price = price;
        // Check if an image was uploaded and update the service image path
        if (req.file) {
            service.image = req.file.path; // Assuming you want to store the image path in the database
        }
        await service.save();
        res.status(200).json({
            message: 'Service updated successfully',
            service
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});
// Delete service route
router.delete('/delete/:serviceId', _authenticateToken.authenticateToken, async (req, res, next)=>{
    const { serviceId } = req.params;
    const userId = req.user?.id; // Extract user id from the token
    try {
        // Find the service by ID and check if it belongs to the user
        const service = await _services.default.findOne({
            where: {
                id: serviceId
            }
        });
        if (!service) {
            res.status(404).json({
                message: 'Service not found'
            });
            return;
        }
        // Ensure the logged-in user owns the service (convert userId to string for comparison)
        if (service.userId !== String(userId)) {
            res.status(403).json({
                message: 'You are not authorized to delete this service'
            });
            return;
        }
        // Delete the service
        await service.destroy();
        res.status(200).json({
            message: 'Service deleted successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});
const _default = router;

//# sourceMappingURL=service.js.map