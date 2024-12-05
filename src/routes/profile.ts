import express, { Response, NextFunction } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware'; 
import { AuthRequest } from '../types/authMiddleware';

const router = express.Router();

router.get('/profile', authenticateJWT, async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ message: 'User not authenticated.' });
        }

        const userTier = req.user.tier;  // Access tier from req.user

        // Your route logic, e.g., fetching services or performing actions based on the user's tier
        res.status(200).json({ message: 'Success', tier: userTier });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error' });
        }
    }
});

export default router;
