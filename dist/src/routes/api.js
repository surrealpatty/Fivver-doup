"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = require("express");
const _authMiddleware = require("../middlewares/authMiddleware");
const router = (0, _express.Router)();
// POST route for creating a service
router.post('/services', _authMiddleware.authenticateJWT, async (req, res, next)=>{
    try {
        // Ensure the user is authenticated
        if (!req.user) {
            res.status(403).json({
                message: 'User not authenticated'
            });
            return; // Ensure flow terminates after returning the response
        }
        // Ensure user has a tier assigned
        if (!req.user.tier) {
            res.status(400).json({
                message: 'User tier is missing'
            });
            return; // Ensure flow terminates after returning the response
        }
        // Proceed with creating or updating the service logic here
        // Replace with actual logic to create the service
        res.status(201).json({
            message: 'Service created successfully'
        });
    } catch (error) {
        next(error); // Pass errors to the error handler
    }
});
// GET route for fetching profile data
router.get('/profile', _authMiddleware.authenticateJWT, async (req, res, next)=>{
    try {
        // Ensure the user is authenticated
        if (!req.user) {
            res.status(403).json({
                message: 'User not authenticated'
            });
            return; // Ensure flow terminates after returning the response
        }
        // Fetch the profile data logic (replace with actual logic)
        res.status(200).json({
            message: 'Profile data',
            user: req.user
        });
    } catch (error) {
        next(error); // Pass errors to the error handler
    }
});
const _default = router;

//# sourceMappingURL=api.js.map