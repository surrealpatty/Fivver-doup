const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/profile', authenticate, profileController.getUserProfile);
router.post('/profile', authenticate, profileController.updateUserProfile);

module.exports = router;
