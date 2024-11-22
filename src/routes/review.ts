import express, { Request, Response } from 'express';
import {
    createReview,
    getReviewsForService,
    updateReview,
    deleteReview
} from '../controllers/reviewController'; // Assuming reviewController.ts is in controllers folder
import { authenticateToken } from '../middlewares/authMiddleware'; // Ensure correct import path

const router = express.Router();

// Define the interface for route params
interface ServiceParams {
    serviceId: string;
}

interface ReviewParams {
    reviewId: string;
}

// Route to create a new review (requires authentication)
router.post('/', authenticateToken, async (req: Request, res: Response) => {
    try {
        await createReview(req, res);  // Assuming createReview handles the request and response
    } catch (error) {
        res.status(500).json({ message: 'Failed to create review', error });
    }
});

// Route to get reviews for a specific service
router.get('/:serviceId', async (req: Request<ServiceParams>, res: Response) => {
    try {
        const { serviceId } = req.params;  // serviceId from URL parameter
        await getReviewsForService(serviceId, res);  // Pass serviceId to the controller
    } catch (error) {
        res.status(500).json({ message: 'Failed to get reviews for service', error });
    }
});

// Route to update a review (requires authentication)
router.put('/:reviewId', authenticateToken, async (req: Request<ReviewParams>, res: Response) => {
    try {
        const { reviewId } = req.params;  // reviewId from URL parameter
        await updateReview(reviewId, req, res);  // Pass reviewId and request to the controller
    } catch (error) {
        res.status(500).json({ message: 'Failed to update review', error });
    }
});

// Route to delete a review (requires authentication)
router.delete('/:reviewId', authenticateToken, async (req: Request<ReviewParams>, res: Response) => {
    try {
        const { reviewId } = req.params;  // reviewId from URL parameter
        await deleteReview(reviewId, res);  // Pass reviewId to the controller
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete review', error });
    }
});

// Optional: Health check or confirmation route
router.get('/health', (req: Request, res: Response) => {
    res.json({ message: 'Reviews route is working!' });
});

export default router;
