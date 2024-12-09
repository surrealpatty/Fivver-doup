// src/routes/profile.ts
import express from 'express';
import  authenticateToken from '../middlewares/authenticateToken'; // Ensure correct path to authenticateToken middleware
import { getProfile, updateProfile } from '../controllers/profileController'; // Ensure correct path to profileController

const router = express.Router();

// GET /profile route to view profile
router.get('/profile', authenticateToken, getProfile);

// PUT /profile route to update profile
router.put('/profile', authenticateToken, updateProfile);

export default router;
