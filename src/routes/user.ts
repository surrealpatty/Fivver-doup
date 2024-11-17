// Example in userRoutes.ts
import { Router } from 'express';
import { getUserProfile } from '../controllers/userController';

const router = Router();

router.get('/profile', async (req, res) => {
    const user = await User.findOne({ where: { id: req.userId } });
    
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
        email: user.email,
        username: user.username, // username exists now
        role: user.role,         // role exists now
    });
});

export default router;
