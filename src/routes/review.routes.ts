import { Router, Request, Response } from 'express';
import { authMiddleware, authorizeRoles } from '../middlewares/authMiddleware'; // Ensure correct import paths
import {
    createReview,
    getReviews,
    updateReview,
    deleteReview,
} from '../controllers/reviewController'; // Ensure correct path and named exports

const router = Router();

// Route for creating a review (only authenticated users can create a review)
router.post('/create', authMiddleware, async (req: Request, res: Response) => {
    try {
        // Ensure req and res are passed to the controller functions
        await createReview(req, res);
    } catch (error) {
        console.error('Error creating review:', error.message);
        res.status(500).json({ message: 'Failed to create review' });
    }
});

// Route for getting all reviews or a specific review by ID
router.get('/', async (req: Request, res: Response) => {
    try {
        // Ensure req and res are passed to the controller functions
        await getReviews(req, res);
    } catch (error) {
        console.error('Error retrieving reviews:', error.message);
        res.status(500).json({ message: 'Failed to retrieve reviews' });
    }
});

// Route for updating a review (only the user who created the review or admin can update it)
router.put('/:id', authMiddleware, authorizeRoles('user', 'admin'), async (req: Request, res: Response) => {
    try {
        // Ensure req and res are passed to the controller functions
        await updateReview(req, res);
    } catch (error) {
        console.error('Error updating review:', error.message);
        res.status(500).json({ message: 'Failed to update review' });
    }
});

// Route for deleting a review (only the user who created the review or admin can delete it)
router.delete('/:id', authMiddleware, authorizeRoles('user', 'admin'), async (req: Request, res: Response) => {
    try {
        // Ensure req and res are passed to the controller functions
        await deleteReview(req, res);
    } catch (error) {
        console.error('Error deleting review:', error.message);
        res.status(500).json({ message: 'Failed to delete review' });
    }
});

export default router;
