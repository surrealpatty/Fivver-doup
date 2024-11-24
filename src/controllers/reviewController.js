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
    const { reviewText, rating, serviceId } = req.body; // Access the review data and serviceId from req.body
    if (!reviewText || !rating || !serviceId) {
        res.status(400).json({ message: 'Review text, rating, and serviceId are required' });
        return;
    }
    // Logic for creating a review, e.g., saving to the database
    // Example: Save review to the database using serviceId
    // await Review.create({ reviewText, rating, serviceId });
    res.status(201).json({ message: 'Review created successfully' });
});
exports.createReview = createReview;
const getReviewsForService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId } = req.params; // Accessing serviceId from route parameters
    if (!serviceId) {
        res.status(400).json({ message: 'Service ID is required' });
        return;
    }
    // Logic for getting reviews for the service
    // Example: Fetch reviews for the specific service
    // const reviews = await Review.findAll({ where: { serviceId } });
    res.status(200).json({ reviews: [] }); // Replace with actual reviews
});
exports.getReviewsForService = getReviewsForService;
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewId } = req.params; // Access reviewId from route parameters
    const { reviewText, rating } = req.body; // Access review details from request body
    if (!reviewId || !reviewText || !rating) {
        res.status(400).json({ message: 'Review ID, review text, and rating are required' });
        return;
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
});
exports.updateReview = updateReview;
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewId } = req.params; // Access reviewId from route parameters
    if (!reviewId) {
        res.status(400).json({ message: 'Review ID is required' });
        return;
    }
    // Logic for deleting the review
    // Example: Find the review by reviewId and delete it
    // const review = await Review.findByPk(reviewId);
    // if (review) {
    //   await review.destroy();
    // }
    res.status(200).json({ message: 'Review deleted successfully' });
});
exports.deleteReview = deleteReview;
