const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to get user profile (requires authentication)
router.get('/profile', authMiddleware.verifyToken, userController.getProfile);

// Route to update user information (requires authentication)
router.put('/profile', authMiddleware.verifyToken, userController.updateProfile);

module.exports = router;
