// src/routes/api.ts
import { Router, Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { AuthRequest } from '../types/authMiddleware';  // Correct path for AuthRequest


const router = Router();

router.post('/', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Your route logic here
        res.status(200).send('Success');
    } catch (error) {
        next(error);
    }
});
