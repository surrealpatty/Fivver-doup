"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const review_1 = __importDefault(require("../models/review")); // Adjust the import if necessary
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware")); // Correct import path for authMiddleware
const router = express_1.default.Router();
// 1. Create a new review
router.post('/', authMiddleware_1.default, // Protect the route
[
    // Validate input data
    (0, express_validator_1.body)('serviceId').isInt().withMessage('Service ID is required and must be an integer'),
    (0, express_validator_1.body)('rating').isFloat({ min: 1, max: 5 }).withMessage('Rating must be a number between 1 and 5'),
    (0, express_validator_1.body)('comment').optional().isString().withMessage('Comment must be a string'),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { serviceId, rating, comment } = req.body;
    try {
        const review = yield review_1.default.create({
            serviceId,
            userId: req.user.id, // Assuming req.user.id is the ID of the authenticated user
            rating,
            comment,
        });
        res.status(201).json(review); // Return the newly created review
    }
    catch (error) {
        console.error('Error creating review:', error.message);
        res.status(500).json({ message: 'Error creating review', error: error.message });
    }
}));
// 2. Get all reviews for a specific service
router.get('/service/:serviceId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId } = req.params;
    try {
        const reviews = yield review_1.default.findAll({ where: { serviceId } });
        if (reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found for this service' });
        }
        res.json(reviews); // Return the reviews
    }
    catch (error) {
        console.error('Error fetching reviews:', error.message);
        res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
}));
// 3. Update a review
router.put('/:id', authMiddleware_1.default, // Protect the route
[
    (0, express_validator_1.body)('rating').optional().isFloat({ min: 1, max: 5 }).withMessage('Rating must be a number between 1 and 5'),
    (0, express_validator_1.body)('comment').optional().isString().withMessage('Comment must be a string'),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const review = yield review_1.default.findByPk(id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        // Ensure the user is updating their own review
        if (review.userId !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized to update this review' });
        }
        yield review.update(req.body); // Update the review with the new data
        res.json(review); // Return the updated review
    }
    catch (error) {
        console.error('Error updating review:', error.message);
        res.status(500).json({ message: 'Error updating review', error: error.message });
    }
}));
// 4. Delete a review
router.delete('/:id', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const review = yield review_1.default.findByPk(id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        // Ensure the user is deleting their own review
        if (review.userId !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized to delete this review' });
        }
        yield review.destroy(); // Delete the review
        res.json({ message: 'Review deleted successfully' }); // Confirmation of deletion
    }
    catch (error) {
        console.error('Error deleting review:', error.message);
        res.status(500).json({ message: 'Error deleting review', error: error.message });
    }
}));
exports.default = router; // Use ES module export
//# sourceMappingURL=review.routes.js.map