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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.getReviewsForService = exports.createReview = void 0;
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewText, rating, serviceId } = req.body;
    if (!reviewText || !rating || !serviceId) {
        res
            .status(400)
            .json({ message: 'Review text, rating, and serviceId are required' });
        return;
    }
    res.status(201).json({ message: 'Review created successfully' });
});
exports.createReview = createReview;
const getReviewsForService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId } = req.params;
    if (!serviceId) {
        res.status(400).json({ message: 'Service ID is required' });
        return;
    }
    res.status(200).json({ reviews: [] });
});
exports.getReviewsForService = getReviewsForService;
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewId } = req.params;
    const { reviewText, rating } = req.body;
    if (!reviewId || !reviewText || !rating) {
        res
            .status(400)
            .json({ message: 'Review ID, review text, and rating are required' });
        return;
    }
    res.status(200).json({ message: 'Review updated successfully' });
});
exports.updateReview = updateReview;
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewId } = req.params;
    if (!reviewId) {
        res.status(400).json({ message: 'Review ID is required' });
        return;
    }
    res.status(200).json({ message: 'Review deleted successfully' });
});
exports.deleteReview = deleteReview;
