"use strict";
// src/controllers/reviewController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.getServiceReviews = exports.createReview = void 0;
var models_1 = require("../models"); // Import models from the index.ts file
var services_1 = require("../models/services"); // Rename the import to avoid conflicts
var Review = models_1.models.Review, User = models_1.models.User, Service = models_1.models.Service; // Destructure the models
// 1. Create a Review
var createReview = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, serviceId, rating, comment, userIdAsNumber, service, review, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, serviceId = _a.serviceId, rating = _a.rating, comment = _a.comment;
                userIdAsNumber = parseInt(req.params.id, 10);
                // Convert userId from string to number
                if (!serviceId || !rating || !comment) {
                    return [2 /*return*/, res.status(400).json({ message: 'Service ID, rating, and comment are required' })];
                }
                if (isNaN(userIdAsNumber)) {
                    return [2 /*return*/, res.status(400).json({ message: 'Invalid userId' })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, services_1.default.findByPk(serviceId)];
            case 2:
                service = _b.sent();
                if (!service) {
                    return [2 /*return*/, res.status(404).json({ message: 'Service not found' })];
                }
                return [4 /*yield*/, Review.create({
                        serviceId: serviceId,
                        userId: userIdAsNumber, // Use the numeric userId
                        rating: rating,
                        comment: comment,
                    })];
            case 3:
                review = _b.sent();
                return [2 /*return*/, res.status(201).json({ message: 'Review created successfully', review: review })];
            case 4:
                error_1 = _b.sent();
                console.error('Error creating review:', error_1);
                return [2 /*return*/, res.status(500).json({ message: 'Error creating review', error: error_1.message })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createReview = createReview;
// 2. Get Reviews for a Service
var getServiceReviews = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var serviceId, reviews, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                serviceId = req.params.serviceId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Review.findAll({
                        where: { serviceId: serviceId },
                        include: [
                            {
                                model: User,
                                attributes: ['id', 'username', 'email'], // Include relevant user details (exclude password)
                            },
                        ],
                    })];
            case 2:
                reviews = _a.sent();
                if (!reviews || reviews.length === 0) {
                    return [2 /*return*/, res.status(404).json({ message: 'No reviews found for this service' })];
                }
                return [2 /*return*/, res.status(200).json(reviews)];
            case 3:
                error_2 = _a.sent();
                console.error('Error fetching reviews:', error_2);
                return [2 /*return*/, res.status(500).json({ message: 'Error fetching reviews', error: error_2.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getServiceReviews = getServiceReviews;
// 3. Update a Review
var updateReview = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var reviewId, _a, rating, comment, id, userIdAsNumber, review, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                reviewId = req.params.reviewId;
                _a = req.body, rating = _a.rating, comment = _a.comment;
                id = req.user.id;
                userIdAsNumber = parseInt(req.params.id, 10);
                // Validate input
                if (!rating && !comment) {
                    return [2 /*return*/, res.status(400).json({ message: 'Rating or comment is required to update' })];
                }
                if (isNaN(userIdAsNumber)) {
                    return [2 /*return*/, res.status(400).json({ message: 'Invalid userId' })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Review.findByPk(reviewId)];
            case 2:
                review = _b.sent();
                if (!review) {
                    return [2 /*return*/, res.status(404).json({ message: 'Review not found' })];
                }
                // Ensure that the logged-in user is the one who wrote the review
                if (review.userId !== userIdAsNumber) {
                    return [2 /*return*/, res.status(403).json({ message: 'You can only update your own reviews' })];
                }
                // Update review details
                if (rating)
                    review.rating = rating;
                if (comment)
                    review.comment = comment;
                return [4 /*yield*/, review.save()];
            case 3:
                _b.sent(); // Save the updated review
                return [2 /*return*/, res.status(200).json({ message: 'Review updated successfully', review: review })];
            case 4:
                error_3 = _b.sent();
                console.error('Error updating review:', error_3);
                return [2 /*return*/, res.status(500).json({ message: 'Error updating review', error: error_3.message })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateReview = updateReview;
// 4. Delete a Review
var deleteReview = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var reviewId, id, userIdAsNumber, review, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reviewId = req.params.reviewId;
                id = req.user.id;
                userIdAsNumber = parseInt(id, 10);
                if (isNaN(userIdAsNumber)) {
                    return [2 /*return*/, res.status(400).json({ message: 'Invalid userId' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Review.findByPk(reviewId)];
            case 2:
                review = _a.sent();
                if (!review) {
                    return [2 /*return*/, res.status(404).json({ message: 'Review not found' })];
                }
                // Ensure that the logged-in user is the one who wrote the review
                if (review.userId !== userIdAsNumber) {
                    return [2 /*return*/, res.status(403).json({ message: 'You can only delete your own reviews' })];
                }
                // Delete the review
                return [4 /*yield*/, review.destroy()];
            case 3:
                // Delete the review
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: 'Review deleted successfully' })];
            case 4:
                error_4 = _a.sent();
                console.error('Error deleting review:', error_4);
                return [2 /*return*/, res.status(500).json({ message: 'Error deleting review', error: error_4.message })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteReview = deleteReview;
