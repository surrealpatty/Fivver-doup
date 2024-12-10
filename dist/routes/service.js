"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const services_1 = __importDefault(require("@models/services")); // Ensure this import is correct
const express_validator_1 = require("express-validator");
const authenticateToken_1 = require("../middlewares/authenticateToken"); // Correct import for authenticateToken
const router = express_1.default.Router();
// Multer setup for image uploads
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set upload directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Set unique file name
    },
});
// Define file type and size validation
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Accept image files
    }
    else {
        // Reject non-image files
        cb(new Error('Invalid file type. Only images are allowed.'), false);
    }
};
const upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Set file size limit (e.g., 5MB)
});
// Update service route (with image upload)
router.put('/update/:serviceId', authenticateToken_1.authenticateToken, // Protect route
upload.single('image'), // Handle image upload
[
    (0, express_validator_1.body)('name').isLength({ min: 3 }).withMessage('Service name is required'),
    (0, express_validator_1.body)('description').isLength({ min: 5 }).withMessage('Description is required'),
    (0, express_validator_1.body)('price').isNumeric().withMessage('Price must be a valid number'),
], async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() }); // Return validation errors
        return;
    }
    const { name, description, price } = req.body;
    const { serviceId } = req.params;
    const userId = req.user?.id; // Extract user id from the token
    try {
        // Find the service by ID and check if it belongs to the user
        const service = await services_1.default.findOne({ where: { id: serviceId } });
        if (!service) {
            res.status(404).json({ message: 'Service not found' });
            return;
        }
        // Ensure the logged-in user owns the service (convert userId to string for comparison)
        if (service.userId !== String(userId)) { // Convert userId to string for comparison
            res.status(403).json({ message: 'You are not authorized to update this service' });
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
        res.status(200).json({ message: 'Service updated successfully', service });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Delete service route
router.delete('/delete/:serviceId', authenticateToken_1.authenticateToken, // Protect route
async (req, res, next) => {
    const { serviceId } = req.params;
    const userId = req.user?.id; // Extract user id from the token
    try {
        // Find the service by ID and check if it belongs to the user
        const service = await services_1.default.findOne({ where: { id: serviceId } });
        if (!service) {
            res.status(404).json({ message: 'Service not found' });
            return;
        }
        // Ensure the logged-in user owns the service (convert userId to string for comparison)
        if (service.userId !== String(userId)) { // Convert userId to string for comparison
            res.status(403).json({ message: 'You are not authorized to delete this service' });
            return;
        }
        // Delete the service
        await service.destroy();
        res.status(200).json({ message: 'Service deleted successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = router;
