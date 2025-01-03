// src/controllers/reviewController.ts
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
    createReview: function() {
        return createReview;
    },
    deleteReview: function() {
        return deleteReview;
    },
    getReviewsForService: function() {
        return getReviewsForService;
    },
    updateReview: function() {
        return updateReview;
    }
});
const createReview = async (req, res)=>{
    const { reviewText, rating, serviceId } = req.body; // Access the review data and serviceId from req.body
    if (!reviewText || !rating || !serviceId) {
        res.status(400).json({
            message: 'Review text, rating, and serviceId are required'
        });
        return;
    }
    // Logic for creating a review, e.g., saving to the database
    // Example: Save review to the database using serviceId
    // await Review.create({ reviewText, rating, serviceId });
    res.status(201).json({
        message: 'Review created successfully'
    });
};
const getReviewsForService = async (req, res)=>{
    const { serviceId } = req.params; // Accessing serviceId from route parameters
    if (!serviceId) {
        res.status(400).json({
            message: 'Service ID is required'
        });
        return;
    }
    // Logic for getting reviews for the service
    // Example: Fetch reviews for the specific service
    // const reviews = await Review.findAll({ where: { serviceId } });
    res.status(200).json({
        reviews: []
    }); // Replace with actual reviews
};
const updateReview = async (req, res)=>{
    const { reviewId } = req.params; // Access reviewId from route parameters
    const { reviewText, rating } = req.body; // Access review details from request body
    if (!reviewId || !reviewText || !rating) {
        res.status(400).json({
            message: 'Review ID, review text, and rating are required'
        });
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
    res.status(200).json({
        message: 'Review updated successfully'
    });
};
const deleteReview = async (req, res)=>{
    const { reviewId } = req.params; // Access reviewId from route parameters
    if (!reviewId) {
        res.status(400).json({
            message: 'Review ID is required'
        });
        return;
    }
    // Logic for deleting the review
    // Example: Find the review by reviewId and delete it
    // const review = await Review.findByPk(reviewId);
    // if (review) {
    //   await review.destroy();
    // }
    res.status(200).json({
        message: 'Review deleted successfully'
    });
};
