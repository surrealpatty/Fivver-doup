import express from 'express';
import { loginUser, updateUserProfile, deleteUserAccount } from '../controllers/userController';

const router = express.Router();

// Route to login user and get token
router.post('/login', loginUser);

// Route to update user profile
router.put('/profile/:userId', updateUserProfile);

// Route to delete user account
router.delete('/profile/:userId', deleteUserAccount);

export default router;
