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
exports.deleteReview = exports.updateReview = exports.getReviewsForService = exports.createReview = void 0;
var createReview = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, reviewText, rating, serviceId;
    return __generator(this, function (_b) {
        _a = req.body, reviewText = _a.reviewText, rating = _a.rating, serviceId = _a.serviceId;
        if (!reviewText || !rating || !serviceId) {
            res
                .status(400)
                .json({ message: 'Review text, rating, and serviceId are required' });
            return [2 /*return*/];
        }
        // Logic for creating a review, e.g., saving to the database
        // Example: Save review to the database using serviceId
        // await Review.create({ reviewText, rating, serviceId });
        res.status(201).json({ message: 'Review created successfully' });
        return [2 /*return*/];
    });
}); };
exports.createReview = createReview;
var getReviewsForService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var serviceId;
    return __generator(this, function (_a) {
        serviceId = req.params.serviceId;
        if (!serviceId) {
            res.status(400).json({ message: 'Service ID is required' });
            return [2 /*return*/];
        }
        // Logic for getting reviews for the service
        // Example: Fetch reviews for the specific service
        // const reviews = await Review.findAll({ where: { serviceId } });
        res.status(200).json({ reviews: [] }); // Replace with actual reviews
        return [2 /*return*/];
    });
}); };
exports.getReviewsForService = getReviewsForService;
var updateReview = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var reviewId, _a, reviewText, rating;
    return __generator(this, function (_b) {
        reviewId = req.params.reviewId;
        _a = req.body, reviewText = _a.reviewText, rating = _a.rating;
        if (!reviewId || !reviewText || !rating) {
            res
                .status(400)
                .json({ message: 'Review ID, review text, and rating are required' });
            return [2 /*return*/];
        }
        // Logic for updating the review
        // Example: Find the review by reviewId and update it
        // const review = await Review.findByPk(reviewId);
        // if (review) {
        //   review.reviewText = reviewText;
        //   review.rating = rating;
        //   await review.save();
        // }
        res.status(200).json({ message: 'Review updated successfully' });
        return [2 /*return*/];
    });
}); };
exports.updateReview = updateReview;
var deleteReview = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var reviewId;
    return __generator(this, function (_a) {
        reviewId = req.params.reviewId;
        if (!reviewId) {
            res.status(400).json({ message: 'Review ID is required' });
            return [2 /*return*/];
        }
        // Logic for deleting the review
        // Example: Find the review by reviewId and delete it
        // const review = await Review.findByPk(reviewId);
        // if (review) {
        //   await review.destroy();
        // }
        res.status(200).json({ message: 'Review deleted successfully' });
        return [2 /*return*/];
    });
}); };
exports.deleteReview = deleteReview;
